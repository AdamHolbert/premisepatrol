import React from 'react';
import { Input, CardTitle, Fa, MDBBtn, Row } from 'mdbreact';

const FSessionCreate = (props) => (
    <>
    
        <Row className='m-0 rgba-grey-light rounded'>
            <Row className='flex-grow-1 m-0'>
                <CardTitle className='flex-grow-1 m-0 px-4'>
                    <Fa className='m-1 btn btn-danger m-0 p-0 px-1' onClick={props.cancel} icon='remove' pull='right'/>
                    <Input size='lg' label="Section Title" name='sectionTitle' labelClass='text-dark'
                           className='mb-0' value={props.sectionTitle.toLowerCase()
                        .split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')} onChange={props.onChange}/>
                </CardTitle>
                <MDBBtn disabled={!props.isValid} className='m-0 unrounded-left' onClick={
                    props.newSection ?
                        props.createNewSection :
                        props.saveChanges} >
                    <Fa size='3x' className='dark-grey-text m-1 clickable' icon='save' pull='right'/>
                </MDBBtn>
            </Row>
            {props.errorMessage &&
            <Row size={12} className='m-0 p-0' onClick={props.removeError}>
                <hr className="m-0 p-0" />
                <div className='text-danger font-small text-left p-0 col-0 pt-1 pb-2 pl-5'>
                    Error: {props.errorMessage}
                </div>
            </Row>
            }
        </Row>
    </>
);
export default FSessionCreate;