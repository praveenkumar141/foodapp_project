import {
  ACCOUNT_DELETED,
  CLEAR_USER,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
} from "../../../redux/types/userTypes";
import { CLEAR_PROFILE } from "../../../redux/types/profileTypes";
import api from "../../../utils/api";
import { setAlert } from "../../core/actions/alertAction";

// Regitsering a new user
export const register = (state) => async (dispatch) => {
  try {
    const res = await api.post("/register", state);

    dispatch({ type: REGISTER_SUCCESS, payload: res.data });

    dispatch(setAlert("Successfully registered", "success"));

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.subErrors;

    console.log(JSON.stringify("Data is: " + JSON.stringify(errors)));

    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert(error.field + ": " + error.message, "danger"))
      );
    }

    dispatch({ type: REGISTER_FAIL });
  }
};

// Login after registration
export const login = (email, password) => async (dispatch) => {
  const body = JSON.stringify({ email, password });
  try {
    const res = await api.post("/authenticate", body);

    dispatch({ type: LOGIN_SUCCESS, payload: res.data });

    dispatch(loadUser());

    dispatch(setAlert("Login Successful!", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    console.log(JSON.stringify("Data is: " + JSON.stringify(errors)));
    //console.log(err.response.data.message);
    dispatch(setAlert(err.response.data.message, "danger"));

    dispatch({ type: LOGIN_FAIL });
  }
};

// Loading user details after authentication
export const loadUser = (accessToken) => async (dispatch) => {
  try {
    accessToken = localStorage.getItem("accessToken");
    const res = await api.get(`/auth/${accessToken}`, accessToken);
    dispatch({ type: USER_LOADED, payload: res.data });
    dispatch(setAlert("Welcome " + res.data.username, "success"));
  } catch (err) {}
};

// Logout
export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
  dispatch({ type: CLEAR_PROFILE });
};

export const deleteAccount = (id) => async (dispatch) => {
  try {
    await api.delete(`/users/${id}`);

    dispatch({ type: CLEAR_USER });
    dispatch({ type: ACCOUNT_DELETED });

    dispatch(setAlert("Your account has been permanently deleted"));
  } catch (err) {
    const errors = err.response.data;

    dispatch(setAlert(errors.message + ": " + "Cannot delete account", "danger"));
  }
};
