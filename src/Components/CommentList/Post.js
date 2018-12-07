import React from 'react';
import {Fa, Row, Col, CardTitle, MDBCol, MDBRow } from 'mdbreact';

const Post = ({postTitle, postDescription, loading, adminView, editFunction, deleteFunction, brokenImg, tempImg, showTempImg}) => {
    
    const isValid = postTitle && postDescription && !loading;
    return(
    <>
        {console.log(adminView)}
        <MDBCol className='text-center' size={12}>
            <CardTitle disabled={loading} className='h3'>
                <strong>{postTitle}</strong>
    
                {adminView &&
                <>
                {/*<Fa className='text-danger m-1 clickable' onClick={deleteFunction} icon='remove' pull='right'/>*/}
                <Fa className='text-dark m-1 clickable' onClick={editFunction} icon='edit' pull='right'/>
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