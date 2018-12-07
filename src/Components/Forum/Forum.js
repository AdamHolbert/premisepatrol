import React from 'react';
import {withSession} from "../Session/context";
import AdminHeader, {ABtn, AFilter} from "../Header/AdminHeader";
import {Link} from "react-router-dom";
import {withFirebase} from "../Firebase/context";
import {Animation, Fa, MDBBtn} from 'mdbreact';
import FSectionList from "./FSectionList";
import FPostList from "./FPostList";

const INITIAL_STATE = {
    posts: false,
    sections: false,
    adminView: false,
    addPost: false,
    postsEnabled: true,
    addSection: false,
};

class Forum extends React.Component {
    constructor(props) {
        super(props);
        
        this.addedSection = this.addedSection.bind(this);
        this.state = {
            ...INITIAL_STATE,
            forumUrl: null,
            checkingExistance: true,
            loadingForum: true,
            forum: null,
            switchingPosts: false,
        };
    }
    
    componentDidMount() {
        this.props.session.setState({
            activeUrl: 'forum'
        });
    }
    
    componentWillUpdate(nextProps, nextState){
        const {firebase, session} = this.props;
        const newUrl = nextProps.match.params.forumUrl;
        
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
                    if(newUrl === 'Home'){
                        this.addHome();
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
    
    addedSection=()=> this.setState({addSection: !this.state.addSection});
    
    addedPost=()=> this.setState({addPost: !this.state.addPost});
    
    
    addHome = () => {
        const {firebase, session} = this.props;
        const forumUrl = 'Home';
        
        firebase.db.ref(`authorData/${session.state.authorId}/forumData/`).push().then((data)=>{
            const forumId = forumUrl + data.key;
    
            let updates = {};
            updates[`authorData/${session.state.authorId}/forumList/${forumUrl}`] = forumId;
            updates[`authorData/${session.state.authorId}/forumData/${forumId}`] =
                {forumUrl, forumTitle: 'Home', sections: false, posts: false, postsEnabled: false};

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
    
    togglePostsOnForum = () => {
        const {firebase, session} = this.props;
        const {postsEnabled, forumId} = this.state.forum;
        
        let updates = {};
        updates[`authorData/${session.state.authorId}/forumData/${forumId}/postsEnabled`] = !postsEnabled;
        this.setState({switchingPosts: true});
        firebase.db.ref().update(updates).then(() => {
            this.setState({switchingPosts: false});
        })
        .catch(error => {
            this.setState({ error,
                switchingPosts: false
            });

        })
    };
    
    render() {
        const {author, authorId} = this.props.session.state;
        const {authorUrl} = this.props.session.state.author;
        const {forumUrl, checkingExistance, loadingForum, switchingPosts, forum, adminView} = this.state;
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
                        <AFilter hide={!adminView} reqPerm={'admin|author'}>
                            <MDBBtn onClick={()=>this.addLink(forumUrl)}>
                                Add this page to the forum?
                            </MDBBtn>
                        </AFilter>
                    </Animation>
                </>
            )
        }
        const {postsEnabled} = forum;
       
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

            <div className='w-100 text-center h1 p-2'>
                {forum.forumTitle}
                <hr />
            </div>
            <FSectionList
                {...this.state}
                authorId={authorId}
                authorUrl={authorUrl}
                adminView={adminView}
                sections={forum.sections}
                addedSection={this.addedSection}/>
            <AFilter hide={!adminView} reqPerm={'admin|author'}>
                <MDBBtn disabled={switchingPosts} onClick={this.togglePostsOnForum}>
                    {postsEnabled ? 'Disable posts' : 'Enable posts'}
                </MDBBtn>
            </AFilter>
            {forum.postsEnabled &&
                <FPostList
                    {...this.state}
                    adminView={adminView}
                    authorId={authorId}
                    authorUrl={authorUrl}
                    addedPost={this.addedPost}
                    posts={forum.posts} />
            }
            </>
        )
    }
    
}

export default withFirebase(withSession(Forum));