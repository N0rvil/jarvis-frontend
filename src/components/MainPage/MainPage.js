import React from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import axios from 'axios';

import { getUser } from '../../actions';
// import history from '../../history';

import Navbar from './Navbar/Navbar';
import Notes from './Notes/Notes';
import Weather from './Weather/Weather';


import './MainPage.scss';

class MainPage extends React.Component {
    state = { username: '', rememberMe: null }

    getUser() { 
        axios({
            method: 'POST',
            url: 'http://localhost:3006/getuser',
            data: Cookies.get(),
        })
        .then(response =>  {
            this.props.getUser(response.data.username)
        })
        .catch(err => console.log(err));
    }

    componentDidMount() {
        this.getUser();
    }

   
    render() { 
        return (
            <div className='mainpage'>
                <div className='mainpage__hello'>
                    <h1 className='mainpage__hello-header'>hi i'am jarvis</h1>
                    <h1 className='mainpage__hello-header'>welcome {(this.props.user) ? this.props.user : 'Loading...'}</h1>
                </div>
                <div className='mainpage__content'>
                <div className='mainpage__nav'>
                        <Navbar />
                    </div>
                    <div className='mainpage__calendar'>
                        Calendar
                    </div>
                    <div className='mainpage__graph'>
                        Graph
                    </div>
                    <div className='mainpage__links'>
                        Links
                    </div>
                    <div className='mainpage__notes'>
                        <Notes />
                    </div>
                    <div className='mainpage__weather'>
                        <Weather />
                    </div>
                </div>
            </div>
        )        
    }
};   

const mapStateToProps = (state) => {
    return { user: state.user };
}

export default connect(mapStateToProps, { getUser })(MainPage);