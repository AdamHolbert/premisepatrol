import React from 'react';
import { Row, Col, CardTitle, MDBCol, MDBRow } from 'mdbreact';

const Book = ({bookTitle, bookImg, bookDescription, loading, adminView, editFunction, deleteFunction, brokenImg, tempImg, showTempImg}) => {
    
    const isValid = bookImg && bookDescription && bookTitle && !loading;
    return(
    <>
        {adminView &&
        <Row className='w-100 p-0 m-0 mb-1 p-0 rounded-top unrounded-bottom'>
            <Col size={7} className="m-0 p-0">
                <div disabled={loading} className="btn btn-dark rounded-1 unrounded-right unrounded-bottom m-0 p-1 flex-center"
                     onClick={editFunction}>
                    Edit author
                </div>
            </Col>
            <Col size={5} className="m-0 p-0">
                <div disabled={loading} className="btn btn-danger rounded-1 unrounded-left unrounded-bottom m-0 p-1 flex-center"
                     onClick={deleteFunction}>
                    Delete
                </div>
            </Col>
        </Row>
        }
        <MDBCol className='text-center' size={12}>
            <CardTitle disabled={loading} className='h3'>
                <strong>{bookTitle}</strong>
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