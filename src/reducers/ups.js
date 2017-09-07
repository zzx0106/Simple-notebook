import * as actionTypes from "../actionType";
import { message } from "antd";
const initialState = {
  language: "",
  date: Object
};
const ups = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_UPS_RESPONSE:
      return Object.assign({}, state, {
        language: action.language
      });
    case actionTypes.USER_UPS_RECEIVE:
      if (action.date.action === "down") {
        message.warning("您已经点过赞了");
      } else {
        message.success("点赞成功");
      }
      return Object.assign({}, state, {
        date: action.date.action
      });
    default:
      return state;
  }
};
export default ups;
