import React from 'react';
import User from '../Header/User'
import { Input, CardTitle, Col, MDBBtn, Row, Fa } from 'mdbreact';
import tempImg from '../../tempUser.png';

const PostCreate = ({ postTitle, postDescription, loading, author, brokenImg, newBook,
                        onChange, saveChanges, showTempImg, cancel, poster}) => (
    <>
        <Col className='text-center' size={12}>
            <CardTitle>
                <Row>
                    <Input size='lg' label="Post Title" name='postTitle' containerClass='flex-grow-1 m-0'
                           className='text-center mb-0' value={postTitle} onChange={onChange}/>
                    <Fa className='text-danger m-1 clickable' onClick={cancel} icon='remove' pull='right'/>
                    <Fa className='text-dark m-1 clickable' onClick={saveChanges} icon='save' pull='right'/>
                </Row>
                <hr className="mt-0" />
            </CardTitle>
        </Col>
        <div className=" w-100 d-flex justify-content-center">
            <Row className='w-75 flex-grow-1'>
                <Input
                    type="textarea" label="Post Description" rows="10" className='my-2'
                    containerClass='flex-grow-1 m-2' labelClass='mt-2'
                    name='postDescription' value={postDescription}
                    onChange={onChange}/>
            </Row>
        </div>
        <div className="text-right">
            - <User userId={poster} />
        </div>
    </>
);
export default PostCreate;