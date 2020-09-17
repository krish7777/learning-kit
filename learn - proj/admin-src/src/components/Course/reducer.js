const { ACTION } = require("./constants");

const initialState = {
    currentCourse: {},
    introductionHtml: '',
    addIntroductionSuccess: false,


    buildCircuit: null,
    addBuildCircuitSuccess: false,

}

const courseReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION.GET_CURRENT_COURSE:
            state = { ...state, currentCourse: action.payload }
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
        default:
            state = state;

    }
    return state;
}

export default courseReducer