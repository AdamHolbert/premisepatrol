import React from 'react';
import {withAuth} from "./Session/context";

class Wikipedia extends React.Component {
    
    componentDidMount() {
        this.props.session.setState({
            activeUrl: 'wiki'
        });
    }
    componentWillUnmount(){
        this.props.session.setState({
            activeUrl: 'author'
        });
    }
    
    render() {
        const {author} = this.props.session.state;
        
        return (
            <>
                {author.username}'s Wikipedia.
            </>
        )
    }
    
}

export default withAuth(Wikipedia);