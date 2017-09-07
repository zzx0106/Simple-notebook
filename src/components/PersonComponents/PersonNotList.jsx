import React from "react";
import "./PersonNotList.scss";
const PersonNotList = notes => {
  if (notes.notes) {
    switch (notes.sortType) {
      case "a": //时间升
        notes.notes.sort(
          (n1, n2) => new Date(n2.create_time) - new Date(n1.create_time)
        );
        break;
      case "b": //时间降
        notes.notes.sort(
          (n1, n2) => new Date(n1.create_time) - new Date(n2.create_time)
        );
        break;
      case "c": //热度
        notes.notes.sort((n1, n2) => n2.replies.length - n1.replies.length);
        break;
      case "d": //点击
        notes.notes.sort((n1, n2) => n2.opennum - n1.opennum);
        break;
      default:
        break;
    }
  }
  return (
    <div className="PersonNotList">
      {notes.notes
        ? notes.notes.map((item, index) =>
          <div
            className="list"
            key={index}
            data-id={notes._id}
            onClick={() => {
              notes.router.history.push({
                pathname: `/Person/NoteShow/${item.note_id}/${encodeURIComponent(notes.user_id)}/${notes.nickname}`//避免/被转义
              });
            }}
          >
            <div className="title">
              {item.note_title}
            </div>
            <div className="msg">
              <div className="author">
                作者：{notes.nickname}
              </div>
              <div className="watch">
                <svg className="list-svg" aria-hidden="true">
                  <use xlinkHref="#icon-watch" />
                </svg>
                {item.opennum}
              </div>
              <div className="create-time">
                发表于：{item.create_time}
              </div>
              <div className="commit">
                <svg className="list-svg" aria-hidden="true">
                  <use xlinkHref="#icon-pinglun" />
                </svg>
                {item.replies.length}
                </div>
            </div>
          </div>
        )
        : ""}
    </div>
  );
};

export default PersonNotList;
