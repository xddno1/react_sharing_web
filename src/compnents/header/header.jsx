import React from "react";
import { useHistory } from "react-router-dom";
import PubSub from "pubsub-js";
import { connect } from "react-redux";
import { Menu, Dropdown } from "antd";

import Myloginmodal from "./component/myloginmodal/myloginmodal";
import { actionDeleteAdminToken } from "../../redux/actions/admintoken";
import { actionDeleteUserToken } from "../../redux/actions/usertoken";
import "./header.css";

function Header(props) {
  let history = useHistory();

  const menu = (
    <Menu onClick={unlogin}>
      {props.admintoken && history.location.pathname !== "/admin" && (
        <Menu.Item key="3">到管理页</Menu.Item>
      )}

      {props.admintoken && history.location.pathname === "/admin" && (
        <Menu.Item key="2">到主页</Menu.Item>
      )}

      <Menu.Item key="1">退出登录</Menu.Item>
    </Menu>
  );

  // 使用didmount生命周期钩子订阅消息
  React.useEffect(() => {
    PubSub.subscribe("visiblechange", () => {
      changevisible();
    });
  }, []);

  const [visible, setVisible] = React.useState(false);
  const [nowpath, setNowpath] = React.useState("");
  const [tt, setTt] = React.useState(true);
  function changevisible() {
    setVisible((e) => !e);
  }

  function unlogin(e) {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    switch (e.key * 1) {
      case 1:
        props.deleteadmintoken();
        props.deleteusertoken();
        history.replace("/index");

        break;
      case 2:
        history.push("/index");

        setTt((e) => !e);

        break;
      case 3:
        history.push("/admin");
        setTt((e) => !e);

        break;
      default:
        break;
    }
  }

  function registerHandle() {
    setVisible((e) => !e);
    const nowpath = history.location.pathname;
    setNowpath(() => nowpath);
    const topath = `${nowpath}/register`;
    history.push(topath);
  }

  function loginHandle() {
    setVisible((e) => !e);
    const nowpath = history.location.pathname;
    setNowpath(() => nowpath);
    const topath = `${nowpath}/userlogin`;
    history.push(topath);
  }

  return (
    <div className="header">
      <div className="truehead">
        <div className="container">
          <div className="clearfix">
            <div className="logo-container">
              <div className="logo"></div>
              {tt && <span></span>}
            </div>
            {props.admintoken || props.usertoken ? (
              <div className="info-container">
                <Dropdown overlay={menu}>
                  <div className="people-img" />
                </Dropdown>
              </div>
            ) : (
              <div className="btn-container ">
                <button className="registerbtn" onClick={registerHandle}>
                  <span>注册</span>
                </button>
                <button className="loginbtn" onClick={loginHandle}>
                  <span>登录</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="maskhead"></div>
      <Myloginmodal
        visible={visible}
        nowpath={nowpath}
        changevisible={changevisible}
      />
    </div>
  );
}

export default connect(
  (state) => ({
    usertoken: state.usertoken,
    admintoken: state.admintoken,
  }),
  {
    deleteadmintoken: actionDeleteAdminToken,
    deleteusertoken: actionDeleteUserToken,
  }
)(Header);
