import { HttpUtils } from "../utils/HttpUrilsLocal";
import API from "../apis/API";
import { encryptionDatagram } from "../utils/Tools";
import * as actionTypes from "../actionType/index";
// 本地
export const userMessageAction = user_id => {
  return dispatch => {
    dispatch({
      type: actionTypes.USER_MESSAGE_RESPONSE
    });
    return HttpUtils.axios(
      API.Local.baseUrl,
      API.Local.userMessage_post,
      "post",
      { encrypUserId: encryptionDatagram(user_id) }
    ).then(receive => {
      return dispatch({
        type: actionTypes.USER_MESSAGE_RECEIVE,
        data: receive.data,
        receivedAt: Date.now()
      });
    });
  };
};
