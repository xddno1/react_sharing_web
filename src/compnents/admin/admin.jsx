import React from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  CommentOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Switch, Route, Redirect } from "react-router-dom";

import "./admin.css";
import Adminindex from "./component/adminindex/adminindex";
import Account from "./account/account";
import Hallcommentcontral from "./component/hallcommentcontral/hallcommentcontral";
import Newpage from "./component/newpage/newpage";
import Notice from "./component/notice/notice";
import Pagelist from "./component/pagelist/pagelist";

const { SubMenu } = Menu;
export default class Admin extends React.Component {
  state = {
    collapsed: false,
  };
  handleClick = (e) => {
    const { key } = e;
    switch (key * 1) {
      case 1:
        this.props.history.replace("/admin/newpage");
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
    return (
      <div className="admin clearfix">
        <Menu
          onClick={this.handleClick}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          className="menu"
          inlineCollapsed={this.state.collapsed}
        >
          <SubMenu key="sub2" icon={<AppstoreOutlined />} title="文章管理">
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
          <Route path="/admin/newpage" component={Newpage} />
          <Route path="/admin/pagelist" component={Pagelist} />
          <Route path="/admin/hallcomment" component={Hallcommentcontral} />
          <Route path="/admin/notice" component={Notice} />
          <Route path="/admin/account" component={Account} />
          <Redirect to="/admin/index" component={Adminindex} />
        </Switch>
      </div>
    );
  }
}
