import React from 'react';
import { Link } from 'react-router-dom';
// import history from '../../history';

import './VerifyEmail.scss';

class VerifyEmail extends React.Component {

  render() {
    return (
        <div className='verifyemail'>
            
            <div className='verifyemail__box'>
                <h1 className='verifyemail__header'>Successfuly Registered</h1>
                <img className='verifyemail__icon' src='./images/svg/check.svg' alt='exit-icon' /> 
                <h2 className='verifyemail__text'>Now please verify your e-mail</h2>
                <Link to='/' className='verifyemail__link'>HomePage</Link>
            </div>
        </div>
    )
  }
  
};

export default VerifyEmail;