import React from 'react';
import {withSession} from "../Session/context";
import AdminHeader, {ABtn, AFilter} from "../Header/AdminHeader";
import {Link} from "react-router-dom";
import {withFirebase} from "../Firebase/context";
import {Animation, Fa, MDBBtn} from 'mdbreact';
import ForumSectionList from "./ForumSectionList";
import ForumPostList from "./ForumPostList";

const INITIAL_STATE = {
    posts: false,
    sections: false
}

class Forum extends React.Component {
    constructor(props) {
        super(props);
        
        this.addedSection = this.addedSection.bind(this);
        this.state = {
            ...INITIAL_STATE,
            forumUrl: null,
            adminView: false,
            addSection: false,
            checkingExistance: true,
            loadingForum: true,
            forum: null,
        };
    }
    
    componentDidMount() {
        this.props.session.setState({
            activeUrl: 'forum'
        });
    }
    
    
    componentWillUpdate(nextProps, nextState){
        const {firebase, session} = this.props;
        const newUrl = nextProps.match.params.forumUrl || 'home';
        
        if(newUrl !== nextState.forumUrl || nextState.addedForum){
            this.setState({
                forumUrl: newUrl,
                checkingExistance: true,
                loadingForum: true,
                forum: null,
                addedForum: false
            });
            
            firebase.db.ref(`authorData/${session.state.authorId}/forumList/${newUrl}`).once('value', snapshot => {
                const forumId = snapshot.val();
                if(!forumId) {
                    if(newUrl === 'home'){
                        this.addForum('home');
                    } else {
                        this.setState({
                            checkingExistance: false,
                            loadingForum: false,
                            forum: null,
                        });
                    }
                    return;
                }
                this.setState({
                   checkingExistance: false,
                });
                if(this.forumRef) this.forumRef.off();
                this.forumRef = firebase.db.ref(`authorData/${session.state.authorId}/forumData/${forumId}`);
                
                this.forumRef.on('value', snapshot => {
                    const forumData = snapshot.val();
                    this.setState({
                        loadingForum: false,
                        forum: {...forumData, forumId},
                    })
                })
                
            }).catch(error => {
                this.setState({
                    checkingExistance: false,
                    loadingForum: false,
                    forum: null,
                    error: error
                })
            });
            
        }
    }
    
    componentWillUnmount(){
        if(this.forumRef) this.forumRef.off();
        this.props.session.setState({
            activeUrl: 'author'
        });
    }
    
    addedSection=()=>{
        const {addSection} = this.state;
        this.setState({addSection: !addSection});
    };
    
    addForum = (forumUrl) => {
        const {firebase, session} = this.props;
        
        firebase.db.ref(`authorData/${session.state.authorId}/forumData/`).push().then((data)=>{
            const forumId = data.key;
    
            let updates = {};
            updates[`authorData/${session.state.authorId}/forumList/${forumUrl}`] = forumId;
            updates[`authorData/${session.state.authorId}/forumData/${forumId}`] = {sections: false, posts: false};

            this.props.firebase.db.ref().update(updates)
                .then(() => {
                    this.setState({addedForum:true});
                })
                .catch(error => {
                    this.setState({ error });

                });
        
        }).catch(error => {
            this.setState({
                checkingExistance: false,
                loadingForum: false,
                forum: null,
                error: error
            })
        });
    };
    
    render() {
        const {author, authorId} = this.props.session.state;
        const {forumUrl, checkingExistance, loadingForum, forum, adminView} = this.state;
        
        if(checkingExistance) {
            return (
                <Animation type='fadeIn' className='container-fluid text-center w-100 text-center h1 p-2'>
                    <Fa icon="refresh" spin size="1x" fixed/> Checking Forum's existance
                </Animation>
            )
        }
        
        if(loadingForum) {
            return (
                <Animation type='fadeIn' className='container-fluid text-center w-100 text-center h1 p-2'>
                    <Fa icon="refresh" spin size="1x" fixed/> Loading Forum
                </Animation>
            )
        }
        
        if(!forum){
            return (
                <>
                    <AdminHeader reqPerm='admin|author'>
                        {adminView ?
                            <ABtn className='btn btn-dark float-right'
                                  clickFunction={() => {this.setState({adminView: false})}}>
                                Hide Controls
                            </ABtn>
                            :
                            <ABtn className='btn btn-dark float-right'
                                  clickFunction={() => {this.setState({adminView: true})}}>
                                Show Controls
                            </ABtn>
                        }
                    </AdminHeader>
                    <Animation type='fadeIn' className='w-100 text-center h1 p-2'>
                        This forum page hasn't been added yet.
                        <hr />
                        <MDBBtn>
                            <Link className='text-dark' to={`/A/${author.authorUrl}/forum/home`}>
                                main forum
                            </Link>
                        </MDBBtn>
                        <AFilter hide={!adminView}>
                            <MDBBtn onClick={()=>this.addForum(forumUrl)}>
                                Add this page to the forum?
                            </MDBBtn>
                        </AFilter>
                    </Animation>
                </>
            )
        }
        
        return (
            <>
                <AdminHeader reqPerm='admin|author'>
                    {adminView ?
                        <ABtn className='btn btn-dark float-right'
                              clickFunction={() => {this.setState({adminView: false})}}>
                            Hide Controls
                        </ABtn>
                        :
                        <ABtn className='btn btn-dark float-right'
                              clickFunction={() => {this.setState({adminView: true})}}>
                            Show Controls
                        </ABtn>
                    }
                </AdminHeader>
                <ForumSectionList {...this.state}
                                  authorId={authorId}
                                  adminView={adminView}
                                  sections={forum.sections}
                                  addedSection={this.addedSection}/>
                <ForumPostList {...this.state}
                               adminView={adminView}
                               authorId={author}
                               posts={forum.posts} />
            </>
        )
    }
    
}

export default withFirebase(withSession(Forum));