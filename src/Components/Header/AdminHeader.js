import React from 'react';
import {MDBBtn} from 'mdbreact'
import {withSession} from "../Session/context";

export const ALabel = (props) => (
    <AFilter reqPerm={props.reqPerm}>
        <div className='btn btn-dark p-1 m-0 unrounded-top m-0'>
            {props.children}
        </div>
    </AFilter>
);

export const ABtn = (props) => (
    <AFilter reqPerm={props.reqPerm}>
        <MDBBtn className='m-0 mx-1 p-0 color flex-center'
             onClick={props.clickFunction}>
            <ALabel>
                {props.children}
            </ALabel>
        </MDBBtn>
    </AFilter>
);

const AFilterBase = (props) => {
    const { hide, session, reqPerm } = props;
    if(hide) return null;
    if(reqPerm && !session.roleCheck(reqPerm)) return null;
    
    return (
        <>
            {props.children}
        </>
    );
};

export const AFilter = withSession(AFilterBase);

class AdminHeader extends React.Component {
    
    render () {
        
        return(
            <AFilter reqPerm={this.props.reqPerm}>
                <div className='d-flex flex-row justify-content-end rgba-grey-strong pb-1 px-3 mb-1 mx-2 rounded-bottom' >
                    {this.props.children}
                </div>
            </AFilter>
        )
    }
}

export default AdminHeader;