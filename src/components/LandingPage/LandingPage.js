import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
// import { Link } from 'react-router-dom';
import history from '../../history';
import { url } from '../url';


import LoadingPage from '../Error/Loading/LoadingPage';

import './LandingPage.scss';
import '../styles/Buttons.scss';

class LandingPage extends React.Component {

  state = { isLoged: null }

  checkLoginReq() {  
    axios({
       method: 'POST',
       url: `${url}/checklogin`,
       data: Cookies.get(),
   })
   .then(response =>  {
    if (response.data.note === 'verified') {
        this.setState({ isLoged: true });
        history.replace('/main-page')
    } else {
        this.setState({ isLoged: false });
    }
   })
   .catch(err => console.log(err));
  }

  componentDidMount() {
    this.checkLoginReq();
  }


  render() {
   if (this.state.isLoged === null) {
      return <LoadingPage />
    } else {
      return (
        <div className='landingpage'>
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
  }
};

export default LandingPage;