import React from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const SessionProvider = Component => {
    class WithAuthentication extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                loading: true,
                user: null,
                author: null,
            };
        }

        componentDidMount() {
            this.listener = this.props.firebase.auth.onAuthStateChanged(
                authUser => {
                    authUser
                        ? this.setState({ user: authUser, loading: false })
                        : this.setState({ user: null, loading: false });
                },
            );
        }

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