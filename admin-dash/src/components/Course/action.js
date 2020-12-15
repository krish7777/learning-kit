import { ACTION } from './constants';
import axios from "axios"
import { baseUrl } from "../../config"
export const getCurrentCourse = (id) => async dispatch => {
    try {
        const res = await axios.get(`${baseUrl}/api/course/get/${id}`);
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
        const res = await axios.get(`${baseUrl}/api/course/introduction/get/${id}`);
        console.log(res.data)
        dispatch({
            type: ACTION.GET_INTRODCUTION_HTML,
            payload: res.data.introduction.html
        })
    } catch (err) {
        console.log("error in getIntroduction")
    }
}

export const addIntroduction = (id, html, intro_id) => async dispatch => {
    try {
        const res = await axios.post(`${baseUrl}/api/course/introduction`, {
            course_id: id,
            html: html,
            introduction_id: intro_id
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
        const res = await axios.get(`${baseUrl}/api/course/buildCircuit/get/${id}`)
        console.log("asking fro get build ckt", res.data)

        dispatch({
            type: ACTION.GET_BUILD_CIRCUIT,
            payload: res.data.buildCircuit
        })
    } catch (err) {
        console.log("error in getBuildCircuit")
    }
}

export const addBuildCircuit = (id, steps, code, codeStepStart, finalCircuitStep, build_id) => async dispatch => {
    try {
        const res = await axios.post(`${baseUrl}/api/course/buildCircuit`, {
            course_id: id,
            steps,
            code,
            codeStepStart,
            finalCircuitStep,
            build_id: build_id
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






//<<<<<<<<<<<<EXPERIMENT>>>>>>>>>>>

export const getExperiment = (id) => async dispatch => {
    try {
        const res = await axios.get(`${baseUrl}/api/course/experiment/get/${id}`)
        console.log("asking fro get experiment", res.data)

        dispatch({
            type: ACTION.GET_EXPERIMENT,
            payload: res.data.experiment
        })
    } catch (err) {
        console.log("error in getExperiment")
    }
}

export const addExperiment = (id, steps, simulationLink, exp_id) => async dispatch => {
    try {
        const res = await axios.post(`${baseUrl}/api/course/experiment`, {
            course_id: id,
            steps,
            simulationLink,
            exp_id: exp_id
        })
        console.log("after adding resp", res.data)
        dispatch({
            type: ACTION.ADD_EXPERIMENT_SUCCESS
        })
    } catch (err) {
        console.log("error in addExperiment")
    }
}

export const clearExperiment = () => dispatch => {
    dispatch({
        type: ACTION.CLEAR_EXPERIMENT
    })
}


//<<<<<<<<<<<EXPERIMENT_FORM>>>>>>>>>>>>>


export const addExperimentForm = (id, formContent, exp_id) => async dispatch => {
    try {
        console.log("herrrrrrrrrrrrrrrrrrrr")
        const res = await axios.post(`${baseUrl}/api/course/experimentForm`, {
            course_id: id,
            formContent,
            exp_id: exp_id
        })
        console.log(res.data)
        dispatch({
            type: ACTION.ADD_EXPERIMENT_FORM_SUCCESS
        })

    } catch (err) {
        console.log("error in addExperimentForm")
    }
}



//<<<<<<<<<<<RESULTS>>>>>>>>>>>>>


export const addResults = (id, formContent, results_id) => async dispatch => {
    try {
        console.log("herrrrrrrrrrrrrrrrrrrr")
        const res = await axios.post(`${baseUrl}/api/course/results`, {
            course_id: id,
            formContent,
            results_id
        })
        console.log(res.data)
        dispatch({
            type: ACTION.ADD_RESULTS_SUCCESS
        })

    } catch (err) {
        console.log("error in addResults")
    }
}


//<<<<<<<<<<<<TROUBLESHOOT>>>>>>>>>>>

export const getTroubleshoot = (id) => async dispatch => {
    try {
        const res = await axios.get(`${baseUrl}/api/course/troubleshoot/get/${id}`)
        console.log("asking for get troubleshoot", res.data)

        dispatch({
            type: ACTION.GET_TROUBLESHOOT,
            payload: res.data.troubleshoot
        })
    } catch (err) {
        console.log("error in getTroubleshoot")
    }
}

export const addTroubleshoot = (id, faqs, troubleshoot_id) => async dispatch => {
    try {
        const res = await axios.post(`${baseUrl}/api/course/troubleshoot`, {
            course_id: id,
            faqs: faqs,
            troubleshoot_id: troubleshoot_id
        })
        console.log("after adding resp", res.data)
        dispatch({
            type: ACTION.ADD_TROUBLESHOOT_SUCCESS
        })
    } catch (err) {
        console.log("error in addTroubleshoot")
    }
}

export const clearTroubleshoot = () => dispatch => {
    dispatch({
        type: ACTION.CLEAR_TROUBLESHOOT
    })
}









//<<<<<<<<<<<<EXCERCISE>>>>>>>>>>>

export const getExcercise = (id) => async dispatch => {
    try {
        const res = await axios.get(`${baseUrl}/api/course/excercise/get/${id}`)
        console.log("asking for get excercise", res.data)

        dispatch({
            type: ACTION.GET_EXCERCISE,
            payload: res.data.excercise
        })
    } catch (err) {
        console.log("error in getExcercise")
    }
}

export const addExcercise = (id, excercise_list, excerciseFiles, excerciseFilePaths, excercise_id) => async dispatch => {
    try {
        const res = await axios.post(`${baseUrl}/api/course/excercise`, {
            course_id: id,
            excercise_list: excercise_list,
            excerciseFiles,
            excerciseFilePaths,
            excercise_id: excercise_id
        })
        console.log("after adding resp", res.data)
        dispatch({
            type: ACTION.ADD_EXCERCISE_SUCCESS
        })
    } catch (err) {
        console.log("error in addExcercise")
    }
}

export const clearExcercise = () => dispatch => {
    dispatch({
        type: ACTION.CLEAR_EXCERCISE
    })
}