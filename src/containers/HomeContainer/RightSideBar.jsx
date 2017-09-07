import React, { Component } from "react";
import { connect } from "react-redux";
import "./RightSideBar.scss";

import Hand from "../../components/RightSideBar/Head";
import SideList from "../../components/RightSideBar/SideBarLi";
import Footer from "../../components/RightSideBar/Footer";
class RightSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isshow: false
    };
  }
  render() {
    const { userMessage } = this.props;
    const _userMessage = userMessage ? userMessage.data : userMessage;
    console.log(_userMessage);
    return (
      <div className="RightSideBar top-box" ref="RightSideBar">
        {console.log([this.props])}
        <svg
          className="rsb-menu"
          aria-hidden="true"
          onClick={() => {
            this.setState({
              isshow: !this.state.isshow
            });
            this.state.isshow
              ? (this.refs.RightSideBar.style.width = "0")
              : (this.refs.RightSideBar.style.width = "250px");
          }}
        >
          <use xlinkHref="#icon-caidan" />
        </svg>
        <Hand
          username={_userMessage ? _userMessage.nickname : "暂未登录"}
          secondTitle={_userMessage ? _userMessage.qq : ""}
          iconName={""}
          notTitle={_userMessage ? _userMessage.content : "这个人很懒，什么都没有留下"}
        />
        <SideList
          isshow={this.state.isshow}
          title={"主页"}
          router={"/"}
          iconName={"#icon-zhuye"}
        />

        <SideList
          isshow={this.state.isshow}
          title={"个人"}
          router={"/Person/PersonMessage"}
          iconName={"#icon-mycenter"}
        />
        <SideList
          isshow={this.state.isshow}
          title={"笔记"}
          router={"/Note"}
          iconName={"#icon-biji"}
        />
        <SideList
          isshow={this.state.isshow}
          title={"API文档"}
          router={"/Documents"}
          iconName={"#icon-wendang"}
        />
        <SideList
          isshow={this.state.isshow}
          title={"收藏夹"}
          router={"/Loves"}
          iconName={"#icon-iconshoucangjia"}
        />
        <Footer />
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    userMessage: state.userMessage.message.data
  };
};
export default connect(mapStateToProps)(RightSideBar);
