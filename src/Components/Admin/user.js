import React, { Component } from 'react';
import { withFirebase } from '../Firebase';

const UserPage = ({id, match}) => {
    const userId = id ? id : (match && match.params) ? match.params.id : null;
    
    return (
        <>
            User
            <hr />
            <User id={userId}/>
        </>
    )
};

class UserBase extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            loading: false,
            user: null,
        };
    }
    
    componentDidMount() {
        this.setState({ loading: true });
        
        this.props.firebase.user(this.props.id).on('value', snapshot => {
            const userObject = snapshot.val();
            
            this.setState({
                user: userObject,
                loading: false,
            });
        });
    }
    
    componentWillUnmount() {
        this.props.firebase.user().off();
    }
    
    render() {
        const { user, loading } = this.state;
        
        return (
            <>
            {
                loading ?
                <div>Loading ...</div>
                :
                <UserDisplay user={user}/>
            }
            </>
        );
    }
}

const User = withFirebase(UserBase);

export const UserDisplay = ({ user }) => (
    <ul>
        {user ?
            <li key={user.uid}>
                <span>
                  <strong>ID:</strong> {user.uid}
                </span>
                <span>
                    <strong>E-Mail:</strong> {user.email}
                </span>
                <span>
                  <strong>Username:</strong> {user.username}
                </span>
            </li>
        :
            <p>Invalid user.</p>
        }
    </ul>
);

export default UserPage;