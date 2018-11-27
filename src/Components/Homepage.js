import React from 'react';
import {Link} from 'react-router-dom';
import {withFirebase} from "./Firebase/context";

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
                <Link key={author.urlName} to={'/A/' + author.urlName}
                      className='row p-2 m-1 btn btn-primary w-100'> {author.username} </Link>
            ))
        }
        </>
    }
    </>
);

class Homepage extends React.Component {
    
    // createAuthor = (username, urlName) => {
    //     // const { username, email, passwordOne } = this.state;
    //     // this.setState({loading: true});
    //     this.props.firebase.author(urlName)
    //         .set({
    //             username,
    //             urlName,
    //         })
    //         .then(author => {
    //             console.log(author)
    //         })
    //         .catch(error => {
    //             console.log("Failed")
    //             this.setState({ error });
    //         });
    //
    // };
    
    constructor(props) {
        super(props);
        
        this.state = {
            loading: false,
            authors: [],
        };
    }
    
    componentDidMount() {
        this.setState({ loading: true });
        
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
        if(loading) {
            return (
                <div className='container-fluid text-center h1'>
                    {/*Loading Authors...*/}
                </div>
            );
        }
        
        return(
            <>
                <div className='w-100 text-center h1 p-2'>
                    Homepage
                    <hr/>
                </div>
                <div className='container-fluid'>
                    <AuthorList authors={authors} />
                </div>
            </>
        )
    }
};

export default withFirebase(Homepage);