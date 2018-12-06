import React from 'react';
import {withFirebase} from "../Firebase/context";
import {Animation} from 'mdbreact'
import {withSession} from "../Session/context";
import AuthorList from './AuthorList';
import AdminHeader, {ABtn} from '../Header/AdminHeader';
import {Fa} from 'mdbreact';

class Homepage extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.addedAuthor = this.addedAuthor.bind(this);
        
        this.state = {
            loading: false,
            adminView: false,
            authors: [],
        };
    }
    
    componentDidMount() {
        this.setState({ loading: true });
    
        this.props.session.setState({
            activeUrl: 'home'
        });
        
        this.ref = this.props.firebase.authors();
        
        this.ref.on('value', snapshot => {
            const authorObject = snapshot.val();
            
            const authorList = authorObject ? Object.keys(authorObject).map(authorId => ({
                authorId: authorObject[authorId]
            })) : [];
            
            this.setState({
                authors: authorList,
                loading: false
            });
        });
    }
    
    componentWillUnmount() {
        if(this.ref) this.ref.off();
    }
    
    componentWillUpdate(nextProps, nextState){
        // if users have changed
        if(nextState.addEditCard && (!this.props.session.state.role || this.props.session.state.role !== 'admin')){
            this.setState({addEditCard: false});
        }
        if(nextState.loadAdminView && (!this.props.session.state.role || this.props.session.state.role !== 'admin')){
            this.setState({loadAdminView: false});
        }
        if(!nextState.loadAdminView && nextState.addEditCard){
            this.setState({addEditCard: false});
        }
    }
    
    addedAuthor = () => {
        this.setState({addEditCard: false});
    };
    
    
    render () {
        const { authors, loading, addEditCard, loadAdminView: showAdminView } = this.state;
        
        if(loading) {
            return (
                <div className='container-fluid text-center h1'>
                    <Fa icon="refresh" spin size="1x" fixed/> Loading Authors...
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
                            Hide Controls
                        </ABtn>
                    </AdminHeader>
                    :
                    <AdminHeader reqPerm={'admin'}>
                        <ABtn clickFunction={() => this.setState({loadAdminView: !showAdminView})}>
                            Show Controls
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

export default withFirebase(withSession(Homepage));