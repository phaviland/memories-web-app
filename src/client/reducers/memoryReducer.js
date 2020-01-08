import {REQUEST_MEMORY, RETRIEVED_MEMORY} from '../actions/memoryActions'

const initialState = {
    isFetching: false,
    memories: []
};

export default function memoryReducer(state = initialState, action) {
    switch (action.type) {
        case REQUEST_MEMORY:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RETRIEVED_MEMORY:
            return Object.assign({}, state, {
                isFetching: false
            });
        default:
            return state;
    }
}