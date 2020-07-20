import Cookie from 'js-cookie'
import axios from 'axios'
import { USER_SIGNIN_SUCCESS, USER_SIGNIN_REQUEST, USER_SIGNIN_ERROR, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST } from '../constants/userConstants'

const signin = (email, password) => async(dispatch) => {
    dispatch({type: USER_SIGNIN_REQUEST, payload: {email, password}})
    try {
        const {data} = await axios.post("/api/user/signin", {email, password})
        dispatch({type: USER_SIGNIN_SUCCESS, payload: data})
        Cookie.set({"userInfo": JSON.stringify(data)}) 
    } catch (error) {
        dispatch({type: USER_SIGNIN_ERROR, payload: error.message})
    }
}

const register = (name, email, password) => async(dispatch) => {
    dispatch({type: USER_REGISTER_REQUEST, payload: {name, email, password}})
    try {
        const {data} = await axios.post("/api/user/register", {name, email, password})
        dispatch({type: USER_REGISTER_SUCCESS, payload: data})
        Cookie.set({"userInfo": JSON.stringify(data)}) 
    } catch (error) {
        dispatch({type: USER_REGISTER_FAIL, payload: error.message})
    }
}

export {signin, register}