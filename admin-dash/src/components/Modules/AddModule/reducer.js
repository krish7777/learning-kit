import { ACTION } from "./constants";

const initialState = {
    name: '',
    description: '',
    addModuleSuccess: false
}

const addModuleReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION.ADD_MODULE_SUCCESS:
            state = { ...state, addModuleSuccess: true }
            break;
        case ACTION.SET_NAME:
            state = { ...state, name: action.payload }
            break;
        case ACTION.SET_DECRIPTION:
            state = { ...state, description: action.payload }
            break;
        default:
            state = state;
    }

    return state;
}

export default addModuleReducer;