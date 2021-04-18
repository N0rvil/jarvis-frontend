import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';

import './App.scss';

import MainPage from './MainPage/MainPage';
import Register from './Register/Register';
import Login from './Login/Login';
import LandingPage from './LandingPage/LandingPage';
import About from './About/About';
import VerifyEmail from './VerifyEmail/VerifyEmail';

import NotFoundNoLoged from './NotFound/NotFoundNoLoged';
import NotFoundLoged from './NotFound/NotFoundLoged';

import { checkLogin } from '../actions';

import history from '../history';

import { url } from './url'



class App extends React.Component {
    state = { isLoged: false };

  checkLoginReq() {  
         axios({
            method: 'POST',
            url: url,
            data: Cookies.get(),
        })
        .then(response =>  {
         if (response.data.note === 'verified') {
                this.props.checkLogin(true);
                this.setState({ isLoged: true });
                // history.replace('/main-page');
            } else {
                this.props.checkLogin(false);
                this.setState({ isLoged: false });
               // history.replace('/login');
            }
        })
        .catch(err => console.log(err));
    }

    refresh() {
        window.location.reload()
    }

    componentDidMount() {        
            this.checkLoginReq();  
    }
    
    render() {
        // Routes for loged users 
        if (this.state.isLoged === true) {
            return (
                <div className='ui container'>
                    <Router history={history}>
                        <div>
                            <Switch>
                                <Route path='/login' exact component={Login} />
                                <Route path='/main-page' exact component={MainPage} />
                                <Route component={NotFoundLoged} />
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
                                <Route path='/' exact component={LandingPage} />
                                <Route path='/register' exact component={Register} />
                                <Route path='/about' exact component={About} />
                                <Route path='/login' exact component={Login} />
                                <Route path='/login?' exact component={Login} />
                                <Route path='/verifyemail' exact component={VerifyEmail} />
                                <Route component={NotFoundNoLoged} />
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