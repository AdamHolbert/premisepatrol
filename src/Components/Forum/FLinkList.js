import React from 'react';
import {AFilter} from "../Header/AdminHeader";
import {MDBBtn} from 'mdbreact'
import FLinkCRUD from "./FLinkCRUD";

const AdminControls  = ({props}) => (
    <AFilter reqPerm='admin|author' hide={!props.adminView}>
        <div className='text-center p-0 m-0'>
            {
                props.addLink &&
                    <FLinkCRUD
                        {...props}
                        newLink={true}
                        addedLink={props.addedLink} />
            }
        </div>
    </AFilter>
);

const FLinkList = (props) => {
    
    const forumList = props.forumIds ? Object.keys(props.forumIds).map(forumId => ({
        ...props.forumIds[forumId],
        forumId: forumId,
    })) : null;
    
    if(!forumList || forumList.length === 0){
        return (
            <AdminControls props={props}/>
        );
    }
    
    return(
        <>
            <AdminControls props={props}/>
            {
                forumList.map(forumId =>
                    <FLinkCRUD
                        key={forumId.forumId}
                        linkForumId={forumId.forumId}
                        {...props} />
                )
            }
        </>
    )
};

export default FLinkList;