import React from 'react';
import CRUDBook from "./CRUDBook";

const BookList = ({books, authorTitle, authorUrl, authorId, addBook, addedBook, adminView}) => {
    
    const bookList = books ? Object.keys(books).map(key => ({
        ...books[key],
        uid: key,
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
                                      authorUrl={authorUrl}
                                      authorId={authorId}
                                      addedBook={addedBook}/>}
            </>
        );
    }
    return(
        <>
            {addBook && <CRUDBook newBook={true}
                                  editing={true}
                                  authorUrl={authorUrl}
                                  authorId={authorId}
                                  addedBook={addedBook}/>}
            {
                bookList.map(book =>
                    <CRUDBook key={book.uid}
                              book={book}
                              authorUrl={authorUrl}
                              authorId={authorId}
                              adminView={adminView}/>
                )
            }
        </>
    )
};

export default BookList;