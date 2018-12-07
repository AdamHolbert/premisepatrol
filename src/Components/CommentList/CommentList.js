import React from 'react';
import {AFilter} from "../Header/AdminHeader";
import {MDBBtn} from 'mdbreact'
import CommentCRUD from "./CommentCRUD";

const AdminControls  = ({props}) => (
    <AFilter reqPerm='admin|author|user'>
        <div className='text-center p-0 m-0'>
            <CommentCRUD
                editing={true}
                newComment={true}
                {...props}
            />
        </div>
    </AFilter>
);

const CommentList = (props) => {
    console.log(props)
    const commentList = props.comments ? Object.keys(props.comments).map(commentId => ({
        ...props.comments[commentId],
        commentId: commentId,
        
    })) : null;
    console.log(commentList)
    if(!commentList || commentList.length === 0){
        return (
            <AdminControls props={props}/>
        );
    }
    
    return(
        <>
        {
            commentList.map(comment =>
                <CommentCRUD
                    key={comment.commentId}
                    {...props}
                    comment={comment}/>
            )
        }
        <AdminControls props={props}/>
        </>
    )
};

export default CommentList;