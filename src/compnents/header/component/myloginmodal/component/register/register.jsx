import React from "react";
import { Input, Checkbox, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import PubSub from "pubsub-js";
import { connect } from "react-redux";

import { actionInsertUserToken } from "../../../../../../redux/actions/usertoken";
import "./register.css";

class Register extends React.Component {
  state = {
    username: "",
    userpsw: "",
    autologin: false,
  };
  usernameChange = (e) => {
    const username = e.target.value.replace(/\s*/g, "");
    this.setState({ username });
  };
  userpswChange = (e) => {
    const userpsw = e.target.value;
    this.setState({ userpsw });
  };
  autoLoginChange = (e) => {
    const autologin = e.target.checked;
    this.setState({ autologin });
  };
  handleRegister = () => {
    const { username, userpsw, autologin } = this.state;
    axios
      .post(
        `http://121.4.187.232:8081/user/register?password=${userpsw}&username=${username}`
      )
      .then((a) => {
        console.log(a);
        if (a.data === "isOk") {
          PubSub.publish("visiblechange");
          this.props.history.goBack();
          message.success("注册成功");
          if (autologin === true) {
            this.loginac();
          }
        }
      });
  };

  loginac = () => {
    const { username, userpsw } = this.state;
    axios
      .post(
        `http://121.4.187.232:8081/user/userLogin?password=${userpsw}&username=${username}`
      )
      .then((e) => {
        const usertoken = e.data.token;
        this.props.insertUserToken(usertoken);
        message.success("登录成功");
      })
      .catch((e) => {
        message.error("登录失败");
      });
  };

  gotologin = () => {
    const { history } = this.props;
    let nowpath = history.location.pathname;
    let a = nowpath.split("/");
    a.pop();
    nowpath = a.join("/");
    const topath = `${nowpath}/userlogin`;
    history.replace(topath);
  };

  render() {
    const { username, userpsw } = this.state;
    return (
      <div className="register">
        <div className="userlogintitle clearfix">
          <span className="title">用户注册</span>
          <span className="no-ac">
            已经有帐号？
            <div className="gotoregister">
              <span onClick={this.gotologin}> 马上登录</span>
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
            <Checkbox defaultChecked="true" onChange={this.autoLoginChange}>
              注册后自动登录
            </Checkbox>
          </div>
          <Button
            className="userloginbtn"
            size="large"
            type="primary"
            block
            onClick={this.handleRegister}
          >
            注册
          </Button>
        </div>
      </div>
    );
  }
}

export default connect((state) => ({ usertoken: state.usertoken }), {
  insertUserToken: actionInsertUserToken,
})(Register);
