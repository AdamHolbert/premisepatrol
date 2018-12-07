import React from 'react';
import User from '../Header/User'
import {Fa, Row, MDBBtn, CardTitle, MDBCol, Input } from 'mdbreact';

const Post = ({postTitle, postDescription, loading, adminView, commentsToggle, commentsEnabled, togglingComments,
                  editFunction, deleteFunction, brokenImg, tempImg, showTempImg, poster}) => {
    
    const isValid = postTitle && postDescription && !loading;
    return(
    <>
        <MDBCol className='' size={12}>
            <CardTitle disabled={loading} className='h3'>
                <strong>{postTitle}</strong> - <User userId={poster} />
                
                {adminView &&
                <>
                    <Fa className='text-danger m-1 clickable' onClick={deleteFunction} icon='remove' pull='right'/>
                    <Fa className='text-dark m-1 clickable' onClick={editFunction} icon='edit' pull='right'/>
                    
                    <MDBBtn disabled={togglingComments} onClick={commentsToggle} className='float-right p-1 m-1'>
                        {commentsEnabled ? 'Disable Comments' : 'Enable Comments'}
                    </MDBBtn>
                </>
                }
            </CardTitle>
            <hr />
        </MDBCol>
        <p className=" w-100" style={{'whiteSpace': 'pre-line'}} >
            {postDescription}
        </p>
    </>
)};

export default Post;