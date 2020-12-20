import { ACTION } from './constants';

const initialState = {
    modules: [],
    currentModule: {},
    courseTroubleshoot: [],
    updateModule: false,
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
    }

    return state;
};

export default modulesReducer;
