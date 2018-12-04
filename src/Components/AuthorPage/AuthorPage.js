import React from 'react';
import {Route, Switch, Redirect} from 'react-router';
import {Fa} from 'mdbreact';
import {Link} from 'react-router-dom'
import {Animation} from 'mdbreact'

import AdminHeader, {ABtn} from '../Header/AdminHeader';
import Wikipedia from '../Wikipedia';
import Forum from '../Forum';
import BookList from './BookList';
import {withFirebase} from "../Firebase/index";
import {withAuth} from "../Session/context";

class AuthorPage extends React.Component {
    constructor(props) {
        super(props);
        this.toggleAddBook = this.toggleAddBook.bind(this);
        this.state = {
            adminView: false,
            loading: true,
            author: null,
            addBook: false
        };
    }
    
    componentDidMount() {
        this.setState({ loading: true });
        
        this.props.firebase.author(this.props.match.params.author).on('value', snapshot => {
            const authorObject = snapshot.val();
            
            this.props.session.setState({
                author: authorObject,
                activeUrl: 'author'
            });
    
            this.setState({
                author: authorObject,
                loading: false,
            });
        });
    }
    
    componentWillUnmount() {
        this.props.firebase.author().off();
        this.props.session.setState({author: null});
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
    }
    
    toggleAddBook = () => {
        this.setState((prevState, props)=> {
            return {addBook: !prevState.addBook}
        });
    };
    
    render(){
        const { author, loading, addBook, adminView } = this.state;
        const {match} = this.props;
        
        if(loading) {
            return (
                <Animation type='fadeIn' className='container-fluid text-center w-100 text-center h1 p-2'>
                    <Fa icon="refresh" spin size="1x" fixed/> Checking Author's existance.
                </Animation>
            );
        }
        
        if(!author){
            return (
                <Animation type='fadeIn' className='w-100 text-center h1 p-2'>
                {this.props.match.params.author} doesn't exist
                    <hr />
                    <Link className='p-2 btn btn-dark mx-2 container-fluid' to={'/'}>Back to home page</Link>
                </Animation>
            )
        }
        
        if(!match.isExact) return (
            <Switch>
                <Route path={`/A/${author.authorUrl}/wikipedia`} component={Wikipedia}/>
                <Route path={`/A/${author.authorUrl}/forum`} component={Forum}/>
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
                                Hide Admin View
                            </ABtn>
                        </>
                        :
                        <ABtn className='btn btn-dark float-right'
                              clickFunction={() => {this.setState({adminView: true})}}>
                            Show Admin View
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
                              addedBook={this.toggleAddBook}
                              addBook={addBook}/>
                </Animation>
            </>
        )
    };
}

export default withFirebase(withAuth(AuthorPage));