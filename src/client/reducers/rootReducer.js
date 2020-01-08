import {combineReducers} from 'redux';
import accountReducer from './accountReducer';
import memoryReducer from './memoryReducer';

const rootReducer = combineReducers({
    account: accountReducer,
    memory: memoryReducer
});

export default rootReducer;