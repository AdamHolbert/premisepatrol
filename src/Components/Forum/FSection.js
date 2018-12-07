import React from 'react';
import {AFilter} from "../Header/AdminHeader";
import { Fa } from 'mdbreact';
import ForumList from './FLinkList'

const FSection = (props) => (
    <>
    {props.sectionTitle ?
        <div className='h3 mx-4 p-1 border-bottom border-dark font-weight-light mb-0'>
            {props.sectionTitle}
            <AFilter reqPerm='admin|author' hide={!props.adminView}>
                <Fa className='text-danger m-1 clickable' onClick={props.deleteFunction} icon='remove' pull='right'/>
                <Fa className='text-dark m-1 clickable' onClick={props.editFunction} icon='edit' pull='right'/>
                <Fa className='text-dark m-1 clickable' onClick={props.createLink}
                    icon={props.addLink ? 'plus-square' : 'plus-square-o'} pull='right'/>
            </AFilter>
        </div>
        :
        <div className='h3 mx-4 p-1 mb-0 flex-center'>
            <AFilter reqPerm='admin|author' hide={!props.adminView}>
                <Fa className='text-danger m-1 clickable' onClick={props.deleteFunction} icon='remove' pull='right'/>
                <Fa className='text-dark m-1 clickable' onClick={props.editFunction} icon='edit' pull='right'/>
                <Fa className='text-dark m-1 clickable' onClick={props.createLink}
                    icon={props.addLink ? 'plus-square' : 'plus-square-o'} pull='right'/>
            </AFilter>
        </div>
    }
    </>
);

export default FSection;