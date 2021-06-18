import React from "react";
import { Input, Checkbox, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import PubSub from "pubsub-js";
import { connect } from "react-redux";

import { actionInsertUserToken } from "../../../../../../../redux/actions/usertoken";
import "./userlogin.css";

class Userlogin extends React.Component {
  state = {
    username: "",
    userpsw: "",
  };
  usernameChange = (e) => {
    const username = e.target.value.replace(/\s*/g, "");
    this.setState({ username });
  };
  userpswChange = (e) => {
    const userpsw = e.target.value;
    this.setState({ userpsw });
  };
  gotoadminlogin = () => {
    const { history } = this.props;
    let nowpath = history.location.pathname;
    let a = nowpath.split("/");
    a.pop();
    nowpath = a.join("/");
    const topath = `${nowpath}/adminlogin`;
    history.replace(topath);
  };
  gotoregister = () => {
    const { history } = this.props;
    let nowpath = history.location.pathname;
    let a = nowpath.split("/");
    a.pop();
    nowpath = a.join("/");
    const topath = `${nowpath}/register`;
    history.replace(topath);
  };

  handleLogin = () => {
    const { username, userpsw } = this.state;
    axios
      .post(
        `http://121.4.187.232:8081/user/userLogin?password=${userpsw}&username=${username}`
      )
      .then((e) => {
        const usertoken = e.data.token;
        this.props.insertUserToken(usertoken);
        PubSub.publish("visiblechange");
        this.props.history.goBack();
        message.success("登录成功");
      })
      .catch((e) => {
        message.error("登录失败");
      });
  };

  render() {
    const { username, userpsw } = this.state;
    return (
      <div className="userlogin">
        <div className="userlogintitle clearfix">
          <span className="title">用户登录</span>
          <span className="no-ac">
            还没有账号？
            <div className="gotoregister">
              <span onClick={this.gotoregister}> 立即注册</span>
            </div>
          </span>
        </div>
        <div className="userloginform">
          <div className="user-ac">
            <Input
              className="myinput"
              size="large"
              placeholder="请输入用户名"
              prefix={<UserOutlined className="myicon" />}
              value={username}
              onChange={this.usernameChange}
            ></Input>
          </div>
          <div className="user-password">
            <Input.Password
              className="myinput"
              size="large"
              placeholder="请输入登录密码"
              prefix={<LockOutlined className="myicon" />}
              value={userpsw}
              onChange={this.userpswChange}
            ></Input.Password>
          </div>
          <div className="user-remenber">
            <Checkbox defaultChecked="true">记住我的登录状态</Checkbox>
          </div>
          <Button
            className="userloginbtn"
            size="large"
            type="primary"
            block
            onClick={this.handleLogin}
          >
            登录
          </Button>
          <div className="gotoadminlogin">
            <span onClick={this.gotoadminlogin}> 管理员登录</span>
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state) => ({ usertoken: state.usertoken }), {
  insertUserToken: actionInsertUserToken,
})(Userlogin);
