import React from 'react';
import { Card } from 'mdbreact';
import {withFirebase} from "../Firebase/context";
import {withRouter} from 'react-router'
import FPostCreate from "./FPostCreate";
import FPost from './FPost'
import {withSession} from "../Session/context";

const INITIAL_STATE = {
    postTitle: '',
    error: {message: ""},
};

class FPostCRUD extends React.Component {
    constructor(props) {
        super(props);
        this.editToggle = this.editToggle.bind(this);
        this.reset = this.reset.bind(this);
        this.createNewPost = this.createNewPost.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.removeError = this.removeError.bind(this);
        
        this.state = {
            ...INITIAL_STATE,
            postId: this.props.postId,
            editing: !!this.props.editing
        };
    }
    
    componentDidMount() {
        const {firebase, authorId, postId} = this.props;

        this.postRef = firebase.db.ref(`authorData/${authorId}/postData/${postId}`);

        this.postRef.on('value', snapshot => {
            this.setState({
                ...snapshot.val(),
                resetValues: {...snapshot.val() },
            });
        });
    }

    componentWillUnmount() {
        if(this.postRef) this.postRef.off();
    }
    
    removeError = () => {this.setState({error: false})};
    
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value, brokenImg: false});
    };
    
    createNewPost = event => {
        const {firebase, forum, authorId, session, authorUrl, history} = this.props;
        
        const user = session.state.user;
        if(!user){
            return;
        }
        const userId = user.uid;
        const {postTitle} = this.state;
        this.setState({loading: true});
        
        const postId = postTitle.toLowerCase().split(' ').map((s) =>
            s.charAt(0).toUpperCase() + s.substring(1)).join('') + firebase.db.ref(`authorData/${authorId}/postData/`).push().key;
        
        
        let updates = {};
    
        updates[`authorData/${authorId}/postData/${postId}`] = {postTitle, poster: userId};
        updates[`authorData/${authorId}/forumData/${forum.forumId}/posts/${postId}`] = true;
        
        firebase.db.ref().update(updates)
            .then(() => {
                this.props.addedPost();
                history.push(`/A/${authorUrl}/forum/${forum.forumUrl}/${postId}`)
            }).catch(error => {
            this.setState({ error, loading: false });
        });
        
    };
    
    saveChanges = event => {
        this.setState({error:{message:'todo: save'}})
        // const { bookTitle, bookImg, bookDescription, uid } = this.state;
        // const {firebase, authorUrl} = this.props;
        // this.setState({loading: true});
        //
        // let updates = {};
        // updates[`authorList/${authorUrl}/books/${uid}/bookTitle`] = bookTitle;
        // updates[`authorList/${authorUrl}/books/${uid}/bookImg`] = bookImg;
        // updates[`authorList/${authorUrl}/books/${uid}/bookDescription`] = bookDescription;
        //
        // firebase.db.ref().update(updates)
        //     .then(author => {
        //         this.setState({
        //             loading: false,
        //             editing: false
        //         });
        //     })
        //     .catch(error => {
        //         this.setState({
        //             error: error,
        //             loading: false
        //         });
        //     });
    };
    
    deletePost = event => {
        const {firebase, authorId, forum, session, postId} = this.props;
        const userId = session.state.user.uid;
        const forumId = forum.forumId;
        
        this.setState({loading: true});
        let updates = {};
        updates[`authorData/${authorId}/postData/${postId}`] = null;
        updates[`authorData/${authorId}/forumData/${forumId}/posts/${postId}`] = null;
        firebase.db.ref().update(updates)
            .then(author => {

            })
            .catch(error => {
                this.setState({
                    error: error,
                    loading: false
                });
            });
    };
    
    editToggle = () => this.setState({editing: !this.state.editing});
    reset = () => {
        this.setState({
            ...INITIAL_STATE,
            ...this.props.post,
            editing: !!this.props.editing,
            brokenImg: false
        });
        this.props.addedPost();
    };
    // peek = () => this.setState({peeking: !this.state.peeking});
    
    render() {
        
        const {adminView, newPost, authorUrl, forum, history} = this.props;
        const {editing, error, postId} = this.state;
        
        return (
            <Card className='p-0 m-2 mx-5'>
                {newPost || editing ?
                    <FPostCreate
                        {...this.state}
                        adminView={adminView}
                        newPost={newPost}
                        cancel={this.reset}
                        onChange={this.onChange}
                        saveChanges={this.saveChanges}
                        removeError={this.removeError}
                        createNewPost={this.createNewPost}
                        errorMessage={error ? error.message : null}
                    />
                    :
                    <FPost
                        {...this.state}
                        forumUrl={forum.forumUrl}
                        authorUrl={authorUrl}
                        adminView={adminView}
                        editFunction={this.editToggle}
                        deleteFunction={this.deletePost}
                        errorMessage={error ? error.message : null}
                        removeError={this.removeError}
                        linkFunction={()=> history.push(`/A/${authorUrl}/forum/${forum.forumUrl}/${postId}`)}
                    />
                }
            </Card>
        )
    }
}

export default withRouter(withSession(withFirebase(FPostCRUD)));