import React from "react";
import { Route } from "react-router-dom";

import "./account.css";
import Accounttable from "./components/accounttable/accounttable";

export default class Account extends React.Component {
  render() {
    return (
      <div className="account">
        <div className="bg">
          <div className="ct">
            <h2>账号查询</h2>
            <Route path="/admin/account" component={Accounttable} />
          </div>
        </div>
      </div>
    );
  }
}
