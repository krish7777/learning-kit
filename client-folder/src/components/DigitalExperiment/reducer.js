/* eslint-disable default-case */
import { ACTION } from "./constants";

const initialState = {
    currentExpSteps: [
        "We begin by placing two NAND gate ic’s on the breadboard, the half moon shape on the ic should be to your left.",
        "Let's power up the breadboard by attaching +5V(red) wire and GND(black) wires from our board.",
        "Now to power the first ic, draw wires from the breadboard to pins 14(Vcc)  and 7(GND) of the ic.",
        "Next we join the two halves of the breadboard by placing red and black jumpers. This step is not necessary for some breadboard types, but it is good practice to join them.",
        "Now to power the second ic, draw wires from the breadboard to pins 14(Vcc)  and 7(GND) of the ic.",
        "Next, we connect pin 13 of ic_2r two to socket P in the Logic Generator section.",
        "Similarly connect pin 12 of ic_2 to socket Q in the Logic Generator section.",
        "Next connect pin 12 of ic_2 to pin 10 of ic_2.",
        "Next connect pin 13 of ic_2 to pin 1 of ic_2.",
        "Connect pin 11 of ic_2 to pin 9 of ic_2.",
        "Connect pin 11 of ic_2 to pin 2 of ic_2.",
        "Connect pin 3 of ic_2 to pin 4 of ic_2.",
        "Connect pin 8 of ic_2 to pin 5 of ic_2.",
        "And finally connect pin 6 of ic_2 to socket F in the Logic Monitor. This will display our Sum.",
        "Next connect pin 2 of ic_2 to pin 4 of ic_1.",
        "Connect pin 4 of ic_1 to pin 5 of ic_1.",
        "Turn on the main power supply for the board. Now if the led’s above both inputs P and Q are turned off it implies that the input to the gate is 0 0. The output is 0 + 0 = 00 and hence both carry and sum are 0.",
        "Next go ahead and turn on the input P by pressing the button above it. Now the input to the gate is 1 0. The output is 1 + 0 = 01 in binary. Here carry is 0 and sum is 1.",
        "Next turn on input Q as well by pressing the button above it. The output now is 1 + 1 = 10. The carry is 1 while sum is 0.",
        "Finally turn off input P by pressing the button above it once more.The output again is 0 + 1 = 01. The carry is 0 and sum is 1.",

    ],
    simulationStepStart: 15,
    noOfSteps: 21,
    showImages: true,
    currentStep: "Introduction",
    stepNo: 0
};

const digitalExperimentReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION.GET_SOME_DATA: {
            state = { ...state, someData: action.payload };
            break;
        }
        case ACTION.TOGGLE_IMAGES: {
            state = { ...state, showImages: !state.showImages };
            break;
        }
        case ACTION.CHANGE_CURRENT_STEP: {
            state = { ...state, currentStep: action.payload };
            break;
        }
        case ACTION.CHANGE_EXP_STEP: {
            state = { ...state, stepNo: action.payload };
            break;
        }

    }

    return state;
};

export default digitalExperimentReducer;
