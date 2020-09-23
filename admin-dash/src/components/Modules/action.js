import { ACTION } from './constants';
import axios from "axios"
export const getSomeData = () => async dispatch => {
    const res = await axios.get("/some-api-route");
    console.log(res.data)
    dispatch({
        type: ACTION.GET_SOME_DATA,
        payload: res.data.modules.courses
    })
}

export const getModules = (type) => async dispatch => {
    try {
        console.log("before call")
        const res = await axios.get(`http://localhost:3300/module/all/${type}`)
        console.log(res.data)
        dispatch({
            type: ACTION.GET_MODULES,
            payload: res.data.modules || []
        })

    } catch (err) {
        console.log("error in getModules")
    }

}

export const getCurrentModule = (id) => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:3300/module/get/${id}`);
        console.log(res.data)
        dispatch({
            type: ACTION.GET_CURRENT_MODULE,
            payload: res.data.module
        })
    } catch (err) {
        console.log("error in getCurrentModule")
    }
}