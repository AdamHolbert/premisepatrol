import React from 'react';
import {AFilter} from "../Header/AdminHeader";
import {MDBBtn} from 'mdbreact'
import CommentCRUD from "./CommentCrud";

const AdminControls  = ({props}) => (
    <AFilter reqPerm='admin|author' hide={!props.adminView}>
        <div className='text-center p-0 m-0'>
            {
                props.addLink &&
                <CommentCRUD
                    {...props}
                    newLink={true}
                    addedLink={props.addedLink} />
            }
        </div>
    </AFilter>
);

const CommentList = (props) => {
    
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
                <CommentCRUD
                    key={forumId.forumId}
                    linkForumId={forumId.forumId}
                    {...props} />
            )
        }
        </>
    )
};

export default CommentList;