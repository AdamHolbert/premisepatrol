import React, { Component } from 'react';
import {withAuth} from "../Session";
import {withFirebase} from "../Firebase/context";

const SignInPage = () => (
    <>
        <div className='w-100 text-center h1 p-2'>
            Login
            <hr />
        </div>
        <SignInForm />
    </>
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
        
        this.state = {...INITIAL_STATE};
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
    
    render() {
        const { email, password, error, loading } = this.state;
        const user = this.props.user;
       
        const isInvalid = password === '' || email === '' || user || loading;
        const btnText = user ? "Already Logged in" : loading ? "loading..." : "Sign In";
        
        return (
            <form onSubmit={this.onSubmit}>
                <div className="input-group input-group-sm mb-1">
                    <div className="input-group-prepend w-10">
                        <span className="input-group-text" style={{'minWidth': '130px'}} id="inputGroup-sizing-sm">Email Address</span>
                    </div>
                    <input name="email"
                           value={email}
                           onChange={this.onChange}
                           className='form-control mb-1'
                           type="text"
                           placeholder="Email Address"
                           aria-label="Sizing example input"
                           aria-describedby="inputGroup-sizing-sm" />
                </div>
                <div className="input-group input-group-sm mb-1">
                    <div className="input-group-prepend w-10">
                        <span className="input-group-text" style={{'minWidth': '130px'}} id="inputGroup-sizing-sm">Password</span>
                    </div>
                    <input name="password"
                           value={password}
                           onChange={this.onChange}
                           className='form-control mb-1'
                           type="password"
                           placeholder="Password"
                           aria-label="Sizing example input"
                           aria-describedby="inputGroup-sizing-sm" />
                </div>
                <div className='d-flex justify-content-end justify-content-between'>
                    <div className='flex-grow-1'>
                        {error &&
                            <button type="button" className="text-light align-self-center bg-secondary rounded text-uppercase d-inline" onClick={() => this.setState({error: null})}>
                                {error.message}
                            </button>
                        }
                    </div>
                    <button disabled={isInvalid || loading} className='btn btn-outline-l flex-shrink-1' type="submit">
                        {btnText}
                    </button>
                </div>
            </form>
        );
    }
}

const SignInForm = withAuth(withFirebase(SignInFormBase));

export default SignInPage;

export { SignInForm };