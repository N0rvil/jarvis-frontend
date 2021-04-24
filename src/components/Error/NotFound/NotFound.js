import React from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { url } from '../../url';

import Navbar from '../../Navbar/Navbar';
import Loading from '../Loading/LoadingPage';

import './NotFound.scss';

class NotFoundLoged extends React.Component {

  state={ isLoged: null }

  checkLoginReq() {  
    axios({
       method: 'POST',
       url: url,
       data: Cookies.get(),
   })
   .then(response =>  {
    if (response.data.note === 'verified') {
        this.setState({ isLoged: true })
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
          <Navbar />
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
    return (
      <div className='notfound'>
        <Navbar />
        <h1 className='notfound__header'>404 - Not Found</h1>
        <div>
          <img className='notfound__icon' src='./images/svg/error.svg' alt='no-found-icon' />
        </div>
        <Link className='notfound__link' to="/main-page">
          Go Back
        </Link>
      </div>
    )
  }
    }
};

export default NotFoundLoged;