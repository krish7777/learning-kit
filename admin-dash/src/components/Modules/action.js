import { ACTION } from './constants';
import axios from 'axios';
import { baseUrl } from '../../config';

export const getSomeData = () => async (dispatch) => {
    const res = await axios.get('/some-api-route');
    console.log(res.data);
    dispatch({
        type: ACTION.GET_SOME_DATA,
        payload: res.data.modules.courses,
    });
};

export const getModules = (type) => async (dispatch) => {
    try {
        console.log('before call');
        const res = await axios.get(`${baseUrl}/api/module/all/${type}`);
        console.log(res.data);
        dispatch({
            type: ACTION.GET_MODULES,
            payload: res.data.modules || [],
        });
    } catch (err) {
        console.log('error in getModules');
    }
};

export const getCurrentModule = (id) => async (dispatch) => {
    try {
        const res = await axios.get(`${baseUrl}/api/module/get/${id}`);
        console.log(res.data);
        dispatch({
            type: ACTION.GET_CURRENT_MODULE,
            payload: res.data.module,
        });
    } catch (err) {
        console.log('error in getCurrentModule');
    }
};

export const getCourseTroubleshoot = (name) => async (dispatch) => {
    try {
        const res = await axios.get(
            `${baseUrl}/api/module/course-troubleshoot/${name}`
        );
        dispatch({
            type: ACTION.GET_COURSE_TROUBLESHOOT,
            payload: res.data.troubleshoot,
        });
    } catch (err) {
        console.log('error in getCourseTroubleshoot');
    }
};

export const addCourseTroubleshoot = (name, faqs) => async (dispatch) => {
    try {
        const res = await axios.post(
            `${baseUrl}/api/module/course-troubleshoot/${name}`,
            {
                faqs,
            }
        );
        console.log('res.data', res.data);
        dispatch({
            type: ACTION.GET_COURSE_TROUBLESHOOT,
            payload: res.data.troubleshoot,
        });
    } catch (err) {
        console.log('error in addCourseTroubleshoot');
    }
};

export const updateModule = (name, introduction, id) => async (dispatch) => {
    try {
        const res = await axios.post(
            `${baseUrl}/api/module/update-info/${id}`,
            { name, introduction }
        );
        console.log("data post:", res.data);
        dispatch({
            type: ACTION.UPDATE_COURSE,
            payload: [name, introduction],
        });
    } catch (err) {
        console.log('Error in updateModule:' + err);
    }
};

export const updateSubModule = (name, id) => async dispatch => {
    try {
        const res = await axios.post(`${baseUrl}/api/course/update/${id}`, { name })
        console.log(res.data)
        dispatch({
            type: ACTION.UPDATE_SUBMOD,
            payload: name
        })
    } catch (err) {
        // console.log("Failed method : updateModuleName")
        console.log(err);
    }

}

export const clearCurrentModule = () => dispatch => {
    dispatch({ type: ACTION.CLEAR_CURRENT_MODULE })
}

export const clearAdminDash = () => dispatch => {
    dispatch({ type: ACTION.CLEAR_ADMIN_DASH })
}