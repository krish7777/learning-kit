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

export const getModules = () => async dispatch => {
    try {
        console.log("before call")
        const res = await axios.get("http://localhost:3300/module/all")
        console.log(res.data)
        dispatch({
            type: ACTION.GET_MODULES,
            payload: res.data.modules || []
        })

    } catch (err) {
        console.log("error in getModules")
    }

}