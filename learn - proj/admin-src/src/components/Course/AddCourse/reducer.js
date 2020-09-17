import { ACTION } from "./constants";

const initialState = {
    name: '',
    thumbnailPath: '',
    addCourseSuccess: false
}

const addCourseReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION.ADD_COURSE_SUCCESS:
            state = { ...state, addCourseSuccess: true }
        case ACTION.SET_COURSE_NAME:
            state = { ...state, name: action.payload }
            break;
        case ACTION.SET_COURSE_THUMBNAIL:
            state = { ...state, thumbnailPath: action.payload }
            break;
        case ACTION.CLEAR_ADD_COURSE:
            state = { ...initialState }
            break;
    }
    return state;
}

export default addCourseReducer;