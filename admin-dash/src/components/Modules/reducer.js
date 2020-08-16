import { ACTION } from "./constants";

const initialState = {
    modules: []
}

const modulesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION.GET_MODULES:
            state = { ...state, modules: action.payload }
            break;
    }

    return state;
}

export default modulesReducer;