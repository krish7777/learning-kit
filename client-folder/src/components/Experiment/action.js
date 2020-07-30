import { ACTION } from "./constants";
import axios from "axios";

export const getSomeData = (data) => async (dispatch) => {
    // const res = await axios.get("/some-api-route");
    dispatch({
        type: ACTION.GET_SOME_DATA,
        payload: data,
    });
};

export const toggleCode = () => dispatch => {
    dispatch({
        type: ACTION.TOGGLE_CODE
    })
}

export const changeCurrentStep = (step) => dispatch => {
    dispatch({
        type: ACTION.CHANGE_CURRENT_STEP,
        payload: step
    })
}
