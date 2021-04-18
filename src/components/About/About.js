import React from 'react';
// import { Link } from 'react-router-dom';
// import history from '../../history';

import Navbar from '../NavbarLanding/NavbarLanding.js';

import './About.scss';

class About extends React.Component {

  render() {
    return (
        <div className='about' >  
            <div className='about__container' style={{backgroundImage: "url(/images/background.jpg)", backgroundepeat: 'no-repeat', backgroundSize: 'cover'}}>
                <Navbar />
                <div className='about__part'>
                    <div className='about__box'>
                        <h1 className='about__header'>About this app</h1>
                        <ul className='about__list'>
                            <li className='about__list-item'>version of the app: 1.0</li>
                            <li className='about__list-item'>lines of code: ???</li>
                            <li className='about__list-item'>Author: Filip Duda</li>
                            <li className='about__list-item'>First version relese date: 18.4.2021</li>
                        </ul>
                    </div>
                    <img className='about__icon-big' src='./images/info-icon.png' alt='info-icon' />
                </div>
            </div>
            <div className='about__container'>
                <div className='about__part'>
                    <div className='about__icon-box'>
                        <img className='about__icon-small' src='./images/react-icon.png' alt='react-icon' />
                        <img className='about__icon-small' src='./images/nodejs-icon.png' alt='nodejs-icon' />
                        <img className='about__icon-small' src='./images/sass-icon.png' alt='sass-icon' />
                    </div>
                    <div className='about__box'>
                        <h1 className='about__header'>Used technologies</h1>
                        <ul className='about__list'>
                            <li className='about__list-item'>React JS</li>
                            <li className='about__list-item'>Node JS</li>
                            <li className='about__list-item'>SASS</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='about__container' style={{backgroundImage: "url(/images/background.jpg)", backgroundepeat: 'no-repeat', backgroundSize: 'cover'}}>
                <div className='about__part'>
                    <div className='about__box'>
                        <h1 className='about__header'>For who ?</h1> 
                            <p className='about__list'> 
                                This app can use anybody who wants to. App was developed for making my life easier on daily bases. This app is on Heroku hosting and using 
                                free APIs. Thats mean the performance of this app is not 100% but for my this app served for developers purpose. By the time i want to add more 
                                features to this app so ENJOY.
                            </p>
                    </div>
                    <img className='about__icon-big' src='./images/man-icon.png' alt='man-icon' />
                </div>
            </div>
        </div>
    )
  }
  
};

export default About;