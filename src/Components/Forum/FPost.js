import React from 'react';
import {AFilter} from "../Header/AdminHeader";
import { MDBBtn, CardTitle, Fa, Row, Col } from 'mdbreact';

const FPost = ({postTitle, loading, errorMessage, authorUrl, forumUrl, postId, adminView, deleteFunction,
                   onChange, createNewLink, saveChanges, cancel, removeError, linkFunction}) => (
    <>
        <Row className='m-0'>
            <MDBBtn className='m-0 text-dark flex-grow-1 text-left rgba-grey-light' gradient='a' color='a'
                    onClick={linkFunction}>
                    {postTitle}
            </MDBBtn>
            <AFilter reqPerm='admin|author' hide={!adminView}>
                <MDBBtn className='m-0 danger-color darken-3' color='a' onClick={deleteFunction}>
                    <Fa icon='remove'/>
                </MDBBtn>
            </AFilter>
        </Row>
        {errorMessage &&
        <div className='m-0 p-0 w-100' onClick={removeError}>
            <hr className="m-0 p-0" />
            <div className='text-danger text-left p-0 col-0 pt-1 pb-2 pl-5'>
                Error: {errorMessage}
            </div>
        </div>
        }
    </>
);

export default FPost;