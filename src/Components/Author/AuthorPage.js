import React from 'react';
import {Route, Switch, Redirect} from 'react-router';
import {Animation, Fa} from 'mdbreact';
import {Link} from 'react-router-dom'

import AdminHeader, {ABtn} from '../Header/AdminHeader';
import Wikipedia from '../Wikipedia/Wikipedia';
import PostPage from '../Post/PostPage'
import Forum from '../Forum/Forum';
import BookList from './BookList';
import {withFirebase} from "../Firebase/index";
import {withSession} from "../Session/context";

class AuthorPage extends React.Component {
    constructor(props) {
        super(props);
        this.toggleAddBook = this.toggleAddBook.bind(this);
        this.state = {
            adminView: false,
            loadingAuthor: true,
            checkingAuthor: true,
            authorId: null,
            addBook: false
        };
    }
    
    componentDidMount() {
        this.setState({ loading: true });
        const {authorUrl} = this.props.match.params;
        
        if(!authorUrl)
            this.setState({
                author: null,
                loading: false,
            });
        
        this.props.firebase.db.ref(`authorList/${authorUrl}`).once('value', snapshot => {
            const authorId = snapshot.val();
            this.props.session.setState({
                authorId: authorId,
                activeUrl: 'author'
            });
            this.setState({checkingAuthor: false});
            
            this.authorRef = this.props.firebase.db.ref(`authorData/${authorId}/profile`);
            this.authorRef.on('value', snapshot => {
                const authorObject = snapshot.val();
        
                this.props.session.setState({
                    author: authorObject
                });
        
                this.setState({
                    author: authorObject,
                    loadingAuthor: false,
                });
            });
            
        })
        .catch(() => {
            this.setState({
                author: null,
                loading: false,
            });
        });
    }
    
    componentWillUnmount() {
        if(this.authorRef) this.authorRef.off();
        this.props.session.setState({authorId: null, author: null});
    }
    
    componentWillUpdate(nextProps, nextState){
        // if users have changed
        // console.log(this.props.session.roleCheck('admin|author|a'))
        if(nextState.addBook && (!this.props.session.roleCheck('admin|author'))){
            this.setState({addBook: false});
        }
        if(nextState.adminView && (!this.props.session.roleCheck('admin|author'))){
            this.setState({adminView: false});
        }
        if(!nextState.adminView && nextState.addBook){
            this.setState({addBook: false});
        }
    }
    
    toggleAddBook = () => {
        this.setState((prevState, props)=> {
            return {addBook: !prevState.addBook}
        });
    };
    
    render(){
        const { author, loadingAuthor, checkingAuthor, addBook, adminView } = this.state;
        const {match, session} = this.props;
        const {authorId} = session.state;
    
        if(checkingAuthor) {
            return (
                <Animation type='fadeIn' className='container-fluid text-center w-100 text-center h1 p-2'>
                    <Fa icon="refresh" spin size="1x" fixed/> Checking Author's existance
                </Animation>
            );
        }
    
        if(loadingAuthor) {
            return (
                <Animation type='fadeIn' className='container-fluid text-center w-100 text-center h1 p-2'>
                    <Fa icon="refresh" spin size="1x" fixed/> Getting Author's details
                </Animation>
            );
        }
        
        if(!authorId){
            return (
                <Animation type='fadeIn' className='w-100 text-center h1 p-2'>
                {this.props.match.params.authorUrl} doesn't exist
                    <hr />
                    <Link className='p-2 btn btn-dark mx-2 container-fluid' to={'/'}>Back to home page</Link>
                </Animation>
            )
        }
        
        if(!match.isExact) return (
            <Switch>
                {/*<Route path={`/A/${author.authorUrl}/wikipedia/:wikiUrl`} component={Wikipedia}/>*/}
                {/*<Route path={`/A/${author.authorUrl}/wikipedia/`} component={Wikipedia}/>*/}
                <Route path={`/A/:authorUrl/forum/:forumUrl/:postId`} component={PostPage}/>
                <Route path={`/A/:authorUrl/forum/:forumUrl`} component={Forum}/>
                <Route path={`/A/:authorUrl/forum/`} render={(props) => <Redirect to={`/A/${author.authorUrl}/forum/Home`}/>}/>
                <Route path='/' render={(props) => <Redirect to={`/A/${author.authorUrl}`}/>}/>
            </Switch>
        );
        
        return(
            <>
                <AdminHeader reqPerm='admin|author'>
                    {adminView ?
                        <>
                            <ABtn className='btn btn-dark float-right'
                                  clickFunction={this.toggleAddBook}>
                                {addBook ? 'Cancel' : 'Add book'}
                            </ABtn>

                            <ABtn className='btn btn-dark float-right'
                                  clickFunction={() => {this.setState({adminView: false})}}>
                                Hide Controls
                            </ABtn>
                        </>
                        :
                        <ABtn className='btn btn-dark float-right'
                              clickFunction={() => {this.setState({adminView: true})}}>
                            Show Controls
                        </ABtn>
                    }
                </AdminHeader>
                <Animation type='fadeIn'>
                    <div className='w-100 text-center h1 p-2'>
                        {author.authorTitle}
                        <hr />
                    </div>
                    <BookList {...author}
                              adminView={adminView}
                              authorId={authorId}
                              addedBook={this.toggleAddBook}
                              addBook={addBook}/>
                </Animation>
            </>
        )
    };
}

export default withFirebase(withSession(AuthorPage));