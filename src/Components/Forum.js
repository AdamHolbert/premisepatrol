import React from 'react';

class Forum extends React.Component {
    
    render() {
        return (
            <>
                {this.props.Author.Name}'s Forum.
            </>
        )
    }
    
}

export default Forum;