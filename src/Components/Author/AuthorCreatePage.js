import React from 'react';
import { MDBInput, Card, CardBody, CardTitle, CardText, MDBCol, MDBBtn } from 'mdbreact';
import tempImg from '../../tempUser.png';
import {withFirebase} from "../Firebase/context";
import {withRouter} from 'react-router'

const INITIAL_STATE = {
    authorUrl: '',
    authorTitle: '',
    authorImg: '',
    authorDescription: '',
    error: null,
};

// -AuthorURL
// -AuthorID - FINAL
// -AuthorTitle
// -AuthorIMG
// -AuthorDescription

class AuthorCreatePage extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {...INITIAL_STATE};
    }
    
    onSubmit = event => {
        
        const { authorUrl, authorTitle, authorImg, authorDescription } = this.state;
        this.setState({loading: true});
        
        this.props.firebase.author(authorUrl).push({}).then((data)=>{
            const authorId = data.key;
            this.props.firebase.author(authorUrl)
            .update({
                authorId,
                authorTitle,
                authorImg,
                authorUrl,
                authorDescription
            })
            .then(author => {
                this.props.history.push('/');
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
        const { authorUrl, authorTitle, authorImg, authorDescription, loading } = this.state;
        
        return(
            <>
                <MDBCol lg='3' md='4' sm='6' xs='12' className='m-4'>
                    <Card>
                        <div className="embed-responsive embed-responsive-4by3">
                            <embed
                                className="img-fluid heavy-rain-gradient embed-responsive-item"
                                src={authorImg || tempImg}
                            />
                        </div>
                        <CardBody>
                            <CardTitle>
                                <MDBInput label="Image URL" rows="5" className='m-0'
                                          name='authorImg' value={authorImg}
                                          onChange={this.onChange}/>
                            </CardTitle>
                            <CardTitle>
                                <MDBInput label="Author URL" rows="5" className='m-0'
                                          name='authorUrl' value={authorUrl}
                                          onChange={this.onChange}/>
                            </CardTitle>
                            <CardTitle>
                                <MDBInput label="Author Title" rows="5" className='m-0'
                                          name='authorTitle' value={authorTitle}
                                          onChange={this.onChange}/>
                            </CardTitle>
                            <CardText tag='div'>
                                <MDBInput type="textarea" label="Author Description" rows="5"
                                          name='authorDescription' value={authorDescription}
                                          onChange={this.onChange}/>
                            </CardText>
                            <MDBBtn className='w-100' disabled={loading} onClick={this.onSubmit} color='elegant'>Save</MDBBtn>
                        </CardBody>
                    </Card>
                </MDBCol>
                <div>
                
                </div>
            </>
        )
    }
};

export default withRouter(withFirebase(AuthorCreatePage));