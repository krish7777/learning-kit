import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools as compose } from "redux-devtools-extension/developmentOnly";
import thunk from "redux-thunk";
import homeReducer from "./components/Home/reducer";
import experimentReducer from "./components/Experiment/reducer";
import digitalExperimentReducer from "./components/DigitalExperiment/reducer";

const store = createStore(
  combineReducers({
    homeReducer,
    experimentReducer,
    digitalExperimentReducer
  }),
  {},
  compose(applyMiddleware(thunk))
);

export default store;
