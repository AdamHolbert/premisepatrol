import React, { Component } from 'react';
import {Route, Switch} from "react-router";
import '../App.css';

import Homepage from './Homepage';
import AuthorPage from './AuthorPage';
import Login from './Login';

class App extends Component {
    
    AuthorList = [
        {"URLName":"DakotaKrout",
            "Name" : "Dakaota Krout"},
        {"URLName": "AdamHolbert",
            "Name" : "Adam Holbert"}
    ];
    
    render() {
        return (
            <>
                <Switch>
                    <Route exact path='/login' render={(props) => <Login {...props} AuthorList={this.AuthorList}/>}/>
                    <Route path='/:Author' render={(props) => <AuthorPage {...props} AuthorList={this.AuthorList}/>}/>
                    <Route path='/' render={(props) => <Homepage {...props} AuthorList={this.AuthorList}/>}/>
                </Switch>
            </>
        );
    }
}

export default App;
