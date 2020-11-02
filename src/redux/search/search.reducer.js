import {SearchActionTypes} from "./search.types";

const INITIAL_STATE = {
  currentSearch: [],
  fetching: false
};

const searchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SearchActionTypes.REQUESTING_DATA:
        return {
            ...state, fetching: true
        }
    case SearchActionTypes.RECEIVED_DATA:
        return {
            ...state, fetching: false, currentSearch: action.payload
        }

    default:
      return state;
  }
};


export default searchReducer;