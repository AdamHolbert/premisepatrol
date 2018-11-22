import React from 'react';
import {Link} from 'react-router-dom';

function Homepage (props) {
    console.log(props);
    
    return (
        <>
            <div className='w-100 text-center h1 p-2'>
                Homepage
                <hr />
            </div>
            <div className='container'>
                {props.AuthorList ?
                    props.AuthorList.length > 0 ?
                        (Object.keys(props.AuthorList).map((id) => {
                            var Author = props.AuthorList[id];
                            return (
                                <Link key={id} to={Author.URLName} className='row p-2 m-1  btn btn-primary w-100'> {Author.Name}
                                </Link>
                            )
                        }))
                    :
                        <>
                            No authors exist right now.
                        </>
                :
                    <>
                    Loading Authors
                    </>
                }
            </div>
        </>
    )
}

export default Homepage;