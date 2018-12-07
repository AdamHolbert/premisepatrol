import React from 'react';
import {Fa, Row, Col, CardTitle, MDBCol, MDBRow } from 'mdbreact';

const Book = ({bookTitle, bookImg, bookDescription, loading, adminView, editFunction, deleteFunction, brokenImg, tempImg, showTempImg}) => {
    
    const isValid = bookImg && bookDescription && bookTitle && !loading;
    return(
    <>
        <MDBCol className='text-center' size={12}>
            <CardTitle disabled={loading} className='h3'>
                <strong>{bookTitle}</strong>
    
                {adminView &&
                <>
                <Fa className='text-danger m-1 clickable' onClick={deleteFunction} icon='remove' pull='right'/>
                <Fa className='text-dark m-1 clickable' onClick={editFunction} icon='edit' pull='right'/>
                </>
                }
            </CardTitle>
            <hr />
        </MDBCol>
        <div className=" w-100 d-flex justify-content-center">
            <MDBRow className='w-75'>
                <MDBCol>
                    <img
                        src={brokenImg ? tempImg : bookImg} alt={''} onError={showTempImg}
                        className="img-fluid"
                    />
                </MDBCol>
                <MDBCol lg='9' md='12' sm='12' xs='12' style={{'whiteSpace': 'pre-line'}} className='my-4'>
                    {bookDescription}
                </MDBCol>
            </MDBRow>
        </div>
    </>
)};

export default Book;