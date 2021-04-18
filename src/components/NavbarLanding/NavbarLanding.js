import React from 'react';
import { Link } from 'react-router-dom';

import './NavbarLanding.scss';


class NavbarLanding extends React.Component {

  
    render() { 
        return (
            <div className='navbar-landing'>
                <img className='navbar-landing__logo' src='./images/jarvis-logo-2.png' alt='logo'/>
                <div className='navbar-landing__box'>
                    <div className='navbar-landing__unit'> 
                        <div className='navbar-landing__line'></div>
                        <div className='navbar-landing__cell'>
                            <Link className='navbar-landing__link' to="/">
                                home
                            </Link>
                        </div>
                        <div className='navbar-landing__line'></div>
                    </div>
                    <div className='navbar-landing__unit'>
                        <div className='navbar-landing__line'></div> 
                        <div className='navbar-landing__cell'>
                            <Link className='navbar-landing__link' to="/about">
                                about
                            </Link>
                        </div>
                        <div className='navbar-landing__line'></div>
                    </div>  
                    <div className='navbar-landing__unit'>
                        <div className='navbar-landing__line'></div> 
                        <div className='navbar-landing__cell'>
                            <Link className='navbar-landing__link' to="/login">
                                login
                            </Link>
                        </div>
                        <div className='navbar-landing__line'></div>
                    </div>
                    <div className='navbar-landing__unit'>
                        <div className='navbar-landing__line'></div> 
                        <div className='navbar-landing__cell'>
                            <Link className='navbar-landing__link' to="/register">
                                register
                            </Link>
                        </div>
                        <div className='navbar-landing__line'></div>
                    </div>
                </div>
            </div>
        )        
    }
};   


export default NavbarLanding;