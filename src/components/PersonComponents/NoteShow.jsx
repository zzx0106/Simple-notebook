import React, { Component } from "react";
import NoteReplies from "../../components/PersonComponents/NoteReplies";
import "react-quill/dist/quill.snow.css"; // snow
import { encryptionDatagram } from "../../utils/Tools.js";
import { HttpUtils } from "../../utils/HttpUrilsLocal.js";
import API from "../../apis/API.js";
class NoteShow extends Component {
  state = {
    author_nickname: "",
    author_avatar: "",
    author_id: "",
    note_title: "",
    user_id: "",
    note_id: "",
    user_nickname: "",
    create_time: "",
    note_content: "",
    edit_html: "",
    opennum: "",
    replies: "",
    text_length: 0
  };
  async componentDidMount() {
    const { author_id, note_id, user_nickname } = this.props.match.params;
    const request = await HttpUtils.axios(
      API.Local.baseUrl,
      API.Local.getOneOfNote_post,
      "post",
      {
        encrypUserId: encryptionDatagram(decodeURIComponent(author_id)),
        note_id: note_id
      }
    );
    this.setState({
      user_nickname: user_nickname,
      author_id: request.data.notes.author_id,
      author_nickname: request.data.notes.author_nickname,
      author_avatar: request.data.notes.author_avatar,
      user_id: request.data.notes.user_id,
      note_id: note_id,
      create_time: request.data.notes.create_time,
      note_content: request.data.notes.note_content,
      note_title: request.data.notes.note_title,
      opennum: request.data.notes.opennum,
      replies: request.data.notes.replies,
      text_length: 0
    });
  }
  render() {
    return (
      <div className="WriteNote">
        <div
          className="listshow"
          style={{
            width: "900px",
            margin: "0 auto"
          }}
        >
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
          <h1
            className="title"
            style={{
              textAlign: "center",
              marginBottom: "30px"
            }}
          >
            {this.state.note_title}
          </h1>
          <div
            className="msg"
            style={{
              display: "flex",
              fontSize: "15px",
              color: "#9c9c9c"
            }}
          >
            <div
              className="create-at"
              style={{
                marginRight: "20px"
              }}
            >
              发表于{this.state.create_time}
            </div>
            <div
              className="author-name"
              style={{
                marginRight: "20px"
              }}
            >
              作者{this.state.author_nickname}
            </div>
            <div
              className="visit-count"
              style={{
                marginRight: "20px"
              }}
            >
              被浏览了{this.state.opennum}次
            </div>
          </div>
          <div
            style={{
              width: "900px",
              margin: "50px auto"
            }}
            dangerouslySetInnerHTML={{
              __html: this.state.note_content
            }}
          />
          <NoteReplies
            router={this.props.history || ""}
            author_id={this.state.user_id || ""}
            note_id={this.state.note_id || ""}
            nickname={this.state.user_nickname || ""}
            replies={this.state.replies || []}
          />
        </div>
      </div>
    );
  }
}
export default NoteShow;
