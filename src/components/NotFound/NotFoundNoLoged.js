import React from 'react';
import { Link } from 'react-router-dom';
// import history from '../../history';

import './NotFound.scss';

class NotFoundNoLoged extends React.Component {

  render() {
    return (
      <div className='notfound'>
        <h1 className='notfound__header'>404 - Not Found!</h1>
        <div>
          <img className='notfound__icon' src='./images/notfound-icon.png' alt='no-found-icon' />
        </div>
        <Link className='notfound__link' to="/">
          Go Back
        </Link>
      </div>
    )
  }
};

export default NotFoundNoLoged;