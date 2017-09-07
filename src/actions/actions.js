import { HttpUtils } from "../utils/HttpUtils";
import API from "../apis/API";
import * as actionTypes from "../actionType/index";

const requestPosts = (url, language) => {
  return {
    type: actionTypes.REQUEST_GETS,
    url,
    language
  };
};

const receivePosts = (url, receive) => {
  return {
    type: actionTypes.RECEIVE_GETS,
    url,
    posts: receive,
    receivedAt: Date.now()
  };
};

export const axiosVue = (url, language) => {
  return dispatch => {
    dispatch(requestPosts(url, language));
    return HttpUtils.axios(API.VUE.baseUrl, url)
      .then(response => response)
      .then(receive => dispatch(receivePosts(url, receive.data.data)));
  };
};
export const axiosNode = (url, language) => {
  return dispatch => {
    dispatch(requestPosts(url, language));
    return HttpUtils.axios(API.NODE.baseUrl, url)
      .then(response => response)
      .then(receive => dispatch(receivePosts(url, receive.data.data)));
  };
};
// export const getContent = item => {
//   return {
//     type: actionTypes.CONTENT_TEXT,
//     item
//   };
// };
//请求详情数据
export const getContent = (url, language) => {
  let baseUrl = "";
  if (language === "VUE") {
    baseUrl = API.VUE.baseUrl;
  } else if (language === "NODE") {
    baseUrl = API.NODE.baseUrl;
  }
  return dispatch => {
    dispatch({
      type: actionTypes.CONTENT_TEXT_RESPONSE,
      url,
      language
    });
    return HttpUtils.axios(baseUrl, url)
      .then(response => response)
      .then(receive =>
        dispatch({
          type: actionTypes.CONTENT_TEXT_RECEIVE,
          url,
          posts: receive.data.data,
          receivedAt: Date.now()
        })
      );
  };
};

export const communityLogin = (url, language, params, method = "post") => {
  let baseUrl = "";
  if (language === "VUE") {
    baseUrl = API.VUE.baseUrl;
  } else if (language === "NODE") {
    baseUrl = API.NODE.baseUrl;
  }
  return dispatch => {
    dispatch({
      type: actionTypes.COMMUNITY_LOGIN_RESPONSE,
      url,
      language
    });
    return HttpUtils.axios(baseUrl, url, params, method)
      .then(response => response)
      .then(receive => {
        if (receive.status === 200) {
          sessionStorage.setItem("TemporaryToken", params.accesstoken);
          return dispatch({
            type: actionTypes.COMMUNITY_LOGIN_RECEIVE,
            loginSuccess: true,
            posts: receive.data,
            receivedAt: Date.now()
          });
        } else {
          return dispatch({
            type: actionTypes.COMMUNITY_LOGIN_RECEIVE,
            loginSuccess: false,
            posts: receive.data,
            receivedAt: Date.now()
          });
        }
      });
  };
};

export const userUps = (url, language, params, method = "post") => {
  let baseUrl = "";
  if (language === "VUE") {
    baseUrl = API.VUE.baseUrl;
  } else if (language === "NODE") {
    baseUrl = API.NODE.baseUrl;
  }
  return dispatch => {
    dispatch({
      type: actionTypes.USER_UPS_RESPONSE,
      url,
      language
    });
    return HttpUtils.axios(baseUrl, url, params, method)
      .then(response => response)
      .then(receive => {
        return dispatch({
          type: actionTypes.USER_UPS_RECEIVE,
          date: receive.data,
          receivedAt: Date.now()
        });
      });
  };
};

export const repliesWriting = (url, language, params, method = "post") => {
  let baseUrl = "";
  if (language === "VUE") {
    baseUrl = API.VUE.baseUrl;
  } else if (language === "NODE") {
    baseUrl = API.NODE.baseUrl;
  }
  return dispatch => {
    dispatch({
      type: actionTypes.REPLIES_WRITING_RESPONSE,
      language
    });
    return HttpUtils.axios(baseUrl, url, params, method)
      .then(response => response)
      .then(receive => {
        return dispatch({
          type: actionTypes.REPLIES_WRITING_RECEIVE,
          date: receive.data,
          receivedAt: Date.now()
        });
      });
  };
};
