import React from 'react';
import { Link } from 'react-router-dom';

import './AdminNavbar.scss';

class AdminNavbar extends React.Component {

  render() {
    return (
        <div className='adminNavbar'>
            <Link className='adminNavbar__item' to='/admin/home'>home</Link>
            <Link className='adminNavbar__item' to='/admin/users-management'>users management</Link>
            <Link className='adminNavbar__item' to='/admin/graphs'>graphs</Link>
        </div>
    )
  }
  
};

export default AdminNavbar;