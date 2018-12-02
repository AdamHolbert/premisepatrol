import React from 'react';
import {withFirebase} from "../Firebase/context";
import {Animation} from 'mdbreact'
import {withAuth} from "../Session/context";
import AuthorList from './AuthorList';

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
                loadAdminView: true
            });
        });
    }
    
    componentWillUpdate(nextProps, nextState){
        // if users have changed
        if(nextState.addEditCard && (!this.props.session.state.role || this.props.session.state.role !== 'admin')){
            this.setState({addEditCard: false});
        }
        if(nextState.loadAdminView && (!this.props.session.state.role || this.props.session.state.role !== 'admin')){
            this.setState({loadAdminView: false});
        }
    }
    
    componentWillUnmount() {
        this.props.firebase.users().off();
    }
    
    render () {
        const { authors, loading, addEditCard, loadAdminView } = this.state;
        const { role } = this.props.session.state;
        if(loading) {
            return (
                <div className='container-fluid text-center h1'>
                    Loading Authors...
                </div>
            );
        }
        const isAdmin = role && role.match(/^(admin)$/);
        const showAdminView = isAdmin && loadAdminView;
        return(
            <>
                {isAdmin && (
                    showAdminView ?
                        <div className='w-100 d-flex flex-row justify-content-end' >
                            <div className='m-0 p-0 color flex-center'
                                 onClick={() => this.setState({addEditCard: !addEditCard})}>
                                <div className="btn btn-dark p-1 m-0 rounded-0 mx-1">
                                    {addEditCard ? 'Cancel' : 'Add author'}
                                </div>
                            </div>
                            <div className='m-0 p-0 color flex-center'
                                 onClick={() => this.setState({loadAdminView: !loadAdminView})}>
                                <div className="btn btn-dark p-1 m-0 rounded-0 mx-1">
                                    Hide admin view
                                </div>
                            </div>
                        </div>
                        :
                        <div className='w-100 d-flex flex-row justify-content-end' >
                            <div className='m-0 p-0 color flex-center'
                                 onClick={() => this.setState({loadAdminView: !loadAdminView})}>
                                <div className="btn btn-dark p-1 m-0 rounded-0 mx-1">
                                    Show admin view
                                </div>
                            </div>
                        </div>
                )}
                <Animation type='fadeIn'>
                    <div className='w-100 text-center h1 p-2'>
                        Homepage
                        <hr/>
                    </div>
                    <AuthorList authors={authors} adminView={showAdminView} addEditCard={addEditCard} />
                    
                </Animation>
            </>
        )
    }
}

export default withFirebase(withAuth(Homepage));