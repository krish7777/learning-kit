import { ACTION } from "./constants";
import axios from "axios";

export const getSomeData = (data) => async (dispatch) => {
    // const res = await axios.get("/some-api-route");
    dispatch({
        type: ACTION.GET_SOME_DATA,
        payload: data,
    });
};

export const toggleImages = () => dispatch => {
    dispatch({
        type: ACTION.TOGGLE_IMAGES
    })
}

export const changeCurrentStep = (step) => dispatch => {
    dispatch({
        type: ACTION.CHANGE_CURRENT_STEP,
        payload: step
    })
}

export const changeExpStep = (step) => dispatch => {
    dispatch({
        type: ACTION.CHANGE_EXP_STEP,
        payload: step
    })
}
