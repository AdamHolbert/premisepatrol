import React from 'react';
import {AFilter} from "../Header/AdminHeader";
import { Fa } from 'mdbreact';

const Section = (props) => (
    <>
        <div className='h3 mx-4 border-bottom border-dark'>
            <div>
                {props.sectionTitle}
                <AFilter reqPerm='admin|author' hide={!props.adminView}>
                    <Fa className='text-danger m-1 clickable' onClick={props.deleteFunction} icon='remove' pull='right'/>
                    <Fa className='text-dark m-1 clickable' onClick={props.editFunction} icon='edit' pull='right'/>
                </AFilter>
            </div>
        </div>
        
    </>
);

export default Section;