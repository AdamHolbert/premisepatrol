import React from 'react';
import { Input, CardTitle, Col, MDBBtn, Row } from 'mdbreact';
import tempImg from '../../tempUser.png';

const ITEMCreate = ({ ITEMTitle, ITEMImg, ITEMDescription, loading, author, brokenImg, newITEM,
                        onChange, createNewITEM, saveChanges, showTempImg, cancel }) => (
    <>
        <Col className='text-center' size={12}>
            <CardTitle>
                <Input size='lg' label="Book Title" name='bookTitle'
                       className='text-center mb-0' value={ITEMTitle} onChange={onChange}/>
                <hr className="mt-0" />
            </CardTitle>
        </Col>
        <div className=" w-100 d-flex justify-content-center">
            <Row className='w-75'>
                <Col>
                    <img
                        className="img-fluid"
                        src={brokenImg ? tempImg : ITEMImg} alt={''} onError={showTempImg}
                    />
                </Col>
                <Col lg='9' md='12' sm='12' xs='12'>
                    <Input type="textarea" label="Book Description" rows="10" className='my-2'
                              name='bookDescription' value={ITEMDescription}
                              onChange={onChange}/>

                    <Input label="Image URL" rows="5"
                              name='bookImg' className='mt-3' value={ITEMImg}
                              onChange={onChange}/>
                    <Row>
                        <Col size={7} className="m-0 p-0">
                            <MDBBtn className='m-1 w-100' disabled={loading}
                                    onClick={newITEM ? createNewITEM : saveChanges} color='elegant'>
                                {newITEM ? 'Create new book' : 'Save'}
    
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
export default ITEMCreate;