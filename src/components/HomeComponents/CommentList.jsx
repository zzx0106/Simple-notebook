import React from "react";
import { Radio, message, Input, Button, Layout } from "antd";
import { lastUpdate } from "../../utils/Tools.js";
import { userUps, getContent, repliesWriting } from "../../actions/actions.js";
import API from "../../apis/API.js";
import "./CommentList.scss";
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const { Content, Sider } = Layout;
let areaValue = "";
const textArea = e => {
  areaValue = e.target.value;
};
const CommentList = props => {
  if (props.isFetched) {
    let list = sort => {
      // 日你mmp
      let renderlist = sort
        ? [].concat(props.comments).reverse()
        : [].concat(props.comments);
      return renderlist.map((item, index) =>
        <div className="list" key={item.id}>
          <div className="left-box">
            <img src={item.author.avatar_url} width="100%" height="auto" alt='' />
          </div>
          <div className="middle-box">
            <div className="loginName">
              {item.author.loginname}
            </div>
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: item.content }}
            />
            <div className="create-at">
              发表于：{lastUpdate(item.create_at)}
            </div>
          </div>
          <div className="right-box">
            <svg
              className="ups"
              aria-hidden="true"
              onClick={() => {
                if (props.language === "VUE") {
                  if (localStorage.getItem("vueToken")) {
                    props.toUps(
                      userUps(API.VUE.ups(item.id), props.language, {
                        accesstoken: localStorage.getItem("vueToken")
                      })
                    );
                    props.refreshShowBody(
                      getContent(API.VUE.content(props.userId), props.language)
                    );
                  } else {
                    message.error("还未登录不能点赞");
                  }
                } else if (props.language === "NODE") {
                  if (localStorage.getItem("nodeToken")) {
                    props.toUps(
                      userUps(API.NODE.ups(item.id), props.language, {
                        accesstoken: localStorage.getItem("nodeToken")
                      })
                    );
                    props.refreshShowBody(
                      getContent(API.NODE.content(props.userId), props.language)
                    );
                  } else {
                    message.error("还未登录不能点赞");
                  }
                }
              }}
            >
              <use xlinkHref="#icon-dianzan" />
            </svg>
            <div className="upsnum">
              {item.ups.length}
            </div>
          </div>
        </div>
      );
    };
    return (
      <div className="comment-list">
        <div className="comments-box">
          <h4 className="sub-comments">
            一共{props.comments.length}条评论
          </h4>
          <RadioGroup
            onChange={e => {
              props.changeSort(); //传值过来让页面重绘
            }}
            defaultValue="1"
          >
            <RadioButton value="1">热门</RadioButton>
            <RadioButton value="2">最新</RadioButton>
          </RadioGroup>
        </div>
        {list(props.sort)}
        <TextArea
          onChange={textArea}
          placeholder="请输入你想说的"
          autosize={{ minRows: 4, maxRows: 8 }}
        />
        <Layout>
          <Content style={{ background: "#fff" }} />
          <Sider width="60px" style={{ borderRadius: "5px" }}>
            <Button
              onClick={() => {
                if (props.language === "VUE") {
                  if (localStorage.getItem("vueToken")) {
                    props.onReplies(
                      repliesWriting(
                        API.VUE.replies(props.userId),
                        props.language,
                        {
                          accesstoken: localStorage.getItem("vueToken"),
                          content: areaValue
                        }
                      )
                    );
                    setTimeout(() => {
                      props.refreshShowBody(
                        getContent(
                          API.VUE.content(props.userId),
                          props.language
                        )
                      );
                    }, 1000);
                  } else {
                    message.error("还未登录不能点赞");
                  }
                } else if (props.language === "NODE") {
                  if (localStorage.getItem("nodeToken")) {
                    props.onReplies(
                      repliesWriting(
                        API.NODE.replies(props.userId),
                        props.language,
                        {
                          accesstoken: localStorage.getItem("nodeToken"),
                          content: areaValue
                        }
                      )
                    );
                    setTimeout(() => {
                      props.refreshShowBody(
                        getContent(
                          API.NODE.content(props.userId),
                          props.language
                        )
                      );
                    }, 1000);
                  } else {
                    message.error("还未登录不能点赞");
                  }
                }
              }}
              type="primary"
            >
              发表
            </Button>
          </Sider>
        </Layout>
      </div>
    );
  } else {
    return <div />;
  }
};
export default CommentList;
