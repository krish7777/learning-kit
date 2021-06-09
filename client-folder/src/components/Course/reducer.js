/* eslint-disable default-case */
import { ACTION } from "./constants";

const initialState = {

    showSide: true,

    currentStep: "Introduction",

    currentCourse: null,

    introduction: null,
    buildCircuit: null,
    experiment: null,
    simulation: null,
    results: null,
    troubleshoot: null,
    excercise: null,
    experimentForm: null,

    stepNo: 0

};

const courseReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION.GET_SOME_DATA: {
            state = { ...state, someData: action.payload };
            break;
        }
        case ACTION.TOGGLE_SIDE: {
            state = { ...state, showSide: !state.showSide };
            break;
        }
        case ACTION.CHANGE_CURRENT_STEP: {
            state = { ...state, currentStep: action.payload };
            break;
        }

        case ACTION.GET_CURRENT_COURSE: {
            state = { ...state, currentCourse: action.payload }
            break;
        }

        case ACTION.GET_INTRODUCTION: {
            state = { ...state, introduction: action.payload }
            break;
        }

        case ACTION.GET_BUILD_CIRCUIT: {
            state = { ...state, buildCircuit: action.payload }
            break;
        }

        case ACTION.GET_EXPERIMENT: {
            state = { ...state, experiment: action.payload }
            break;
        }
        case ACTION.GET_SIMULATION: {
            state = { ...state, simulation: action.payload }
            break;
        }

        case ACTION.GET_VIDEOEMBED: {
            state = { ...state, videoembed: action.payload }
            break;
        }

        case ACTION.GET_RESULTS: {
            state = { ...state, results: action.payload }
            break;
        }
        case ACTION.GET_EXCERCISE: {
            state = { ...state, excercise: action.payload }
            break;
        }
        case ACTION.GET_TROUBLESHOOT: {
            state = { ...state, troubleshoot: action.payload }
            break;
        }
        case ACTION.GET_EXPERIMENT_FORM: {
            state = { ...state, experimentForm: action.payload }
            break;
        }
        case ACTION.CHANGE_STEP: {
            state = { ...state, stepNo: action.payload }
            break;
        }
        case ACTION.REMOVE_SUBMODULE: {
            state = { ...initialState }
            break;
        }
    }

    return state;
};

export default courseReducer;
