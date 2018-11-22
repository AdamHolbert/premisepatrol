import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

const RegisterPage = () => (
    <>
        <div className='w-100 text-center h1 p-2'>
            Register here
            <hr />
        </div>
        <RegisterForum />
        <SignUpLink />
    </>
);

const SignUpLink = () => (
    <p>
        Don't have an account? <Link to='/register'>Sign Up</Link>
    </p>
);
class RegisterForumBase extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {...INITIAL_STATE}
    }
    
    onSubmit = event => {
        const { username, email, passwordOne } = this.state;
        
        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                this.setState({...INITIAL_STATE});
                this.props.history.push("/");
            })
            .catch(error => {
               this.setState({ error })
            });
        event.preventDefault();
    };
    
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    
    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;
    
        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';
        
        return (
            <>
                <form onSubmit={this.onSubmit}>
                    <input
                        name="username"
                        value={username}
                        onChange={this.onChange}
                        type="text"
                        placeholder="Full Name"
                    />
                    <input
                        name="email"
                        value={email}
                        onChange={this.onChange}
                        type="text"
                        placeholder="Email Address"
                    />
                    <input
                        name="passwordOne"
                        value={passwordOne}
                        onChange={this.onChange}
                        type="password"
                        placeholder="Password"
                    />
                    <input
                        name="passwordTwo"
                        value={passwordTwo}
                        onChange={this.onChange}
                        type="password"
                        placeholder="Confirm Password"
                    />
                    <button disabled={isInvalid} type="submit">Sign Up</button>
        
                    {error && <p>{error.message}</p>}
                </form>
            </>
        )
    }
}

const RegisterForum =  compose(
    withRouter,
    withFirebase,
)(RegisterForumBase);

export default RegisterPage;