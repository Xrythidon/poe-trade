import { SearchActionTypes } from "./search.types";

const INITIAL_STATE = {
  currentSearch: [],
  query: {
    query: {
      filters: {
        trade_filters: {
          disabled: false,
          filters: {
            price: {
              min: 1,
              max: 100,
            },
          },
        },
      },
      status: {
        option: "online",
      },
      stats: [
        {
          type: "and",
          filters: [],
        },
      ],
      name: "Tabula Rasa",
    },
    sort: {
      price: "asc",
    },
  },

  fetching: false,
  loaded: false,
  error: false,
  errorMessage: ""
};

const searchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SearchActionTypes.REQUESTING_DATA:
      return {
        ...state,
        loaded: false,
        fetching: true,
      };
    case SearchActionTypes.RECEIVED_DATA:
      return {
        ...state,
        loaded: true,
        fetching: false,
        error: false,
        errorMessage: "",
        currentSearch: action.payload,
      };
    case SearchActionTypes.UPDATE_QUERY:
      return {
        ...state,
        query: action.payload
      };
    case SearchActionTypes.RECEIVED_ERROR:
      return {
        ...state,
        error: true,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default searchReducer;
