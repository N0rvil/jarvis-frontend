import React from 'react';
import { Link } from 'react-router-dom';
// import history from '../../history';

import Navbar from '../NavbarLanding/NavbarLanding.js';

import './VerifyEmail.scss';

class VerifyEmail extends React.Component {

  render() {
    return (
        <div className='verifyemail' style={{backgroundImage: "url(/images/background.jpg)", backgroundepeat: 'no-repeat', backgroundSize: 'cover'}}>
            <Navbar />
            <div className='verifyemail__box'>
                <h1 className='verifyemail__header'>Successfuly Registered</h1>
                <h2 className='verifyemail__text'>Now please verify your e-mail</h2>
                <Link to='/' className='verifyemail__link'>HomePage</Link>
            </div>
        </div>
    )
  }
  
};

export default VerifyEmail;