import API from "../../search-api";

import { SearchActionTypes } from "./search.types";

export const requestingData = () => {
  return { type: SearchActionTypes.REQUESTING_DATA };
};
export const receivedData = (data) => {
  return { type: SearchActionTypes.RECEIVED_DATA, payload: data };
};

// ASYNC
export const grabAPI = (query) => (dispatch, getState) => {
  // Dispatch request action here
  dispatch(requestingData());
  
  const stateBefore = getState()
  console.log("QUERY IS HERE, BEFORE", stateBefore)

  // CALL THE BACKEND SERVICE HERE


  API.getSearch(query)
    .then((data) => {
      dispatch(receivedData(data));
      const stateAfter = getState()
      console.log("QUERY IS HERE, AFTER", stateAfter)
    })
    .catch((err) => {
      console.log(err);
    });

  // Dispatch received data action here
};
// Update Query Object

export const updateQuery = (query) => {
  return { type: SearchActionTypes.UPDATE_QUERY, payload: query}

}