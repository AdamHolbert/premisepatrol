import React from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const SessionProvider = Component => {
    class WithAuthentication extends React.Component {
        constructor(props) {
            super(props);

            this.isLoading = this.isLoading.bind(this);
            this.showDrawer = this.showDrawer.bind(this);
            this.roleCheck = this.roleCheck.bind(this);
            
            this.state = {
                loading: true,
                user: null,
                author: null,
                firstLoad: true,
                drawerOpen: false,
                clicks: 0
            };
        }

        componentDidMount() {
            this.listener = this.props.firebase.auth.onAuthStateChanged(
                authUser => {
                    let mergedData = null;
                    
                    if(authUser){
                        this.props.firebase.user(authUser.uid).once('value', SNAPSHOT => {
                            mergedData = {...authUser, ...SNAPSHOT.val()};
                            this.setState(this.state.firstLoad ?
                                { user: mergedData || authUser || null, loading: false, firstLoad: false } :
                                { user: mergedData || authUser || null });
                        })
                    } else {
                        this.setState(this.state.firstLoad ?
                            { user: authUser || null, loading: false, firstLoad: false } :
                            { user: authUser || null });
                    }
                });
        }
        
        componentWillUpdate(nextProps, nextState){
            // if users have changed
            if(this.state.user !== nextState.user){
                // update the current loaded permissions
                this.updatePermissions(nextState);
                
            }
            if(this.state.authorId !== nextState.authorId){
                // update the current loaded permissions
                this.updatePermissions(nextState);
                
            }
        }
        
        updatePermissions = ({user, authorId}) => {
            
            const {firebase} = this.props;
            if(!user){
                this.setState({
                    role: null
                });
                return;
            }
            firebase.admin(user.uid).once('value', snapshot => {
                const userPermissions = snapshot.val();
                if(userPermissions){
                    this.setState({
                        role: 'admin'
                    });
                    return;
                }
                if(!authorId){
                    this.setState({
                        role: 'user'
                    });
                    return;
                }
                this.props.firebase.permission(authorId, user.uid).once('value', snapshot => {
                    const userPermissions = snapshot.val();
                    this.setState({
                        role: userPermissions ? userPermissions : 'user'
                    });
                    if(!userPermissions) {
                        this.props.firebase.permission(authorId, user.uid)
                            .set('user');
                    }
                });
            });
        };
        
        roleCheck(roleList) {
            const { role } = this.state;
            const regex = roleList ? new RegExp('^(' + roleList + ')$', 'gi') : null;
            return !!(role && (!regex || role.match(regex)));
        };
        
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