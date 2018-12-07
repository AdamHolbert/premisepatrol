import React from 'react';
import { Card, Input, Fa } from 'mdbreact';
import CRUDBook from './CommentCrud';
import {withFirebase} from "../Firebase/context";
import {withSession} from "../Session/context";
import AdminHeader, {ABtn} from "../Header/AdminHeader";

class PostPage extends React.Component {
    constructor(props) {
        super(props);
        this.editToggle = this.editToggle.bind(this);
        
        this.state = {
            loading: true,
        };
    }
    
    componentDidMount() {
        this.props.session.setState({
            activeUrl: 'forum'
        });
        this.setState({loading: true});
        const {authorUrl, forumUrl, postId} = this.props.match.params;
        const {firebase} =  this.props;
        firebase.db.ref(`authorList/${authorUrl}`).once('value', author => {
            if(author.exists()) {
                const authorId = author.val();
                firebase.db.ref(`authorData/${authorId}/forumList/${forumUrl}`).once('value', forum => {
                    if (forum.exists()) {
                        const forumId = forum.val();
                        firebase.db.ref(`authorData/${authorId}/forumData/${forumId}/postsEnabled`).once('value', enabled => {
                            if(enabled.val()){
                                this.setState({
                                    loading: false,
                                    forumUrl,
                                    authorUrl,
                                    authorId,
                                    forumId,
                                    postId,
                                })
                            } else {
                                this.setState({loading: false, error:{message:"Posts on this forum are not enabled."}})
                            }
                        });
                    } else {
                        this.setState({loading: false, error:{message:"Couldn't load the forum..."}})
                    }
                });
            } else {
                this.setState({loading: false, error:{message:"Couldn't load the author..."}})
            }
        });
    }
    
    componentWillUpdate(nextProps, nextState){
        
        // if users have changed
        if(nextState.adminView && (!this.props.session.state.role || !this.props.session.roleCheck('admin|author'))){
            this.setState({adminView: false});
        }
    }
    componentWillUnmount() {
        this.props.session.setState({
            activeUrl: 'author'
        });
    }
    
    editToggle = () => this.setState({editing: !this.state.editing});
    
    render() {
        const {loading, error, adminView} = this.state;
    
        if(loading) {
            return (
                <div className='container-fluid text-center h1'>
                    <Fa icon="refresh" spin size="1x" fixed/> Loading Post...
                </div>
            );
        }
        
        if(error) {
            return (
                <div className='container-fluid text-center h1'>
                    {error.message}
                </div>
            );
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
            <CRUDBook
                {...this.state}/>
            </>
        )
    }
}

export default withSession(withFirebase(PostPage));