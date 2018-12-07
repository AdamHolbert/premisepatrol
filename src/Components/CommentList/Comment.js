import React from 'react';
import User from '../Header/User'
import {Fa, Row, Col, CardTitle, MDBCol, MDBRow } from 'mdbreact';

const Post = ({commentDescription, loading, isPoster, adminView, userId, editFunction, deleteFunction, brokenImg, tempImg, showTempImg}) => {
    
    return(
    <>
        <MDBCol className='text-center' size={12}>
            <CardTitle className='h3 text-left'>
                <User userId={userId} />
                {(adminView || isPoster) &&
                <>
                <Fa className='text-danger m-1 clickable' onClick={deleteFunction} icon='remove' pull='right'/>
                <Fa className='text-dark m-1 clickable' onClick={editFunction} icon='edit' pull='right'/>
    
                </>
                }
            </CardTitle>
            <hr />
        </MDBCol>
        <p className=" w-100" style={{'whiteSpace': 'pre-line'}} >
            {commentDescription}
        </p>
    </>
)};

export default Post;