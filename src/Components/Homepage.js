import React from 'react';
import {Link} from 'react-router-dom';
import Header from './Header';

function Homepage (props) {
    return (
        <>
            <Header />
            <div className='w-100 text-center h1 p-2'>
                Homepage
                <hr />
            </div>
            <div className='container'>
                {props.AuthorList.map((Author) => {
                    return (
                        <Link to={Author.URLName} className='row p-2 m-1  btn btn-primary w-100'> {Author.Name}
                        </Link>
                    )
                })}
            </div>
        </>
    )
}

export default Homepage;