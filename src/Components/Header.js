import React from 'react';
import {Link} from 'react-router-dom';

class Header extends React.Component {
    
    render() {
        return (
            <header className='container-fluid bg-secondary row m-0 p-2'>
                <div className='p-0 col text-left'>
                    <Link className='p-2 btn btn-dark' to='/'>Home</Link>
                </div>
                <nav className='p-0 col-6 justify-content-start'>
                    {
                        this.props.Author
                            &&
                        <>
                            <Link className='p-2 btn btn-dark mx-2' to={'/' + this.props.Author.URLName}>{this.props.Author.Name}'s Page</Link>
                            <Link className='p-2 btn btn-dark mx-2' to={'/' + this.props.Author.URLName + '/Wikipedia'}>Wikipedia</Link>
                            <Link className='p-2 btn btn-dark mx-2' to={'/' + this.props.Author.URLName + '/Forum'}>Forum</Link>
                        </>
                    }
                </nav>
                <div className='p-0 col text-right'>
                {
                    !this.props.LoggingIn &&
                    (
                        this.props.loggedIn ?
                            <Link className='p-2 btn btn-dark' to='/Login'>LOG OUT</Link>
                        :
                            <Link className='p-2 btn btn-dark' to='/Login'>LOGIN</Link>
                    )
                }
                </div>
            </header>
        )
    }
    
}
export default Header;