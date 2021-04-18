import React from 'react';
// import { Link } from 'react-router-dom';
// import history from '../../history';

import Navbar from '../NavbarLanding/NavbarLanding.js';

import './LandingPage.scss';

class LandingPage extends React.Component {

  render() {
    return (
      <div className='landingpage' style={{backgroundImage: "url(/images/background.jpg)", backgroundepeat: 'no-repeat', backgroundSize: 'cover'}}>
          <Navbar />
        <div className='landingpage__box'>
            <h1 className='landingpage__header'>welcome in app jarvis</h1>
            <div className='landingpage__line'></div>
            <h2 className='landingpage__text'>app which you can use on dayly bases</h2>
            <div className='landingpage__images'>
                <img className='landingpage__icon' src='./images/calendar-icon.png' alt='icon' />
                <img className='landingpage__icon' src='./images/money-icon.png' alt='icon' />
                <img className='landingpage__icon' src='./images/weather-icon.png' alt='icon' />
            </div>
        </div>
      </div>
    )
  }
  
};

export default LandingPage;