import { events } from '../constants'
import { items, filterItems } from '../items';

export function fetchItems() {
    return dispatch => {
        dispatch({
            type: events.ITEMS_LIST,
            payload: items
        });
    }
}

export function fetchFrom(id) {
    return dispatch => {
        dispatch({
            type: events.ITEM_GET_FROM,
            payload: filterItems(id)
        });
    }
}

export function fetchTo(id) {
    return dispatch => {
        dispatch({
            type: events.ITEM_GET_TO,
            payload: filterItems(id)
        });
    }
}
