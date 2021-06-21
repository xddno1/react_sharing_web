import React from "react";
import { Menu, Input, Checkbox, Button, message } from "antd";
import { connect } from "react-redux";
import {
  AppstoreOutlined,
  CommentOutlined,
  NotificationOutlined,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";

import "./admin.css";
import Adminindex from "./components/adminindex/adminindex";
import Account from "./components/account/account";
import Hallcommentcontral from "./components/hallcommentcontral/hallcommentcontral";
import Neworeditpage from "./components/neworeditpage/neworeditpage";
import Notice from "./components/notice/notice";
import Pagelist from "./components/pagelist/pagelist";
import { actionInsertAdminToken } from "../../../redux/actions/admintoken";

const { SubMenu } = Menu;
class Admin extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props);
    let defaultSelectedKeys = [];
    let defaultOpenkeys = [];
    const corepath = props.location.pathname.split("/")[2];
    const additonpath = props.location.pathname.split("/")[3];
    switch (corepath) {
      case "pagelist":
        defaultOpenkeys = ["sub1"];
        defaultSelectedKeys = ["2"];
        break;
      case "hallcomment":
        defaultSelectedKeys = ["3"];

        break;
      case "notice":
        defaultSelectedKeys = ["4"];

        break;
      case "account":
        defaultSelectedKeys = ["5"];

        break;
      case "page":
        defaultOpenkeys = ["sub1"];
        if (additonpath === "newpage") {
          defaultSelectedKeys = ["1"];
        } else {
          defaultSelectedKeys = ["2"];
        }

        break;
      default:
        break;
    }
    this.state = {
      collapsed: false,
      defaultOpenkeys,
      defaultSelectedKeys,
      adminname: "",
      adminpsw: "",
    };
  }

  handleClick = (e) => {
    const { key } = e;
    switch (key * 1) {
      case 1:
        this.props.history.push("/admin/page/newpage");
        break;
      case 2:
        this.props.history.replace("/admin/pagelist");
        break;
      case 3:
        this.props.history.replace("/admin/hallcomment");
        break;
      case 4:
        this.props.history.replace("/admin/notice");
        break;
      case 5:
        this.props.history.replace("/admin/account");
        break;
      default:
        break;
    }
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
        message.success("登录成功");
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      })
      .catch((e) => {
        message.error("登录失败");
      });
  };
  // 左边窗口自适应
  handleResize = (e) => {
    if (e.target.innerWidth < 991 && this.state.collapsed === false) {
      this.setState({ collapsed: true });
    }
    if (e.target.innerWidth >= 991 && this.state.collapsed === true) {
      this.setState({ collapsed: false });
    }
  };
  componentDidMount() {
    // 设置默认展开Menu

    // 滑到顶部
    const e = {
      target: { innerWidth: document.body.clientWidth },
    };
    this.handleResize(e);
    window.addEventListener("resize", this.handleResize);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  render() {
    const {
      defaultOpenkeys,
      defaultSelectedKeys,
      collapsed,
      adminname,
      adminpsw,
    } = this.state;
    const { admintoken } = this.props;
    return admintoken ? (
      <div className="admin clearfix">
        <Menu
          onClick={this.handleClick}
          defaultOpenKeys={defaultOpenkeys}
          mode="inline"
          className="menu"
          inlineCollapsed={collapsed}
          defaultSelectedKeys={defaultSelectedKeys}
        >
          <SubMenu key="sub1" icon={<AppstoreOutlined />} title="文章管理">
            <Menu.Item key="1">新文章</Menu.Item>
            <Menu.Item key="2">所有文章</Menu.Item>
          </SubMenu>
          <Menu.Item key="3" icon={<CommentOutlined />} title="大厅评论">
            大厅评论
          </Menu.Item>

          <Menu.Item key="4" icon={<NotificationOutlined />} title="公告管理">
            公告管理
          </Menu.Item>
          <Menu.Item key="5" icon={<UserOutlined />} title="账号管理">
            账号管理
          </Menu.Item>
        </Menu>
        <Switch>
          <Route path="/admin/index" component={Adminindex} />
          <Route path="/admin/page/:pageid" component={Neworeditpage} />
          <Route path="/admin/pagelist" component={Pagelist} />
          <Route path="/admin/hallcomment" component={Hallcommentcontral} />
          <Route path="/admin/notice" component={Notice} />
          <Route path="/admin/account" component={Account} />
          <Redirect to="/admin/index" component={Adminindex} />
        </Switch>
      </div>
    ) : (
      <div className="loginct">
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
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state) => ({ admintoken: state.admintoken }), {
  insertAdminToken: actionInsertAdminToken,
})(Admin);
