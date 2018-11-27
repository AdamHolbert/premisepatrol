import React from 'react';
import {withAuth} from "../Session";
import {withFirebase} from "../Firebase/context";

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
    loading: true,
};

const RegisterPage = () => (
    <>
        <div className='w-100 text-center h1 p-2'>
            Register here
            <hr />
        </div>
        <RegisterForum />
    </>
);

class RegisterForumBase extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {...INITIAL_STATE}
    }
    
    onSubmit = event => {
        const { username, email, passwordOne } = this.state;
        this.setState({loading: true});
        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                
                // Create a user in your Firebase realtime database
                this.props.firebase
                    .user(authUser.user.uid)
                    .set({
                        username,
                        email
                    })
                    .catch(error => {
                        this.setState({ error });
                        this.props.firebase.deleteUser();
                    });
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
        const { username, email, passwordOne, passwordTwo, error, loading} = this.state;
        const isInvalid = false; // passwordOne !== passwordTwo || passwordOne === '' || email === '' || username === '';
        
        return (
            <>
                <form onSubmit={this.onSubmit}>
                    <div className="input-group input-group-sm mb-1">
                        <div className="input-group-prepend">
                            <span className="input-group-text" style={{'minWidth': '130px'}} id="inputGroup-sizing-sm">Username</span>
                        </div>
                        <input name="username"
                               value={username}
                               onChange={this.onChange}
                               className='form-control mb-1'
                               type="text"
                               placeholder="Full Name"
                               aria-label="Sizing example input"
                               aria-describedby="inputGroup-sizing-sm" />
                    </div>
                    <div className="input-group input-group-sm mb-1">
                        <div className="input-group-prepend">
                            <span className="input-group-text" style={{'minWidth': '130px'}} id="inputGroup-sizing-sm">Email</span>
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
                        <div className="input-group-prepend">
                            <span className="input-group-text" style={{'minWidth': '130px'}} id="inputGroup-sizing-sm">Password</span>
                        </div>
                        <input name="passwordOne"
                               value={passwordOne}
                               onChange={this.onChange}
                               className='form-control mb-1'
                               type="password"
                               placeholder="Password"
                               aria-label="Sizing example input"
                               aria-describedby="inputGroup-sizing-sm" />
                    </div>
                    <div className="input-group input-group-sm mb-1">
                        <div className="input-group-prepend w-10">
                            <span className="input-group-text" style={{'minWidth': '130px'}} id="inputGroup-sizing-sm">Confirm Password</span>
                        </div>
                        <input name="passwordTwo"
                               value={passwordTwo}
                               onChange={this.onChange}
                               className='form-control mb-1'
                               type="password"
                               placeholder="Confirm Password"
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
                        <button disabled={isInvalid || loading} className='btn btn-outline-l flex-shrink-1' type="submit">Sign Up</button>
                    </div>
                </form>
            </>
        )
    }
}

const RegisterForum = withFirebase(withAuth(RegisterForumBase));

export default RegisterPage;