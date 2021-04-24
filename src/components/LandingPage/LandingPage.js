import React from 'react';
import { Link } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import history from '../../history';

import Navbar from '../Navbar/Navbar.js';

import './LandingPage.scss';
import '../styles/Buttons.scss';

class LandingPage extends React.Component {

  render() {
    return (
      <div className='landingpage'>
          <Navbar />
        <div className='landingpage__box'>
            <h1 className='landingpage__header'>jarvis - app for dayli usage</h1>
            <div className='landingpage__line'></div>
            <h2 className='landingpage__text'>Are you exited ? You can start right now !</h2>
            <Link  to='/register'>
              <button className='btn__yellow-huge'>Get started</button>
            </Link>
            <div className='landingpage__images'>
                <img className='landingpage__icon' src='./images/calendar-icon.png' alt='icon' />
                <h2 className='landingpage__dotes'>.....................</h2>
                <img className='landingpage__icon' src='./images/money-icon.png' alt='icon' />
                <h2 className='landingpage__dotes'>.....................</h2>
                <img className='landingpage__icon' src='./images/weather-icon.png' alt='icon' />
            </div>
        </div>
      </div>
    )
  }
  
};

export default LandingPage;