import { CHECK_LOGIN } from '../actions/types';

const loginReducer = (state = false, action) => {
    switch (action.type) {
        case CHECK_LOGIN: 
            return action.payload
        default:
            return state;
    };
};

export default loginReducer;

