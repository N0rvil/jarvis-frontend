import { POST_NOTES } from '../actions/types';

const notesReducer = (state = [], action) => {
    switch (action.type) {
        case POST_NOTES: 
            return action.payload
        default:
            return state;
    };
};

export default notesReducer;