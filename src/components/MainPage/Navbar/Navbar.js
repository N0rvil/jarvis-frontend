import React from 'react';
import Cookies from 'js-cookie';

import history from '../../../history';

import './Navbar.scss';

class Navbar extends React.Component {

    logOut() {
        history.replace('/');
        Cookies.remove('loged');
        window.location.reload();
    }

    
  
    render() { 
        return (
            <div className='navbar'>
                <div className='navbar__content'>
                    Other content
                </div>
                <div className='navbar__box'>
                    <button className='navbar__log-out' onClick={() => this.logOut()}>Log out</button>
                </div>
            </div>
        )        
    }
};   


export default Navbar;