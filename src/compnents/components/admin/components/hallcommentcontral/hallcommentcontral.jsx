import React from "react";
import { Route } from "react-router-dom";

import "./hallcommentcontral.css";
import Hallcommenttable from "./components/hallcommenttable/hallcommenttable";

export default class Hallcommentcontral extends React.Component {
  render() {
    return (
      <div className="hallcommentcontral">
        <div className="bg">
          <h1>大厅评论</h1>
          <Route path="/admin/hallcomment" component={Hallcommenttable} />
        </div>
      </div>
    );
  }
}
