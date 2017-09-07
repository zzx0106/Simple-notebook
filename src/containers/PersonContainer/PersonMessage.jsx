import React, { Component } from "react";
import { connect } from "react-redux";
import { message, Radio } from "antd";
import PersonSideBar from "../../containers/PersonContainer/PersonSideBar";
import { userMessageAction } from "../../actions/localAction.js";
import PersonNotList from "../../components/PersonComponents/PersonNotList";
import { HttpUtils } from "../../utils/HttpUrilsLocal.js";
import API from "../../apis/API.js";

import { encryption, encryptionDatagram, decryptionDatagram } from "../../utils/Tools.js";
import "./PersonMessage.scss";
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
class PersonMessage extends Component {
  state = {
    notelist: Object,
    sortType: "a"
  };
  componentDidMount = async () => {
    const getmessage = localStorage.getItem("usermessage");
    try {
      if (getmessage) {
        const parms = decryptionDatagram(getmessage);
        parms.password = encryption(parms.password);
        const request = await HttpUtils.axios(API.Local.baseUrl, API.Local.userlogin_post, "post", parms);
        if (request.data.status === 200) {
          message.success(request.data.message);
          localStorage.setItem("user_id", request.data.user_id);
          this.props.getUserMessage({ user_id: request.data.user_id });
          const list = await HttpUtils.axios(API.Local.baseUrl, API.Local.getnotes_post, "post", {
            encrypUserId: encryptionDatagram(request.data.user_id)
          });
          this.setState({ notelist: list });
        } else if (request.data.status === 250) {
          const user_id = localStorage.getItem("user_id");
          this.props.getUserMessage({ user_id: user_id });
          const list = await HttpUtils.axios(API.Local.baseUrl, API.Local.getnotes_post, "post", { encrypUserId: encryptionDatagram(user_id) });
          this.setState({ notelist: list });
        } else {
          message.error(request.data.message);
          this.props.history.push("/Person/Login");
        }
      } else {
        this.props.history.push("/Person/Login");
      }
    } catch (error) {
      console.error("PersonMessage", error);
    }
  };
  render() {
    let usermsg = {
      nickname: "username"
    };
    const { usermessage } = this.props;
    if (usermessage) {
      usermsg = usermessage.data;
    }
    return (
      <div style={{
        height: '100%',
        overflow: 'auto'
      }}>
        <PersonSideBar {...this.props} />
        <div className="PersonMessage">
          <div className="person-head">
            <div className="head-left">
              <img src="/person.png" width="100%" height="auto" alt='e' />
            </div>
            <div className="head-right">
              <div className="person-name">
                {usermsg.nickname}
              </div>
              <div className="person-msg">
                <div>
                  已发表&nbsp;{usermsg.not_number}&nbsp;篇
                </div>
                <div>
                  被浏览&nbsp;{usermsg.not_number}&nbsp;次
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              marginTop: 16,
              display: "flex",
              justifyContent: " flex-end"
            }}>
            <RadioGroup
              defaultValue="a"
              onChange={e => {
                this.setState({ sortType: e.target.value });
              }}>
              <RadioButton value="a">时间↑</RadioButton>
              <RadioButton value="b">时间↓</RadioButton>
              <RadioButton value="c">热度</RadioButton>
              <RadioButton value="d">点击</RadioButton>
            </RadioGroup>
          </div>
          <PersonNotList
            sortType={this.state.sortType}
            router={this.props}
            {...(this.state.notelist.data ? this.state.notelist.data.notes : false) } />

        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return { usermessage: state.userMessage.message.data };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getUserMessage: data => {
      dispatch(userMessageAction(data));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PersonMessage);
