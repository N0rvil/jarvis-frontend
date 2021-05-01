import React from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
// import history from '../../history';
import { url } from '../../url';

import NotFound from '../../Error/NotFound/NotFound';
import LoadingPage from '../../Error/Loading/LoadingPage';
import User from './User';

import './UsersManagement.scss';

class UsersManagement extends React.Component {

    state = { isLoged: null, admin: false, users: [], sesions: null }

    checkLoginReq() {  
        axios({
           method: 'POST',
           url: `${url}/checklogin`,
           data: Cookies.get(),
       })
       .then(response =>  {
        if (response.data.note !== 'verified') {
            this.setState({ isLoged: false })
        } else {
            this.setState({ isLoged: true, admin: response.data.admin })
        }
       })
       .catch(err => console.log(err));
   }

    getAllUsers() {
        axios({
            method: 'GET',
            url: `${url}/getallusers`,
        })
        .then(response =>  {
            this.setState({ users: response.data.users })
        })
        .catch(err => console.log(err));
    }


   componentDidMount() {
       this.checkLoginReq();
       this.getAllUsers();
   }

  render() {
      if (this.state.isLoged === false) {
          return <NotFound />
      } else if (this.state.isLoged === null) {
          return <LoadingPage />
      } else {
          if (this.state.admin === false) {
            return <NotFound />
          } else {
            return (
                <div className='usersManagement'>
                    <User users={this.state.users} />        
                </div>
            )
          }
      }
  }
  
};

export default UsersManagement;