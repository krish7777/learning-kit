import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools as compose } from "redux-devtools-extension/developmentOnly";
import thunk from "redux-thunk"
import textEditor2Reducer from "./components/TextEditor2/reducer";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import modulesReducer from "./components/Modules/reducer";
import addModuleReducer from "./components/Modules/AddModule/reducer";
import addCourseReducer from "./components/Course/AddCourse/reducer";
import courseReducer from "./components/Course/reducer";
import authReducer from "./components/Auth/reducer";

const rootReducer = combineReducers({
    textEditor2Reducer,
    modulesReducer,
    addModuleReducer,
    addCourseReducer,
    courseReducer,
    authReducer
});

const persistConfig = {
    key: "root",
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = createStore(
    persistedReducer,
    {},
    compose(applyMiddleware(thunk))
)

export const persistor = persistStore(store);