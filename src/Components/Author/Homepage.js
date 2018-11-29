import React from 'react';
import {withFirebase} from "../Firebase/context";
import {Animation} from 'mdbreact'
import {withAuth} from "../Session/context";
import {withRouter} from 'react-router';
import { Card, CardBody, CardTitle, CardText, MDBCol, MDBRow, Fa } from 'mdbreact';

const AuthorCard = ({author, imgFunction}) => (
    <MDBCol lg='3' md='4' sm='6' xs='12' className='mb-4'>
        <Card>
            <div className="embed-responsive embed-responsive-4by3" onClick={imgFunction}>
                <embed
                    className="img-fluid heavy-rain-gradient embed-responsive-item"
                    src={author.authorImg || "https://mdbootstrap.com/img/Photos/Others/images/43.jpg"}
                    
                />
            </div>
            <CardBody>
                <CardTitle>{author.authorTitle}</CardTitle>
                <CardText tag='div'>{author.authorDescription}</CardText>
                {/*<Link key={author.urlName} to={'/A/' + author.urlName}*/}
                      {/*className='p-2 m-1 btn btn-primary w-100'> Author Page </Link>*/}
            </CardBody>
        </Card>
    </MDBCol>
);

const AddAuthorCardBase = ({history}) => (
    <MDBCol lg='3' md='4' sm='6' xs='12' className='mb-4 d-flex'>
        <Card className='btn text-dark text-center d-flex flex-column w-100 brown lighten-5 align-items-center p-5'
        onClick={() => {history.push('/create')}}>
            <Fa icon="plus-square-o" size='5x' />
            <strong className='h5-responsive'> Add Author </strong>
        </Card>
    </MDBCol>
);


const AuthorListBase = ({ authors, history }) => (
    <>
    {console.log(authors)}
    {authors.length === 0 ?
        <div>
            No authors exist right now.
        </div>
        :
        <>
        {
            authors.map(author => (
                <AuthorCard key={author.authorId} author={author} imgFunction={() =>
                {history.push('/A/' + author.authorUrl)}} />
            ))
        }
        </>
    }
    </>
);

const AuthorList = withRouter(AuthorListBase);
const AddAuthorCard = withRouter(AddAuthorCardBase);

class Homepage extends React.Component {
    
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
            })) : [];
            
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
                <MDBRow className='container-fluid'>
                    {isModerator && <AddAuthorCard />}
                    <AuthorList authors={authors} />
                    
                </MDBRow>
            </Animation>
        )
    }
};

export default withFirebase(withAuth(Homepage));