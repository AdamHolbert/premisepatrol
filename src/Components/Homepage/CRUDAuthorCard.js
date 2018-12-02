import React from 'react';
import { FlippingCard, Card, MDBCardBody, Col, Fa, Row, MDBAvatar } from 'mdbreact';
import AuthorCreatePage from './AuthorCreatePage'
import AuthorCard from "./AuthorCard";
import {withRouter} from 'react-router'
import {withFirebase} from "../Firebase/context";

class CRUDAuthorCard extends React.Component {
    constructor(props) {
        super(props);
        this.editToggle = this.editToggle.bind(this);
        this.deleteAuthor = this.deleteAuthor.bind(this);
        this.reset = this.reset.bind(this);
        this.deleteAuthor = this.deleteAuthor.bind(this);
        this.peek = this.peek.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.createNewAuthor = this.createNewAuthor.bind(this);
        this.state = {
            ...this.props.author,
            editing: this.props.editing === true,
        };
    }
    
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    
    onUrlChange = event => {
        this.setState({ [event.target.name]: event.target.value.toString().replace(' ', '') });
    };
    
    createNewAuthor = event => {
        const { authorUrl, authorTitle, authorImg, authorDescription } = this.state;
        this.setState({loading: true});
        
        this.props.firebase.authors().once('value').then(snapshot=> {
            if (snapshot.hasChild(authorUrl)) {
                this.setState({
                    error:{error:"That author URL is already taken"},
                    loading: false,
                })
            } else {
                this.props.firebase.author(authorUrl).push().then(data =>{
                    const authorId = data.key;
                    
                    let updates = {};
                    updates[`/authorList/${authorUrl}`] = {authorId, authorTitle,  authorImg, authorUrl, authorDescription};
                    // updates['/permissionList/' + authorId] = {author: this.props.session.state.user.uid};
                    this.props.firebase.db.ref().update(updates)
                        .then(author => {
                            this.setState({loading: false});
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
    
    saveChanges = event => {
        const { authorTitle, authorImg, authorDescription } = this.state;
        const { authorUrl } = this.props.author;
        
        this.setState({loading: true});
        
        let updates = {};
        updates[`/authorList/${authorUrl}/authorTitle`] = authorTitle;
        updates[`/authorList/${authorUrl}/authorImg`] = authorImg;
        updates[`/authorList/${authorUrl}/authorDescription`] = authorDescription;
    
        this.props.firebase.db.ref().update(updates)
            .then(author => {
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
    
    deleteAuthor = event => {
        const { authorUrl, authorId } = this.props.author;
        
        this.setState({loading: true});
        
        let updates = {};
        updates[`/authorList/${authorUrl}`] = null;
        updates[`/permissionList/${authorId}`] = null;
    
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
    reset = () => this.setState({...this.props.author, editing: false});
    peek = () => this.setState({peeking: !this.state.peeking});
    imgFunction = () => this.props.history.push(`/A/${this.state.authorUrl}`);
    
    render() {
        const {adminView, newAuthor } = this.props;
        const {editing, peeking} = this.state;
        
        return (
            <Col lg='3' md='4' sm='6' xs='12' className='mb-4'>
                {!peeking && (newAuthor || editing) ?
                    <AuthorCreatePage {...this.state}
                                      newAuthor={newAuthor}
                                      createNewAuthor={this.createNewAuthor}
                                      onChange={this.onChange}
                                      saveChanges={this.saveChanges}
                                      peek={this.peek}
                                      cancel={this.reset}
                    />
                    :
                    <AuthorCard {...this.state}
                                adminView={adminView}
                                editFunction={this.editToggle}
                                imgFunction={peeking ? null : this.imgFunction}
                                deleteFunction={this.deleteAuthor}
                                peek={this.peek}
                        />
                }
            </Col>
        )
    }
}

export default withFirebase(withRouter(CRUDAuthorCard));