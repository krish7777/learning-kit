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

export const addModule = (name, introduction, type) => async dispatch => {
    try {
        console.log("before call")
        const res = await axios.post("http://localhost:3300/module/add", { name, introduction, type })
        console.log(res.data)
        dispatch({
            type: ACTION.ADD_MODULE_SUCCESS,
        })
    } catch (err) {
        console.log("error in addModules")
    }

}

export const setModuleName = (name) => dispatch => {
    dispatch({
        type: ACTION.SET_MODULE_NAME,
        payload: name
    })
}

export const setModuleIntroduction = (introduction) => dispatch => {
    dispatch({
        type: ACTION.SET_MODULE_INTRODUCTION,
        payload: introduction
    })
}

export const clearAddModule = () => dispatch => {
    dispatch({
        type: ACTION.CLEAR_ADD_MODULE
    })
}