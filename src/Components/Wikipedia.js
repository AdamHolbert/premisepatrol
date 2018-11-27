import React from 'react';
import {withAuth} from "./Session/context";

class Wikipedia extends React.Component {
    
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