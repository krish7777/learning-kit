import { ACTION } from "./constants";

const initialState = {
    name: '',
    introduction: '',
    addModuleSuccess: false
}

const addModuleReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION.ADD_MODULE_SUCCESS:
            state = { ...state, addModuleSuccess: true }
            break;
        case ACTION.SET_MODULE_NAME:
            state = { ...state, name: action.payload }
            break;
        case ACTION.SET_MODULE_INTRODUCTION:
            state = { ...state, introduction: action.payload }
            break;
        case ACTION.CLEAR_ADD_MODULE:
            state = { ...initialState }
            break;
        default:
            state = state;
    }

    return state;
}

export default addModuleReducer;