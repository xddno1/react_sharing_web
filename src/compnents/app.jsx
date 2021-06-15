import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import {} from "antd";
import "antd/dist/antd.css";

import "./app.css";
import Footer from "./footer/footer";
import Header from "./header/header";
import Index from "./index/index";
import Admin from "./admin/admin";
import Mybacktop from "./mybacktop/mybacktop";

export default class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Switch>
          <Route path="/index" component={Index} />
          <Route path="/admin" component={Admin} />
          <Redirect to="/index" />
        </Switch>
        <Footer />
        <Mybacktop />
      </>
    );
  }
}
