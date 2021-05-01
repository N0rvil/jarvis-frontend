import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
// import Cookies from 'js-cookie';
// import axios from 'axios';

// import { url } from './url';
import history from '../history';

import MainPage from './MainPage/MainPage';
import Notes from './Notes/Notes';
import Register from './Authentication/Register/Register';
import Login from './Authentication/Login/Login';
import LandingPage from './LandingPage/LandingPage';
import About from './About/About';
import Admin from './Admin/Admin';
// import AdminGraphs from './Admin/AdminGraphs/AdminGraphs';
// import UsersManagement from './Admin/UsersManagement/UsersManagement';

import Navbar from '../components/Navbar/Navbar';


import NotFound from './Error/NotFound/NotFound';

import { checkLogin } from '../actions';


import './App.scss';




class App extends React.Component {


    render() {
            return (
                <div className='ui container'>
                    <Router history={history}>
                        <div>
                            <Navbar />
                            <Switch> 
                                <Route path='/main-page' exact component={MainPage} />
                                <Route path='/notes' exact component={Notes} />
                                <Route path='/admin' component={Admin} />
                                <Route path='/' exact component={LandingPage} />
                                <Route path='/about' exact component={About} />
                                <Route path='/register' exact component={Register} />
                                <Route path='/login?' exact component={Login} />
                                <Route path='/login' exact component={Login} />     
                                <Route component={NotFound} />
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