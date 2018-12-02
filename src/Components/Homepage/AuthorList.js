import React from 'react';
import CRUDAuthorCard from './CRUDAuthorCard'
import { Row } from 'mdbreact';

const AuthorList = ({ authors, addEditCard, adminView }) => (
    <>
    {authors.length === 0 ?
        <>
            <div className='mx-5 alert alert-light h1'>
                <div className="w-100 text-center">
                    No Authors have been added yet.
                </div>
            </div>
    
            {addEditCard && <Row className='container-fluid'><CRUDAuthorCard newAuthor={true} editing={true}/></Row>}
        </>
        :
        <Row className='container-fluid'>
            {addEditCard && <CRUDAuthorCard newAuthor={true} editing={true}/>}
            {
                authors.map(author => (
                    <CRUDAuthorCard
                        key={author.authorId}
                        author={author}
                        adminView={adminView}/>
                ))
            }
        </Row>
    }
    </>
);

export default AuthorList;