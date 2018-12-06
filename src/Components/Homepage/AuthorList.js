import React from 'react';
import CRUDAuthorCard from './CRUDAuthorCard'
import { Row } from 'mdbreact';

const AuthorList = ({ authors, addEditCard, addedAuthor, adminView }) => (
    <>
    {authors.length === 0 ?
        <>
            <div className='mx-5 alert alert-light h1'>
                <div className="w-100 text-center">
                    No Authors have been added yet.
                </div>
            </div>
    
            {addEditCard && <Row className='container-fluid'><CRUDAuthorCard newAuthor={true} editing={true}
                                                                             addedAuthor={addedAuthor}/></Row>}
        </>
        :
        <Row className='container-fluid m-0'>
            {addEditCard && <CRUDAuthorCard newAuthor={true} editing={true}
                                            addedAuthor={addedAuthor}/>}
            {
                authors.map(author => (
                    <CRUDAuthorCard
                        key={author.authorId}
                        authorId={author.authorId}
                        adminView={adminView}/>
                ))
            }
        </Row>
    }
    </>
);

export default AuthorList;