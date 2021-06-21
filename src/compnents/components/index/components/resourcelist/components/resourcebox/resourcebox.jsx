import React from "react";
import {
  ClockCircleOutlined,
  EyeOutlined,
  DownloadOutlined,
  LikeOutlined,
} from "@ant-design/icons";
import { withRouter } from "react-router-dom";

import "./resourcebox.css";

class Resourcebox extends React.Component {
  handleGoToPage = () => {
    const pageid = this.props.item[0].id;
    console.log(this.props.item[0].id);
    this.props.history.push(`/page/${pageid}`);
  };
  render() {
    const { item } = this.props;
    return (
      <div className="resourcebox">
        <img
          src={
            item[1]
              ? `data:image/png;base64,${item[1]}`
              : "http://91apps.cn/wp-content/themes/dux-syx/img/Microsoft.jpg"
          }
          alt=""
        />
        <div className="resourcebox-header">
          <span className="logo">
            站长推荐<i></i>
          </span>
          <h2 onClick={this.handleGoToPage}>{item[0].title}</h2>
        </div>
        <div className="meta">
          <span className="time">
            <ClockCircleOutlined />
            &nbsp;{item[0].time && item[0].time.split(" ")[0]}{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;
          </span>
          <span className="read">
            <EyeOutlined />
            &nbsp;阅读({item[0].views})&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
          <span className="comment">
            <DownloadOutlined />
            &nbsp;下载({item[0].downloadCount})
          </span>
          <span className="like">
            <LikeOutlined />
            &nbsp;点赞({item[0].fabulous})&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        </div>

        <div className="resourcebox-describe">
          <p>{item[0].content}</p>
        </div>
      </div>
    );
  }
}

export default withRouter(Resourcebox);
