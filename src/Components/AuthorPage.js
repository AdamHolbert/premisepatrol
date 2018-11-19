import React from 'react';
import {Route, Switch} from "react-router";

import Wikipedia from './Wikipedia';
import Forum from './Forum';
import Header from './Header';

class AuthorPage extends React.Component {
    
    render() {
        var Author = getAuthor(this.props.AuthorList, this.props.match.params.Author);
        if(!Author){
            return(
                <>
                    <Header/>
                    Invalid Author.
                </>
            )
        }
        
        return (
            <>
                <Header Author={Author}/>
                {!this.props.match.isExact ?
                    <Switch>
                        <Route path= {'/' + Author.URLName + '/Wikipedia'}
                               render={(props) => <Wikipedia Author={Author}/>}/>
                        <Route path= {'/' + Author.URLName + '/Forum'}
                               render={(props) => <Forum Author={Author} />}/>
                    </Switch>
                :
                    <div className='w-100 text-center h1 p-2'>
                        {Author.Name}
                        <hr />
                    </div>
                }
            </>
        )
    }
}
function getAuthor(AuthorList, Author){
    return AuthorList.filter(author => {return author.URLName === Author})[0];
}

export default AuthorPage;