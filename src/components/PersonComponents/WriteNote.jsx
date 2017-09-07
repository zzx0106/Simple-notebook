import React, { Component } from "react";
import ReactQuill from "react-quill";
import { Input, Button, message } from "antd";
import { HttpUtils } from "../../utils/HttpUrilsLocal.js";
import { encryptionDatagram } from "../../utils/Tools.js";
import API from "../../apis/API.js";
import "react-quill/dist/quill.snow.css"; // snow
class WriteNote extends Component {
  state = {
    title: "",
    edit_html: "",
    text_length: 0,
    modules: {
      toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" }
        ],
        ["link", "image"],
        ["clean"]
      ]
    },

    formats: [
      "header",
      "bold",
      "italic",
      "underline",
      "strike",
      "blockquote",
      "list",
      "bullet",
      "indent",
      "link",
      "image"
    ]
  };
  submitEdite = async () => {
    if (!this.props.location.query) {
      this.props.history.go(-1);
      return;
    }
    const { nickname, user_id } = this.props.location.query.usermessage.data;
    const userId = localStorage.getItem("user_id");
    if (userId) {
      const response = await HttpUtils.axios(
        API.Local.baseUrl,
        API.Local.addnote_post,
        "post",
        {
          encrypUserId: encryptionDatagram(
            localStorage.getItem("user_id") || user_id
          ),
          nickname: nickname,
          avatar_ur: "",
          note_title: this.state.title,
          note_content: this.state.edit_html
        }
      );
      if (response.data.status === 200) {
        message.success("发表成功，即将返回个人页!", 3);
        setTimeout(() => {
          this.props.history.push("/Person/PersonMessage");
        }, 3000);
      } else {
        message.error(`发表失败: ${response.data.message}`, 3);
      }
    } else {
      message.error("您尚未登录，即将跳入登录页!", "3");
      setTimeout(() => {
        this.props.history.push("/Person/Login");
      }, 3000);
    }
  };
  render() {
    return (
      <div className="WriteNote">
        <div className="list">
          <h1 className="title" style={{ textAlign: "center" }}>
            请开始你的表演
          </h1>
          <div className="backButton">
            <label
              style={{
                display: "block",
                height: "25px",
                marginTop: "20px",
                marginBottom: "20px",
                marginLeft: "50px"
              }}
              onClick={() => {
                this.props.history.go(-1);
              }}
            >
              <svg
                style={{
                  width: "25px",
                  height: "25px"
                }}
                aria-hidden="true"
              >
                <use xlinkHref="#icon-houtui" />
              </svg>
              <span
                style={{
                  lineHeight: "25px",
                  marginLeft: "10px",
                  verticalAlign: "top",
                  display: "inline-block",
                  fontSize: "16px",
                  fontWeight: "900"
                }}
              >
                后退
              </span>
            </label>
          </div>
          <div
            style={{
              width: "1000px",
              margin: "0 auto"
            }}
          >
            <Input
              onChange={e => {
                this.setState({
                  title: e.target.value
                });
              }}
              placeholder={"请输入文章标题"}
              style={{ marginBottom: "20px" }}
            />
            <ReactQuill
              theme="snow"
              value={this.state.edit_html}
              modules={this.state.modules}
              formats={this.state.formats}
              placeholder={"请开始你的表演.png"}
              onChange={(value, delta, source, editor) => {
                this.setState({
                  edit_html: value,
                  text_length: editor.getLength()
                });
              }}
            >
              <div className="editing-area" style={{ minHeight: "500px" }} />
            </ReactQuill>
            <div style={{ display: "flex", marginTop: "20px" }}>
              <Button onClick={this.submitEdite} type="primary">
                发表
              </Button>
              <div style={{ flex: 1, textAlign: "right", marginRight: "20px" }}>
                您已输入{this.state.text_length}个字
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default WriteNote;
