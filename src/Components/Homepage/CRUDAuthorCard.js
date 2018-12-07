import React from 'react';
import { Col } from 'mdbreact';
import AuthorCreateCard from './AuthorCreateCard'
import AuthorCard from "./AuthorCard";
import {withRouter} from 'react-router'
import tempImg from '../../tempUser.png'
import {withFirebase} from "../Firebase/context";

class CRUDAuthorCard extends React.Component {
    constructor(props) {
        super(props);
        this.editToggle = this.editToggle.bind(this);
        this.deleteAuthor = this.deleteAuthor.bind(this);
        this.reset = this.reset.bind(this);
        this.peek = this.peek.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.createNewAuthor = this.createNewAuthor.bind(this);
        this.showTempImg = this.showTempImg.bind(this);
        
        this.state = {
            editing: this.props.editing === true,
            brokenImg: false
        };
    }
    
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value, brokenImg: false});
    };
    
    showTempImg = () => {this.setState({brokenImg: true})};
    
    onUrlChange = event => {
        this.setState({ [event.target.name]: event.target.value.toString().replace(' ', '') });
    };
    
    componentDidMount() {
        const {authorId, newAuthor} = this.props;
        
        if(!newAuthor){
            this.setState({ loading: true });
            this.props.firebase.db.ref(`authorData/${authorId}/profile`).on('value', snapshot => {
                const authorObject = snapshot.val();
                
                this.setState({
                    ...authorObject,
                    resetValues: authorObject,
                    loading: false
                });
            });
        }
    }
    
    componentWillUnmount() {
        const {authorId, newAuthor} = this.props;
    
        if(!newAuthor){
            this.props.firebase.db.ref(`authorData/${authorId}/profile`).off();
        }
    }
    
    createNewAuthor = () => {
        const { authorUrl, authorTitle, authorImg, authorDescription } = this.state;
        this.setState({loading: true});
        
        this.props.firebase.db.ref(`/authorList`).once('value').then(snapshot=> {
            if (snapshot.hasChild(authorUrl)) {
                this.setState({
                    error:{error:"That author URL is already taken"},
                    loading: false,
                })
            } else {
                this.props.firebase.author(authorUrl).push().then(data =>{
                    const authorId = authorTitle + data.key;
                    
                    let updates = {};
                    updates[`/authorList/${authorUrl}`] = authorId;
                    updates[`/authorData/${authorId}/profile`] =
                        {authorTitle,  authorImg, authorUrl, authorDescription};
                    this.props.firebase.db.ref().update(updates)
                        .then(() => {
                            this.props.addedAuthor();
                        })
                        .catch(error => {
                            this.setState({
                                error: error,
                                loading: false
                        });
                    });
                });
            }
        });
    };
    
    saveChanges = () => {
        const { authorTitle, authorImg, authorDescription, authorUrl } = this.state;
        const oldAuthorUrl = this.state.resetValues.authorUrl;
        const authorId = this.props.authorId;
        
        this.setState({loading: true});
        
        let updates = {};
        updates[`authorList/${oldAuthorUrl}`] = null;
        updates[`authorList/${authorUrl}`] = authorId;
        updates[`authorData/${authorId}/profile/authorTitle`] = authorTitle;
        updates[`authorData/${authorId}/profile/authorImg`] = authorImg;
        updates[`authorData/${authorId}/profile/authorDescription`] = authorDescription;
        updates[`authorData/${authorId}/profile/authorUrl`] = authorUrl;
        
        this.props.firebase.db.ref().update(updates)
            .then(() => {
                this.setState({
                    loading: false,
                    editing: false
                });
            })
            .catch(error => {
                this.setState({
                    error: error,
                    loading: false
                });
            });
    };
    
    deleteAuthor = () => {
        const {authorId} = this.props;
        const {authorUrl} = this.state;
        
        this.setState({loading: true});
        
        let updates = {};
        updates[`authorList/${authorUrl}`] = null;
        updates[`authorData/${authorId}`] = null;
    
        this.props.firebase.db.ref().update(updates)
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
    reset = () => this.setState({...this.state.resetValues, editing: false});
    peek = () => this.setState({peeking: !this.state.peeking});
    imgFunction = () => this.props.history.push(`/A/${this.state.authorUrl}`);
    
    render() {
        const {adminView, newAuthor } = this.props;
        const {editing, peeking} = this.state;
        return (
            <Col xl='3' lg='4' md='6' sm='12' className='mb-4'>
                {!peeking && (newAuthor || editing) ?
                    <AuthorCreateCard {...this.state}
                                      newAuthor={newAuthor}
                                      createNewAuthor={this.createNewAuthor}
                                      onChange={this.onChange}
                                      saveChanges={this.saveChanges}
                                      peek={this.peek}
                                      cancel={this.reset}
                                      showTempImg={this.showTempImg}
                    />
                    :
                    <AuthorCard {...this.state}
                                adminView={adminView}
                                editFunction={this.editToggle}
                                imgFunction={peeking ? null : this.imgFunction}
                                deleteFunction={this.deleteAuthor}
                                peek={this.peek}
                                showTempImg={this.showTempImg}
                        />
                }
            </Col>
        )
    }
}

export default withFirebase(withRouter(CRUDAuthorCard));