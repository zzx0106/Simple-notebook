import React from "react";
import "./Head.scss";

const Head = props =>
  <div className="rsb-Head">
    <div>
      <div className="loginIcon">
        <div className="login-left">
          <img
            src={`${props.iconName ? props.iconName : "./userimg.gif"}`}
            width="100%"
            height="auto"
            alt="用户头像"
          />
        </div>
        <div className="login-right">
          <span className="login-name">
            {props.username}
          </span>
          <span className="login-title">
            {props.secondTitle}
          </span>
        </div>
      </div>
      <div className="notTitle">
        {props.notTitle}
      </div>
    </div>
  </div>;
export default Head;
