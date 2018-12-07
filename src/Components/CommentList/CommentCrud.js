import React from 'react';
import { Card } from 'mdbreact';
import PostCreate from './PostCreate'
import Post from "./Post";
import {withFirebase} from "../Firebase/context";
import {withSession} from "../Session/context";

const INITIAL_STATE = {
    postTitle: '',
    postDescription: '',
    poster: null,
    error: null,
};

class CRUDPost extends React.Component {
    constructor(props) {
        super(props);
        this.editToggle = this.editToggle.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.reset = this.reset.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        
        this.state = {
            ...INITIAL_STATE,
            editing: !!this.props.editing,
            peeking: false,
            brokenImg: false,
            allowComments: false,
        };
    }
    
    componentDidMount() {
        this.setState({loading: true});
        const {authorId, postId, firebase} = this.props;
        
        this.postRef = firebase.db.ref(`authorData/${authorId}/postData/${postId}`);
                        
        this.postRef.on('value', snapshot => {
            this.setState({
                ...INITIAL_STATE,
                ...snapshot.val(),
                resetValues: snapshot.val(),
                loading:false
            });
        });
    }
    
    componentWillUnmount() {
        if(this.postRef) this.postRef.off();
        
    }
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value, brokenImg: false});
    };
    
    showTempImg = () => {this.setState({brokenImg: true})};
    
    saveChanges = event => {
        const { postTitle, postDescription } = this.state;
        const {firebase, authorId, postId} = this.props;
        this.setState({loading: true});
        let updates = {};
    
        updates[`authorData/${authorId}/postData/${postId}/postTitle`] = postTitle;
        updates[`authorData/${authorId}/postData/${postId}/postDescription`] = postDescription;
        console.log(`authorData/${authorId}/postData/${postId}/postDescription`);
        firebase.db.ref().update(updates).then(author => {
            this.setState({
                loading: false,
                editing: false
            });
        }).catch(error => {
            this.setState({
                error: error,
                loading: false
            });
        });
    };
    
    deletePost = event => {
        const { postId } = this.state;
        const {firebase, authorId} = this.props;
        this.setState({loading: true});
        let updates = {};
    
        updates[`authorData/${authorId}/postData/${postId}/`] = null;
    
        // firebase.db.ref().update(updates)
        //     .then(author => {
        //
        //     })
        //     .catch(error => {
        //         this.setState({
        //             error: error,
        //             loading: false
        //         });
        //     });
    };
    
    editToggle = () => this.setState({editing: !this.state.editing});
    
    reset = () => {
        this.setState({
            ...INITIAL_STATE,
            ...this.state.resetValues,
            loading: false,
            editing: !!this.props.editing,
            brokenImg: false
        });
        if(this.props.newBook) this.props.addedBook();
    };
    
    render() {
        const user = this.props.session.state.user;
        const userId = user ? user.uid : null;
        const {poster} = this.state;
        const isPoster = userId === poster;
        
        const {adminView} = this.props;
        const {editing, peeking} = this.state;
        return (
            <Card className='p-4 m-3'>
                {editing ?
                    <PostCreate {...this.state}
                                adminView={adminView || isPoster}
                                peek={this.peek}
                                cancel={this.reset}
                                onChange={this.onChange}
                                saveChanges={this.saveChanges}
                                createNewBook={this.createNewBook}
                                showTempImg={this.showTempImg}
                    />
                    :
                    <Post {...this.state}
                          adminView={adminView || isPoster}
                          imgFunction={peeking ? null : this.imgFunction}
                          editFunction={this.editToggle}
                          deleteFunction={this.deletePost}
                          peek={this.peek}
                          showTempImg={this.showTempImg}
                          commentsToggle={this.commentsToggle}
                    />
                }
            </Card>
        )
    }
}

export default withSession(withFirebase(CRUDPost));