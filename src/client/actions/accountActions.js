import {createAction} from 'redux-actions';
import axios from 'axios';

export const SET_LOGGED_IN = 'SET_LOGGED_IN';
export const SET_LOGGED_IN_ERROR = 'SET_LOGGED_IN_ERROR'
export const SET_LOGGED_OUT = 'SET_LOGGED_OUT'

export const setLoggedIn = createAction(SET_LOGGED_IN);
export const setLoggedInError = createAction(SET_LOGGED_IN_ERROR);
export const setLoggedOut = createAction(SET_LOGGED_OUT);

export function login(username, password) {
    return async function(dispatch) {   
        await axios.post(__API__ + "/login", {
            "username": username,
            "password": password
            })
            .then(function (response) {
                localStorage.setItem("Token", response.data.Token);
                dispatch(setLoggedIn());
            })
            .catch(function (error) {
                dispatch(setLoggedInError("Incorrect username/password"));
                console.log(error);
            });
    }
}

export function retrieveSessionFromCookie() {
    return function(dispatch) {
        if (localStorage.getItem("Token"))
            dispatch(setLoggedIn());
    }
}