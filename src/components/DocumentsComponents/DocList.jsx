import React, { Component } from "react";
import { Menu, Icon, Button } from "antd";
const SubMenu = Menu.SubMenu;

class DocList extends Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       collapsed: false
  //     };
  //   }
  state = {
    theme: "dark",
    current: "1"
  };
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  render() {
    return (
      <div style={this.props.style} className="DocList top-box">
        <div style={{ display: "flex" }}>
          <Button type="primary" onClick={this.toggleCollapsed}>
            <Icon type={this.state.collapsed ? "menu-unfold" : "menu-fold"} />
          </Button>
        </div>
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="light"
          inlineCollapsed={this.state.collapsed}
          onClick={e => this.props.sendDocUrl(e.key, true)}
        >
          {/* 支持三层嵌套 */}
          {console.log(this.props.DocUrl)}
          {this.props.DocUrl.map((item, index) => {
            if (!item.knowledges) {
              return (
                <Menu.Item key={item.url}>
                  <Icon type="api" />
                  <span>
                    {item.name}
                  </span>
                </Menu.Item>
              );
            } else {
              return (
                <SubMenu
                  key={item.name}
                  title={
                    <span
                      style={{
                        width: "180px",
                        display: "inline-block"
                      }}
                    >
                      <Icon type="folder" />
                      <span>
                        {item.name}
                      </span>
                    </span>
                  }
                >
                  {item.knowledges.map((item, index) => {
                    if (!item.knowledges) {
                      return (
                        <Menu.Item key={item.url}>
                          <Icon type="file-text" />
                          <span>
                            {item.name}
                          </span>
                        </Menu.Item>
                      );
                    } else {
                      return (
                        <SubMenu
                          key={item.name}
                          title={
                            <span>
                              <Icon type="folder" />
                              <span>
                                {item.name}
                              </span>
                            </span>
                          }
                        >
                          {item.knowledges.map((item, index) =>
                            <Menu.Item key={item.url}>
                              <Icon type="file-text" />
                              {item.name}
                            </Menu.Item>
                          )}
                        </SubMenu>
                      );
                    }
                  })}
                </SubMenu>
              );
            }
          })}
        </Menu>
      </div>
    );
  }
}
export default DocList;
