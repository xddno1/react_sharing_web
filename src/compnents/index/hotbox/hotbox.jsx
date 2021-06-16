import React from "react";
import { Tabs } from "antd";
import { EyeOutlined, DownloadOutlined, LikeOutlined } from "@ant-design/icons";

import "./hotbox.css";
import axios from "axios";
const { TabPane } = Tabs;
export default class Hotbox extends React.Component {
  state = {
    views: [],
    likes: [],
  };
  handleTabsClick = (key) => {
    console.log(key);
  };
  componentDidMount() {
    axios
      .get(`http://121.4.187.232:8081/passage/queryPassagesByViews`)
      .then((e) => {
        this.setState({ views: e.data }, () => {});
      })
      .catch((e) => {});

    axios
      .get(`http://121.4.187.232:8081/passage/queryPassagesByFabulous`)
      .then((e) => {
        this.setState({ likes: e.data }, () => {});
      })
      .catch((e) => {});
  }
  render() {
    const { views, likes } = this.state;

    return (
      <div className="hotbox">
        <div className="title">热榜</div>
        <div className="bg">
          <div className="tab">
            <Tabs defaultActiveKey="1" onChange={this.handleTabsClick}>
              <TabPane tab="浏览榜" key="1">
                {views[0] !== undefined && (
                  <>
                    <div className="frist relative">
                      <div className="img-text">
                        <img
                          src={
                            views[0][1]
                              ? `data:image/png;base64,${views[0][1]}`
                              : "http://91apps.cn/wp-content/themes/dux-syx/img/Microsoft.jpg"
                          }
                          alt=""
                        />
                        <div className="mask"></div>
                        <div className="content-title">
                          <div className="read">
                            <span>{views[0][0].views}人已阅读</span>
                          </div>
                          {views[0][0].title}
                        </div>
                      </div>
                      <div className="top1">
                        <i>TOP1</i>
                      </div>
                    </div>
                    <div className="nofrist relative">
                      <div className="imgonly">
                        <img
                          src={
                            views[1][1]
                              ? `data:image/png;base64,${views[1][1]}`
                              : "http://91apps.cn/wp-content/themes/dux-syx/img/Microsoft.jpg"
                          }
                          alt=""
                        />
                      </div>
                      <div className="box-right">
                        <div className="hotbox-title">
                          <span>{views[1][0].title}</span>
                        </div>
                        <div className="meta">
                          <EyeOutlined />
                          <span>{views[1][0].views}</span>
                        </div>
                      </div>
                      <div className="notop1 top2">
                        <i>TOP2</i>
                      </div>
                    </div>
                    <div className="nofrist relative">
                      <div className="imgonly">
                        <img
                          src={
                            views[2][1]
                              ? `data:image/png;base64,${views[2][1]}`
                              : "http://91apps.cn/wp-content/themes/dux-syx/img/Microsoft.jpg"
                          }
                          alt=""
                        />
                      </div>
                      <div className="box-right">
                        <div className="hotbox-title">
                          <span>{views[2][0].title}</span>
                        </div>
                        <div className="meta">
                          <EyeOutlined />
                          <span>{views[2][0].views}</span>
                        </div>
                      </div>
                      <div className="notop1 top3">
                        <i>TOP3</i>
                      </div>
                    </div>
                    <div className="nofrist relative">
                      <div className="imgonly">
                        <img
                          src={
                            views[3][1]
                              ? `data:image/png;base64,${views[3][1]}`
                              : "http://91apps.cn/wp-content/themes/dux-syx/img/Microsoft.jpg"
                          }
                          alt=""
                        />
                      </div>
                      <div className="box-right">
                        <div className="hotbox-title">
                          <span>{views[3][0].title}</span>
                        </div>
                        <div className="meta">
                          <EyeOutlined />
                          <span>{views[3][0].views}</span>
                        </div>
                      </div>
                      <div className="notop1">
                        <i>TOP4</i>
                      </div>
                    </div>
                    <div className="nofrist relative">
                      <div className="imgonly">
                        <img
                          src={
                            views[4][1]
                              ? `data:image/png;base64,${views[4][1]}`
                              : "http://91apps.cn/wp-content/themes/dux-syx/img/Microsoft.jpg"
                          }
                          alt=""
                        />
                      </div>
                      <div className="box-right">
                        <div className="hotbox-title">
                          <span>{views[4][0].title}</span>
                        </div>
                        <div className="meta">
                          <EyeOutlined />
                          <span>{views[4][0].views}</span>
                        </div>
                      </div>
                      <div className="notop1">
                        <i>TOP5</i>
                      </div>
                    </div>
                    <div className="nofrist relative">
                      <div className="imgonly">
                        <img
                          src={
                            views[5][1]
                              ? `data:image/png;base64,${views[5][1]}`
                              : "http://91apps.cn/wp-content/themes/dux-syx/img/Microsoft.jpg"
                          }
                          alt=""
                        />
                      </div>
                      <div className="box-right">
                        <div className="hotbox-title">
                          <span>{views[5][0].title}</span>
                        </div>
                        <div className="meta">
                          <EyeOutlined />
                          <span>{views[5][0].views}</span>
                        </div>
                      </div>
                      <div className="notop1">
                        <i>TOP6</i>
                      </div>
                    </div>
                  </>
                )}
              </TabPane>
              <TabPane tab="点赞榜" key="2">
                {likes[0] !== undefined && (
                  <>
                    <div className="frist relative">
                      <div className="img-text">
                        <img
                          src={
                            likes[0][1]
                              ? `data:image/png;base64,${likes[0][1]}`
                              : "http://91apps.cn/wp-content/themes/dux-syx/img/Microsoft.jpg"
                          }
                          alt=""
                        />
                        <div className="mask"></div>
                        <div className="content-title">
                          <div className="read">
                            <span>{likes[0][0].fabulous}人已赞</span>
                          </div>
                          {likes[0][0].title}
                        </div>
                      </div>
                      <div className="top1">
                        <i>TOP1</i>
                      </div>
                    </div>
                    <div className="nofrist relative">
                      <div className="imgonly">
                        <img
                          src={
                            likes[1][1]
                              ? `data:image/png;base64,${likes[1][1]}`
                              : "http://91apps.cn/wp-content/themes/dux-syx/img/Microsoft.jpg"
                          }
                          alt=""
                        />
                      </div>
                      <div className="box-right">
                        <div className="hotbox-title">
                          <span>{likes[1][0].title}</span>
                        </div>
                        <div className="meta">
                          <LikeOutlined />
                          <span>{likes[1][0].fabulous}</span>
                        </div>
                      </div>
                      <div className="notop1 top2">
                        <i>TOP2</i>
                      </div>
                    </div>
                    <div className="nofrist relative">
                      <div className="imgonly">
                        <img
                          src={
                            likes[2][1]
                              ? `data:image/png;base64,${likes[2][1]}`
                              : "http://91apps.cn/wp-content/themes/dux-syx/img/Microsoft.jpg"
                          }
                          alt=""
                        />
                      </div>
                      <div className="box-right">
                        <div className="hotbox-title">
                          <span>{likes[2][0].title}</span>
                        </div>
                        <div className="meta">
                          <LikeOutlined />
                          <span>{likes[2][0].fabulous}</span>
                        </div>
                      </div>
                      <div className="notop1 top3">
                        <i>TOP3</i>
                      </div>
                    </div>
                    <div className="nofrist relative">
                      <div className="imgonly">
                        <img
                          src={
                            likes[3][1]
                              ? `data:image/png;base64,${likes[3][1]}`
                              : "http://91apps.cn/wp-content/themes/dux-syx/img/Microsoft.jpg"
                          }
                          alt=""
                        />
                      </div>
                      <div className="box-right">
                        <div className="hotbox-title">
                          <span>{likes[3][0].title}</span>
                        </div>
                        <div className="meta">
                          <LikeOutlined />
                          <span>{likes[3][0].fabulous}</span>
                        </div>
                      </div>
                      <div className="notop1">
                        <i>TOP4</i>
                      </div>
                    </div>
                    <div className="nofrist relative">
                      <div className="imgonly">
                        <img
                          src={
                            likes[4][1]
                              ? `data:image/png;base64,${likes[4][1]}`
                              : "http://91apps.cn/wp-content/themes/dux-syx/img/Microsoft.jpg"
                          }
                          alt=""
                        />
                      </div>
                      <div className="box-right">
                        <div className="hotbox-title">
                          <span>{likes[4][0].title}</span>
                        </div>
                        <div className="meta">
                          <LikeOutlined />
                          <span>{likes[4][0].fabulous}</span>
                        </div>
                      </div>
                      <div className="notop1">
                        <i>TOP5</i>
                      </div>
                    </div>
                    <div className="nofrist relative">
                      <div className="imgonly">
                        <img
                          src={
                            likes[5][1]
                              ? `data:image/png;base64,${likes[5][1]}`
                              : "http://91apps.cn/wp-content/themes/dux-syx/img/Microsoft.jpg"
                          }
                          alt=""
                        />
                      </div>
                      <div className="box-right">
                        <div className="hotbox-title">
                          <span>{likes[5][0].title}</span>
                        </div>
                        <div className="meta">
                          <LikeOutlined />
                          <span>{likes[5][0].fabulous}</span>
                        </div>
                      </div>
                      <div className="notop1">
                        <i>TOP6</i>
                      </div>
                    </div>
                  </>
                )}
              </TabPane>
              <TabPane tab="下载榜" key="3">
                <div className="frist relative">
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
                  <div className="top1">
                    <i>TOP1</i>
                  </div>
                </div>
                <div className="nofrist relative">
                  <div className="imgonly">
                    <img
                      src="http://91apps.cn/wp-content/themes/dux-syx/img/Microsoft.jpg"
                      alt=""
                    />
                  </div>
                  <div className="box-right">
                    <div className="hotbox-title">
                      <span>这是标题</span>
                    </div>
                    <div className="meta">
                      <DownloadOutlined />
                      <span>123</span>
                    </div>
                  </div>
                  <div className="notop1 top2">
                    <i>TOP2</i>
                  </div>
                </div>
                <div className="nofrist relative">
                  <div className="notop1 top3">
                    <i>TOP3</i>
                  </div>
                </div>
                <div className="nofrist relative">
                  <div className="notop1">
                    <i>TOP4</i>
                  </div>
                </div>
                <div className="nofrist relative">
                  <div className="notop1">
                    <i>TOP5</i>
                  </div>
                </div>
                <div className="nofrist relative">
                  <div className="notop1">
                    <i>TOP6</i>
                  </div>
                </div>
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
