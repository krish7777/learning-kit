import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools as compose } from "redux-devtools-extension/developmentOnly";
import thunk from "redux-thunk";
import homeReducer from "./components/Home/reducer";
import courseReducer from "./components/Course/reducer";
import digitalExperimentReducer from "./components/DigitalExperiment/reducer";

const store = createStore(
  combineReducers({
    homeReducer,
    courseReducer,
    digitalExperimentReducer
  }),
  {},
  compose(applyMiddleware(thunk))
);

export default store;
