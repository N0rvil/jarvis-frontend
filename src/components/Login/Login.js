import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import './../FormsStyles/Froms.scss';

import history from '../../history'

import { url } from '../url';

class Login extends React.Component {
    state = { email: '', password: '', authentication: '' , url: document.URL}

    handleSubmit(e) { //HANDLE SUBMIT FUNCTION 
        e.preventDefault()
        axios({
            method: 'POST',
            url: `${url}/login`,
            data: this.state
        })
        .then(async response => {
            if (response.data.note === 'success') {
                const expireTime = 4/48; //2 HOURS
                await Cookies.set('loged', { id: response.data.id, username: response.data.username, hash: response.data.hash, time: response.data.time, }, { expires: expireTime })
                return '/main-page'
            } else if (response.data.note === 'no email verification') {
                this.setState({ authentication: 'Your email was not verified! Please verify your email!' })
            } else {
                console.log(response.data.note) //console.log 'failed'
                this.setState({ authentication: 'Wrong email or passoword' })
            }
        })
        .then(href => {
                history.replace(href)  
        })
        .catch(err => console.log(err))
    }

    emailControl() {
        axios({
            method: 'POST',
            url: `${url}/emailVerification`,
            data: this.state
        })
        .then(response => {
            this.setState({ authentication: response.data.note })
        })
        .catch(err => console.log(err))
    }

    pageControl() {
        const hostingUrl = 'https://jarvis-frontend.herokuapp.com/' //http://localhost:3000/  // https://jarvis-frontend.herokuapp.com/

        if (document.URL === `${hostingUrl}login` || `${hostingUrl}` ) { //remove the or because we will heave landing page and the control will be only on login page
            return
        } else {
            this.emailControl();
        }
    }
    
    componentDidMount() {
        this.pageControl();
    }

    render() {
    return (
        <div className='background' style={{backgroundImage: "url(/images/background.jpg)", backgroundepeat: 'no-repeat', backgroundSize: 'cover'}} >
            <div>
                <form className='form'  onSubmit={this.handleSubmit.bind(this)} >
                    <label className='form__header'>login</label>
                    <input className='form__input' type='text' value={this.state.email} onChange={e => this.setState({ email: e.target.value })} placeholder='e-mail' />
                    <input className='form__input' type='password' value={this.state.password} onChange={e => this.setState({ password: e.target.value })} placeholder='password' />
                    <div className='form__err'>{this.state.authentication}</div>
                    <button className='form__button' type='submit' value='login' >Log in</button>
                    <button className='form__button' value='login' onClick={() => history.replace('/register')} >Sign up</button>
                </form>
            </div>
        </div>
        )
    };
};   

export default Login;