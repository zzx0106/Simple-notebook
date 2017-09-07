import React, { Component } from "react";
import IframeDocument from "./IframeDocument";
import DocList from "./DocList";
import { HttpUtils } from "../../utils/HttpUrilsLocal.js";
import API from "../../apis/API.js";
class Documents extends Component {
  constructor(props) {
    super(props);
    this.sendDocUrl = this.sendDocUrl.bind(this);
    this.getIsLoading = this.getIsLoading.bind(this);
    this.state = {
      url: "",
      isLoading: false,
      DocUrl: []
    };
  }
  async componentDidMount() {
    const DocUrl = await HttpUtils.axios(
      API.Local.baseUrl,
      API.Local.getdoclist_get
    );
    this.setState({
      DocUrl: DocUrl.data.data
    });
  }
  sendDocUrl(url, isLoading) {
    this.setState({
      url: url,
      isLoading: isLoading
    });
  }
  getIsLoading(isLoading) {
    this.setState({
      isLoading: isLoading
    });
  }
  render() {
    return (
      <div style={{ display: "flex" }} className="Documents top-box">
        <DocList sendDocUrl={this.sendDocUrl} DocUrl={this.state.DocUrl} />
        <IframeDocument
          getIsLoading={this.getIsLoading}
          isLoading={this.state.isLoading}
          url={this.state.url}
          style={{ flex: 1, overflow: "hidden" }}
        />
      </div>
    );
  }
}
export default Documents;
