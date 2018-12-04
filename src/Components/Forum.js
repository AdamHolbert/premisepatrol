import React from 'react';
import {withAuth} from "./Session/context";
import AdminHeader, {ABtn} from "./Header/AdminHeader";

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
                <AdminHeader reqPerm='-'>
                    <ABtn className='btn btn-dark float-right'
                          clickFunction={null}>
        
                    </ABtn>
                </AdminHeader>
            {author.authorTitle}'s Forum.
            </>
        )
    }
    
}

export default withAuth(Forum);