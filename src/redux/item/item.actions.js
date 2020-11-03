import API from "../../search-api";

import { ItemActionTypes } from "./item.types";

export const requestingData = () => {
  return { type: ItemActionTypes.REQUESTING_DATA };
};
export const receivedData = (data) => {
  return { type: ItemActionTypes.RECEIVED_DATA, payload: data };
};

// ASYNC
export const fetchItem = (id) => (dispatch, getState) => {
  dispatch(requestingData());

  // CALL THE BACKEND SERVICE HERE
  API.getItem(id)
    .then((data) => {
      dispatch(receivedData(data));
    })
    .catch((err) => {
      console.log(err);
    });

  // Dispatch received data action here
};
