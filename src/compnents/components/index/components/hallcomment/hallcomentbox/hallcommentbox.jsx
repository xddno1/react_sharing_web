import React from "react";

import "./hallcommentbox.css";

export default class hallcommentbox extends React.Component {
  render() {
    const item = this.props.commentitem;
    return (
      <div className="hallcommentbox">
        <div className="img" />
        &nbsp;&nbsp;
        <div className="hallcommentboxheader">
          <span>游客</span>&nbsp;
          <span className="time">{item.time && item.time.split(" ")[0]}</span>
        </div>
        <div className="contain">{item.content}</div>
      </div>
    );
  }
}
