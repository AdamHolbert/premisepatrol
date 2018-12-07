import React from 'react';
import { Input, CardTitle, Fa, MDBBtn, Row, Col } from 'mdbreact';

const FLinkCreate = ({ forumTitle, newLink, loading, errorMessage,
                        onChange, createNewLink, saveChanges, cancel, removeError }) => (
    <>
        <Row className='m-0 rgba-grey-light rounded text-body'>
            <Col size={12}>
                <Row>
                    <CardTitle className='flex-grow-1 m-0 px-4 mt-3'>
                        <Row>
                            <Col size={6}>
                                <Input  label="Forum Name" name='forumTitle'
                                        labelClass='text-dark mt-1 mb-0 font-weight-bold' containerClass='m-0'
                                        className='m-0 p-0 pt-2 pb-1' value={forumTitle.toLowerCase().split(' ')
                                    .map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')} onChange={onChange}/>
                            </Col>
                            <Col size={6}>
                                <Input  label="Forum URL" name='forumTitle' disabled
                                        labelClass='text-dark mt-1 mb-0 font-weight-bold' containerClass='m-0'
                                        className='m-0 p-0 pt-2 pb-1 border-0' value={forumTitle.toLowerCase().split(' ')
                                    .map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join('')} onChange={onChange}/>
                            </Col>
                        </Row>
                    </CardTitle>
                    <MDBBtn disabled={loading} color='danger' className='m-0 unrounded-right p-2 m-1 my-2' onClick={cancel}>
                        <Fa size='2x' className='dark-grey-text m-0 p-0 px-1' icon='remove' pull='right'/>
                    </MDBBtn>
                    <MDBBtn disabled={!forumTitle || loading} className='m-0 unrounded-left p-2 m-2' onClick={
                        newLink ?
                            createNewLink :
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
export default FLinkCreate;