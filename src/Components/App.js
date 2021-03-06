import React from 'react';
import {Route, Switch} from "react-router";
import '../App.css';
// import {base} from '../base';
import Homepage from './Homepage/Homepage';
import AuthorPage from './Author/AuthorPage';
import SessionProvider from './Session';
import AdminPage from './Admin/users';
import ErrorPage from './ErrorPage';
import {UserPage, UsersPage} from './Admin'
import Header from './Header/Header'

class App extends React.Component {
    render(){
        return(
            <>
                {/*<Header/>*/}
                <Header/>
                <Switch>
                    <Route path='/admin' component={AdminPage}/>
                    <Route path='/A/:authorUrl' component={AuthorPage} />
                    <Route path='/users/:id' component={UserPage}/>
                    <Route path='/users' component={UsersPage}/>
                    <Route exact path='/' component={Homepage}/>
                    <Route path='/' component={ErrorPage}/>
                </Switch>
            </>
        )
    };
};

export default SessionProvider(App);
