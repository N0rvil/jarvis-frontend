import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

import './App.scss';

import MainPage from './MainPage/MainPage';
import Register from './Register/Register';
import Login from './Login/Login';
import NotFound from './NotFound/404';

import { checkLogin } from '../actions';

import history from '../history';

import Cookies from 'js-cookie';

class App extends React.Component {

  checkLoginReq(e) {  
         axios({
            method: 'POST',
            url: 'https://nodejs-jarvis-backend.herokuapp.com/',
            data: Cookies.get(),
        })
        .then(response =>  {
         if (response.data.note === 'verified') {
                this.props.checkLogin(true)
                history.replace('/main-page') 
            } else {
                this.props.checkLogin(false)
                history.replace('/login?')
            }
        })
        .catch(err => console.log(err));
    }
    
    render() {
            this.checkLoginReq()
         
        // Routes for loged users 
        if (this.props.login === true) {
            return (
                <div className='ui container'>
                    <Router history={history}>
                        <div>
                            <Switch>
                                <Route path='/main-page' exact component={MainPage} />
                                <Route component={NotFound} />
                            </Switch>
                        </div>
                    </Router>
                </div>
            ) 
        // Routes for no loged users
        } else {
            return (
                <div className='ui container'>
                    <Router history={history}>
                        <div>
                            <Switch>
                                <Route path='/main-page' exact component={MainPage} /> 
                                <Route path='/register' exact component={Register} />
                                <Route path='/' exact component={Login} />
                                <Route path='/login' exact component={Login} />
                                <Route path='/login?' exact component={Login} />
                                <Route component={NotFound} />
                            </Switch>
                        </div>
                    </Router>
                </div>
            ) 
        } 
    }
};   

const mapStateToProps = (state) => {
    return { login: state.login };
}

export default connect(mapStateToProps, { checkLogin })(App);