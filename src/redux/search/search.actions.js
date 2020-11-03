import API from "../../search-api";

import { SearchActionTypes } from "./search.types";

export const requestingData = () => {
  return { type: SearchActionTypes.REQUESTING_DATA };
};
export const receivedData = (data) => {
  return { type: SearchActionTypes.RECEIVED_DATA, payload: data };
};

// ASYNC
export const grabAPI = () => (dispatch, getState) => {
  // Dispatch request action here
  dispatch(requestingData());

  // CALL THE BACKEND SERVICE HERE
  API.getSearch()
    .then((data) => {
      dispatch(receivedData(data));
    })
    .catch((err) => {
      console.log(err);
    });

  // Dispatch received data action here
};