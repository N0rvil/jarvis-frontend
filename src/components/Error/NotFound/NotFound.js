import React from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { url } from '../../url';

import Loading from '../Loading/LoadingPage';

import './NotFound.scss';

class NotFoundLoged extends React.Component {

  state={ isLoged: null, admin: false }

  checkLoginReq() {  
    axios({
       method: 'POST',
       url: `${url}/checklogin`,
       data: Cookies.get(),
   })
   .then(response =>  {
    if (response.data.note === 'verified') {
        this.setState({ isLoged: true, admin: response.data.admin })
    } else {
        this.setState({ isLoged: false })
    }
   })
   .catch(err => console.log(err));
}

componentDidMount() {
  this.checkLoginReq();
}
  render() {
    if (this.state.isLoged === false) {
      return (
        <div className='notfound'>
          
          <h1 className='notfound__header'>404 - Not Found</h1>
          <div>
            <img className='notfound__icon' src='./images/svg/error.svg' alt='no-found-icon' />
          </div>
          <Link className='notfound__link' to="/">
            Go Back
          </Link>
        </div>
      )
  } else if (this.state.isLoged === null) {
    return <Loading />
  } else {
    if (this.state.admin === false) {
      return (
        <div className='notfound'>
          
          <h1 className='notfound__header'>404 - Not Found</h1>
          <div>
            <img className='notfound__icon' src='./images/svg/error.svg' alt='no-found-icon' />
          </div>
          <Link className='notfound__link' to="/main-page">
            Go Back
          </Link>
        </div>
      )
    } else {
      return (
        <div className='notfound'>
          
          <h1 className='notfound__header'>404 - Not Found</h1>
          <div>
            <img className='notfound__icon' src='./images/svg/error.svg' alt='no-found-icon' />
          </div>
          <Link className='notfound__link' to="/admin/home">
            Go Back
          </Link>
        </div>
      )
    }
    
  }
    }
};

export default NotFoundLoged;