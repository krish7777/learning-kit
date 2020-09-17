import { ACTION } from './constants';
import axios from "axios"

export const addCourse = (val) => async dispatch => {
    try {
        const res = await axios.post("http://localhost:3300/course/add", val)
        console.log(res.data)
        dispatch({
            type: ACTION.ADD_COURSE_SUCCESS,
        })
    } catch (err) {
        console.log("error in addCourse")
    }

}

export const setCourseName = (name) => dispatch => {
    dispatch({
        type: ACTION.SET_COURSE_NAME,
        payload: name
    })
}

export const setCourseThumbnail = (thumbnailPath) => dispatch => {
    dispatch({
        type: ACTION.SET_COURSE_THUMBNAIL,
        payload: thumbnailPath
    })
}

export const clearAddCourse = () => dispatch => {
    dispatch({
        type: ACTION.CLEAR_ADD_COURSE
    })
}