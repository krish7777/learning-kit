import { ACTION } from './constants';
import axios from "axios"

export const getCurrentCourse = (id) => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:3300/course/get/${id}`);
        console.log(res.data)
        dispatch({
            type: ACTION.GET_CURRENT_COURSE,
            payload: res.data.course
        })
    } catch (err) {
        console.log("error in getCurrentCourse")
    }
}

//<<<<<<<<<<<<<<<INTRODUCTION>>>>>>>>>>>>>>>>>>>>

export const setIntroductionHtml = (html) => dispatch => {
    dispatch({
        type: ACTION.SET_INTRODUCTION_HTML,
        payload: html
    })
}

export const getIntroduction = (id) => async dispatch => {//it is introduction id, not course id
    try {
        const res = await axios.get(`http://localhost:3300/course/introduction/get/${id}`);
        console.log(res.data)
        dispatch({
            type: ACTION.GET_INTRODCUTION_HTML,
            payload: res.data.introduction.html
        })
    } catch (err) {
        console.log("error in getIntroduction")
    }
}

export const addIntroduction = (id, html) => async dispatch => {
    try {
        const res = await axios.post('http://localhost:3300/course/introduction', {
            course_id: id,
            html: html
        })
        dispatch({
            type: ACTION.ADD_INTRODUCTION_SUCCESS
        })

    } catch (err) {
        console.log("error in addIntroduction")
    }
}

export const clearIntroduction = () => dispatch => {
    dispatch({
        type: ACTION.CLEAR_INTRODUCTION
    })
}

//<<<<<<<<<<<<BUILD_CIRCUIT>>>>>>>>>>>

export const getBuildCircuit = (id) => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:3300/course/buildCircuit/get/${id}`)
        console.log("asking fro get build ckt", res.data)

        dispatch({
            type: ACTION.GET_BUILD_CIRCUIT,
            payload: res.data.buildCircuit
        })
    } catch (err) {
        console.log("error in getBuildCircuit")
    }
}

export const addBuildCircuit = (id, steps) => async dispatch => {
    try {
        const res = await axios.post('http://localhost:3300/course/buildCircuit', {
            course_id: id,
            steps
        })
        console.log("after adding resp", res.data)
        dispatch({
            type: ACTION.ADD_BUILD_CIRCUIT_SUCCESS
        })
    } catch (err) {
        console.log("error in addBuildCircuit")
    }
}

export const clearBuildCircuit = () => dispatch => {
    dispatch({
        type: ACTION.CLEAR_BUILD_CIRCUIT
    })
}