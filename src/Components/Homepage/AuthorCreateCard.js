import React from 'react';
import { MDBInput, Card, CardBody, CardTitle, CardText, Col, MDBBtn, Row } from 'mdbreact';

const AuthorCreateCard = ({ authorUrl, authorTitle, authorImg, authorDescription, loading, newAuthor, error,
                          onChange, createNewAuthor, saveChanges, cancel, peek, brokenImg}) => {
    const valid = authorUrl && authorTitle && authorImg && authorDescription && !loading;
    
    return(
        <Card className='unselectable-text'>
            
            <Row className='w-100 p-0 m-0 mt-0 p-0 rounded-top unrounded-bottom'>
                {newAuthor ?
                        <MDBBtn disabled={!valid} onClick={createNewAuthor}
                             className="w-100 btn btn-dark unrounded-bottom m-0 mb-1 p-1 ">
                            Add author
                        </MDBBtn>
                    :
                    <>
                        <Col size={12} className="m-0 p-0">
                            <div className="btn btn-dark rounded-1 unrounded-left unrounded-bottom m-0 mb-1 p-1 w-100"
                                 onClick={peek}>
                                Peek
                            </div>
                        </Col>
                        <Col size={7} className="m-0 p-0">
                            <div className="btn btn-dark rounded-1 unrounded-right unrounded-bottom m-0 p-1 flex-center"
                                 onClick={saveChanges}>
                                Save changes
                            </div>
                        </Col>
                        <Col size={5} className="m-0 p-0">
                            <div className="btn btn-danger rounded-1 unrounded-left unrounded-bottom m-0 p-1 flex-center"
                                 onClick={cancel}>
                                Cancel
                            </div>
                        </Col>
                    </>
                }
            </Row>
            <CardBody>
                {error &&
                <CardText className='text-danger text-center' tag='div'>
                    {error.error}
                </CardText>
                }
                <CardTitle>
                    <MDBInput label="Image URL" rows="1" className='m-0'
                              name='authorImg' value={authorImg || ''}
                              onChange={onChange}/>
                </CardTitle>
                <CardTitle>
                    <MDBInput label="Author URL" rows="1" className='m-0'
                              name='authorUrl' value={authorUrl || ''}
                              onChange={onChange}/>
                </CardTitle>
                <CardTitle>
                    <MDBInput label="Author Title" rows="1" className='m-0'
                              name='authorTitle' value={authorTitle || ''}
                              onChange={onChange}/>
                </CardTitle>
                <CardText tag='div'>
                    <MDBInput type="textarea" label="Author Description" rows="5"
                              name='authorDescription' value={authorDescription || ''}
                              className='p-0'
                              onChange={onChange}/>
                </CardText>
            </CardBody>
        </Card>
    )
};

export default AuthorCreateCard;