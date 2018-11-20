import React from 'react';
import {Route, Switch} from "react-router";
import '../App.css';
import {base} from '../base';
import Homepage from './Homepage';
import AuthorPage from './AuthorPage';
import Login from './Login';


class App extends React.Component {
    constructor() {
        super();
        this.addAuthor = this.addAuthor.bind(this);
        this.state = {
            AuthorList: {
            }
        }
    }
    
    componentWillMount() {
        this.AuthorsRef = base.syncState('AuthorList',
            {
                context: this,
                state: 'AuthorList'
            });
    }

    componentWillUnmount() {
        base.removeBinding(this.AuthorsRef);
    }

    addAuthor(URLName, Name){
        const AuthorList = {...this.state.AuthorList};
        const id = Date.now();
        AuthorList[id] = {
            id: id,
            URLName: URLName,
            Name: Name
        };
        
        this.setState({AuthorList});
        return id;
    }
    
    render() {
        console.log(base)
        return (
            <>
                <Switch>
                    <Route exact path='/login' render={(props) => <Login {...props} AuthorList={this.state.AuthorList}/>}/>
                    <Route path='/:Author' render={(props) => <AuthorPage {...props} AuthorList={this.state.AuthorList}/>}/>
                    <Route path='/' render={(props) => <Homepage {...props} AuthorList={this.state.AuthorList}/>}/>
                </Switch>
            </>
        );
    }
}

export default App;
