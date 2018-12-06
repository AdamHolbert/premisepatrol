import React from 'react';
import {withSession} from "../Session/context";
import AdminHeader, {ABtn} from "../Header/AdminHeader";

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
                <AdminHeader reqPerm='-'>
        
                    <ABtn className='btn btn-dark float-right'
                          clickFunction={null}>
                        
                    </ABtn>
                </AdminHeader>
                {author.authorTitle}'s Wikipedia.
            </>
        )
    }
}

export default withSession(Wikipedia);