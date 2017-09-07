import React, { Component } from "react";
import { message } from "antd";
import { connect } from "react-redux";
import { HttpUtils } from "../../utils/HttpUrilsLocal.js";
import API from "../../apis/API.js";
import "./PersonSideBar.scss";
class PersonSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icon1: false,
      icon2: false,
      icon3: false,
      icon4: false,
      icon5: false,
      icon6: false
    };
  }
  render() {
    return (
      <div className="PersonSideBar top-box float-l">
        <svg
          className={`icon ${this.state.icon1 ? "icon-active" : ""}`}
          aria-hidden="true"
          onClick={() => {
            this.setState({
              icon1: true,
              icon2: false,
              icon3: false,
              icon4: false,
              icon5: false,
              icon6: false
            });
          }}
        >
          <use xlinkHref="#icon-yonghu" />
        </svg>
        <svg
          className={`icon ${this.state.icon3 ? "icon-active" : ""}`}
          aria-hidden="true"
          onClick={() => {
            this.props.history.push({
              pathname: "/Person/WriteNote",
              query: {
                usermessage: this.props.usermessage
              }
            });
            this.setState({
              icon1: false,
              icon2: false,
              icon3: true,
              icon4: false,
              icon5: false,
              icon6: false
            });
          }}
        >
          <use xlinkHref="#icon-biji1" />
        </svg>
        <div
          style={{
            position: "absolute",
            bottom: "15px",
            width: "100%"
          }}
        >
          {/* <svg
            className={`icon ${this.state.icon6 ? "icon-active" : ""}`}
            aria-hidden="true"
            onClick={async () => {
              console.log("退出");
              //退出
              const request = await HttpUtils.axios(
                API.Local.baseUrl,
                API.Local.usersingout_get
              );
              if (request.data.status === "200") {
                message.success(request.data.message);
              } else {
                message.error(request.data.message);
              }
              this.setState({
                icon1: false,
                icon2: false,
                icon3: false,
                icon4: false,
                icon5: false,
                icon6: true
              });
            }}
          >
            <use xlinkHref="#icon-tuichu1" />
          </svg> */}
          <svg
            className={`icon ${this.state.icon5 ? "icon-active" : ""}`}
            aria-hidden="true"
            onClick={async () => {
              //退出
              const request = await HttpUtils.axios(
                API.Local.baseUrl,
                API.Local.usersingout_get
              );
              console.log(request.data.status);
              if (request.data.status === 200) {
                localStorage.removeItem("user_id");
                localStorage.removeItem("usermessage");
                this.props.history.go(0);
              } else {
                message.error(request.data.message);
              }
              this.setState({
                icon1: false,
                icon2: false,
                icon3: false,
                icon4: false,
                icon6: false,
                icon5: true
              });
            }}
          >
            <use xlinkHref="#icon-tuichu1" />
          </svg>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    prop: state.prop
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getCommunityMsg: url => {
      dispatch(url);
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PersonSideBar);
