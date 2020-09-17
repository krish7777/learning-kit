import { ACTION } from './constants';
import axios from "axios"
export const getSomeData = () => async dispatch => {
    const res = await axios.get("/some-api-route");
    dispatch({
        type: ACTION.GET_SOME_DATA,
        payload: res.data
    })
}

export const setFormData = (content) => dispatch => {
    dispatch({
        type: ACTION.SET_FORM_DATA,
        payload: content
    })
}