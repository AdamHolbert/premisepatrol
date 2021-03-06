import React from 'react';
import {Route, Switch, Redirect} from 'react-router';
import {Link} from 'react-router-dom'
import {Animation} from 'mdbreact'

import {withFirebase} from "../Firebase/index";
import {withSession} from "../Session/context";

class AuthorUsers extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            loading: true,
            users: null,
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
        // const {firebase, session} = this.props;
        // const { role, user } = session.state;
        
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
                        <Route path= {'/A/' + author.authorUrl + '/wikipedia'} component={null} />
                        <Route path= {'/A/' + author.authorUrl + '/forum'} component={null} />
                        <Route path='/' render={(props) => <Redirect to={'/create'} component={AuthorUsers} />}/>
                        <Route path='/' render={(props) => <Redirect to={'/A/' + author.authorUrl} />}/>
                    </Switch>
                    :
                    <div className='w-100 text-center h1 p-2'>
                        {author.authorTitle}
                        <hr />
                    </div>
                }
            </Animation>
        )
    };
};

export default withFirebase(withSession(AuthorUsers));