import React from 'react';
import {Route, Switch, Redirect} from 'react-router';
import {Link} from 'react-router-dom'
import {Animation} from 'mdbreact'

import Wikipedia from '../Wikipedia';
import Forum from '../Forum';
import BookList from './BookList';
import AuthorUsers from './AuthorUsers'
import BookCreatePage from './BookCreatePage'
import {withFirebase} from "../Firebase/index";
import {withAuth} from "../Session/context";

class AuthorPage extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            loading: true,
            author: null,
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
    
    render(){
        
        const { author, loading } = this.state;
        const {session} = this.props;
        const { role } = session.state;
        
        if(loading || session.state.loading) {
            return (
                <Animation type='fadeIn' className='container-fluid text-center h1'>
                    Loading Author page...
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
        
        return(
            <Animation type='fadeIn'>
            {!this.props.match.isExact ?
                <Switch>
                    <Route path= {`/A/${author.authorUrl}/wikipedia`} component={null} />
                    <Route path= {`/A/${author.authorUrl}/forum`} component={null} />
                    {role && role.match(/^(admin|author)$/) &&
                        <>
                        <Route path={`/A/${author.authorUrl}/create`} component={AuthorUsers}/>
                        <Route path={`/A/${author.authorUrl}/book/create`} component={BookCreatePage}/>
                        </>
                    }
                    <Route path='/' render={(props) => <Redirect to={`/A/${author.authorUrl}`} />}/>
                </Switch>
                :
                <>
                    <div className='w-100 text-center h1 p-2'>
                        {author.authorTitle}
                        {
                            role && role.match(/^(admin|author)$/) &&
                            <div className='btn btn-dark float-right '
                                to={`/A/${author.authorUrl}/book/create`}>
                                Add book
                            </div>
                        }
                        <hr />
                    </div>
                    <BookList books={author.books} author={author} />
                </>
            }
            </Animation>
        )
    };
};

export default withFirebase(withAuth(AuthorPage));