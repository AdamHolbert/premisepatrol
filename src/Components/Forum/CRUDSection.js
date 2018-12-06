import React from 'react';
import { Card } from 'mdbreact';
import Section from './Section';
import SectionCreate from './SectionCreate';
import {withFirebase} from "../Firebase/context";

const INITIAL_STATE = {
    sectionTitle:'',
    error: null,
};

class CRUDSection extends React.Component {
    constructor(props) {
        super(props);
        this.editToggle = this.editToggle.bind(this);
        this.reset = this.reset.bind(this);
        this.createNewSection = this.createNewSection.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.deleteSection = this.deleteSection.bind(this);
        this.showTempImg = this.showTempImg.bind(this);
        
        this.state = {
            ...INITIAL_STATE,
            ...this.props.section,
            editing: !!this.props.editing,
            brokenImg: false
        };
    }
    
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value, brokenImg: false});
    };
    
    showTempImg = () => {this.setState({brokenImg: true})};
    
    createNewSection = event => {
        const { bookTitle, bookImg, bookDescription, sectionTitle} = this.state;
        const {firebase, authorId, forumId, addedSection} = this.props;
        this.setState({loading: true});
        console.log('new session created')
        console.log(this.props)
        firebase.db.ref(`authorData/${authorId}/forumData/${forumId}/sections`).push().then((data)=>{
            const sectionId = data.key;

            let updates = {};
            updates[`authorData/${authorId}/forumData/${forumId}/sections/${sectionId}`] =
                {sectionTitle, forumIds:false};
            
            this.props.firebase.db.ref().update(updates,() => {
                    this.props.addedSection();
                })
                .catch(error => {
                    this.setState({ error });
                    console.log(error)
                });
        });
    };
    
    saveChanges = event => {
        const { authorId, forumId, firebase } = this.props;
        const {sectionId, sectionTitle} = this.state;
        this.setState({loading: true});

        let updates = {};
        updates[`authorData/${authorId}/forumData/${forumId}/sections/${sectionId}`] = {sectionTitle};

        firebase.db.ref().update(updates, () => {
            this.setState({
                loading: false,
                editing: false
            });
        }).catch(error => {
            this.setState({
                error: error,
                loading: false
            });
        });
    };
    
    deleteSection = event => {
        const { authorId, firebase, forumId } = this.props;
        const {sectionId} = this.state;
        this.setState({loading: true});

        let updates = {};
        updates[`authorData/${authorId}/forumData/${forumId}/sections/${sectionId}`] = null;

        firebase.db.ref().update(updates)
            .then(author => {

            })
            .catch(error => {
                this.setState({
                    error: error,
                    loading: false
                });
            });
    };
    
    editToggle = () => this.setState({editing: !this.state.editing});
    reset = () => {
        this.setState({
            ...INITIAL_STATE,
            ...this.props.section,
            editing: !!this.props.editing,
            brokenImg: false
        });
        if(this.props.addedSection && this.props.newSection) this.props.addedSection();
    };
    
    imgFunction = () => this.props.history.push(`/A/${this.state.authorUrl}`);
    
    render() {
        const {adminView, newSection, addedSection} = this.props;
        const {editing, sectionTitle} = this.state;
        const isValid = !!sectionTitle;
        return (
            <div className='mx-3 mb-5'>
                {newSection || editing ?
                    <SectionCreate {...this.state}
                                   adminView={adminView}
                                   newSection={newSection}
                                   isValid={isValid}
                                   createNewSection={this.createNewSection}
                                   cancel={this.reset}
                                   onChange={this.onChange}
                                   saveChanges={this.saveChanges}
                                   showTempImg={this.showTempImg}
                    />
                    :
                    <Section {...this.state}
                          adminView={adminView}
                          editFunction={this.editToggle}
                          deleteFunction={this.deleteSection}
                          showTempImg={this.showTempImg}
                    />
                }
            </div>
        )
    }
}

export default withFirebase(CRUDSection);