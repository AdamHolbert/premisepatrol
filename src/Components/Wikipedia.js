import React from 'react';

class Wikipedia extends React.Component {
    
    render() {
        return (
            <>
                {this.props.Author.Name}'s Wikipedia.
            </>
        )
    }
    
}

export default Wikipedia;