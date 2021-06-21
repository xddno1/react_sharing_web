import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import "./account.css";
import Accounttable from "./components/accounttable/accounttable";

class Account extends React.Component {
  componentDidMount() {
    axios({
      method: "post",
      url: `http://121.4.187.232:8081/admin/queryAllUser`,
      headers: {
        token: this.props.admintoken,
      },
    }).then((e) => {
      console.log(e);
    });
  }
  render() {
    return (
      <div className="account">
        <div className="bg">
          <div className="ct">
            <h1>账号查询</h1>
            <Route path="/admin/account" component={Accounttable} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state) => ({
  admintoken: state.admintoken,
}))(Account);
