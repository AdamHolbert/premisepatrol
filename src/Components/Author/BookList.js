import React from 'react';
import {withFirebase} from "../Firebase/context";
import {Animation} from 'mdbreact'
import {withAuth} from "../Session/context";
import {withRouter} from 'react-router';
import { Card, CardBody, CardTitle, CardText, MDBCol, MDBRow, Fa } from 'mdbreact';

const BookDisplay = ({book}) => {
    const {bookTitle, bookImg, bookDescription} = book;
    return (
        <Card className='p-4 mx-3 mb-3 mt-0'>
            <MDBCol className='text-center' size={12}>
                <CardTitle className='h6'>
                    <strong>{bookTitle}</strong>
                </CardTitle>
                <hr />
            </MDBCol>
            <div className=" w-100 d-flex justify-content-center">
                <MDBRow className='w-75'>
                    <MDBCol>
                        <img
                            className="img-fluid"
                            alt={'book cover'}
                            src={bookImg || "https://mdbootstrap.com/img/Photos/Others/images/43.jpg"}
                        />
                    </MDBCol>
                    <MDBCol  lg='9' md='12' sm='12' xs='12' style={{'whiteSpace': 'pre-line'}} className='my-4'>
                        {bookDescription}
                    </MDBCol>
                </MDBRow>
            </div>
        </Card>
    )
};

const BookList = ({books, author}) => {
    
    const bookList = books ? Object.keys(books).map(key => ({
        ...books[key],
        uid: key,
    })) : null;
    return(
        <>
        {!books || books.length === 0 ?
            <div>
                No Books have been added for {author.authorTitle} yet.
            </div>
            :
            <>
            {
                bookList.map(book =>
                    <BookDisplay key={book.bookTitle} book={book} />
                )
            }
            </>
        }
        </>
    )
};

export default BookList;