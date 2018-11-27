import React from 'react';
import {Redirect} from 'react-router-dom'

class ErrorPage extends React.Component {
    
    render(){
        
        return(
            <>
                <Redirect to='/'/>
            </>
        )
    };
};

export default ErrorPage;
