import React from 'react';
import {withFirebase} from "../Firebase/context";
import {Animation} from 'mdbreact'
import {withAuth} from "../Session/context";
import AuthorList from './AuthorList';
import AdminHeader, {ABtn} from '../Header/AdminHeader';

class Homepage extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.addedAuthor = this.addedAuthor.bind(this);
        
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
    
    addedAuthor = () => {
        this.setState({addEditCard: false});
    };
    
    componentWillUnmount() {
        this.props.firebase.users().off();
    }
    
    render () {
        const { authors, loading, addEditCard, loadAdminView: showAdminView } = this.state;
        
        if(loading) {
            return (
                <div className='container-fluid text-center h1'>
                    Loading Authors...
                </div>
            );
        }
        
        return(
            <>
                {
                showAdminView ?
                    <AdminHeader reqPerm={'admin'}>
                        <ABtn clickFunction={() => this.setState({addEditCard: !addEditCard})}>
                            {addEditCard ? 'Cancel' : 'Add author'}
                        </ABtn>
                        <ABtn clickFunction={() => this.setState({loadAdminView: !showAdminView})}>
                            Hide admin view
                        </ABtn>
                    </AdminHeader>
                    :
                    <AdminHeader reqPerm={'admin'}>
                        <ABtn clickFunction={() => this.setState({loadAdminView: !showAdminView})}>
                            Show admin view
                        </ABtn>
                    </AdminHeader>
                }
                <Animation className='w-100 mt-4' type='fadeIn'>
                    <AuthorList authors={authors}
                                adminView={showAdminView}
                                addEditCard={addEditCard}
                                addedAuthor={this.addedAuthor}
                    />
                </Animation>
            </>
        )
    }
}

export default withFirebase(withAuth(Homepage));