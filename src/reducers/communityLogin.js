import * as actionTypes from "../actionType";
import { message } from "antd";
const initialState = {
  language: "",
  isLoginFetching: false,
  isLoginFetched: false,
  vueLoginSuccess: false,
  nodeLoginSuccess: false,
  data: Object
};
const communityLogin = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.COMMUNITY_LOGIN_RESPONSE:
      return Object.assign({}, state, {
        language: action.language,
        isLoginFetching: true,
        isLoginFetched: false
      });
    case actionTypes.COMMUNITY_LOGIN_RECEIVE:
      if (action.loginSuccess) {
        message.success(`社区登录成功`, 2);
      } else {
        message.error(`社区登录失败`, 2);
      }
      console.log(state.language);
      if (state.language === "VUE") {
        localStorage.setItem(
          "vueToken",
          sessionStorage.getItem("TemporaryToken")
        );
        sessionStorage.setItem("TemporaryToken", "");
        return Object.assign({}, state, {
          isLoginFetching: false,
          isLoginFetched: true,
          vueLoginSuccess: action.loginSuccess,
          data: action.posts,
          lastUpdated: action.receivedAt
        });
      } else if (state.language === "NODE") {
        localStorage.setItem(
          "nodeToken",
          sessionStorage.getItem("TemporaryToken")
        );
        sessionStorage.setItem("TemporaryToken", "");
        return Object.assign({}, state, {
          isFetching: false,
          isLoginFetched: true,
          nodeLoginSuccess: action.loginSuccess,
          data: action.posts,
          lastUpdated: action.receivedAt
        });
      } else {
        return state;
      }
    default:
      return state;
  }
};
export default communityLogin;
