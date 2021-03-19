import { combineReducers } from 'redux';
import usernameReducer from './usernameReducer';
import loginReducer from './/loginReducer';
import notesReducer from './notesReducer';


export default combineReducers({
    user: usernameReducer,
    login: loginReducer,
    notes: notesReducer,
});