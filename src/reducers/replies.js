import * as actionTypes from "../actionType";
import { message } from "antd";
const initialState = {
  language: "",
  date: Object
};
const replies = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_UPS_RESPONSE:
      return Object.assign({}, state, {
        language: action.language
      });
    case actionTypes.REPLIES_WRITING_RECEIVE:
      if (action.date.success) {
        message.warning("评论成功");
      } else {
        message.success("评论失败");
      }
      return Object.assign({}, state, {
        date: action.date.action
      });
    default:
      return state;
  }
};
export default replies;
