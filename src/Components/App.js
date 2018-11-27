import React from 'react';
import {Route, Switch} from "react-router";
import '../App.css';
// import {base} from '../base';
import Homepage from './Homepage';
import AuthorPage from './AuthorPage';
import Header from './Header'
import SessionProvider from './Session';
import AdminPage from './Admin';
import ErrorPage from './ErrorPage';


class App extends React.Component {
    
    render(){
        return(
            <>
                <Header/>
                <Switch>
                    <Route path='/admin' component={AdminPage}/>
                    <Route path='/A/:author' component={AuthorPage} />
                    {/*<Route path='/users/:id' component={UserPage}/>*/}
                    {/*<Route path='/users' component={UsersPage}/>*/}
                    <Route exact path='/' component={Homepage}/>
                    <Route path='/' component={ErrorPage}/>
                </Switch>
            </>
        )
    };
};

export default SessionProvider(App);
