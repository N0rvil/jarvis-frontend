import React from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
// import history from '../../history';
import { url } from '../../url';

import NotFound from '../../Error/NotFound/NotFound';
import LoadingPage from '../../Error/Loading/LoadingPage';

import './AdminHome.scss';



class AdminHome extends React.Component {

    state = { 
        isLoged: null,
        admin: false,
        numberOfusers: null,
        numberOfAdmins: null,
        numberOfBannedUsers: null,
        todayLogins: null,
        monthLogins: null,
        totalLogins: null,
        numberOfNotes: null,
        numberOfEvents: null,
        numberOfLinks: null,
    }

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

   getUsersData() {
       axios({
           method: 'GET',
           url: `${url}/getusersdata`,
       })
       .then(response =>  {
           this.setState({ 
                numberOfusers: response.data.numberOfusers,
                numberOfAdmins: response.data.numberOfAdmins,
                numberOfBannedUsers: response.data.numberOfBannedUsers,
                todayLogins: response.data.todayLogins,
                monthLogins: response.data.monthLogins,
                totalLogins: response.data.totalLogins, 
                numberOfNotes: response.data.numberOfNotes,
                numberOfEvents: response.data.numberOfEvents,
                numberOfLinks: response.data.numberOfLinks
            })
       })
       .catch(err => console.log(err));
   }

   componentDidMount() {
       this.getUsersData();
       this.checkLoginReq();
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
                <div className='adminhome'>
                    <div className='adminhome__content'>
                        <div className='adminhome__data'>
                            <h3 className='adminhome__titles'>users: <h2 className='adminhome__num'>{this.state.numberOfusers}</h2></h3>
                            <h3 className='adminhome__titles'>admins: <h2 className='adminhome__num'>{this.state.numberOfAdmins}</h2></h3>
                            <h3 className='adminhome__titles'>banned users: <h2 className='adminhome__num'>{this.state.numberOfBannedUsers}</h2></h3>
                        </div>
                        <div className='adminhome__data'>
                            <h3 className='adminhome__titles'>today logins <h2 className='adminhome__num'>{this.state.todayLogins}</h2></h3>
                            <h3 className='adminhome__titles'>month logins: <h2 className='adminhome__num'>{this.state.monthLogins}</h2></h3>
                            <h3 className='adminhome__titles'>total logins: <h2 className='adminhome__num'>{this.state.totalLogins}</h2></h3>
                        </div>
                        <div className='adminhome__data'>
                            <h3 className='adminhome__titles'>notes created <h2 className='adminhome__num'>{this.state.numberOfNotes}</h2></h3>
                            <h3 className='adminhome__titles'>events created: <h2 className='adminhome__num'>{this.state.numberOfEvents}</h2></h3>
                            <h3 className='adminhome__titles'>links created: <h2 className='adminhome__num'>{this.state.numberOfLinks}</h2></h3>
                        </div>
                    </div>
                </div>
            )
          }
      }
  }
  
};

export default AdminHome;