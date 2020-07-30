import { ACTION } from "./constants";

const initialState = {
    content: ''
}

const textEditorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION.SET_CONTENT:
            state = { ...state, content: action.payload }
            break;
    }

    return state;
}

export default textEditorReducer;