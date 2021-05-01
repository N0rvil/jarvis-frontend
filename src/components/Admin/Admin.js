import React from 'react';

import { Route, Switch } from 'react-router-dom';

// import history from '../../history';

import AdminNavbar from './AdminNavbar/AdminNavbar';

import './Admin.scss';
import UsersManagement from './UsersManagement/UsersManagement';
import AdminGraphs from './AdminGraphs/AdminGraphs';
import AdminHome from './AdminHome/AdminHome';

class Admin extends React.Component {

    render() {
        return (
            <div className='admin'>
                <AdminNavbar />  
                    <Switch>
                        <Route path={`${this.props.match.path}/home`} component={AdminHome} />
                        <Route path={`${this.props.match.path}/users-management`}  component={UsersManagement} />
                        <Route path={`${this.props.match.path}/graphs`}  component={AdminGraphs} />¨
                    </Switch>
            </div>
        )
    }
  
};

export default Admin;