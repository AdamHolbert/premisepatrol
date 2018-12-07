import React from 'react';
import { Input, CardTitle, Col, Fa, Row } from 'mdbreact';
import tempImg from '../../tempUser.png';

const BookCreate = ({ bookTitle, bookImg, bookDescription, loading, author, brokenImg, newBook,
                        onChange, createNewBook, saveChanges, showTempImg, cancel }) => (
    <>
        <Col className='text-center' size={12}>
            <CardTitle>
                <Row>
                    <Input size='lg' label="Book Title" name='bookTitle' containerClass='flex-grow-1 m-0'
                           className='text-center mb-0' value={bookTitle} onChange={onChange}/>
                    <Fa className='text-danger m-1 clickable' onClick={cancel} icon='remove' pull='right'/>
                    <Fa className='text-dark m-1 clickable' onClick={saveChanges} icon='save' pull='right'/>
                </Row>
                <hr className="mt-0" />
            </CardTitle>
        </Col>
        <div className=" w-100 d-flex justify-content-center">
            <Row className='w-75'>
                <Col>
                    <img
                        className="img-fluid"
                        src={brokenImg ? tempImg : bookImg} alt={''} onError={showTempImg}
                    />
                </Col>
                <Col lg='9' md='12' sm='12' xs='12'>
                    <Input type="textarea" label="Book Description" rows="10" className='my-2'
                              name='bookDescription' value={bookDescription}
                              onChange={onChange}/>

                    <Input label="Image URL" rows="5"
                              name='bookImg' className='mt-3' value={bookImg}
                              onChange={onChange}/>
                </Col>
            </Row>
        </div>
    </>
);
export default BookCreate;