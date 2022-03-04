import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import setAuthToken from "../../utils/setAuthToken";
import combineReducers from "../reducers";

const initialstate = {};

const middleware = [thunk];

const store = createStore(
  combineReducers,
  initialstate,
  composeWithDevTools(applyMiddleware(...middleware))
);

let currentState = store.getState();

store.subscribe(() => {
  let previousState = currentState;
  currentState = store.getState();

  if (previousState.auth.token !== currentState.auth.accessToken) {
    const accessToken = currentState.auth.accessToken;
    setAuthToken(accessToken);
  }
});

export default store;
