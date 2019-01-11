import {combineReducers} from 'redux';
import itemReducer from './items';

const rootReducer = combineReducers({
    itemsState: itemReducer,
});

export default rootReducer;
