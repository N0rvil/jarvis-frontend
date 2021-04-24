import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import ReCAPTCHA from 'react-google-recaptcha';

import history from '../../history'
import { url } from '../url';

import Navbar from '../Navbar/Navbar';
import NotFoundLoged from '../Error/NotFound/NotFound';
import LoadingBig from '../Error/Loading/LoadingPage';

import './../styles/Forms.scss';
import './../styles/Buttons.scss';
import './Login.scss';

class Login extends React.Component {
    state = { email: '', password: '', authentication: '' , url: document.URL, isHuman: false, isLoged: null};

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
                    const expireTime = 4/48 * 12; //24 HOURS
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
            return <NotFoundLoged /> 
        } else if (this.state.isLoged === null) {
            return <LoadingBig />  
        } else {
            return (
                <div className='login'>
                    <Navbar />
                        <form className='form login__form'  onSubmit={this.handleSubmit.bind(this)} >
                            <label className='form__header'>login</label>
                            <input className='form__input' type='text' value={this.state.email} onChange={e => this.setState({ email: e.target.value })} placeholder='e-mail' />
                            <input className='form__input' type='password' value={this.state.password} onChange={e => this.setState({ password: e.target.value })} placeholder='password' />
                            <div className='form__err'>{this.state.authentication}</div>
                            <div className='login__box'>
                                <button className='btn__yellow-medium' type='submit' value='login' >Log in</button>
                            </div>
                            <ReCAPTCHA
                                className='login__recaptcha'
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