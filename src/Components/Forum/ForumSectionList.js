import React from 'react';
import CRUDSection from './CRUDSection'
import {AFilter} from "../Header/AdminHeader";
import {MDBBtn} from 'mdbreact'

const ForumSectionList = (props) => {
    const sectionList = props.sections ? Object.keys(props.sections).map(sectionId => ({
        ...props.sections[sectionId],
        sectionId: sectionId,
    })) : null;
    
    if(!sectionList || sectionList.length === 0){
        return (
            <>{!props.addSection &&
                <div className='text-center h1 p-2'>
                    <AFilter hide={!props.adminView}>
                            <MDBBtn onClick={props.addedSection}>
                                Add Section
                            </MDBBtn>
                    </AFilter>
                </div>
                }
                {props.addSection && <CRUDSection
                    forumId={props.forum.forumId}
                    adminView={props.adminView}
                    newSection={true}
                    addedSection={props.addedSection}
                    editing={true}
                    authorId={props.authorId}/>}
            </>
        );
    }
    return(
        <>
        {!props.addSection &&
        <div className='text-center h1 p-2'>
            <AFilter hide={!props.adminView}>
                <MDBBtn onClick={props.addedSection}>
                    Add Section
                </MDBBtn>
        </AFilter>
        </div>
        }
        {props.addSection && <CRUDSection forumId={props.forum.forumId}
                                          adminView={props.adminView}
                                          newSection={true}
                                          addedSection={props.addedSection}
                                          editing={true}
                                          authorId={props.authorId} />}
        {
            sectionList.map(section =>
                <CRUDSection section={section}
                             adminView={props.adminView}
                             key={section.sectionId}
                             forumId={props.forum.forumId}
                             addedSection={props.addedSection}
                             authorId={props.authorId} />
            )
        }
        </>
    )
};

export default ForumSectionList;