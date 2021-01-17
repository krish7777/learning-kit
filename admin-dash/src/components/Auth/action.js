import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { ACTION } from "./constants";
import { baseUrl } from "../../config";

// Login - get user token
export const loginAdmin = userData => async dispatch => {
    await axios
        .post(`${baseUrl}/api/auth/login-admin`, userData)
        .then(res => {
            // Save to localStorage

            // Set token to localStorage
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => {
            console.log("ERROR,", err);
            dispatch({
                type: ACTION.GET_ERRORS,
                payload: err.response.data
            })
        });
};

// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: ACTION.SET_CURRENT_USER,
        payload: decoded
    };
};

// User loading
export const setUserLoading = () => {
    return {
        type: ACTION.USER_LOADING
    };
};

// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from local storage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
    dispatch({
        type: 'LOGOUT'
    })
};


export const clearErrors = () => dispatch => {
    dispatch({
        type: ACTION.CLEAR_ERRORS
    })
}