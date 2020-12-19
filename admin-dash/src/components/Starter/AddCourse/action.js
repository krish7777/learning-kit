import { ACTION } from './constants';
import axios from "axios"
import { baseUrl } from '../../../config';

export const addCourse = (val) => async dispatch => {
    try {
        const res = await axios.post(`${baseUrl}/api/course/add`, val)
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