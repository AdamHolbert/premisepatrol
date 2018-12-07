import React from 'react';
import { Navbar, NavbarBrand, NavbarNav, NavItem, NavLink, NavbarToggler, Collapse, Fa } from "mdbreact";

import favicon from '../../favicon.png';
import {withSession} from "../Session/index"
import {withFirebase} from "../Firebase/index";
import SignInPage from '../Authentication/SignInPage'
import RegisterPage from '../Authentication/RegisterPage'
import PasswordForgetPage from '../Authentication/PasswordReset'

const UserLoginBtn = (props) => {
    const {logout } = props;
    const {drawerOpen, loading, user} = props.session.state;
    const { showDrawer } = props.session;
    
    if(loading){
        return (
            <NavItem disabled className='p-2 btn btn-dark mx-2'>
                Loading...
            </NavItem>
        )
    }
    
    return (
        <NavItem className='p-2 btn btn-dark mx-2'
             onClick={user ? () => logout() :
                 drawerOpen ? () => showDrawer(false) : () => showDrawer(true)}>
            {loading ? "Loading..." :
                user ? <>{user.username} <Fa icon="user" /> </> :
                    drawerOpen ? "CLOSE" :
                        "LOGIN"
            }
        </NavItem>
    );
};

const AdminPanel = ({firebase, session, role}) => {
    
    if(role){
        return (
            <div className='btn-group'>
                <div className='btn btn-red'onClick={() =>
                    firebase.doSignOut()}>
                    {role}
                </div>
            </div>
        );
    }
    
    return(
        <div className='btn-group'>
            <div className='btn btn-dark' onClick={() =>
                firebase.doSignOut().then(() => {
                    session.isLoading(true);
                    firebase.adamLog().finally(() => {session.isLoading(false)})})
            }>Adam</div>
            <div className='btn btn-dark' onClick={() => {
                firebase.doSignOut().then(() => {
                    session.setState({loading: true});
                    firebase.anonLog().finally(() => {session.setState({loading: false})})})}
            }>Anon</div>
            <div className='btn btn-dark' onClick={() =>
                firebase.doSignOut().then(() => {
                    session.setState({loading: true});
                    firebase.dakotaLog().finally(() => {session.setState({loading: false})})})
            }>Dakota</div>
        </div>
    )
};

const AuthPopout = (props) => {
    const {tab, setTab} = props;
    const {drawerOpen, user} = props.session.state;
    if(!drawerOpen || user) {
        return null;
    }
    
    return (
        <div className='container w-75 rounded-bottom text-center bg-secondary bg-secondary-darker p-3 mb-2'>
            <div className='nav nav-tabs justify-content-center'>
                <div className={'nav-item nav-link unselectable-text mx-1' + (tab === 'register' ? ' active' : '')}
                     onClick={() => setTab('register')}>Register
                </div>
                <div className={'nav-item nav-link unselectable-text mx-1' + (tab === 'login' ? ' active' : '')}
                     onClick={() => setTab('login')}>Login
                </div>
                <div className={'nav-item nav-link unselectable-text mx-1' + (tab === 'forgot' ? ' active' : '')}
                     onClick={() => setTab('forgot')}>Forgot password
                </div>
            </div>
            {tab === 'register' && <RegisterPage/>}
            {tab === 'login' && <SignInPage/>}
            {tab === 'forgot' && <PasswordForgetPage/>}
        </div>
    );
};

const INITIAL_STATE = {
    expanded: false,
    tab: 'login',
    collapsed: true,
    showAllLinks: false
};

class Header extends React.Component {
    
    constructor() {
        super();
        this.logout = this.logout.bind(this);
        this.setTab = this.setTab.bind(this);
        this.toggleShowAllLinks = this.toggleShowAllLinks.bind(this);
        this.state = {...INITIAL_STATE};
    }
    
    toggleShowAllLinks = () => this.setState({ showAllLinks: !this.state.showAllLinks });
    
    render() {
        const { tab, showAllLinks } = this.state;
        const {firebase, session} = this.props;
        const { author, activeUrl, role, clicks } = session.state;
        
        return (
            <>
                <Navbar color='stylish-color' dark expand='lg'>
                    <NavbarBrand className='white-text'>
                        <img src={favicon} width="30" height="30" className="d-inline-block mr-2" alt=""
                            onClick={() => session.setState({clicks: (clicks ? clicks+1 : 1)})}
                        />
                        <strong>PremisePatrol</strong>
                    </NavbarBrand>
                    <NavbarToggler
                        onClick={this.toggleShowAllLinks}
                    />
                    <Collapse isOpen={showAllLinks} navbar>
                        <NavbarNav left>
                            <NavItem active={activeUrl==='home'}>
                                <NavLink to='/'>Home</NavLink>
                            </NavItem>
                            {author &&
                                <>
                                    <NavItem active={activeUrl==='author'}>
                                        <NavLink to={'/A/' + author.authorUrl}>{author.authorTitle}'s Page</NavLink>
                                    </NavItem>
                                    <NavItem active={activeUrl==='wiki'}>
                                        <NavLink disabled to={'/A/' + author.authorUrl + '/wikipedia/Home'}>Wikipedia</NavLink>
                                    </NavItem>
                                    <NavItem active={activeUrl==='forum'}>
                                        <NavLink to={'/A/' + author.authorUrl + '/forum/Home'}>Forum</NavLink>
                                    </NavItem>
                                </>
                            }
                        </NavbarNav>
                        <NavbarNav right>
                            {clicks > 3 &&
                                <NavItem>
                                    <AdminPanel role={role} firebase={firebase} session={session} />
                                </NavItem>
                            }
                            <NavItem tag='div'>
                                <UserLoginBtn logout={this.logout} session={session} />
                            </NavItem>
                        </NavbarNav>
                    </Collapse>
                </Navbar>
                <AuthPopout session={session} tab={tab} setTab={this.setTab}/>
            </>
        );
    }
    
    collapse() { this.setState({expanded: false}) }
    expand() { this.setState({expanded: true}) }
    setTab(text) { this.setState({tab: text}) }
    
    logout() {
        this.props.firebase.doSignOut()
            .then(() => {
                this.setState({ ...INITIAL_STATE });
            })
            .catch(error => {
                this.setState({ error: error });
            });
    }
}

export default withFirebase(withSession(Header));