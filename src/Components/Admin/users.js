import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { UserDisplay } from "./";

const UsersPage = (props) => (
    <>
        User List
        <hr />
        <Users />
    </>
);

class UsersBase extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            loading: false,
            users: [],
        };
    }
    
    componentDidMount() {
        this.setState({ loading: true });
        
        this.props.firebase.users().on('value', snapshot => {
            const usersObject = snapshot.val();
            
            const usersList = usersObject ? Object.keys(usersObject).map(key => ({
                ...usersObject[key],
                uid: key,
            })) : null;
            
            this.setState({
                users: usersList,
                loading: false,
            });
        });
    }
    
    componentWillUnmount() {
        this.props.firebase.users().off();
    }
    
    render() {
        const { users, loading } = this.state;
        
        return (
            <>
            {
                loading ?
                
                <div>Loading ...</div>
                :
                <UserList users={users}/>
            }
            </>
        );
    }
}

const Users = withFirebase(UsersBase);

const UserList = ({ users }) => (
    <ul>
        {users ?
            users.map(user => (
                <UserDisplay key={user.uid} user={user} />
            ))
            :
            <p> No users </p>
        }
    </ul>
);

export default UsersPage;