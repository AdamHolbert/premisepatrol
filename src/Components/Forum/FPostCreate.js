import React from 'react';
import { Input, CardTitle, Fa, MDBBtn, Row, Col } from 'mdbreact';

const FPostCreate = ({ postTitle, newPost, loading, errorMessage,
                        onChange, createNewPost, saveChanges, cancel, removeError }) => (
    <>
        <Row className='m-0 rgba-grey-light rounded text-body'>
            <Col size={12}>
                <Row>
                    <CardTitle className='flex-grow-1 m-0 px-4 mt-3'>
                        <Input  label="Post Title" name='postTitle'
                                labelClass='text-dark mt-1 mb-0 font-weight-bold' containerClass='m-0'
                                className='m-0 p-0 pt-2 pb-1' value={postTitle} onChange={onChange}/>
                            
                    </CardTitle>
                    <MDBBtn disabled={loading} color='danger' className='m-0 unrounded-right p-2 m-1 my-2' onClick={cancel}>
                        <Fa size='2x' className='dark-grey-text m-0 p-0 px-1' icon='remove' pull='right'/>
                    </MDBBtn>
                    <MDBBtn disabled={!postTitle || loading} className='m-0 unrounded-left p-2 m-2' onClick={
                        newPost ?
                            createNewPost :
                            saveChanges} >
                        <Fa size='2x' className='dark-grey-text m-1' icon='save' pull='right'/>
                    </MDBBtn>
                </Row>
            </Col>
            {errorMessage &&
                <Col size={12} className='m-0 p-0' onClick={removeError}>
                    <hr className="m-0 p-0" />
                    <div className='text-danger text-left p-0 col-0 pt-1 pb-2 pl-5'>
                    Error: {errorMessage}
                    </div>
                </Col>
            }
        </Row>
    </>
);
export default FPostCreate;