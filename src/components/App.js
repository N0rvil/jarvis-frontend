import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';


import './App.scss';

import MainPage from './MainPage/MainPage';
import Notes from './Notes/Notes';
import Register from './Register/Register';
import Login from './Login/Login';
import LandingPage from './LandingPage/LandingPage';
import About from './About/About';
import VerifyEmail from './VerifyEmail/VerifyEmail';

import NotFoundLoged from './Error/NotFound/NotFound';

import { checkLogin } from '../actions';

import history from '../history';




class App extends React.Component {
    render() {
        // Routes for loged users 
            return (
                <div className='ui container'>
                    <Router history={history}>
                        <div>
                            <Switch>
                                <Route path='/main-page' exact component={MainPage} />
                                <Route path='/notes' exact component={Notes} />
                                <Route path='/' exact component={LandingPage} />
                                <Route path='/about' exact component={About} />
                                <Route path='/verifyemail' exact component={VerifyEmail} />
                                <Route path='/register' exact component={Register} />
                                <Route path='/login?' exact component={Login} />
                                <Route path='/login' exact component={Login} />
                                <Route component={NotFoundLoged} />
                            </Switch>
                        </div>
                    </Router>
                </div>
            ) 
        // Routes for no loged users
    } 
};   

const mapStateToProps = (state) => {
    return { login: state.login };
}

export default connect(mapStateToProps, { checkLogin })(App);