import React from "react";
import axios from "axios";

import "./noticebox.css";

export default function Noticebox() {
  // 使用didmount生命周期钩子订阅消息
  React.useEffect(() => {
    getnotice();
  }, []);
  const [content, setContent] = React.useState(false);
  function getnotice() {
    axios.get(`http://121.4.187.232:8081/notice/queryNotice`).then((a) => {
      setContent(() => a.data);
    });
  }
  return (
    <div className="noticebox">
      <div className="title">公告</div>
      <div className="content">
        <span className="style-7">{content}</span>
      </div>
    </div>
  );
}
