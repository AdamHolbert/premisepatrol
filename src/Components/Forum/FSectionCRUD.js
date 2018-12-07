import React from 'react';
import { Card } from 'mdbreact';
import FSection from './FSection';
import FSectionCreate from './FSectionCreate';
import {withFirebase} from "../Firebase/context";
import FLinkList from './FLinkList'

const INITIAL_STATE = {
    sectionTitle: '',
    forumIds: false,
    error: null,
};

class FSectionCRUD extends React.Component {
    constructor(props) {
        super(props);
        this.editToggle = this.editToggle.bind(this);
        this.reset = this.reset.bind(this);
        this.createNewSection = this.createNewSection.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.deleteSection = this.deleteSection.bind(this);
        this.showTempImg = this.showTempImg.bind(this);
        this.removeError = this.removeError.bind(this);
        this.state = {
            ...INITIAL_STATE,
            loading: true,
            editing: !!this.props.editing,
            brokenImg: false,
            addLink: false,
        };
    }
    
    removeError = () => {this.setState({error: false})};
    
    componentDidMount() {
        this.setState({ loading: true });
        const {firebase, authorId, forumId, sectionId} = this.props;
        
        this.sectionRef = firebase.db.ref(`authorData/${authorId}/forumData/${forumId}/sections/${sectionId}`);
        
        this.sectionRef.on('value', snapshot => {
            
            this.setState({
                ...INITIAL_STATE,
                ...snapshot.val(),
                resetValues: snapshot.val(),
                loadingAuthor: false,
            });
            
        });
    }
    
    componentWillUnmount() {
        if(this.sectionRef) this.sectionRef.off();
    }
    
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value, brokenImg: false});
    };
    
    showTempImg = () => {this.setState({brokenImg: true})};
    
    createNewSection = event => {
        const { sectionTitle, forumIds} = this.state;
        const {firebase, authorId, forumId, addedSection} = this.props;
        this.setState({loading: true});
        
        firebase.db.ref(`authorData/${authorId}/forumData/${forumId}/sections`).push().then((data)=>{
            const sectionId = sectionTitle + data.key;

            let updates = {};
            updates[`authorData/${authorId}/forumData/${forumId}/sections/${sectionId}`] =
                {sectionTitle, forumIds};
            
            this.props.firebase.db.ref().update(updates,() => {
                    addedSection();
                })
                .catch(error => {
                    this.setState({ error });
                });
        }).catch(error => {
            this.setState({ error });
        });
    };
    
    saveChanges = event => {
        const {authorId, forumId, sectionId, firebase} = this.props;
        const {sectionTitle, forumIds} = this.state;
        this.setState({loading: true});

        let updates = {};
        
        updates[`authorData/${authorId}/forumData/${forumId}/sections/${sectionId}`] = {sectionTitle, forumIds};

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
        const { authorId, firebase, forumId, sectionId} = this.props;
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
            ...this.state.resetValues,
            brokenImg: false
        });
        if(this.props.addedSection && this.props.newSection) this.props.addedSection();
    };
    
    createLinkToggle = () => this.setState({addLink: !this.state.addLink});
    
    render() {
        const {adminView, newSection, styling, authorId, forumId, sectionId, authorUrl} = this.props;
        const {editing, sectionTitle, error} = this.state;
        const isValid = true;
        
        return (
            <div className={styling}>
                {newSection || editing ?
                    <FSectionCreate {...this.state}
                                    adminView={adminView}
                                    newSection={newSection}
                                    isValid={isValid}
                                    createNewSection={this.createNewSection}
                                    cancel={this.reset}
                                    onChange={this.onChange}
                                    saveChanges={this.saveChanges}
                                    showTempImg={this.showTempImg}
                                    errorMessage={error ? error.message : null}
                                    removeError={this.removeError}
                    />
                    :
                    <FSection {...this.state}
                              createLink={this.createLinkToggle}
                              adminView={adminView}
                              editFunction={this.editToggle}
                              deleteFunction={this.deleteSection}
                              showTempImg={this.showTempImg}
                    />
                }
                {!newSection &&
                    <FLinkList
                        {...this.state}
                        addedLink={this.createLinkToggle}
                        adminView={this.props.adminView}
                        authorId={authorId}
                        forumId={forumId}
                        sectionId={sectionId}
                        authorUrl={authorUrl}
                    />
                }
            </div>
        )
    }
}

export default withFirebase(FSectionCRUD);