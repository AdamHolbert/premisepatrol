import React from 'react';
import {Link} from 'react-router-dom';

import SignInPage from './Authentication/SignInPage'
import RegisterPage from './Authentication/RegisterPage'
import PasswordForgetPage from './Authentication/PasswordReset'
import {withAuth} from "./Session"
import {withFirebase} from "./Firebase";

const AuthPopout = (props) => {
    const {expanded, tab, setTab, user} = props;
    // const {user} = props.session.state;
    
    if(!expanded || user) {
        return null;
    }
    
    return (
        <div className='container w-75 rounded-bottom text-center bg-secondary bg-secondary-darker p-3 mb-2'>
            <ul className='nav nav-tabs justify-content-center'>
                <div className={'nav-item nav-link unselectable-text mx-1' + (tab === 'register' ? ' active' : '')}
                     onClick={() => setTab('register')}>Register
                </div>
                <div className={'nav-item nav-link unselectable-text mx-1' + (tab === 'login' ? ' active' : '')}
                     onClick={() => setTab('login')}>Login
                </div>
                <div className={'nav-item nav-link unselectable-text mx-1' + (tab === 'forgot' ? ' active' : '')}
                     onClick={() => setTab('forgot')}>Forgot password
                </div>
            </ul>
            {tab === 'register' && <RegisterPage/>}
            {tab === 'login' && <SignInPage/>}
            {tab === 'forgot' && <PasswordForgetPage/>}
        </div>
    );
};

const INITIAL_STATE = {
    expanded: false,
    tab: 'login',
};

class Header extends React.Component {
    
    constructor() {
        super();
        this.collapse = this.collapse.bind(this);
        this.expand = this.expand.bind(this);
        this.logout = this.logout.bind(this);
        this.setTab = this.setTab.bind(this);
        this.state = {...INITIAL_STATE};
    }
    
    render() {
        const { expanded, tab } = this.state;
        const { user, loading, author } = this.props.session.state;
        return (
            <>
                <header className='container-fluid bg-secondary row m-0 p-2 border-bottom border-dark'>
                    <div className='p-0 col text-left'>
                        <Link className='p-2 btn btn-dark' to='/'>Home</Link>
                    </div>
                    <nav className='p-0 col-6 justify-content-start'>
                        {
                            author && author.urlName && author.username
                                &&
                            <>
                                <Link className='p-2 btn btn-dark mx-2' to={'/A/' + author.urlName}>{author.username}'s Page</Link>
                                <Link className='p-2 btn btn-dark mx-2' to={'/A/' + author.urlName + '/wikipedia'}>Wikipedia</Link>
                                <Link className='p-2 btn btn-dark mx-2' to={'/A/' + author.urlName + '/forum'}>Forum</Link>
                            </>
                        }
                    </nav>
                    <div className='p-0 col text-right'>
                        {loading ?
                            <div className='p-2 btn btn-dark mx-2'>
                                 Loading...
                            </div>
                            :
                            <div className='p-2 btn btn-dark mx-2'
                            onClick={user ?
                            this.logout
                            :
                            expanded ?
                                this.collapse
                                :
                                this.expand}>
                            {user ?
                                user.email
                                :
                                expanded ?
                                    "CLOSE"
                                    :
                                    "LOGIN"
                            }
                            </div>
                        }
                    </div>
                </header>
                <AuthPopout expanded={expanded} user={user} tab={tab} setTab={this.setTab}/>
            </>
        )
    }
    
    collapse() { this.setState({expanded: false}) }
    expand() { this.setState({expanded: true}) }
    setTab(text) { this.setState({tab: text}) }
    
    logout() {
        this.props.firebase.doSignOut()
            .then(() => {
                this.setState({ ...INITIAL_STATE });
            })
            .catch(error => {
                this.setState({ error: error, loading: false });
            });
    }
}

export default withFirebase(withAuth(Header));