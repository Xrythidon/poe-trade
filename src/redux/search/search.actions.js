import { SearchActionTypes } from "./user.types";

export const setSearch = (user) => ({
  type: SearchActionTypes.SET_SEARCH,
  payload: user,
});

export const setSearch = (user) => ({
  type: SearchActionTypes.SET_SEARCH,
  payload: user,
});

const requestingData = () => {
  return { type: REQUESTING_DATA };
};
const receivedData = (data) => {
  return { type: RECEIVED_DATA, users: data.users };
};

const handleAsync = () => (dispatch, getState) => {
  // Dispatch request action here

    // CALL THE BACKEND SERVICE HERE


      // Dispatch received data action here
};

const defaultState = {
  fetching: false,
  users: [],
};
