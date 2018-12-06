import React from 'react';
import { Card } from 'mdbreact';
import BookCreate from './BookCreate'
import Book from "./Book";
import {withRouter} from 'react-router'
import {withFirebase} from "../Firebase/context";

const INITIAL_STATE = {
    bookTitle: 'The Divine Dungeon: Dungeon Born',
    bookDescription:
    "For eons, conquering dungeons has been the most efficient way to become a strong adventurer. " +
    "Although, not everything is as straightforward as it seems. Several questions have always plagued " +
    "the mind of those that enter these mythical places of power: Why are there so many monsters? Where " +
    "does the amazing weaponry and heavy gold coins come from? Why does the very air fill with life-giving energies?! \n\n" +
    "Cal has all of the answers to these age old questions, for a very simple reason. He is a Dungeon Heart, " +
    "a soul forced against his will into a magical stone. After several lonely years, Cal was able to regain " +
    "sentience, allowing him to form new memories while slowly growing a dungeon around himself. With help " +
    "from a friend, Cal learned how to create monsters and traps, increasing his power and size quickly. \n\n" +
    "When a threat to his existence rears its head, Cal decides that he will do anything to stay alive and " +
    "become stronger. Unfortunately for treasure-seekers, the fastest way for Cal to achieve his goal... " +
    "is to eat anyone that enters his depths.",
    bookImg: 'https://i.imgur.com/jNwsbcu.png',
    error: null,
};

class CRUDBook extends React.Component {
    constructor(props) {
        super(props);
        this.editToggle = this.editToggle.bind(this);
        this.deleteBook = this.deleteBook.bind(this);
        this.reset = this.reset.bind(this);
        this.peek = this.peek.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.createNewBook = this.createNewBook.bind(this);
        this.showTempImg = this.showTempImg.bind(this);
        
        this.state = {
            ...INITIAL_STATE,
            ...this.props.book,
            editing: !!this.props.editing,
            peeking: false,
            brokenImg: false
        };
    }
    
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value, brokenImg: false});
    };
    
    showTempImg = () => {this.setState({brokenImg: true})};
    
    createNewBook = event => {
        const { bookTitle, bookImg, bookDescription } = this.state;
        const {firebase, authorId} = this.props;
        this.setState({loading: true});
        
        firebase.db.ref(`authorData/${authorId}/profile/books`).push().then((data)=>{
            const bookId = data.key;
        
            let updates = {};
            updates[`authorData/${authorId}/profile/books/${bookId}`] =
                {bookTitle, bookImg, bookDescription};
        
            this.props.firebase.db.ref().update(updates)
                .then(() => {
                    this.props.addedBook();
                })
                .catch(error => {
                    this.setState({ error, loading:false });
                
                });
        });
    };
    
    saveChanges = event => {
        const { bookTitle, bookImg, bookDescription, bookId } = this.state;
        const {firebase, authorId} = this.props;
        this.setState({loading: true});
        let updates = {};
        updates[`authorData/${authorId}/profile/books/${bookId}/bookTitle`] = bookTitle;
        updates[`authorData/${authorId}/profile/books/${bookId}/bookImg`] = bookImg;
        updates[`authorData/${authorId}/profile/books/${bookId}/bookDescription`] = bookDescription;
        
        firebase.db.ref().update(updates)
            .then(author => {
                this.setState({
                    loading: false,
                    editing: false
                });
            })
            .catch(error => {
                this.setState({
                    error: error,
                    loading: false
                });
            });
    };
    
    deleteBook = event => {
        const { authorId, firebase } = this.props;
        const {bookId} = this.state;
        
        this.setState({loading: true});
        
        let updates = {};
        updates[`authorData/${authorId}/profile/books/${bookId}`] = null;
        
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
            ...this.props.book,
            loading: false,
            editing: !!this.props.editing,
            peeking: false,
            brokenImg: false
        });
        if(this.props.newBook) this.props.addedBook();
    };
    peek = () => this.setState({peeking: !this.state.peeking});
    imgFunction = () => this.props.history.push(`/A/${this.state.authorUrl}`);
    
    render() {
        const {adminView, newBook} = this.props;
        const {editing, peeking} = this.state;
        
        return (
            <Card className='p-4 mx-3 mb-3 mt-0'>
                {!peeking && (newBook || editing) ?
                    <BookCreate {...this.state}
                                adminView={adminView}
                                newBook={newBook}
                                peek={this.peek}
                                cancel={this.reset}
                                onChange={this.onChange}
                                saveChanges={this.saveChanges}
                                createNewBook={this.createNewBook}
                                showTempImg={this.showTempImg}
                    />
                    :
                    <Book {...this.state}
                          adminView={adminView}
                          imgFunction={peeking ? null : this.imgFunction}
                          editFunction={this.editToggle}
                          deleteFunction={this.deleteBook}
                          peek={this.peek}
                          showTempImg={this.showTempImg}
                    />
                }
            </Card>
        )
    }
}

export default withFirebase(CRUDBook);