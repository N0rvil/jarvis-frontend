import { GET_USER } from '../actions/types';

const usernameReducer = (state = [], action) => {
    switch (action.type) {
        case GET_USER: 
            return action.payload
        default:
            return state;
    };
};

export default usernameReducer;


