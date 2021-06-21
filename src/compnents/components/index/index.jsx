import React from "react";
import { Pagination } from "antd";
import PubSub from "pubsub-js";
import { Route } from "react-router-dom";

import Resourcelist from "./components/resourcelist/resourcelist";
import Noticebox from "./components/noticebox/noticebox";
import Hotbox from "./components/hotbox/hotbox";
import Hallcomment from "./components/hallcomment/hallcomment";
import "./index.css";

export default class Index extends React.Component {
  state = {
    resourcetotal: 0,
    currentpage: 1,
    pageSize: 10,
  };
  updatelist = () => {
    const { currentpage, pageSize } = this.state;
    const path = {
      pathname: `/index`,
      state: {
        currentpage,
        pageSize,
      },
    };
    this.props.history.replace(path);
  };

  pageonChange = (currentpage) => {
    this.setState({ currentpage }, this.updatelist);
  };
  onShowSizeChange = (currentpage, pageSize) => {
    this.setState({ currentpage, pageSize }, this.updatelist);
  };
  componentDidMount() {
    // 使用didmount生命周期钩子订阅消息
    PubSub.subscribe("resourcetotal", (name, resourcetotal) => {
      this.setState({ resourcetotal });
    });
    PubSub.subscribe("currentpage", (name, currentpage) => {
      this.setState({ currentpage });
    });
  }
  componentWillUnmount() {
    PubSub.unsubscribe("resourcetotal", "currentpage");
  }
  render() {
    const { resourcetotal, currentpage } = this.state;
    return (
      <div className="index">
        <div className="container clearfix">
          <div className="left">
            <div className="title">
              <h3 id="resource-anchor">最新发布</h3>
            </div>
            <Route path="/index" component={Resourcelist} />
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
