import React from 'react';
import { Card } from 'mdbreact';
import ITEMCreate from './ITEMCreate'
import ITEM from "./ITEM";
import {withFirebase} from "../Firebase/context";
import FLinkCreate from "./FLinkCreate";
import FLink from "./FLink";

const INITIAL_STATE = {
    forumTitle: 'Placeholder',
    error: {message: ""},
};

class CRUDITEM extends React.Component {
    constructor(props) {
        super(props);
        this.editToggle = this.editToggle.bind(this);
        this.reset = this.reset.bind(this);
        this.createNewLink = this.createNewLink.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.deleteITEM = this.deleteITEM.bind(this);
        this.showTempImg = this.showTempImg.bind(this);
        this.removeError = this.removeError.bind(this);
        
        this.state = {
            ...INITIAL_STATE,
            forumId: this.props.forumId,
            editing: !!this.props.editing,
            brokenImg: false
        };
    }
    
    componentDidMount() {
        const {firebase, authorId, linkForumId, sectionId} = this.props;
    
        this.titleRef = firebase.db.ref(`authorData/${authorId}/forumData/${linkForumId}/forumTitle`);
        this.urlRef = firebase.db.ref(`authorData/${authorId}/forumData/${linkForumId}/forumUrl`);
    
        this.titleRef.on('value', snapshot => {
            this.setState({
                forumTitle: snapshot.val() || '',
                resetValues: {...this.state.resetValues, forumTitle:snapshot.val() || '' },
            });
        });
        this.urlRef.on('value', snapshot => {
            this.setState({
                forumUrl: snapshot.val() || '',
                resetValues: {...this.state.resetValues, forumUrl:snapshot.val()},
            });
        });
    }

    componentWillUnmount() {
        if(this.titleRef) this.titleRef.off();
        if(this.urlRef) this.urlRef.off();
    }
    
    removeError = () => {this.setState({error: false})};
    
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value, brokenImg: false});
    };
    
    showTempImg = () => {this.setState({brokenImg: true})};
    
    createNewLink = event => {
        const {firebase, forumId, authorId, sectionId} = this.props;
        const {forumTitle} = this.state;
        const forumUrl = forumTitle.toLowerCase().split(' ').map((s) =>
            s.charAt(0).toUpperCase() + s.substring(1)).join('');
        this.setState({loading: true});
        firebase.db.ref(`authorData/${authorId}/forumList/${forumUrl}`).once('value').then(snapshot=> {
            let newForumId = snapshot.exists() ? snapshot.val() : forumTitle +
                firebase.db.ref(`authorData/${authorId}/forumData/`).push().key;
            
            let updates = {};
            if(!snapshot.exists()){
                updates[`authorData/${authorId}/forumList/${forumUrl}`] = newForumId;
                updates[`authorData/${authorId}/forumData/${newForumId}`] =
                    {forumUrl, forumTitle, sections: false, posts: false, postsEnabled:true};
            }
            updates[`authorData/${authorId}/forumData/${forumId}/sections/${sectionId}/forumIds/${newForumId}`] = true;
    
            this.props.firebase.db.ref().update(updates)
            .then(() => {
                this.props.addedLink();
            }).catch(error => {
                this.setState({ error, loading: false });
            });
        }).catch(error => {
            this.setState({ error, loading: false });
        });
    };
    
    saveChanges = event => {
        console.log('todo: save');
        this.setState({error:{error:'todo: save'}});
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
    
    deleteITEM = event => {
        const {firebase,  authorId, forumId,sectionId, linkForumId} = this.props;
        this.setState({loading: true});

        let updates = {};
        updates[`authorData/${authorId}/forumData/${forumId}/sections/${sectionId}/forumIds/${linkForumId}`] = null;
        
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
            ...this.props.ITEM,
            editing: !!this.props.editing,
            brokenImg: false
        });
        this.props.addedLink();
    };
    // peek = () => this.setState({peeking: !this.state.peeking});
    
    render() {
        const {adminView, newLink, authorUrl} = this.props;
        const {editing, error} = this.state;
        return (
            <Card className='p-0 m-2 mx-5'>
                {newLink || editing ?
                    <FLinkCreate
                        {...this.state}
                        adminView={adminView}
                        newLink={newLink}
                        cancel={this.reset}
                        onChange={this.onChange}
                        saveChanges={this.saveChanges}
                        removeError={this.removeError}
                        createNewLink={this.createNewLink}
                        errorMessage={error ? error.message : null}
                    />
                    :
                    <FLink
                        {...this.state}
                        authorUrl={authorUrl}
                        adminView={adminView}
                        editFunction={this.editToggle}
                        deleteFunction={this.deleteITEM}
                        errorMessage={error ? error.message : null}
                        removeError={this.removeError}
                        showTempImg={this.showTempImg}
                    />
                }
            </Card>
        )
    }
}

export default withFirebase(CRUDITEM);