import React from "react";
import {
  ClockCircleOutlined,
  EyeOutlined,
  CommentOutlined,
  LikeOutlined,
} from "@ant-design/icons";

import "./resourcebox.css";

export default class Resourcebox extends React.Component {
  render() {
    return (
      <div className="resourcebox">
        <img
          src="http://91apps.cn/wp-content/themes/dux-syx/img/Microsoft.jpg"
          alt=""
        />
        <div className="resourcebox-header">
          <span className="logo">
            站长推荐<i></i>
          </span>
          <h2>
            这个是我的标题这个题这个是我的标题这个是我的标题这个题这个是我的标题这个是我的标题这个题这个是我的标题这个是我的标题这个题这个是我的标题
          </h2>
        </div>
        <div className="meta">
          <span className="time">
            <ClockCircleOutlined />
            &nbsp;2021-6-15 &nbsp;&nbsp;&nbsp;&nbsp;
          </span>
          <span className="read">
            <EyeOutlined />
            &nbsp;阅读(12)&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
          <span className="comment">
            <CommentOutlined />
            &nbsp;评论(23)&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
          <span className="like">
            <LikeOutlined />
            &nbsp;点赞(23)
          </span>
        </div>

        <div className="resourcebox-describe">
          <p>
            这是我的内容这是我的内容这是我的内容这是我的内容这是我的内容这是我的内容这是我的内容这是我的内容这是我的内容这是我的内容这是我的内容这是我的内容这是我的内容这是我的内容这是我的内容这是我的内容这是我的内容这是我的内容这是我的内容这是我的内容这是我的内容这是我的内容这是我的内容这是我的内容这是我的内容这是我的内容这是我的内容这是我的内容
          </p>
        </div>
      </div>
    );
  }
}
