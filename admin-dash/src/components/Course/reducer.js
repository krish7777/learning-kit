const { ACTION } = require("./constants");

const initialState = {
    currentCourse: {},
    introductionHtml: '',
    addIntroductionSuccess: false,


    buildCircuit: null,
    addBuildCircuitSuccess: false,


    experiment: null,
    addExperimentSuccess: false,



    troubleshoot: null,
    addTroubleshootSuccess: false,

    excercise: null,
    addExcerciseSuccess: false,

    simulation: null,
    addSimulationSuccess: false

}

const courseReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION.GET_CURRENT_COURSE:
            state = { ...state, currentCourse: action.payload }
            break;
        case ACTION.GET_CURRENT_PARENT:
            state = { ...state, currentParent: action.payload }
            break;
        case ACTION.SET_INTRODUCTION_HTML:
            state = { ...state, introductionHtml: action.payload }
            break;
        case ACTION.GET_INTRODCUTION_HTML:
            state = { ...state, introductionHtml: action.payload }
            break;
        case ACTION.ADD_INTRODUCTION_SUCCESS:
            state = { ...state, addIntroductionSuccess: true }
            break;
        case ACTION.CLEAR_INTRODUCTION:
            state = { ...state, introductionHtml: "", addIntroductionSuccess: false }
            break;


        case ACTION.GET_BUILD_CIRCUIT:
            {
                console.log("ehy  am i here")
                console.log(action.payload)
                state = { ...state, buildCircuit: JSON.parse(JSON.stringify(action.payload)) }
                break;
            }

        case ACTION.ADD_BUILD_CIRCUIT_SUCCESS:
            {
                console.log("add building")
                state = { ...state, addBuildCircuitSuccess: true }
                break;
            }

        case ACTION.CLEAR_BUILD_CIRCUIT:
            state = { ...state, buildCircuit: null, addBuildCircuitSuccess: false }
            break;


        case ACTION.GET_EXPERIMENT:
            {
                console.log("ehy  am i here")
                console.log(action.payload)
                state = { ...state, experiment: action.payload }
                break;
            }

        case ACTION.ADD_EXPERIMENT_SUCCESS:
            {
                console.log("add building")
                state = { ...state, addExperimentSuccess: true }
                break;
            }

        case ACTION.CLEAR_EXPERIMENT:
            state = { ...state, experiment: null, addExperimentSuccess: false }
            break;

        case ACTION.GET_SIMULATION:
            {
                console.log("ehy  am i here")
                console.log(action.payload)
                state = { ...state, simulation: action.payload }
                break;
            }

        case ACTION.ADD_SIMULATION_SUCCESS:
            {
                console.log("add building")
                state = { ...state, addSimulationSuccess: true }
                break;
            }

        case ACTION.CLEAR_SIMULATION:
            state = { ...state, simulation: null, addSimulationSuccess: false }
            break;


        case ACTION.GET_TROUBLESHOOT:
            {
                console.log("ehy  am i here")
                console.log(action.payload)
                state = { ...state, troubleshoot: action.payload }
                break;
            }

        case ACTION.ADD_TROUBLESHOOT_SUCCESS:
            {
                console.log("add building")
                state = { ...state, addTroubleshootSuccess: true }
                break;
            }

        case ACTION.CLEAR_TROUBLESHOOT:
            state = { ...state, troubleshoot: null, addTroubleshootSuccess: false }
            break;


        case ACTION.GET_EXCERCISE:
            {
                console.log("ehy  am i here")
                console.log(action.payload)
                state = { ...state, excercise: action.payload }
                break;
            }

        case ACTION.ADD_EXCERCISE_SUCCESS:
            {
                console.log("add building")
                state = { ...state, addExcerciseSuccess: true }
                break;
            }

        case ACTION.CLEAR_EXCERCISE:
            state = { ...state, excercise: null, addExcerciseSuccess: false }
            break;

        default:
            state = state;

    }
    return state;
}

export default courseReducer