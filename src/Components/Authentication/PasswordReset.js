import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import {MDBBtn} from 'mdbreact';

const PasswordForgetPage = () => (
    <div>
        <div className='w-100 text-center h1 p-2'>
            Forgot Password
            <hr />
        </div>
        <PasswordForgetForm />
    </div>
);

const INITIAL_STATE = {
    email: '',
    error: null,
};

class PasswordForgetFormBase extends Component {
    constructor(props) {
        super(props);
        
        this.state = { ...INITIAL_STATE };
    }
    
    onSubmit = event => {
        const { email } = this.state;
        
        this.props.firebase
            .doPasswordReset(email)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
            })
            .catch(error => {
                this.setState({ error });
            });
        
        event.preventDefault();
    };
    
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    
    render() {
        const { email, error } = this.state;
        const isInvalid = email === '';
        
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
                <div className='d-flex justify-content-end justify-content-between'>
                    <div className='flex-grow-1'>
                        {error &&
                        <MDBBtn color='white' className='text-dark' size='sm' onClick={() => this.setState({error: null})}>
                            {error.message}
                        </MDBBtn>
                        }
                    </div>
                    <MDBBtn disabled={isInvalid} color='elegant' type="submit">
                        Reset Password
                    </MDBBtn>
                </div>
            </form>
        );
    }
}

export default PasswordForgetPage;

export const PasswordForgetForm = withFirebase(PasswordForgetFormBase);