import React from 'react';
import {withAuth} from "./Session/context";

class Forum extends React.Component {
    
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