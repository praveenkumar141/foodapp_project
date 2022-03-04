import { combineReducers } from "redux";
import auth from "../../app/auth/reducers/authReducer";
import alerts from "../../app/core/reducers/alertReducer";
import food from "../../app/food/reducers/foodReducer";

export default combineReducers({
  auth,
  alerts,
  food,
});
