import { ACTION } from './constants';

const initialState = {
    modules: [],
    currentModule: {},
    courseTroubleshoot: [],
    updateModule: false,
    updateSubModule: false,
};

const modulesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION.GET_MODULES:
            state = { ...state, modules: action.payload };
            break;
        case ACTION.GET_CURRENT_MODULE:
            state = { ...state, currentModule: action.payload };
            break;
        case ACTION.GET_COURSE_TROUBLESHOOT:
            state = { ...state, courseTroubleshoot: action.payload };
            break;
        case ACTION.UPDATE_COURSE:
            state = { ...state, updateModule: true };
            break;
        case ACTION.UPDATE_SUBMOD:
            state = { ...state, updateSubModule: true }
            break;
        case ACTION.CLEAR_CURRENT_MODULE:
            state = { ...state, currentModule: {} };
            break;
        case ACTION.CLEAR_ADMIN_DASH:
            state = { ...initialState };
            break;
    }

    return state;
};

export default modulesReducer;
