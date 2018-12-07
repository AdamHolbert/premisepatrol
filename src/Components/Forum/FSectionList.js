import React from 'react';
import FSectionCRUD from './FSectionCRUD'
import {AFilter} from "../Header/AdminHeader";
import {MDBBtn} from 'mdbreact'

const AdminControls  = ({props}) => (
    <AFilter reqPerm='admin|author' hide={!props.adminView}>
        <div className='text-center h1 p-2'>
            {
                !props.addSection ?
                    <MDBBtn onClick={props.addedSection}>
                        Add Section
                    </MDBBtn>
                    :
                    <FSectionCRUD styling='mx-5'
                                  forumId={props.forum.forumId}
                                  adminView={props.adminView}
                                  newSection={true}
                                  addedSection={props.addedSection}
                                  editing={true}
                                  authorId={props.authorId}
                                  authorUrl={props.authorUrl} />
            }
        </div>
    </AFilter>
);

const FSectionList = (props) => {
    const sectionList = props.sections ? Object.keys(props.sections).map(sectionId => ({
        sectionId: sectionId,
    })) : null;
    
    if(!sectionList || sectionList.length === 0){
        return (
            <AdminControls props={props}/>
        );
    }
    return(
        <div className='pt-2'>
            {
                sectionList.map(section =>
                    <FSectionCRUD
                        styling='mb-5 mx-3'
                        sectionId={section.sectionId}
                        adminView={props.adminView}
                        key={section.sectionId}
                        forumId={props.forum.forumId}
                        addedSection={props.addedSection}
                        authorId={props.authorId}
                        authorUrl={props.authorUrl}
                    />
                )
            }
            <AdminControls props={props} />
        </div>
    )
};

export default FSectionList;