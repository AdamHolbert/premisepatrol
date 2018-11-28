import React from 'react';
import {Route, Switch, Redirect} from 'react-router';
import {Link} from 'react-router-dom'
import {Animation} from 'mdbreact'

import Wikipedia from '../Wikipedia';
import Forum from '../Forum';
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
        const {author, loading} = this.state;
        if(loading) {
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
                    <Route path= {'/A/' + author.urlName + '/wikipedia'} component={Wikipedia} />
                    <Route path= {'/A/' + author.urlName + '/forum'} component={Forum} />
                    <Route path='/' render={(props) => <Redirect to={'/A/' + author.urlName} />}/>
                </Switch>
                :
                <div className='w-100 text-center h1 p-2'>
                    {author.username}
                    <hr />
                </div>
            }
            </Animation>
        )
    };
};

export default withFirebase(withAuth(AuthorPage));