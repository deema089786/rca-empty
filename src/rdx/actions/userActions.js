import API          from '../API';
import {USER_STATE} from '../constants';
import socket       from 'lib/socket';

export function signIn({email, password}) {
  return async dispatch => {
    const user = await API.getInstance().user.signIn({email, password});
    localStorage.setItem('token', user.token);
    socket.reconnect();
    return dispatch({
      type: USER_STATE.UPDATE_USER_STATE,
      payload: {data: user, isAuth: true},
    })
  }
}

export function signInSocial({type, data}) {
  return async dispatch => {
    const user = await API.getInstance().social.signIn({type, data});
    localStorage.setItem('token', user.token);
    socket.reconnect();
    return dispatch({
      type: USER_STATE.UPDATE_USER_STATE,
      payload: {data: user, isAuth: true},
    })
  }
}

export function signUp(data) {
  return async dispatch => {
    const user = await API.getInstance().user.signUp(data);
    return dispatch({
      type: USER_STATE.UPDATE_USER_STATE,
      payload: {data: user, isAuth: true},
    })
  }
}

export function logOut() {
  return async dispatch => {
    localStorage.removeItem('token');
    socket.reconnect();
    return dispatch({
      type: USER_STATE.UPDATE_USER_STATE,
      payload: {data: {}, isAuth: false, role: ''},
    })
  }
}

export function me() {
  return async dispatch => {
    try {
      const user = await API.getInstance().user.me();
      return dispatch({
        type: USER_STATE.UPDATE_USER_STATE,
        payload: {data: user, isAuth: true},
      });
    } catch (e) {
      console.error(e);
      return dispatch({
        type: USER_STATE.UPDATE_USER_STATE,
        payload: {data: {}, isAuth: false},
      });
    }
  };
}

export function updateProfile({values, type}) {
  return async dispatch => {
    return await API.getInstance().user.updateProfile({values, type});
  }
}

export function changePassword({password, confirmPassword, currentPassword}) {
  return async dispatch => {
    await API.getInstance().user.changePassword({password, confirmPassword, currentPassword});
  }
}
