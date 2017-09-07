import React, { Component } from "react";
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Select,
  message,
  Row,
  Col,
  Checkbox,
  Button,
  Modal
} from "antd";
import { HttpUtils } from "../../utils/HttpUrilsLocal.js";
import API from "../../apis/API.js";
import "./Register.scss";
import { encryption } from "../../utils/Tools.js";
const FormItem = Form.Item;
const Option = Select.Option;

class Register extends Component {
  constructor(props) {
    super(props);
    this.inputOnBlur = this.inputOnBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  state = {
    confirmDirty: false,
    visible: false,
    message: "",
    btn_disabled: true,
    validateStatusList: {
      success: "success",
      warning: "warning",
      error: "error",
      validating: "validating"
    },
    isFeedback: {
      nickname: "nickname",
      account: "account"
    }
  };
  async handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const response = await HttpUtils.axios(
          API.Local.baseUrl,
          API.Local.userregister_post,
          "post",
          {
            account: values.account,
            password: encryption(values.password),
            nickname: values.nickname,
            content: values.content,
            sex: values.sex,
            phone_number: values.phone_head + values.phone_number,
            qq: values.qq || "",
            github: values.github || ""
          }
        );
        if (response.data.status === 200) {
          message.success(response.data.message, 3000);
          setTimeout(() => this.props.history.push("/Person/Login"), 3000)
        } else {
          message.error(response.data.message);
        }
      }
    });
  }
  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("两次输入的密码必须一致!");
    } else {
      callback();
    }
  };
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };
  showModal = () => {
    this.setState({
      visible: true
    });
  };
  handleOk = e => {
    this.setState({
      visible: false
    });
  };
  handleCancel = e => {
    this.setState({
      visible: false
    });
  };
  //input 失去焦点
  async inputOnBlur(type, params) {
    if (params.split("").length < 1) {
      this.changeValidateStatus(type, "error");
      return;
    }
    this.changeValidateStatus(type, "validating");
    if (type === "nickname") {
      const searchAccount = await HttpUtils.axios(
        API.Local.baseUrl,
        API.Local.searchNickname_post,
        "post",
        {
          nickname: params
        }
      );
      if (searchAccount.data.status === 200) {
        message.success("可以使用该昵称");
        this.changeValidateStatus(type, "success");
      } else {
        message.error("该昵称已被注册");
        this.changeValidateStatus(type, "error");
      }
    } else if (type === "account") {
      console.log(params);
      if (params.split("").length < 6) {
        this.changeValidateStatus(type, "error");
        return;
      }
      this.changeValidateStatus(type, "validating");
      const searchNickname = await HttpUtils.axios(
        API.Local.baseUrl,
        API.Local.searchAccount_post,
        "post",
        {
          account: params
        }
      );
      if (searchNickname.data.status === 200) {
        message.success("可以使用该账号");
        this.changeValidateStatus(type, "success");
      } else {
        message.error("该账号已被注册");
        this.changeValidateStatus(type, "error");
      }
    }
  }
  changeValidateStatus(type, state) {
    if (type === "nickname") {
      this.setState({
        isFeedback: [type],
        nickname_validateStatus: this.state.validateStatusList[state]
      });
    } else if (type === "account") {
      this.setState({
        isFeedback: [type],
        account_validateStatus: this.state.validateStatusList[state]
      });
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 14,
          offset: 6
        }
      }
    };
    const prefixSelector = getFieldDecorator("phone_head", {
      initialValue: "86"
    })(
      <Select style={{ width: 60 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
      );
    const selectBefore = getFieldDecorator("path", {
      initialValue: "https://"
    })(
      <Select style={{ width: 80 }}>
        <Option value="http://">http://</Option>
        <Option value="https://">https://</Option>
      </Select>
      );
    return (
      <div className="Register">
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>欢迎</h1>
        <Modal
          title="免责声明"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>本站用于学习交流，切勿商用</p>
        </Modal>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            ref="fromitem_nickname"
            {...formItemLayout}
            validateStatus={this.state.nickname_validateStatus}
            label={
              <span>
                昵称&nbsp;
                <Tooltip title="想要别人怎么称呼您呢?">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
            hasFeedback={!(this.state.isFeedback === "nickname")}
          >
            {getFieldDecorator("nickname", {
              rules: [
                {
                  required: true,
                  message: "昵称不能为空",
                  whitespace: true
                }
              ]
            })(
              <Input
                onBlur={e => this.inputOnBlur("nickname", e.target.value)}
              />
              )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={<span>账号&nbsp;</span>}
            validateStatus={this.state.account_validateStatus}
            hasFeedback={!(this.state.isFeedback === "account")}
          >
            {getFieldDecorator("account", {
              rules: [
                {
                  min: 6,
                  required: true,
                  message: "账号必须长于6位",
                  whitespace: true
                }
              ]
            })(
              <Input
                onBlur={e => this.inputOnBlur("account", e.target.value)}
              />
              )}
          </FormItem>
          <FormItem {...formItemLayout} label="密码" hasFeedback>
            {getFieldDecorator("password", {
              rules: [
                {
                  min: 6,
                  required: true,
                  message: "密码必须长于6位",
                  whitespace: true
                },
                {
                  validator: this.checkConfirm
                }
              ]
            })(<Input type="password" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="确认密码" hasFeedback>
            {getFieldDecorator("confirm", {
              rules: [
                {
                  required: true,
                  message: "请再次输入密码"
                },
                {
                  validator: this.checkPassword
                }
              ]
            })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
          </FormItem>
          <FormItem {...formItemLayout} label="一句话介绍自己" hasFeedback>
            {getFieldDecorator("content", {
              rules: [
                {
                  required: true,
                  message: "不能为空哦！"
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="性别">
            {getFieldDecorator("sex", {
              initialValue: "男"
            })(
              <Select style={{ width: 60 }}>
                <Option value="男">男♂</Option>
                <Option value="女">女♀</Option>
              </Select>
              )}
          </FormItem>
          <FormItem {...formItemLayout} label="手机号" hasFeedback>
            {getFieldDecorator("phone", {
              rules: [
                {
                  pattern: RegExp("^1[34578]\\d{9}$"),
                  required: true,
                  message: "手机号不正确"
                }
              ]
            })(
              <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
              )}
          </FormItem>
          <FormItem {...formItemLayout} label="qq" hasFeedback>
            {getFieldDecorator("qq", {
              rules: [
                {
                  message: "qq号码"
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="github" hasFeedback>
            {getFieldDecorator("github", {
              rules: [{ required: false, message: "请输入github地址" }]
            })(
              <Input
                style={{ width: "100%" }}
                addonBefore={selectBefore}
                placeholder="也可以输入github.io博客"
              />
              )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="验证码"
            extra="必须确认您不是Robot(机器人0.0)"
          >
            <Row gutter={8}>
              <Col span={12}>
                {getFieldDecorator("Captcha", {
                  rules: [
                    {
                      required: true,
                      message: "请输入您得到的验证码"
                    }
                  ]
                })(<Input size="large" />)}
              </Col>
              <Col span={12}>
                <Button size="large">获取验证码</Button>
              </Col>
            </Row>
          </FormItem>
          <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
            {getFieldDecorator("agreement", {
              valuePropName: "checked"
            })(
              <Checkbox
                onChange={() => {
                  this.setState({ btn_disabled: !this.state.btn_disabled });
                }}
              >
                您必须同意 <a onClick={this.showModal}>免责声明</a>
              </Checkbox>
              )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button
              style={{ width: "100%" }}
              type="primary"
              htmlType="submit"
              disabled={this.state.btn_disabled}
            >
              注册
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Register);
