import React from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import axios from 'axios';

import history from '../../history';
import { url } from '../url';

import LoadingSmall from '../Error/Loading/LoadingSmall';



import './Navbar.scss';
import '../styles/Buttons.scss';


class Navbar extends React.Component {

    state={ isLoged: null }

    checkLoginReq() {  
        axios({
           method: 'POST',
           url: url,
           data: Cookies.get(),
       })
       .then(response =>  {
        if (response.data.note !== 'verified') {
            this.setState({ isLoged: false })
        } else {
            this.setState({ isLoged: true })
        }
       })
       .catch(err => console.log(err));
   }

    logOut() {
        history.replace('/');
        Cookies.remove('loged');
        window.location.reload();
    }

    componentDidMount() {
        this.checkLoginReq();
    }
  
    render() { 
        if (this.state.isLoged === null) {
            return (
                <div className='navbar'>
                    <div className='navbar__content-link'>
                        <LoadingSmall />   
                    </div>  
                </div>
            )
        } else if (this.state.isLoged === true) {
            return (
                <div className='navbar'>
                    <div className='navbar__content'>     
                        <Link className='navbar__link' to="/main-page">
                            <img className='navbar__content-icon' src='./images/svg/home.svg' alt='exit-icon' /> 
                        </Link>  
                        <Link className='navbar__link' to="/notes">
                            <img className='navbar__content-icon' src='./images/svg/notes.svg' alt='exit-icon' />  
                        </Link> 
                        <Link className='navbar__link' to="/about">
                            <img className='navbar__content-icon' src='./images/svg/info.svg' alt='exit-icon' /> 
                        </Link>            
                    </div>
                    <div className='navbar__box'>
                        <button className='btn__yellow-logout navbar__btn' onClick={() => this.logOut()}>
                            Log out
                            <img src='./images/svg/leave.svg' alt='exit-icon' className='navbar__btn-icon' />             
                        </button>
                    </div>
                </div>
            )        
        } else {
            return (
                <div className='navbar'>
                    <div className='navbar__content'>     
                        <Link className='navbar__link' to="/">
                            <img className='navbar__content-icon' src='./images/svg/home.svg' alt='exit-icon' /> 
                        </Link>  
                        <Link className='navbar__link' to="/about">
                            <img className='navbar__content-icon' src='./images/svg/info.svg' alt='exit-icon' /> 
                        </Link>            
                    </div>
                    <div className='navbar__box'>
                        <Link className='btn__yellow-medium navbar__link' to='/register'>
                            Sign up           
                        </Link>
                        <Link className='btn__yellow-medium' to='/login'>
                            Login           
                        </Link>
                    </div>
                </div>
            )        
        }
        
    }
};   


export default Navbar;