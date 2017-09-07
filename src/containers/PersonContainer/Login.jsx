import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox, message } from "antd";
import { HttpUtils } from "../../utils/HttpUrilsLocal.js";
import API from "../../apis/API.js";
import "./Login.scss";
import { encryption, encryptionDatagram } from "../../utils/Tools.js";
const FormItem = Form.Item;
class Login extends Component {
  state = {
    isSave: false
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const params = {
          account: values.account,
          password: values.password
        };
        const request = await HttpUtils.axios(
          API.Local.baseUrl,
          API.Local.userlogin_post,
          "post",
          {
            account: values.account,
            password: encryption(values.password)
          }
        );
        if (request.data.status === 200) {
          message.success(request.data.message);
          if (this.state.isSave) {
            const newParams = encryptionDatagram(params);
            localStorage.setItem("usermessage", newParams);
          }
          localStorage.setItem("user_id", request.data.user_id);
          this.props.history.push("/Person/PersonMessage");
        } else {
          message.error(request.data.message);
        }
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="Login">
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>请登录</h1>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator("account", {
              rules: [{ required: true, message: "请输入账号" }]
            })(
              <Input
                prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                placeholder="账号"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("password", {
              rules: [{ required: true, message: "请输入密码" }]
            })(
              <Input
                prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                type="password"
                placeholder="请输入密码"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: false
            })(
              <Checkbox
                onChange={() =>
                  this.setState({
                    isSave: !this.state.isSave
                  })}
              >
                记住我
              </Checkbox>
            )}
            <a className="login-form-forgot" href="">
              忘记密码
            </a>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
            <a
              onClick={e => {
                e.preventDefault();
                this.props.history.push("/Person/Register");
              }}
            >
              注册
            </a>
          </FormItem>
        </Form>
      </div>
    );
  }
}
Login = Form.create()(Login);
export default Login;
