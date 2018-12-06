import React from 'react';
import { Card } from 'mdbreact';
import ITEMCreate from './ITEMCreate'
import ITEM from "./ITEM";
import {withFirebase} from "../Firebase/context";

const INITIAL_STATE = {
    error: null,
};

class CRUDITEM extends React.Component {
    constructor(props) {
        super(props);
        this.editToggle = this.editToggle.bind(this);
        this.reset = this.reset.bind(this);
        this.peek = this.peek.bind(this);
        this.createNewITEM = this.createNewITEM.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.deleteITEM = this.deleteITEM.bind(this);
        this.showTempImg = this.showTempImg.bind(this);
        
        this.state = {
            ...INITIAL_STATE,
            ...this.props.ITEM,
            editing: !!this.props.editing,
            peeking: false,
            brokenImg: false
        };
    }
    
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value, brokenImg: false});
    };
    
    showTempImg = () => {this.setState({brokenImg: true})};
    
    createNewITEM = event => {
        console.log('todo: create');
        
        // const { bookTitle, bookImg, bookDescription } = this.state;
        // const {firebase, authorUrl} = this.props;
        // this.setState({loading: true});
        //
        // firebase.db.ref(`authorList/${authorUrl}/books`).push().then((data)=>{
        //     const bookId = data.key;
        //
        //     let updates = {};
        //     updates[`authorList/${authorUrl}/books/${bookId}`] =
        //         {bookTitle, bookImg, bookDescription};
        //
        //     this.props.firebase.db.ref().update(updates)
        //         .then(() => {
        //             this.props.addedBook();
        //         })
        //         .catch(error => {
        //             this.setState({ error });
        //
        //         });
        // });
    };
    
    saveChanges = event => {
        console.log('todo: save');
        // const { bookTitle, bookImg, bookDescription, uid } = this.state;
        // const {firebase, authorUrl} = this.props;
        // this.setState({loading: true});
        //
        // let updates = {};
        // updates[`authorList/${authorUrl}/books/${uid}/bookTitle`] = bookTitle;
        // updates[`authorList/${authorUrl}/books/${uid}/bookImg`] = bookImg;
        // updates[`authorList/${authorUrl}/books/${uid}/bookDescription`] = bookDescription;
        //
        // firebase.db.ref().update(updates)
        //     .then(author => {
        //         this.setState({
        //             loading: false,
        //             editing: false
        //         });
        //     })
        //     .catch(error => {
        //         this.setState({
        //             error: error,
        //             loading: false
        //         });
        //     });
    };
    
    deleteITEM = event => {
        console.log('todo: delete');
        
        // const { authorUrl, firebase } = this.props;
        // const {uid} = this.state;
        // console.log(uid)
        // this.setState({loading: true});
        //
        // let updates = {};
        // updates[`authorList/${authorUrl}/books/${uid}`] = null;
        //
        // firebase.db.ref().update(updates)
        //     .then(author => {
        //
        //     })
        //     .catch(error => {
        //         this.setState({
        //             error: error,
        //             loading: false
        //         });
        //     });
    };
    
    editToggle = () => this.setState({editing: !this.state.editing});
    reset = () => {
        this.setState({
            ...INITIAL_STATE,
            ...this.props.ITEM,
            editing: !!this.props.editing,
            peeking: false,
            brokenImg: false
        });
        this.props.addedITEM();
    };
    peek = () => this.setState({peeking: !this.state.peeking});
    imgFunction = () => this.props.history.push(`/A/${this.state.authorUrl}`);
    
    render() {
        const {adminView, newITEM} = this.props;
        const {editing, peeking} = this.state;
        
        return (
            <Card className='p-4 mx-3 mb-3 mt-0'>
                {!peeking && (newITEM || editing) ?
                    <ITEMCreate {...this.state}
                                adminView={adminView}
                                newITEM={newITEM}
                                peek={this.peek}
                                cancel={this.reset}
                                onChange={this.onChange}
                                saveChanges={this.saveChanges}
                                createNewITEM={this.createNewITEM}
                                showTempImg={this.showTempImg}
                    />
                    :
                    <ITEM {...this.state}
                          adminView={adminView}
                          imgFunction={peeking ? null : this.imgFunction}
                          editFunction={this.editToggle}
                          deleteFunction={this.deleteITEM}
                          peek={this.peek}
                          showTempImg={this.showTempImg}
                    />
                }
            </Card>
        )
    }
}

export default withFirebase(CRUDITEM);