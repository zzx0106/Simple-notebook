import React from "react";
import { Link } from "react-router-dom";
import "./SideBarLi.scss";

const Head = props =>
  <label>
    <div className="rsb-SideBarLi">
      <svg className="rsb-svg" aria-hidden="true">
        <use xlinkHref={`${props.iconName}`} />
      </svg>
      <span
        style={{
          height: "50px",
          lineHeight: "50px",
          flex: 1
        }}
      >
        <Link
          to={props.router}
          style={{
            display: "block",
            height: "50px",
            lineHeight: "50px",
            textDecoration: "none"
          }}
          
        >
          {props.isshow ? props.title : ""}
        </Link>
      </span>
    </div>
  </label>;
export default Head;
