import React from "react";
import { Tabs } from "antd";

import "./hotbox.css";
const { TabPane } = Tabs;
export default class Hotbox extends React.Component {
  handleTabsClick = (key) => {
    console.log(key);
  };
  render() {
    return (
      <div className="hotbox">
        <div className="title">热榜</div>
        <div className="bg">
          <div className="tab">
            <Tabs defaultActiveKey="1" onChange={this.handleTabsClick}>
              <TabPane tab="浏览榜" key="1">
                <div className="frist">
                  <div className="img-text">
                    <img
                      src="http://91apps.cn/wp-content/themes/dux-syx/img/Microsoft.jpg"
                      alt=""
                    />
                    <div className="mask"></div>
                    <div className="content-title">
                      <div className="read">
                        <span>1300人已阅读</span>
                      </div>
                      清浊 v1.7.3解锁高级版-手机垃圾清理
                    </div>
                  </div>
                </div>
                <div className="nofrist"></div>
                <div className="nofrist"></div>
                <div className="nofrist"></div>
                <div className="nofrist"></div>
                <div className="nofrist"></div>
              </TabPane>
              <TabPane tab="点赞榜" key="2">
                <div className="frist"></div>
                <div className="nofrist"></div>
                <div className="nofrist"></div>
                <div className="nofrist"></div>
                <div className="nofrist"></div>
                <div className="nofrist"></div>
              </TabPane>
              <TabPane tab="下载榜" key="3">
                <div className="frist"></div>
                <div className="nofrist"></div>
                <div className="nofrist"></div>
                <div className="nofrist"></div>
                <div className="nofrist"></div>
                <div className="nofrist"></div>
              </TabPane>
            </Tabs>
          </div>
          <div className="hot-list">
            <div className="frist"></div>
          </div>
        </div>
      </div>
    );
  }
}
