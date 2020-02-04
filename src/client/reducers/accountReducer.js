import {SET_LOGGED_IN, SET_LOGGED_IN_ERROR, SET_LOGGED_OUT} from '../actions/accountActions'

const initialState = {
    loggedIn: false,
    loggedInError: ''
};

export default function accountReducer(state = initialState, action) {
    switch (action.type) {
        case SET_LOGGED_IN:
            return Object.assign({}, state, {
                loggedIn: true
            });
        case SET_LOGGED_IN_ERROR: {
            return Object.assign({}, state, {
                loggedInError: action.payload
            });
        }
        case SET_LOGGED_OUT: {
            return Object.assign({}, initialState);
        }
        default:
            return state;
    }
}