import React from 'react';
import {Route, Switch} from "react-router";

import Wikipedia from './Wikipedia';
import Forum from './Forum';
import Header from './Header';

function AuthorPage (props) {
    
    var Author = getAuthor(props.AuthorList, props.match.params.Author);
    if(!Author){
        return(
            <>
                Invalid Author.
            </>
        )
    }
    
    return (
        <>
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

function getAuthor(AuthorList, Author){
    for( var i = 0; i < AuthorList.length; i++){
        var tempAuthor = AuthorList[i];
        if(tempAuthor.URLName === Author){
            return tempAuthor;
        }
    }
    return null;
}

export default AuthorPage;