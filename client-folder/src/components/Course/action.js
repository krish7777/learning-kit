import { ACTION } from "./constants";
import axios from "axios";
import { baseUrl } from "../../config";

export const getSomeData = (data) => async (dispatch) => {
    // const res = await axios.get("/some-api-route");
    dispatch({
        type: ACTION.GET_SOME_DATA,
        payload: data,
    });
};

export const toggleSide = () => dispatch => {
    dispatch({
        type: ACTION.TOGGLE_SIDE
    })
}

export const changeCurrentStep = (step) => dispatch => {
    dispatch({
        type: ACTION.CHANGE_CURRENT_STEP,
        payload: step
    })
}


export const getCurrentCourse = (id) => async dispatch => {
    try {

        const res = await axios.get(`${baseUrl}/api/course/get/${id}`)
        dispatch({
            type: ACTION.GET_CURRENT_COURSE,
            payload: res.data.course
        })

    } catch (err) {
        console.log("error in getCurrentCourse")
    }
}


export const getIntroduction = (id) => async dispatch => {
    try {

        const res = await axios.get(`${baseUrl}/api/course/introduction/get/${id}`)
        dispatch({
            type: ACTION.GET_INTRODUCTION,
            payload: res.data.introduction
        })

    } catch (err) {
        console.log("error in getIntroduction")
    }
}

export const getBuildCircuit = (id) => async dispatch => {
    try {

        const res = await axios.get(`${baseUrl}/api/course/buildCircuit/get/${id}`)
        console.log("respomsasd", res.data)
        dispatch({
            type: ACTION.GET_BUILD_CIRCUIT,
            payload: res.data.buildCircuit
        })

    } catch (err) {
        console.log("error in getBuildCircuit")
    }
}

export const getExperiment = (id) => async dispatch => {
    try {

        const res = await axios.get(`${baseUrl}/api/course/experiment/get/${id}`)
        dispatch({
            type: ACTION.GET_EXPERIMENT,
            payload: res.data.experiment
        })

    } catch (err) {
        console.log("error in getExperiment")
    }
}

export const getResultsAnalysis = (id) => async dispatch => {
    try {

        const res = await axios.get(`${baseUrl}/api/course/results/get/${id}`)
        dispatch({
            type: ACTION.GET_RESULTS,
            payload: res.data.results
        })

    } catch (err) {
        console.log("error in getResultsAnalysis")
    }
}

export const getTroubleshoot = (id, type) => async dispatch => {
    try {

        const res = await axios.get(`${baseUrl}/api/course/troubleshoot/get/${id}?type=${type}`)
        dispatch({
            type: ACTION.GET_TROUBLESHOOT,
            payload: res.data.troubleshoot
        })

    } catch (err) {
        console.log("error in getTroubleshoot")
    }
}

export const getExcercise = (id) => async dispatch => {
    try {

        const res = await axios.get(`${baseUrl}/api/course/excercise/get/${id}`)

        dispatch({
            type: ACTION.GET_EXCERCISE,
            payload: res.data.excercise
        })

    } catch (err) {
        console.log("error in getExcercise")
    }
}

export const changeStep = (slideNo) => async dispatch => {
    dispatch({
        type: ACTION.CHANGE_STEP,
        payload: slideNo
    })
}

export const removeCurrentCourse = () => dispatch => {
    dispatch({
        type: ACTION.GET_CURRENT_COURSE,
        payload: null
    })
}
