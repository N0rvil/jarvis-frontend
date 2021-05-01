import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Popup from 'reactjs-popup';
// import history from '../../history';
import { url } from '../../url';

import './User.scss';
import '../../styles/Buttons.scss'

class UsersManagement extends React.Component {

    state = { users: [], usersSessions: [] }

    banUser(userId) {
        axios({
            method: 'POST',
            url: `${url}/banuser`,
            data: { userId: userId }
        })
        .then(response =>  {
            this.setState({ users: response.data.users })
        })
        .catch(err => console.log(err));
    }

    unbanUser(userId) {
        axios({
            method: 'POST',
            url: `${url}/unbanuser`,
            data: { userId: userId }
        })
        .then(response =>  {
            this.setState({ users: response.data.users })
        })
        .catch(err => console.log(err));
    }

    promoteUser(userId) {
        axios({
            method: 'POST',
            url: `${url}/promoteuser`,
            data: { userId: userId }
        })
        .then(response =>  {
            this.setState({ users: response.data.users })
        })
        .catch(err => console.log(err));
    }

    unpromoteUser(userId) {
        axios({
            method: 'POST',
            url: `${url}/unpromoteuser`,
            data: { userId: userId }
        })
        .then(response =>  {
            this.setState({ users: response.data.users })
        })
        .catch(err => console.log(err));
    };

    countSessions(userId) {
        let numberOfSessions = 0;
        this.state.usersSessions.map((session, i) => {
            if (session.userId === userId) {
                return numberOfSessions ++
            } else {
                return numberOfSessions
            }
        })
        return numberOfSessions
    };

    getUsersSessions(userId) {
        axios({
            method: 'POST',
            url: `${url}/getusersessions`,
            data: { userId: userId }
        })
        .then(response =>  {
            this.setState({ usersSessions: response.data.sessions })
        })
        .catch(err => console.log(err));
    }


    renderButtons(user) {
        return (
            <div>
            <Popup trigger={<button className='btn__red-medium'>{user.banned ? 'unbun user' : 'ban user'}</button>} position="top center">
                <div className='popup__delete'>
                    <h2 className=''>Are you sure ?</h2>                              
                    <button className='btn__delete-popup' onClick={user.banned ? () => this.unbanUser(user.id) : () => this.banUser(user.id)}>{user.banned ? 'yes unbun user' : 'yes ban user'}</button>
                </div>
            </Popup>
            {JSON.parse(Cookies.get().loged).id === 1 ? <Popup trigger={<button className={user.admin ? 'btn__red-medium' : 'btn__green-medium'}>{user.admin ? 'unpromote' : 'promote'}</button>} position="top center">
                <div className='popup__delete'>
                    <h2 className=''>Are you sure ?</h2>                              
                    <button className='btn__delete-popup' onClick={user.admin ? () => this.unpromoteUser(user.id) : () => this.promoteUser(user.id)}>{user.admin ? 'yes unpromote' : 'yes promote'}</button>
                </div> 
            </Popup> : ''}
            </div>
        )
    }

        renderUsers() {
            const users = this.state.users.map((user, i) => {
                return (
                    <div className='user' key={i}>
                        <h3 className='user__id'>id: {user.id}</h3>
                        {user.id === JSON.parse(Cookies.get().loged).id ? <h2 className='user__name user__name-current'>{user.username}</h2> : <h2 className='user__name'>{user.username}</h2>}
                        <div className='user__info'>
                            <div className='user__data'>number of logins: <p className='user__data-text'>{this.countSessions(user.id)}</p></div>
                            <div className='user__data'>verified: {user.isValid === true ? <p className='true'>yes</p> : <p className='false'>no</p>}</div>
                            <div className='user__data'>admin: {user.admin === true ? <p className='true'>yes</p> : <p className='false'>no</p>}</div>
                            <div className='user__data'>banned: {user.banned === true ? <p className='true'>yes</p> : <p className='false'>no</p>}</div>
                            <div className='user__data'>created at: <p className='user__data-text'>{user.createdAt}</p></div>  
                        </div>
                        {user.id === JSON.parse(Cookies.get().loged).id  || user.id === 1 ? <div className='user__empty-space'></div> : this.renderButtons(user)}
                    </div>
                ) 
            })
            return <ul className='usersManagement__list'>{users}</ul>
        }

    componentDidMount() {
        this.getUsersSessions();
        this.setState({ users: this.props.users })
    }

    render() {
        return (
            this.renderUsers()
        )  
    } 
};

export default UsersManagement;