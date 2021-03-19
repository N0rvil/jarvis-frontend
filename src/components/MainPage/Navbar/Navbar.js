import React from 'react';
import Cookies from 'js-cookie';

import history from '../../../history';

import './Navbar.scss';

class Navbar extends React.Component {

    
  
    render() { 
        return (
            <div className='navbar'>
                <div className='navbar__content'>
                    Other content
                </div>
                <div className='navbar__box'>
                    <button className='navbar__log-out' onClick={() => { Cookies.remove('loged'); history.replace('/login'); }}>Log out</button>
                </div>
            </div>
        )        
    }
};   


export default Navbar;