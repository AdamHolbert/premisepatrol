import React from 'react';
import { Input, CardTitle, Col, MDBBtn, Row, Fa } from 'mdbreact';
import tempImg from '../../tempUser.png';

const PostCreate = ({ postTitle, commentDescription, loading, author, brokenImg, newBook, newComment, createNewComment,
                        onChange, saveChanges, showTempImg, cancel }) => (
    <>
        <Row>
            <div className='flex-grow-1 justify-content-center'>
                <Input
                    type="textarea" label="Comment" rows="10" className='my-2'
                    containerClass='flex-grow-1 m-2' labelClass='mt-2'
                    name='commentDescription' value={commentDescription}
                    onChange={onChange}/>
                
            </div>
            <Fa className='text-danger m-1 clickable' size='2x' onClick={cancel} icon='remove' pull='right'/>
            <Fa className='text-dark m-1 clickable' size='2x' onClick={newComment ? createNewComment : saveChanges} icon='save' pull='right'/>
        </Row>
    </>
);
export default PostCreate;