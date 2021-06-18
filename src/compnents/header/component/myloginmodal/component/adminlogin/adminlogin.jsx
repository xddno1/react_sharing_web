import React from "react";
import { Input, Checkbox, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import PubSub from "pubsub-js";
import { connect } from "react-redux";

import { actionInsertAdminToken } from "../../../../../../redux/actions/admintoken";
import "./adminlogin.css";

class Adminlogin extends React.Component {
  state = {
    adminname: "",
    adminpsw: "",
  };
  adminnameChange = (e) => {
    const adminname = e.target.value.replace(/\s*/g, "");
    this.setState({ adminname });
  };
  adminpswChange = (e) => {
    const adminpsw = e.target.value;
    this.setState({ adminpsw });
  };
  handleLogin = () => {
    const { adminname, adminpsw } = this.state;
    axios
      .post(
        `http://121.4.187.232:8081/user/adminLogin?password=${adminpsw}&username=${adminname}`
      )
      .then((e) => {
        const admintoken = e.data.token;
        this.props.insertAdminToken(admintoken);
        PubSub.publish("visiblechange");
        console.log(this.props);
        this.props.history.replace("/admin");
        message.success("登录成功");
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      })
      .catch((e) => {
        message.error("登录失败");
      });
  };

  gotouserlogin = () => {
    const { history } = this.props;
    let nowpath = history.location.pathname;
    let a = nowpath.split("/");
    a.pop();
    nowpath = a.join("/");
    const topath = `${nowpath}/userlogin`;
    history.replace(topath);
  };
  render() {
    const { adminname, adminpsw } = this.state;
    return (
      <div className="adminlogin">
        <div className="userlogintitle clearfix">
          <span className="title">管理员登录</span>
        </div>
        <div className="userloginform">
          <div className="user-ac">
            <Input
              className="myinput"
              size="large"
              placeholder="请输入用户名"
              prefix={<UserOutlined className="myicon" />}
              value={adminname}
              onChange={this.adminnameChange}
            ></Input>
          </div>
          <div className="user-password">
            <Input.Password
              className="myinput"
              size="large"
              placeholder="请输入登录密码"
              prefix={<LockOutlined className="myicon" />}
              value={adminpsw}
              onChange={this.adminpswChange}
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
            <span onClick={this.gotouserlogin}> 用户登录</span>
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state) => ({ admintoken: state.admintoken }), {
  insertAdminToken: actionInsertAdminToken,
})(Adminlogin);
