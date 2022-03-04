import {
  CLEAR_FOOD,
  FOOD_DELETED,
  FOOD_ERROR,
  GET_FOOD,
  GET_FOODS,
  UPDATE_FOOD,
} from "../../../redux/types/foodTypes";
import api from "../../../utils/api";
import { setAlert } from "../../core/actions/alertAction";

export const addFood = (formData, navigate) => async (dispatch) => {
  try {
    const res = await api.post("/food/addFood", formData);

    dispatch({
      type: GET_FOOD,
      payload: res.data,
    });

    dispatch(setAlert("Food Details Added", "success"));

    navigate("/dashboard/");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: FOOD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getFoods = () => async (dispatch) => {
  dispatch({ type: CLEAR_FOOD });

  try {
    const res = await api.get("/food/allFood");

    dispatch({
      type: GET_FOODS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: FOOD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getFoodById = (userId) => async (dispatch) => {
  try {
    const res = await api.get(`/food/foodId/${userId}`);

    dispatch({
      type: GET_FOOD,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: FOOD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteFood = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/food/${id}`);

    dispatch({ type: CLEAR_FOOD });
    dispatch({ type: FOOD_DELETED });

    dispatch(setAlert("Food Removed", "success"));
  } catch (err) {
    dispatch({
      type: FOOD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const updateFood = (formData, navigate, id) => async (dispatch) => {
  try {
    const res = await api.put(`/food/${id}`, formData);

    dispatch({
      type: UPDATE_FOOD,
      payload: res.data,
    });
    dispatch(setAlert("Food Details Updated", "success"));
    navigate("/dashboard/");
  } catch (err) {
    const error = err.response.data;
    
    dispatch(setAlert(error.message + ': ' + "Only Admin has access", "danger"));

    dispatch({
      type: FOOD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getFoodByType = (foodType) => async (dispatch) => {
  dispatch({ type: CLEAR_FOOD });
  try {
    const res = await api.get(`/food/foodType/${foodType}`);

    dispatch({
      type: GET_FOODS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: FOOD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};