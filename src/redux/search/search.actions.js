import {post} from "../../API/search-api";



import { SearchActionTypes } from "./search.types";

export const requestingData = () => {
  return { type: SearchActionTypes.REQUESTING_DATA };
};
export const receivedData = (data) => {
  return { type: SearchActionTypes.RECEIVED_DATA, payload: data };
};

export const receivedError = (errorMessage) => {
  return { type: SearchActionTypes.RECEIVED_ERROR, payload: errorMessage }
}



// ASYNC
export const grabAPI = (query) => (dispatch, getState) => {
  // Dispatch request action here
  dispatch(requestingData());
  
  const stateBefore = getState()

  // CALL THE BACKEND SERVICE HERE

  post(`https://www.pathofexile.com/api/trade/search/Standard`, query)
  .then((data) => {
    if(data.code > 0){
      dispatch(receivedError(data.message));
      return;
    }

    dispatch(receivedData(data));
    const stateAfter = getState()
  });
  

  // Dispatch received data action here
};
// Update Query Object

export const updateQuery = (query) => {
  return { type: SearchActionTypes.UPDATE_QUERY, payload: query}

}