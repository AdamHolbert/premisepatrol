import React from 'react';
import { Input, CardTitle, Fa, MDBBtn, Row } from 'mdbreact';

const SessionCreate = (props) => (
    <>
    {console.log(props)}
        <Row className='m-0 rgba-grey-light rounded'>
            <CardTitle className='flex-grow-1 m-0 px-4'>
                <Fa className='deep-orange-text m-1 btn btn-danger m-0 p-0 px-1' onClick={props.cancel} icon='remove' pull='right'/>
                <Input size='lg' label="Section Title" name='sectionTitle'
                       className='mb-0' value={props.sectionTitle} onChange={props.onChange}/>
            </CardTitle>
            <MDBBtn disabled={!props.isValid} className='m-0 unrounded-left' onClick={
                props.newSection ?
                    props.createNewSection :
                    props.saveChanges} >
                <Fa size='3x' className='dark-grey-text m-1 clickable' icon='save' pull='right'/>
            </MDBBtn>
        </Row>
    </>
);
export default SessionCreate;