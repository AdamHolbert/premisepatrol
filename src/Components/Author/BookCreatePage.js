import React from 'react';
import { MDBInput, Card, CardBody, CardTitle, CardText, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import tempImg from '../../tempUser.png';
import {withFirebase} from "../Firebase/context";
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom'
import {withAuth} from "../Session/context";

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

// -AuthorURL
// -AuthorID - FINAL
// -AuthorTitle
// -AuthorIMG
// -AuthorDescription

class BookCreatePage extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {...INITIAL_STATE};
    }
    
    onSubmit = event => {
        
        const { bookTitle, bookImg, bookDescription, loading } = this.state;
        const {firebase, session} = this.props;
        const {author} = session.state;
        this.setState({loading: true});
        
        firebase.db.ref(`authorList/${author.authorUrl}/books`).push().then((data)=>{
            const bookId = data.key;
            
            let updates = {};
            updates[`authorList/${author.authorUrl}/books/${bookId}`] =
                {bookTitle, bookImg, bookDescription};
            
            this.props.firebase.db.ref().update(updates)
                .then(author => {
                    this.props.history.push(`/A/${author.authorUrl}/`);
                })
                .catch(error => {
                    this.setState({ error });
                    
                });
        });
        
    };
    
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    
    render () {
        const { bookTitle, bookImg, bookDescription, loading } = this.state;
        const {author} = this.props.session.state;
        
        return(
            <>
                <div className='w-100 text-right'>
                    <Link className='btn btn-dark m-3'
                          to={`/A/${author.authorUrl}`}>
                        Cancel
                    </Link>
                </div>
                <Card className='p-4 mx-3 mb-3 mt-0'>
                    <MDBCol className='text-center' size={12}>
                        <CardTitle>
                            <MDBInput size='lg' label="Book Title" name='bookTitle'
                                      className='text-center mb-0' value={bookTitle} onChange={this.onChange}/>
                            <hr className="mt-0" />
                        </CardTitle>
                    </MDBCol>
                    <div className=" w-100 d-flex justify-content-center">
                        <MDBRow className='w-75'>
                            <MDBCol lg='4' md='5' sm='6' xs='12'>
                                <img
                                    className="img-fluid"
                                    src={bookImg || "https://mdbootstrap.com/img/Photos/Others/images/43.jpg"}
                                />
                            </MDBCol>
                            <MDBCol>
                                <MDBInput type="textarea" label="Book Description" rows="10" className='my-2'
                                          name='bookDescription' value={bookDescription}
                                          onChange={this.onChange}/>
        
                                <MDBInput label="Image URL" rows="5"
                                          name='bookImg' className='mt-3' value={bookImg}
                                          onChange={this.onChange}/>
                                <MDBBtn className='w-100' disabled={loading}
                                        onClick={this.onSubmit} color='elegant'>Save</MDBBtn>
                            </MDBCol>
                        </MDBRow>
                    </div>
                </Card>
            </>
        )
    }
};

export default withRouter(withFirebase(withAuth(BookCreatePage)));