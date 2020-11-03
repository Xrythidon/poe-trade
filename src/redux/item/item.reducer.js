import {ItemActionTypes} from "./item.types";

const INITIAL_STATE = {
  items: [],
  fetching: false,
  loaded: false
};

const itemReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ItemActionTypes.REQUESTING_DATA:
        return {
            ...state, fetching: true
        }
    case ItemActionTypes.RECEIVED_DATA:
        return {
            ...state, loaded: true, fetching: false, items: action.payload
        }

    default:
      return state;
  }
};


export default itemReducer;