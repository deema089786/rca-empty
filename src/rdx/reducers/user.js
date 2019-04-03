import {USER_STATE} from '../constants';

let initialState = {
  isAuth: true,
  role: '',
  data: {},
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case USER_STATE.UPDATE_USER_STATE:
      const {payload} = action;
      return {...state, ...payload};
    default:
      return state;
  }
}