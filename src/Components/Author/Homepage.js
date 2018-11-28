import React from 'react';
import {Link} from 'react-router-dom';
import {withFirebase} from "../Firebase/context";
import {Animation} from 'mdbreact'
import {withAuth} from "../Session/context";
import {withRouter} from 'react-router';
import { Button, Card, CardBody, CardImage, CardTitle, CardText, Col } from 'mdbreact';
import AuthorCreatePage from './AuthorCreatePage'

const AuthorCardBase = ({author, history}) => (
    <Col>
        <Card style={{ width: "22rem" }}>
            <CardImage
                className="img-fluid"
                src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg"
                onClick={() => {history.push('/a/' + author.urlName)}}
                waves
            />
            <CardBody>
                <CardTitle>{author.username}</CardTitle>
                <CardText>{author.description}</CardText>
                <Link key={author.urlName} to={'/A/' + author.urlName}
                      className='p-2 m-1 btn btn-primary w-100'> Author Page </Link>
            </CardBody>
        </Card>
    </Col>
);

const AuthorCard = withRouter(AuthorCardBase);

const AuthorList = ({ authors }) => (
    <>
    {authors.length === 0 ?
        <div>
            No authors exist right now.
        </div>
        :
        <>
        {
            authors.map(author => (
                <AuthorCard key={author.urlName} author={author} />
            ))
        }
        </>
    }
    </>
);

class Homepage extends React.Component {
    
    createAuthor = (username, urlName) => {
        // const { username, email, passwordOne } = this.state;
        // this.setState({loading: true});
        this.props.firebase.author(urlName)
            .set({
                username,
                urlName,
            })
            .then(author => {
                console.log(author)
            })
            .catch(error => {
                console.log("Failed")
                this.setState({ error });
            });

    };
    
    constructor(props) {
        super(props);
        
        this.state = {
            loading: false,
            authors: [],
        };
    }
    
    componentDidMount() {
        this.setState({ loading: true });
    
        this.props.session.setState({
            activeUrl: 'home'
        });
        
        this.props.firebase.authors().on('value', snapshot => {
            const authorObject = snapshot.val();
            
            const authorList = authorObject ? Object.keys(authorObject).map(key => ({
                ...authorObject[key],
                uid: key,
            })) : {};
            
            this.setState({
                authors: authorList,
                loading: false,
            });
        });
    }
    
    componentWillUnmount() {
        this.props.firebase.users().off();
    }
    
    render () {
        const { authors, loading } = this.state;
        const { user } = this.props.session.state;
        console.log(user);
        const isModerator = user && user.uid === 'eMfaysL0aHVJHR7d8giI23ncA3h2';
        if(loading) {
            return (
                <div className='container-fluid text-center h1'>
                    {/*Loading Authors...*/}
                </div>
            );
        }
        
        return(
            <Animation type='fadeIn'>
                <div className='w-100 text-center h1 p-2'>
                    Homepage
                    <hr/>
                </div>
                <div className='container-fluid'>
                    <AuthorList authors={authors} />
                    {isModerator && <AuthorCreatePage />}
                </div>
            </Animation>
        )
    }
};

export default withFirebase(withAuth(Homepage));