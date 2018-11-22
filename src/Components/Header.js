import React from 'react';
import {Link} from 'react-router-dom';
import { withFirebase} from "./Firebase/context";

import SignInPage from './Authentication/SignInPage'
import RegisterPage from './Authentication/RegisterPage'

const INITIAL_STATE = {
    expanded: false,
    register: false,
};

class Header extends React.Component {
    
    constructor() {
        super();
        this.logout = this.logout.bind(this);
        this.close = this.close.bind(this);
        this.expand = this.expand.bind(this);
        this.signIn = this.signIn.bind(this);
        this.switch = this.switch.bind(this);
        this.state = {...INITIAL_STATE};
    }
    
    render() {
        const { expanded, register } = this.state;
        const loggedIn = this.props.firebase.loggedIn();
        
        return (
            <>
                <header className='container-fluid bg-secondary row m-0 p-2 border-bottom border-dark'>
                    <div className='p-0 col text-left'>
                        <Link className='p-2 btn btn-dark' to='/'>Home</Link>
                    </div>
                    <nav className='p-0 col-6 justify-content-start'>
                        {
                            this.props.Author
                                &&
                            <>
                                <Link className='p-2 btn btn-dark mx-2' to={'/' + this.props.Author.URLName}>{this.props.Author.Name}'s Page</Link>
                                <Link className='p-2 btn btn-dark mx-2' to={'/' + this.props.Author.URLName + '/wikipedia'}>Wikipedia</Link>
                                <Link className='p-2 btn btn-dark mx-2' to={'/' + this.props.Author.URLName + '/forum'}>Forum</Link>
                            </>
                        }
                    </nav>
                    <div className='p-0 col text-right'>
                    
                        <div className='p-2 btn btn-dark mx-2'
                             onClick={loggedIn ?
                                 this.logout
                                 :
                                 expanded ?
                                     this.close
                                     :
                                     this.expand}>
                            {loggedIn ?
                                "LOG OUT"
                                :
                                expanded ?
                                    "CLOSE"
                                    :
                                    "LOGIN"
                            }
                        </div>
                    </div>
        
                </header>
        
                {expanded && !loggedIn &&
                    <div className='container w-75 rounded-bottom text-center bg-secondary bg-secondary-darker p-3 mb-2'>
                        <ul className='nav nav-tabs justify-content-center'>
                            <div className={'nav-item nav-link' + (register ? ' active' : '')} onClick={() => this.setState({register:true})}>Register</div>
                            <div className={'nav-item nav-link' + (!register ? ' active' : '')} onClick={() => this.setState({register:false})}>Login</div>
                        </ul>
                        {register ?
                            <RegisterPage />
                            :
                            <SignInPage />
                        }
                    </div>
                }
            </>
        )
    }
    
    close() { this.setState({expanded: false}) }
    expand() { this.setState({expanded: true}) }
    
    signIn() {
        this.setState({
            expanded: false
        })
    }
    logout() {
        this.props.firebase.doSignOut()
            .then(() => {
                this.setState({ ...INITIAL_STATE });
            })
            .catch(error => {
                this.setState({ error: error, loading: false });
            });
    }
    switch() {
        const register = this.state;
        this.setState({register: !register})
    }
    
}

export default withFirebase(Header);