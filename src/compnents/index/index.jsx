import React from "react";
import { Pagination } from "antd";

import Resourcebox from "./resourcebox/resourcebox";
import Noticebox from "./noticebox/noticebox";

import Hotbox from "./hotbox/hotbox";
import Hallcomment from "./hallcomment/hallcomment";
import "./index.css";

export default class Index extends React.Component {
  render() {
    return (
      <div className="index">
        <div className="container clearfix">
          <div className="left">
            <div className="title">
              <h3>最新发布</h3>
            </div>
            <Resourcebox />
            <Resourcebox />
            <Resourcebox />
            <Resourcebox />
            <Resourcebox />
            <Resourcebox />
            <Resourcebox />
            <Resourcebox />
            <Resourcebox />
            <Resourcebox />
            <div className="pagination">
              <Pagination defaultCurrent={1} total={500} />
            </div>
          </div>
          <div className="right">
            <Noticebox />

            <Hotbox />
            <Hallcomment />
          </div>
        </div>
      </div>
    );
  }
}
