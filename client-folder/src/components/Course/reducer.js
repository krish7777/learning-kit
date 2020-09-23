/* eslint-disable default-case */
import { ACTION } from "./constants";

const initialState = {
    currentExpSteps: [
        "We begin by placing the arduino and breadboard in position and connect the ground of the arduino to either of the long strips(buses) at the ends of the breadboard as shown. Note that, all the holes in a bus are parallelly connected.",
        "Next we choose one of the digital pins (in this case, pin number 2) as our output pin and connect that pin to the breadboard",
        "Now, we will connect an LED to the breadboard with the longer lead (or anode) to the parallel hole of the output pin.",
        "Now connect a resistor to the other lead (cathode) of the LED.",
        "Now, connect the other lead of the resistor to the ground connection we made in the first step.",
        "First, we need to declare the pin we have chosen as an output pin in the setup.",
        "Now, inside void loop(), we will write our code for blinking. Note that, whatever written inside void loop() will run repeatedly as long as the arduino is powered on.",
        "So, we light up the LED using the command digitalWrite(). This command lets you output a high or low signal from the respective pin.",
        "Then, we make the arduino wait for 1000ms (1 second) by using the delay() command.",
        "Similarly, we code for the remaining part. Now, you can test it out by connecting the arduino to a power source.",
    ],
    codeStepStart: 4,
    simulationStepStart: 15,
    noOfSteps: 10,
    showCode: true,
    showImages: true,
    currentStep: "Introduction",

    currentCourse: null,

    introduction: null,
    buildCircuit: null,
    experiment: null,
    results: null,
    troubleshoot: null,
    excercise: null,
    experimentForm: null

};

const courseReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION.GET_SOME_DATA: {
            state = { ...state, someData: action.payload };
            break;
        }
        case ACTION.TOGGLE_CODE: {
            state = { ...state, showCode: !state.showCode };
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
    }

    return state;
};

export default courseReducer;
