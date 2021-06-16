import React from "react";
import { Pagination } from "antd";
import PubSub from "pubsub-js";
import { Route } from "react-router-dom";

import Resourcelist from "./resourcelist/resourcelist";
import Noticebox from "./noticebox/noticebox";
import Hotbox from "./hotbox/hotbox";
import Hallcomment from "./hallcomment/hallcomment";
import "./index.css";

export default class Index extends React.Component {
  state = {
    resourcetotal: 0,
    currentpage: 1,
    pageSize: 10,
  };
  updatelist = () => {
    const { currentpage, pageSize } = this.state;
    const data = { currentpage: currentpage, pageSize: pageSize };
    console.log(data);
    const path = {
      pathname: "/index/page",
      query: data,
    };
    this.props.history.push(path);
  };

  pageonChange = (currentpage) => {
    this.setState({ currentpage }, this.updatelist);
  };
  onShowSizeChange = (currentpage, pageSize) => {
    this.setState({ currentpage, pageSize }, this.updatelist);
  };
  componentDidMount() {
    // 使用didmount生命周期钩子订阅消息
    this.updatelist();
    PubSub.subscribe("resourcetotal", (name, resourcetotal) => {
      this.setState({ resourcetotal });
    });
  }
  render() {
    const { resourcetotal, currentpage } = this.state;
    return (
      <div className="index">
        <div className="container clearfix">
          <div className="left">
            <div className="title">
              <h3>最新发布</h3>
            </div>
            <Route path="/index/page" component={Resourcelist} />

            <div className="pagination">
              <Pagination
                current={currentpage}
                onChange={this.pageonChange}
                showSizeChanger
                onShowSizeChange={this.onShowSizeChange}
                total={resourcetotal}
              />
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
