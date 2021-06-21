import React from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import {} from "antd";
import "antd/dist/antd.css";

import "./app.css";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import Index from "./components/index/index";
import Page from "./components/page/page";
import Admin from "./components/admin/admin";
import Mybacktop from "./components/mybacktop/mybacktop";

class App extends React.Component {
  // constructor(props) {
  //   super(props);
  //   console.log(props);
  //   console.log(props.location.pathname.split("/")[1]);
  //   if (
  //     props.location.pathname.split("/")[1] === "admin" &&
  //     props.admintoken === ""
  //   ) {
  //     props.history.replace("/");
  //   }
  // }
  render() {
    return (
      <>
        <Header />
        <Switch>
          <Route path="/index" component={Index} />
          <Route path="/page/:pageid" component={Page} />
          <Route path="/admin" component={Admin} />
          <Redirect to="/index" />
        </Switch>
        <Footer />
        <Mybacktop />
      </>
    );
  }
}

export default connect((state) => ({
  admintoken: state.admintoken,
}))(withRouter(App));
