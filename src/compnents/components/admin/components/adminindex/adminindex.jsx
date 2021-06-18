import React from "react";

import "./adminindex.css";

export default class Adminindex extends React.Component {
  render() {
    return (
      <div className="adminindex">
        <div className="bg">
          <h1>欢迎来到后台管理系统</h1>
          <div className="ct">
            <h3>1.我能干什么？</h3>
            <span>
              在后台管理系统，您可以对展示在前台的文章，评论进行修改、删除，查询用户的账号密码，发布公告等等。
            </span>
            <h3>2.我需要注意什么？</h3>
            <span>
              为了构建一个绿色友好的资源分享网站。在该平台不得发布不合法的内容，包括但不限于黄、赌、毒。
            </span>
          </div>
        </div>
      </div>
    );
  }
}
