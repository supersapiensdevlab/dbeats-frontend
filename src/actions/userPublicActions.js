import axios from '../https-common';
import {  USER_PUBLIC_ERROR, USER_PUBLIC_LOADED, USER_PUBLIC_LOADING } from './types';

export const getPublicUser = (username) => (dispatch) => {
  // User loading
  dispatch({ type: USER_PUBLIC_LOADING });
  axios
    .get(`/user/${username}`)
    .then((res) => {
      if (res.data === '') {
        dispatch({
          type:USER_PUBLIC_ERROR,
          payload:res.data
        })
      }else{
      dispatch({
        type: USER_PUBLIC_LOADED,
        payload: res.data,
      });
    }
    })
    .catch((err) => {
      dispatch({
        type:USER_PUBLIC_ERROR,
        payload:err
      })
      console.log(err);
    });
};
