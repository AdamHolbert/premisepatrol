import React from 'react';
import {AFilter} from "../Header/AdminHeader";
import {MDBBtn} from 'mdbreact'
import FPostCRUD from './FPostCRUD'

const AdminControls  = ({props}) => (
    <AFilter reqPerm={'admin|author|user'}>
    {props.addPost ?
        <FPostCRUD
            {...props}
            newPost={true}
            addedPost={props.addedPost} />
        :
        <MDBBtn className='flex-center' onClick={props.addedPost}>
            Add post
        </MDBBtn>
    }
    <hr className="m-0 p-0"/>
    </AFilter>
);

const FPostList = (props) => {
    
    const postList = props.posts ? Object.keys(props.posts).map(postId => ({
        ...props.posts[postId],
        postId: postId,
    })) : null;
    
    return(
        <div className="m-4 p-2 bg-white rounded">
            <AdminControls props={props}/>
            {!postList || postList.length === 0 ?
                <div className='text-center h1 p-2'>
                    <div className='w-auto h1 mx-4 alert alert-light'>
                        No posts have been added for <strong>{props.forum.forumTitle}</strong> yet.
                    </div>
                </div>
                :
                postList.map(post =>
                    <FPostCRUD
                        key={post.postId}
                        postId={post.postId}
                        {...props} />
                )
            }
        </div>
    )
};

export default FPostList;