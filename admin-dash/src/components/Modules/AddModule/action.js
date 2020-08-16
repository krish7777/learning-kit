import { ACTION } from './constants';
import axios from "axios"
export const getSomeData = () => async dispatch => {
    const res = await axios.get("/some-api-route");
    console.log(res.data)
    dispatch({
        type: ACTION.GET_SOME_DATA,
        payload: res.data
    })
}

export const addModule = (name, description) => async dispatch => {
    try {
        console.log("before call")
        const res = await axios.post("http://localhost:3300/module/add", { name, description })
        console.log(res.data)
        dispatch({
            type: ACTION.ADD_MODULE_SUCCESS,
        })
    } catch (err) {
        console.log("error in addModules")
    }

}

export const setName = (name) => dispatch => {
    dispatch({
        type: ACTION.SET_NAME,
        payload: name
    })
}

export const setDescription = (description) => dispatch => {
    dispatch({
        type: ACTION.SET_DESCRIPTION,
        payload: description
    })
}