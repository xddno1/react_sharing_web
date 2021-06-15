import React from "react";
import { Modal } from "antd";
import { Switch, Route, withRouter } from "react-router-dom";
import { createBrowserHistory } from "history";

import Userlogin from "./component/userlogin/userlogin";
import Register from "./component/register/register";
import Adminlogin from "./component/adminlogin/adminlogin";
import "./myloginmodal.css";

class Myloginmodal extends React.Component {
  state = {
    loading: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.props.changevisible();
  };

  handleCancel = () => {
    this.props.changevisible();
    createBrowserHistory().goBack();
  };

  componentDidMount() {
    let { pathname } = this.props.location;
    let a = pathname.split("/");
    let b = a.pop();
    // 判断如果再modal打开时进行刷新，去除尾部路由
    if (b === "userlogin" || b === "adminlogin" || b === "register") {
      pathname = a.join("/");
      const topath = `${pathname}`;
      this.props.history.replace(topath);
    }
  }

  render() {
    const { visible } = this.props;
    return (
      <Modal
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={null}
      >
        <div className="myloginmodal">
          <div className="logo"></div>
        </div>
        <Switch>
          <Route path="/index/userlogin" component={Userlogin} />
          <Route path="/index/register" component={Register} />
          <Route path="/index/adminlogin" component={Adminlogin} />
        </Switch>
      </Modal>
    );
  }
}
export default withRouter(Myloginmodal);
