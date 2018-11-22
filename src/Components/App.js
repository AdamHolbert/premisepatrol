import React from 'react';
import {Route, Switch} from "react-router";
import '../App.css';
// import {base} from '../base';
import Homepage from './Homepage';
import AuthorPage from './AuthorPage';
import Login from './Authentication/RegisterPage';
import Header from './Header'

const INITIAL_STATE = {
    AuthorList: {},
    AuthorName: "",
};

class App extends React.Component {
    
    constructor() {
        super();
        
        this.state = {...INITIAL_STATE};
    }
    
    render() {
        return (
            <>
                <Header/>
                <Switch>
                    {
                        this.state.AuthorList && this.state.AuthorList.length > 0
                            &&
                        <Route path='/:Author' components={AuthorPage()}/>
                    }
                    <Route path='/' render={(props) => <Homepage {...props} AuthorList={this.state.AuthorList}/>}/>
                </Switch>
            </>
        );
    }
}

export default App;
