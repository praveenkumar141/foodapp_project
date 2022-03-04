import {
  CLEAR_USER,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
} from "../../../redux/types/userTypes";

const initialstate = {
  //user: null,
  user: null,
  isAuthenticated: false,
  loading: true,
  accessToken: localStorage.getItem("accessToken"),
};

export default (state = initialstate, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return { ...state, ...payload, isAuthenticated: true, loading: false };

    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };

    case REGISTER_FAIL:
    case LOGIN_FAIL:
      return {
        ...state,
        accessToken: null,
        isAuthenticated: false,
        loading: false,
      };

    case LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        accessToken: null,
      };

    case CLEAR_USER:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: true,
        accessToken: null,
      };

    default:
      return state;
  }
};
