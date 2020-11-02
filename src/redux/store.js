import { createStore, applyMiddleware } from "redux";
import rootReducer from "./root-reducer";

import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk"

const middlewares = [thunk];

export default createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));