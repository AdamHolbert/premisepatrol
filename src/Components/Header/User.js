import React from 'react';
import {withFirebase} from "../Firebase/context";

class CRUDPost extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
        };
    }
    
    
    componentDidMount() {
        const {firebase, userId} = this.props;
        this.setState({loading: true});
        
        firebase.db.ref(`users/${userId}`).once('value', user => {
            console.log(user.val())
            this.setState({
                
                ...user.val(),
                loading:false
            });
        });
    }
    
    
    componentWillUpdate(nextProps, nextState){
        
        if(this.props.userId !== nextProps.userId){
            const {firebase, userId} = nextProps;
            this.setState({loading: true});
            firebase.db.ref(`users/${userId}`).once('value', user => {
                
                this.setState({
            
                    ...user.val(),
                    loading:false
                });
            });
        }
    }
    
    render() {
        const {loading, username} = this.state;
        
        return (
            <>
            {loading? 'loading...' : username ? this.state.username : 'invalid user'}
            </>
        )
    }
}

export default withFirebase(CRUDPost);