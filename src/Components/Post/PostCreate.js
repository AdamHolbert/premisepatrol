import React from 'react';
import { Input, CardTitle, Col, MDBBtn, Row } from 'mdbreact';
import tempImg from '../../tempUser.png';

const PostCreate = ({ postTitle, postDescription, loading, author, brokenImg, newBook,
                        onChange, saveChanges, showTempImg, cancel }) => (
    <>
        <Col className='text-center' size={12}>
            <CardTitle>
                <Input size='lg' label="Post Title" name='postTitle'
                          className='text-center mb-0' value={postTitle} onChange={onChange}/>
                <hr className="mt-0" />
            </CardTitle>
        </Col>
        <div className=" w-100 d-flex justify-content-center">
            <Row className='w-75'>
                <Col lg='9' md='12' sm='12' xs='12'>
                    <Input type="textarea" label="Post Description" rows="10" className='my-2'
                              name='postDescription' value={postDescription}
                              onChange={onChange}/>
                    <Row>
                        <Col size={7} className="m-0 p-0">
                            <MDBBtn className='m-1 w-100' disabled={loading}
                                    onClick={saveChanges} color='elegant'>
                                Save
    
                            </MDBBtn>
                        </Col>
                        <Col size={5} className="m-0 p-0">
                            <MDBBtn className='m-1 w-100' disabled={loading} onClick={cancel} color='danger'>
                                Cancel
                            </MDBBtn>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    </>
);
export default PostCreate;