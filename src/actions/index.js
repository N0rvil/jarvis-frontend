import { GET_USER, CHECK_LOGIN, POST_NOTES } from './types';


export const getUser = (username) => {
    return {
        type: GET_USER,
        payload: username
    };
};

export const checkLogin = (boolean) => {
    return {
        type: CHECK_LOGIN,
        payload: boolean
    };
};

export const postNotes = (notes) => {
    return {
        type: POST_NOTES,
        payload: notes
    };
};

