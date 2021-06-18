import React from "react";

import "./hallcommentbox.css";

export default class hallcommentbox extends React.Component {
  render() {
    return (
      <div className="hallcommentbox">
        <div className="img" />
        &nbsp;&nbsp;
        <div className="hallcommentboxheader">
          <span>游客</span>&nbsp;
          <span className="time">2021-6-17</span>
        </div>
        <div className="contain">你好</div>
      </div>
    );
  }
}
