import React from 'react';
import history from '../../history'
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import NavbarLanding from '../NavbarLanding/NavbarLanding.js';

import { url } from '../url';

import './../FormsStyles/Forms.scss';
import './Register.scss';

class Register extends React.Component {
    state = { username: '', email: '', password: '' ,passwordControl: '', usernameErr: '', emailErr: '', passErr: '', passControlErr: '', isHuman: false};

    validateEmail(mail) {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)){
            return (true)
            } 
        return (false)
        }

    isHuman() {
        this.setState({ isHuman: true })
    }


    handleSubmit(e) { //HANDLE SUBMIT FUNCTION 
        e.preventDefault();
        if (this.state.password.length < 6 || this.validateEmail(this.state.email) === false || this.state.username.length < 4 || this.state.password !== this.state.passwordControl || this.state.isHuman === false) {
            if (this.state.password.length < 6) {
                this.setState({ passErr: 'password must be minimaly 6 characters long' });
            } else {
                this.setState({ passErr: '' });
            }
            if (this.state.password !== this.state.passwordControl) {
                this.setState({ passControlErr: 'passwords do not match' });
            } else {
                this.setState({ passControlErr: '' });
            }
            if (this.validateEmail(this.state.email) === false) {
                this.setState({ emailErr: 'this is not valid email address' });
            } else {
                this.setState({ emailErr: '' });
            }
            if (this.state.username.length < 4) {
                this.setState({ usernameErr: 'username must be minimaly 4 characters long' });
            } else {
                this.setState({ usernameErr: '' });
            }
            if(this.state.isHuman === false) {
                alert('verify you are human');
            }
        } else {
            this.setState({ passErr: '' });
            axios({
                method: 'POST',
                url: `${url}/register`,
                data: this.state
            })
            .then(response => {
                if (response.data.username === 'exist' || response.data.email === 'exist') {
                    if (response.data.username === 'exist' && response.data.email === 'exist') {
                        this.setState({ usernameErr: 'User with this username already exist', emailErr: 'User with this email already exist' });
                    } else if (response.data.username === 'exist' && response.data.email !== 'exist') {
                        this.setState({ usernameErr: 'User with this username already exist', emailErr: '' });
                    } else if (response.data.username !== 'exist' && response.data.email === 'exist') {
                        this.setState({ usernameErr: '', emailErr: 'User with this email already exist' });
                    } else {
                        this.setState({ usernameErr: '', emailErr: '' });
                    }
                } else { 
                    history.replace('/verifyemail');   
                }
            })
            .catch(err => console.log(err));
        };
    };

    render() {
    return (
        <div className='register' style={{backgroundImage: "url(/images/background.jpg)", backgroundepeat: 'no-repeat', backgroundSize: 'cover'}}>
            <NavbarLanding />
            <form className='form register__form' onSubmit={this.handleSubmit.bind(this)} method='POST'>
                <label className='form__header'>register</label>
                <input className='form__input' type='text' value={this.state.username} onChange={e => this.setState({ username: e.target.value })} placeholder='username' />
                <div className='form__err'>{this.state.usernameErr}</div>
                <input className='form__input' type='text' value={this.state.email} onChange={e => this.setState({ email: e.target.value })} placeholder='e-mail' />
                <div className='form__err'>{this.state.emailErr}</div>
                <input className='form__input' type='password' value={this.state.password} onChange={e => this.setState({ password: e.target.value })} placeholder='password' />
                <div className='form__err'>{this.state.passErr}</div>
                <input className='form__input' type='password' value={this.state.passwordControl} onChange={e => this.setState({ passwordControl: e.target.value })} placeholder='again password' />
                <div className='form__err'>{this.state.passControlErr}</div>
                <div className='register__box'>
                    <button className='form__button' type='submit' label='odeslat'>Register</button>
                </div>
                <ReCAPTCHA
                    sitekey={'6LdXoK0aAAAAACPca7iNEjuhfjlh-h6FzCEkyxl-'}
                    onChange={() => this.isHuman()}
                />    
            </form>
        </div>
        );
    };
};   

export default Register;

/*
    
*/