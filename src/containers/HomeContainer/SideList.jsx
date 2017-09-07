import React, {Component} from "react";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import { VueCommunity, ReactCommunity } from "../../routers/lazy-router.js";
import {connect} from "react-redux";
import {
  Spin,
  Input,
  Icon,
  Button,
  Tooltip,
  Modal
} from "antd";
import {getContent, communityLogin} from "../../actions/actions.js";
import Tags from "../../components/HomeComponents/Tags";
import {lastUpdate} from "../../utils/Tools.js";
import API from "../../apis/API.js";
import "./SideList.scss";
class SideList extends Component {
  constructor(props) {
    super(props);
    this.showModal = this
      .showModal
      .bind(this);
    this.state = {
      userToken: "",
      type: "",
      sModal: false
    };
  }
  showModal(type) {
    if (type === "VUE") {
      this.setState({sModal: true, type: type, title: "Vue中文社区"});
    } else if (type === "NODE") {
      this.setState({sModal: true, type: type, title: "CNode中文社区"});
    }
  }
  handleCancel = () => {
    this.setState({sModal: false});
  };
  emitEmpty = () => {
    this
      .userNameInput
      .focus();
    this.setState({userToken: ""});
  };
  changeLodingStyle = () => {
    this.setState({sModal: false, confirmLoading: false});
  };
  onChangeUserName = e => {
    this.setState({userToken: e.target.value});
  };
  onGoLogin = () => {
    let vueToken = localStorage.getItem("vueToken");
    let nodeToken = localStorage.getItem("nodeToken");
    if (vueToken) {
      this
        .props
        .userLogin(communityLogin(API.VUE.userAccessToken, "VUE", {accesstoken: vueToken}));
    }
    if (nodeToken) {
      this
        .props
        .userLogin(communityLogin(API.NODE.userAccessToken, "NODE", {accesstoken: nodeToken}));
    }
  };
  render() {
    const {
      isFetching,
      items,
      language,
      renderContent,
      getCommunityMsg,
      userLogin,
      vueLoginSuccess,
      nodeLoginSuccess,
      isLoginFetching
    } = this.props;
    let ModalState = false;
    ModalState = this.state.sModal;
    console.log(vueLoginSuccess);
    if (vueLoginSuccess && nodeLoginSuccess) {
      ModalState = false;
    }
    console.log(ModalState);
    const suffix = this.state.userToken
      ? <Icon type="close-circle" onClick={this.emitEmpty}/>
      : null;
    // if (isLoginFetched) {   if (loginSuccess) {
    // message.success(`${this.state.title}登录成功`);   } else {
    // message.error(`${this.state.title}登录失败`);   } }
    return (
      <div className="SideList top-box float-l">
        <Spin spinning={isFetching} size="default"/>
        <div className="affix">
          <div className="communityLogin">
            <Tooltip
              onClick={this.onGoLogin}
              placement="left"
              title="如果您以前登录过，点击登录即可直接登录开源社区，登陆后您可以点赞、评论">
              <Button
                style={{
                margin: "9px 0"
              }}
                type="dashed"
                ghost>
                一键登录开源社区
              </Button>
              <Modal
                title={this.state.title}
                style={{
                position: "reletive"
              }}
                wrapClassName="vertical-center-modal"
                visible={ModalState}
                onOk={() => {
                this.setState({confirmLoading: true, sModal: false});
                if (this.state.type === "VUE") {
                  console.log(this.state.type);
                  userLogin(communityLogin(API.VUE.userAccessToken, this.state.type, {accesstoken: this.state.userToken}));
                } else if (this.state.type === "NODE") {
                  console.log(this.state.type);
                  userLogin(communityLogin(API.NODE.userAccessToken, this.state.type, {accesstoken: this.state.userToken}));
                }
              }}
                confirmLoading={isLoginFetching}
                onCancel={this.handleCancel}>
                <Input
                  placeholder={`请输入${this.state.title}登录AccessToken`}
                  prefix={< Icon type = "user" />}
                  suffix={suffix}
                  value={this.state.userToken}
                  onChange={this.onChangeUserName}
                  ref={node => (this.userNameInput = node)}/>
                <Tooltip placement="right" title="是指您在开源社区注册账号后个人信息中的Access Token">
                  <a
                    style={{
                    marginTop: "10px",
                    display: "block",
                    textAlign: "right"
                  }}
                    onClick={e => e.preventDefault}>
                    Access Token是什么？
                  </a>
                </Tooltip>
              </Modal>
            </Tooltip>
            <div className="login-buttons">
              <div className="lg-box" onClick={() => this.showModal("VUE")}>
                <svg className="login-svg" aria-hidden="true">
                  <use
                    xlinkHref={`${vueLoginSuccess
                    ? "#icon-vuejs"
                    : "#icon-vue"}`}/>
                </svg>
              </div>
              <div className="lg-box" onClick={() => this.showModal("NODE")}>
                <svg className="login-svg" aria-hidden="true">
                  <use
                    xlinkHref={`${nodeLoginSuccess
                    ? "#icon-nodejs"
                    : "#icon-nodejs1"}`}/>
                </svg>
              </div>
            </div>
          </div>

          <Tags language={language} getCommunityMsg={getCommunityMsg}/>
        </div>
        <ul>
          {items
            ? items.map((item, index) => <li
              key={item.id}
              className="clearfix item-list"
              onClick={() => renderContent(item.id, language)}>
              <div className="left-box">
                <img src={item.author.avatar_url} width="100%" height="auto" alt=''/>
              </div>
              <div className="right-box">
                <h1 className="title">
                  {item.title}
                </h1>
                <div className="item-body">
                  <div
                    className={`istop ${item.top
                    ? "showtop"
                    : ""}`}>
                    顶置
                  </div>
                  <h2 className="create-at">
                    {lastUpdate(item.last_reply_at)}
                  </h2>
                </div>
                <div className="item-footer">
                  <div className="author-name">
                    {item.author.loginname}
                  </div>
                  <div className="visit-count">
                    点击{item.visit_count}次
                  </div>
                  <div className="reply-count">
                    回复{item.reply_count}次
                  </div>
                </div>
              </div>
            </li>)
            : ""}
        </ul>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    didInvalidate: state.chooseLanguage.didInvalidate,
    isFetching: state.chooseLanguage.isFetching,
    items: state.chooseLanguage.items,
    language: state.chooseLanguage.language,
    isLoginFetching: state.communityLogin.isLoginFetching,
    vueLoginSuccess: state.communityLogin.vueLoginSuccess,
    nodeLoginSuccess: state.communityLogin.nodeLoginSuccess,
    isLoginFetched: state.communityLogin.isLoginFetched
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    renderContent: (id, language) => {
      let url = "";
      if (language === "VUE") {
        url = API
          .VUE
          .content(id);
      } else if (language === "NODE") {
        url = API
          .NODE
          .content(id);
      }
      dispatch(getContent(url, language));
    },
    getCommunityMsg: action => {
      dispatch(action);
    },
    userLogin: tokenAction => {
      dispatch(tokenAction);
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SideList);
