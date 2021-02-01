import { USER_LOGIN_REQUEST,USER_LOGIN_FAIL,USER_LOGIN_SUCCESS,USER_LOGOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL } from '../constants/userConstants';
import axios from 'axios';

export const login = (email,password) => async (dispatch,getState) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        });
        const config = {
            "Content-Type": "application/json"
        };
        const { data } = await axios.post('/api/users/login',{ email,password },config);
        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:data
        });
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type:USER_LOGIN_FAIL,
            payload:error.response && error.response.message ? error.response.message : error.message
        })
    }

}

export const register = (name,email,password) => async (dispatch,getState) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        });
        const config = {
            "Content-Type": "application/json"
        };
        const { data } = await axios.post('/api/users/register',{ name,email,password },config);
        dispatch({
            type:USER_REGISTER_SUCCESS,
            payload:data
        });
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type:USER_REGISTER_FAIL,
            payload:error.response && error.response.message ? error.response.message : error.message
        })
    }

}

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_DETAILS_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        }
      }
  
      const { data } = await axios.get(`/api/users/${id}`, config)
  
      dispatch({
        type: USER_DETAILS_SUCCESS,
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: USER_DETAILS_FAIL,
        payload: message,
      })
    }
  }


  export const updateUser = (user) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_UPDATE_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
            "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        }
      }
  
      const { data } = await axios.put(`/api/users/profile`,user,config);
      console.log(data)
      dispatch({
        type: USER_UPDATE_SUCCESS,
        payload: data
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: USER_UPDATE_FAIL,
        payload: message,
      })
    }
  }

export const logout = () => async (dispatch) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    dispatch({type:USER_LOGOUT});
}