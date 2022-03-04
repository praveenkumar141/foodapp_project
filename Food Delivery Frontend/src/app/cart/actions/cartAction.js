import {
  CART_ERROR,
  CLEAR_CART,
  UPDATE_CART,
} from "../../../redux/types/cartTypes";
import api from "../../../utils/api";
import { setAlert } from "../../core/actions/alertAction";
import { loadUser } from "../../auth/actions/authAction";

// Add Food in Cart
export const addCart = (id) => async (dispatch) => {
  try {
    await api.post("/cart/", id);

    dispatch({
      type: UPDATE_CART,
    });
    dispatch(loadUser());
    dispatch(setAlert("Items added in cart.", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: CART_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Items in cart
export const deleteCartItem = (foodId) => async (dispatch) => {
  try {
    await api.delete(`/cart/${foodId}`);

    dispatch({
      type: UPDATE_CART,
    });
    dispatch(loadUser());
    dispatch(setAlert("Food Item Removed", "success"));
  } catch (err) {
    dispatch({
      type: CART_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete whole cart
export const deleteCart = () => async (dispatch) => {
  try {
    await api.delete("/cart/");

    dispatch({ type: CLEAR_CART });
    dispatch(setAlert("Order Successfully Placed", "success"));
    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: CART_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
