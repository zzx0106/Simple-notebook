import React, { Component } from "react";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { axiosVue, axiosNode } from "../../actions/actions.js";
import API from "../../apis/API.js";
import "./Sidebar.scss";
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vue: false,
      react: false,
      node: false,
      mongoose: false,
      ios: false,
      android: false
    };
  }
  render() {
    const { getCommunityMsg } = this.props;
    return (
      <div className="Sidebar top-box float-l">
        <svg
          className={`icon ${this.state.vue ? "icon-active" : ""}`}
          aria-hidden="true"
          onClick={() => {
            this.setState({
              vue: true,
              react: false,
              node: false,
              mongoose: false,
              ios: false,
              android: false
            });
            getCommunityMsg(axiosVue(API.VUE.getTabs("all"), "VUE"));
          }}
        >
          <use xlinkHref="#icon-vuejs" />
        </svg>
        {/**
           *         <svg
          className={`icon ${this.state.react ? "icon-active" : ""}`}
          aria-hidden="true"
          onClick={e => {
            this.setState({
              vue: false,
              react: true,
              node: false,
              mongoose: false,
              ios: false,
              android: false
            });
            {
               getCommunityMsg(axiosVue(API.VUE.getTabs("all"), "VUE")); 
            }
          }}
        >
          <use xlinkHref="#icon-react" />
        </svg>
           */}

        <svg
          className={`icon ${this.state.node ? "icon-active" : ""}`}
          aria-hidden="true"
          onClick={() => {
            this.setState({
              vue: false,
              react: false,
              node: true,
              mongoose: false,
              ios: false,
              android: false
            });
            getCommunityMsg(axiosNode(API.NODE.getTabs("all"), "NODE"));
          }}
        >
          <use xlinkHref="#icon-nodejs" />
        </svg>
        {/**
           *         <svg
          className={`icon ${this.state.mongoose ? "icon-active" : ""}`}
          aria-hidden="true"
          onClick={() => {
            this.setState({
              vue: false,
              react: false,
              node: false,
              mongoose: true,
              ios: false,
              android: false
            });
            getCommunityMsg(axiosVue(API.VUE.getTabs("all"), "VUE"));
          }}
        >
          <use xlinkHref="#icon-mongo-db" />
        </svg>
           */}
        <div
          style={{
            position: "absolute",
            bottom: "15px",
            width: "100%"
          }}
        >
          <svg
            className={`icon ${this.state.android ? "icon-active" : ""}`}
            aria-hidden="true"
            onClick={() => {
              this.setState({
                vue: false,
                react: false,
                node: false,
                mongoose: false,
                ios: false,
                android: true
              });
              getCommunityMsg(axiosVue(API.VUE.getTabs("all"), "VUE"));
            }}
          >
            <use xlinkHref="#icon-ios" />
          </svg>
          <svg
            className={`icon ${this.state.ios ? "icon-active" : ""}`}
            aria-hidden="true"
            onClick={() => {
              this.setState({
                vue: false,
                react: false,
                node: false,
                mongoose: false,
                android: false,
                ios: true
              });
              getCommunityMsg(axiosVue(API.VUE.getTabs("all"), "VUE"));
            }}
          >
            <use xlinkHref="#icon-Android" />
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
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
