import React from 'react';
import CRUDBook from "./CRUDBook";

const BookList = ({books, authorTitle, authorId, addBook, addedBook, adminView}) => {
    
    const bookList = books ? Object.keys(books).map(bookId => ({
        book: {...books[bookId], bookId},
        uid: bookId
    })) : null;
    
    if(!books || books.length === 0){
        return (
            <>
                <div className='text-center h1 p-2'>
                    <div className='w-auto h1 mx-4 alert alert-light'>
                        No Books have been added for {authorTitle} yet.
                    </div>
                </div>
                {addBook && <CRUDBook newBook={true}
                                      editing={true}
                                      authorId={authorId}
                                      addedBook={addedBook}/>}
            </>
        );
    }
    return(
        <>
            {addBook && <CRUDBook newBook={true}
                                  editing={true}
                                  authorId={authorId}
                                  addedBook={addedBook}/>}
            {
                bookList.map(book =>
                    <CRUDBook key={book.uid}
                              book={book.book}
                              authorId={authorId}
                              adminView={adminView}/>
                )
            }
        </>
    )
};

export default BookList;