import { ACTION } from "./constants";

const initialState = {
    modules: [],
    currentModule: {}
}

const modulesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION.GET_MODULES:
            state = { ...state, modules: action.payload }
            break;
        case ACTION.GET_CURRENT_MODULE:
            state = { ...state, currentModule: action.payload }
            break;
    }

    return state;
}

export default modulesReducer;