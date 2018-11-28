import React from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const SessionProvider = Component => {
    class WithAuthentication extends React.Component {
        constructor(props) {
            super(props);

            this.isLoading = this.isLoading.bind(this);
            this.showDrawer = this.showDrawer.bind(this);
            
            this.state = {
                loading: true,
                user: null,
                author: null,
                firstLoad: true,
                drawerOpen: false
            };
        }

        componentDidMount() {
            this.listener = this.props.firebase.auth.onAuthStateChanged(
                authUser => this.setState(
                    this.state.firstLoad ?
                        { user: authUser || null, loading: false, firstLoad: false } :
                        { user: authUser || null }
                )
            );
        }
    
        isLoading(bool) { this.setState({loading: bool}); }
        showDrawer(bool) { this.setState({drawerOpen: bool}); }
    
        componentWillUnmount() {
            this.listener();
        }

        render() {
            return (
                <AuthUserContext.Provider value={this}>
                    <Component {...this.props} session={this} />
                </AuthUserContext.Provider>
            );
        }
    }

    return withFirebase(WithAuthentication);
};

export default SessionProvider;