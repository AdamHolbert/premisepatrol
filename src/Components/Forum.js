import React from 'react';
import {withAuth} from "./Session/context";

class Forum extends React.Component {
    
    componentDidMount() {
        this.props.session.setState({
            activeUrl: 'forum'
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
            {author.username}'s Forum.
            </>
        )
    }
    
}

export default withAuth(Forum);