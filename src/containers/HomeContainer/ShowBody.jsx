import React, { Component } from "react";
import { connect } from "react-redux";
import { createDate } from "../../utils/Tools.js";
import { Spin } from "antd";
import CommentList from "../../components/HomeComponents/CommentList";
import "./ShowBody.scss";
class ShowBody extends Component {
  constructor(props) {
    super(props);
    this.changeSort = this.changeSort.bind(this);
    this.state = {
      sort: false
    };
  }
  changeSort() {
    this.setState({
      //讲道理这一块参数是让列表重绘的，并无卵用
      sort: !this.state.sort
    });
  }
  render() {
    const {
      item,
      isFetching,
      isFetched,
      toUps,
      language,
      refreshShowBody,
      onReplies
    } = this.props;
    return (
      <div className="ShowBody top-box">
        <Spin spinning={isFetching} size="large" />
        <div className="showbody-header" hidden={!isFetched}>
          <h1 className="title">
            {isFetched ? item.title : ""}
          </h1>
          <div
            className={`istop ${isFetched ? (item.top ? "showtop" : "") : ""}`}
          >
            顶置
          </div>
          <div className="msg">
            <div className="create-at">
              发表于{createDate(isFetched ? item.create_at : "")}
            </div>
            <div className="author-name">
              作者{isFetched ? item.author.loginname : ""}
            </div>
            <div className="visit-count">
              被浏览了{isFetched ? item.visit_count : ""}次
            </div>
            <div className="share">
              来自:{" "}
              {isFetched
                ? item.tab === "share" ? "分享" : item.teb === "ask" ? "问答" : ""
                : ""}
            </div>
          </div>
        </div>
        <hr hidden={!isFetched} />
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: isFetched ? item.content : "" }}
        />

        <CommentList
          isFetched={isFetched}
          sort={this.state.sort}
          changeSort={this.changeSort}
          comments={item.replies}
          toUps={toUps}
          language={language}
          userId={item.id}
          refreshShowBody={refreshShowBody}
          onReplies={onReplies}
        />
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    item: state.contentCommunity.content,
    isFetching: state.contentCommunity.isFetching,
    isFetched: state.contentCommunity.isFetched,
    language: state.chooseLanguage.language
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toUps: action => {
      dispatch(action);
    },
    refreshShowBody: action => {
      dispatch(action);
    },
    onReplies: action => {
      dispatch(action);
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ShowBody);
