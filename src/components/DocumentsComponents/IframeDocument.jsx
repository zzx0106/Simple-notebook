import React from "react";
import {Spin} from "antd";
const IframeDocument = props => <div style={props.style} className="IframeDocument top-box">
  {console.log(props.isLoading)}
  <Spin spinning={props.isLoading}/>
  <iframe title="文档窗口" src={props.url} frameBorder="0" className="top-box" style={{
    width: "100%"
  }} onLoad={() => props.getIsLoading(false)} //加载完调用结束加载动画
  />
</div>;
export default IframeDocument;
