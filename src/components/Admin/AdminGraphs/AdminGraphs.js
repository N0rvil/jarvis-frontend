import React from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
// import history from '../../history';
import { url } from '../../url';

import NotFound from '../../Error/NotFound/NotFound';
import LoadingPage from '../../Error/Loading/LoadingPage';


import './AdminGraphs.scss';

class AdminGraphs extends React.Component {

    state = { isLoged: null, admin: false }

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

   componentDidMount() {
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
                <div className='admin'>
                    
                    <div className='admin__content'>
                        
                        Admin Graphs
                    </div>
                </div>
            )
          }
      }
  }
  
};

export default AdminGraphs;