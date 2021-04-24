import React from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import axios from 'axios';

import { getUser } from '../../actions';
// import history from '../../history';

import Navbar from '../Navbar/Navbar';
// import Notes from './Notes/Notes';
import Weather from './Weather/Weather';
import Links from './Links/Links';
import Graphs from './Graphs/Graphs';
import ReactCalendar from './Calendar/ReactCalendar';

import NotFoundLoged from '../Error/NotFound/NotFound';
import LoadingBig from '../Error/Loading/LoadingPage';

import { url } from '../url';


import './MainPage.scss';

class MainPage extends React.Component {
    state = { username: '', rememberMe: null, isLoged: null }

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

    getUser() { 
        axios({
            method: 'POST',
            url: `${url}/getuser`,
            data: Cookies.get(),
        })
        .then(response =>  {
            this.props.getUser(response.data.username)
        })
        .catch(err => console.log(err));
    }

    componentDidMount() {
        this.checkLoginReq();
        this.getUser(); 
    }

   
    render() { 
        if (this.state.isLoged === false) {
            return <NotFoundLoged /> 
        } else if (this.state.isLoged === null){
            return <LoadingBig /> 
        } else {
            return (
                <div className='mainpage'>
                    
                        <div className='mainpage__nav'>
                            <Navbar />
                        </div>
                        <div className='mainpage__calendar'>
                            <ReactCalendar />
                        </div>
                        <div className='mainpage__graph'>
                            <Graphs />
                        </div>
                        <div className='mainpage__links'>
                            <Links />
                        </div>
                        <div className='mainpage__weather'>
                            <Weather />               
                        </div>
                </div>
            )        
        }
    }
};   

const mapStateToProps = (state) => {
    return { user: state.user };
}

export default connect(mapStateToProps, { getUser })(MainPage);