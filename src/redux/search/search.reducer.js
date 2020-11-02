import {SearchActionTypes} from "./search.types";

const INITIAL_STATE = {
  currentSearch: null,
  fetching: false
};

const searchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SearchActionTypes.SET_SEARCH:
        return {
            ...state,
            currentSearch: action.payload
        }
    case SearchActionTypes.REQUESTING_DATA:
        return {

        }
    case SearchActionTypes.RECEIVED_DATA:
        return {
            
        }



    default:
      return state;
  }
};


export default searchReducer;