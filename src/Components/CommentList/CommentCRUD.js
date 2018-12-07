import React from 'react';
import { Card } from 'mdbreact';
import CommentCreate from './CommentCreate'
import Comment from "./Comment";
import {withFirebase} from "../Firebase/context";
import {withSession} from "../Session/context";

const INITIAL_STATE = {
    commentDescription: '',
    error: null,
};

class CommentCRUD extends React.Component {
    constructor(props) {
        super(props);
        this.editToggle = this.editToggle.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.reset = this.reset.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.createNewComment = this.createNewComment.bind(this);
        
        this.state = {
            ...INITIAL_STATE,
            ...this.props.comment,
            editing: !!this.props.editing,
            peeking: false,
            brokenImg: false,
            allowComments: false,
        };
    }
    
    // componentDidMount() {
    //     this.setState({loading: true});
    //     const {authorId, postId, firebase} = this.props;
    //
    //     this.postRef = firebase.db.ref(`authorData/${authorId}/postData/${postId}`);
    //
    //     this.postRef.on('value', snapshot => {
    //         this.setState({
    //             ...INITIAL_STATE,
    //             ...snapshot.val(),
    //             resetValues: snapshot.val(),
    //             loading:false
    //         });
    //     });
    // }
    //
    // componentWillUnmount() {
    //     if(this.postRef) this.postRef.off();
    //
    // }
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value, brokenImg: false});
    };
    
    showTempImg = () => {this.setState({brokenImg: true})};
    
    createNewComment = event => {
        const {firebase, session, commentSectionId} = this.props;
        const {authorId} = session.state;
        const {commentDescription} = this.state;
        
        this.setState({loading: true});
        const key = firebase.db.ref(`authorData/${authorId}/commentSections/${commentSectionId}`).push().key;
        let updates = {};
    
        const user = this.props.session.state.user;
        const userId = user ? user.uid : null;
    
        console.log(userId);
        console.log(commentDescription);
        updates[`authorData/${authorId}/commentSections/${commentSectionId}/${key}`] = {userId, commentDescription};
    
        this.props.firebase.db.ref().update(updates)
            .then(() => {
                this.props.reset();
            }).catch(error => {
            this.setState({ error, loading: false });
        });
        
        // .once('value').then(snapshot=> {
        //     let newForumId = snapshot.exists() ? snapshot.val() : forumTitle +
        //         firebase.db.ref(`authorData/${authorId}/forumData/`).push().key;
        //
        //     let updates = {};
        //     if(!snapshot.exists()){
        //         updates[`authorData/${authorId}/forumList/${forumUrl}`] = newForumId;
        //         updates[`authorData/${authorId}/forumData/${newForumId}`] =
        //             {forumUrl, forumTitle, sections: false, posts: false, postsEnabled:true};
        //     }
        //     updates[`authorData/${authorId}/forumData/${forumId}/sections/${sectionId}/forumIds/${newForumId}`] = true;
        //
        //     this.props.firebase.db.ref().update(updates)
        //         .then(() => {
        //             this.props.addedLink();
        //         }).catch(error => {
        //         this.setState({ error, loading: false });
        //     });
        // }).catch(error => {
        //     this.setState({ error, loading: false });
        // });
    };
    
    saveChanges = event => {
        const {firebase, session, commentSectionId} = this.props;
        const {authorId} = session.state;
        const {commentDescription, commentId} = this.state;
        
        this.setState({loading: true});
        let updates = {};
    
        updates[`authorData/${authorId}/commentSections/${commentSectionId}/${commentId}/commentDescription`] = commentDescription;
    
        firebase.db.ref().update(updates)
            .then(() => {
                this.setState({loading: false, editing: false});
                this.props.reset();
            }).catch(error => {
            this.setState({ error, loading: false });
        });
    };
    
    deletePost = event => {
        const {firebase, session, commentSectionId} = this.props;
        const {authorId} = session.state;
        const {commentDescription, commentId} = this.state;
        let updates = {};
    
        const user = this.props.session.state.user;
        const userId = user ? user.uid : null;
    
        console.log(userId);
        console.log(commentDescription);
        updates[`authorData/${authorId}/commentSections/${commentSectionId}/${commentId}`] = null;
        
        firebase.db.ref().update(updates)
            .then(() => {
            
            }).catch(error => {
            this.setState({ error, loading: false });
        });
    };
    
    editToggle = () => this.setState({editing: !this.state.editing});
    
    reset = () => {
        this.setState({
            ...INITIAL_STATE,
            ...this.state.resetValues,
            editing: !!this.props.editing,
        });
        if(this.props.newBook) this.props.addedBook();
    };
    
    render() {
        
        const user = this.props.session.state.user;
        const userId = user ? user.uid : null;
        const isPoster = userId === this.state.userId;
        
        const {adminView, newComment} = this.props;
        const {editing, peeking} = this.state;
        return (
            <Card className='p-4 m-3'>
                {editing ?
                    <CommentCreate {...this.state}
                                   adminView={adminView || isPoster}
                                   peek={this.peek}
                                   newComment={newComment}
                                   cancel={this.reset}
                                   onChange={this.onChange}
                                   saveChanges={this.saveChanges}
                                   createNewComment={this.createNewComment}
                                   showTempImg={this.showTempImg}
                    />
                    :
                    <Comment
                        {...this.state}
                        isPoster={isPoster}
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

export default withFirebase(withSession(CommentCRUD));