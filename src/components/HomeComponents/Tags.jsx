import React from "react";
import { Tag } from "antd";
import { axiosNode, axiosVue } from "../../actions/actions.js";
import API from "../../apis/API.js";
const Tags = props => {
  const VueLists = [
    {
      color: "pink",
      tag: "全部",
      API: axiosVue(API.VUE.getTabs("all"), "VUE")
    },
    {
      color: "orange",
      tag: "精华",
      API: axiosVue(API.VUE.getTabs("good"), "VUE")
    },
    {
      color: "cyan",
      tag: "weex",
      API: axiosVue(API.VUE.getTabs("weex"), "VUE")
    },
    {
      color: "blue",
      tag: "问答",
      API: axiosVue(API.VUE.getTabs("ask"), "VUE")
    },
    {
      color: "green",
      tag: "分享",
      API: axiosVue(API.VUE.getTabs("share"), "VUE")
    },
    {
      color: "red",
      tag: "招聘",
      API: axiosVue(API.VUE.getTabs("job"), "VUE")
    }
  ];
  const NodeLists = [
    {
      color: "pink",
      tag: "全部",
      API: axiosNode(API.VUE.getTabs("all"), "NODE")
    },
    {
      color: "orange",
      tag: "精华",
      API: axiosNode(API.VUE.getTabs("good"), "NODE")
    },
    {
      color: "cyan",
      tag: "问答",
      API: axiosNode(API.VUE.getTabs("ask"), "NODE")
    },
    {
      color: "blue",
      tag: "招聘",
      API: axiosNode(API.VUE.getTabs("job"), "NODE")
    },
    {
      color: "green",
      tag: "分享",
      API: axiosNode(API.VUE.getTabs("share"), "NODE")
    },
    {
      color: "red",
      tag: "测试",
      API: axiosNode(API.VUE.getTabs("dev"), "NODE")
    }
  ];
  const renderList = listType =>
    listType.map((item, index) => {
      return (
        <Tag
          key={index}
          color={item.color}
          onClick={() => props.getCommunityMsg(item.API, item.type)}
        >
          {item.tag}
        </Tag>
      );
    });
  switch (props.language) {
    case "VUE":
      return (
        <div>
          {renderList(VueLists)}
        </div>
      );
    case "NODE":
      return (
        <div>
          {renderList(NodeLists)}{" "}
        </div>
      );
    default:
      return <div style={{ color: "#fff" }}></div>;
  }
};
export default Tags;
