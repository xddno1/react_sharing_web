import React from "react";
import { Input, Button } from "antd";

import "./hallcomment.css";
import Hallcommentbox from "./hallcomentbox/hallcommentbox";

export default class Hallcomment extends React.Component {
  render() {
    return (
      <div className="hallcomment">
        <div className="title">大厅评论</div>
        <div className="hallcomment-list style-7">
          <Hallcommentbox />
          <Hallcommentbox />
          <Hallcommentbox />
          <Hallcommentbox />
          <Hallcommentbox />
          <Hallcommentbox />
          <Hallcommentbox />
          <Hallcommentbox />
          <Hallcommentbox />
          <Hallcommentbox />
          <Hallcommentbox />
          <Hallcommentbox />
          <Hallcommentbox />
        </div>
        <div className="addhallcomment">
          <Input.TextArea
            className="hallcommentinput"
            autoSize
            placeholder="我也来说一句..."
          />
          <Button className="hallcommentbtn">评论</Button>
        </div>
      </div>
    );
  }
}
