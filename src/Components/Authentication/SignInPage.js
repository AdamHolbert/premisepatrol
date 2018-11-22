import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';

const SignInPage = () => (
    <div>
        <h1>SignIn</h1>
        <SignInForm />
    </div>
);

const INITIAL_STATE = {
    email: '',
    password: '',
    loading: false,
    error: null,
};

class SignInFormBase extends Component {
    constructor(props) {
        super(props);
        
        this.state = { ...INITIAL_STATE };
    }
    
    onSubmit = event => {
        const { email, password } = this.state;
        this.setState({loading: true});
        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
            })
            .catch(error => {
                this.setState({ error: error, loading: false });
            });
        
        event.preventDefault();
    };
    
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    
    signedIn() {
        return this.props.firebase.loggedIn()
    }
    
    render() {
        const { email, password, error, loading } = this.state;
        
        const isInvalid = password === '' || email === '';
        
        return (
            <form onSubmit={this.onSubmit}>
                <input
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email Address"
                />
                <input
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Password"
                />
                <button disabled={isInvalid || loading || this.signedIn()} type="submit">
                    {this.signedIn() ?
                        "Logged in" :
                        loading ?
                            "loading" :
                            "Sign In"
                    }
                </button>
                
                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

const SignInForm = compose(
    withRouter,
    withFirebase,
)(SignInFormBase);

export default SignInPage;

export { SignInForm };