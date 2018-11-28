import React from 'react';
import { Button, Card, CardBody, CardImage, CardTitle, CardText, Col, MDBInput } from 'mdbreact';

const INITIAL_STATE = {
    url: '',
    title: '',
    error: null,
};

class AuthorCreatePage extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {...INITIAL_STATE};
    }
    
    onSubmit = event => {
        
        const { url, title } = this.state;
        this.setState({loading: true});
        
        this.props.firebase.author.push
            .set({
                url,
                title,
            })
            .then(author => {
                console.log(author)
            })
            .catch(error => {
                console.log("Failed");
                this.setState({ error });
            });
        
    };
    
    render () {
        const { authors, loading, isModerator } = this.state;
        if(loading) {
            return (
                <div className='container-fluid text-center h1'>
                    {/*Loading Authors...*/}
                </div>
            );
        }
        
        return(
            
            <Col>
                <Card style={{ width: "22rem" }}>
                    <CardImage
                        className="img-fluid"
                        src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg"
                        // onClick={() => {history.push('/a/' + author.urlName)}}
                        waves
                    />
                    <CardBody>
                        <CardTitle><MDBInput label="Author Name" rows="5" /></CardTitle>
                        <CardText><MDBInput type="textarea" label="Author Description" rows="5" /></CardText>
                        {/*<Link key={author.urlName} to={'/A/' + author.urlName}*/}
                              {/*className='p-2 m-1 btn btn-primary w-100'> Author Page </Link>*/}
                    </CardBody>
                </Card>
            </Col>
        )
    }
};

export default AuthorCreatePage;