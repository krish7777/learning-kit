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


export const getAllModules = (type) => async (dispatch) => {
  try {
    const res = await axios.get(`${baseUrl}/api/module/all/${type}`)

    dispatch({
      type: ACTION.GET_ALL_MODULES,
      payload: res.data.modules || []
    })
  } catch (e) {
    console.log("error in getAllModules")
  }
}
