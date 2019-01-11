import {events} from '../constants';

const INITIAL_STATE = {
    items: [],
    from: null,
    to: null,
};

const applySetItems = (state, action) => ({
    ...state,
    items: action.payload
});

const applySetFrom = (state, action) => ({
    ...state,
    from: action.payload,
});

const applySetTo = (state, action) => ({
    ...state,
    to: action.payload,
});

function itemReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case `${events.ITEMS_LIST}`: {
            return applySetItems(state, action);
        }
        case `${events.ITEM_GET_FROM}`: {
            return applySetFrom(state, action);
        }
        case `${events.ITEM_GET_TO}`: {
            return applySetTo(state, action);
        }
        default:
            return state;
    }
}

export default itemReducer;
