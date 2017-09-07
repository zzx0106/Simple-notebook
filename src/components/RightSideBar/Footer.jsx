import React from "react";
import { Tooltip, message } from "antd";
import { HttpUtils } from "../../utils/HttpUrilsLocal.js";
import API from "../../apis/API.js";
import "./Footer.scss";

const Footer = props =>
  <div className="rsb-Footer">
    <div className="footer-icon">
      <Tooltip placement="top" title="发送邮件给我">
        <svg className="login-svg" aria-hidden="true">
          <use xlinkHref="#icon-email" />
        </svg>
      </Tooltip>
      <Tooltip placement="top" title="收藏这个网站">
        <svg className="login-svg" aria-hidden="true">
          <use xlinkHref="#icon-love" />
        </svg>
      </Tooltip>
      <Tooltip placement="top" title="github地址">
        <svg className="login-svg" aria-hidden="true">
          <use xlinkHref="#icon-icongithub" />
        </svg>
      </Tooltip>
      <Tooltip placement="top" title="清除缓存">
        <svg
          className="login-svg"
          aria-hidden="true"
          onClick={() => {
            HttpUtils.axios(API.Local.baseUrl, API.Local.usersingout_get);
            localStorage.removeItem("user_id");
            localStorage.removeItem("usermessage");
            message.success("缓存清除成功");
          }}
        >
          <use xlinkHref="#icon-qingchuhuancun" />
        </svg>
      </Tooltip>
    </div>
  </div>;
export default Footer;
