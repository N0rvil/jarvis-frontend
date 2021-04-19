import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import ReCAPTCHA from 'react-google-recaptcha';


import './../FormsStyles/Forms.scss';
import './Login.scss';

import NavbarLanding from '../NavbarLanding/NavbarLanding';
import NotFoundLoged from '../NotFound/NotFoundLoged';

import history from '../../history'

import { url } from '../url';

class Login extends React.Component {
    state = { email: '', password: '', authentication: '' , url: document.URL, isHuman: false, isLoged: false};

    isHuman() {
        this.setState({ isHuman: true });
    }

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

    handleSubmit(e, cb) { //HANDLE SUBMIT FUNCTION 
        e.preventDefault();
        if (this.state.isHuman === true) {
            axios({
                method: 'POST',
                url: `${url}/login`,
                data: this.state
            })
            .then(async response => {
                if (response.data.note === 'success') {
                    const expireTime = 4/48; //2 HOURS
                    await Cookies.set('loged', { id: response.data.id, username: response.data.username, hash: response.data.hash, time: response.data.time, }, { expires: expireTime })                       
                        history.replace('/main-page'); 
                    cb();
                } else if (response.data.note === 'no email verification') {
                    this.setState({ authentication: 'Your email was not verified! Please verify your email!' });
                } else {
                    this.setState({ authentication: 'Wrong email or passoword' });
                }
            })
            .catch(err => console.log(err));
        } else {
            alert('verify you are human');
        }
    }

    emailControl() {
        axios({
            method: 'POST',
            url: `${url}/emailVerification`,
            data: this.state
        })
        .then(response => {
            this.setState({ authentication: response.data.note });
        })
        .catch(err => console.log(err));
    };
    
    componentDidMount() {
        this.emailControl();
        this.checkLoginReq();    
    };

    render() {
        if (this.state.isLoged === true) {
            return ( <NotFoundLoged /> ) 
        } else {
            return (
                <div className='login' style={{backgroundImage: "url(/images/background.jpg)", backgroundepeat: 'no-repeat', backgroundSize: 'cover'}} >
                    <NavbarLanding />
                        <form className='form login__form'  onSubmit={this.handleSubmit.bind(this)} >
                            <label className='form__header'>login</label>
                            <input className='form__input' type='text' value={this.state.email} onChange={e => this.setState({ email: e.target.value })} placeholder='e-mail' />
                            <input className='form__input' type='password' value={this.state.password} onChange={e => this.setState({ password: e.target.value })} placeholder='password' />
                            <div className='form__err'>{this.state.authentication}</div>
                            <div className='login__box'>
                                <button className='form__button' type='submit' value='login' >Log in</button>
                            </div>
                            <ReCAPTCHA
                                sitekey={'6LdXoK0aAAAAACPca7iNEjuhfjlh-h6FzCEkyxl-'}
                                onChange={() => this.isHuman()}
                            />
                        </form>
                </div>
                )
        }
    };
};   

export default Login;