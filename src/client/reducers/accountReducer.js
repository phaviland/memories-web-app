import {SET_USERNAME} from '../actions/accountActions'

const initialState = {
    username: ''
};

export default function accountReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USERNAME:
            return Object.assign({}, state, {
                username: action.payload
            });
        default:
            return state;
    }
}