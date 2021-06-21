import React from "react";
import { Input, Button, message } from "antd";
import axios from "axios";

import "./hallcomment.css";
import Hallcommentbox from "./hallcomentbox/hallcommentbox";

export default class Hallcomment extends React.Component {
  state = {
    hallcommentdata: [],
    addvalue: "",
  };
  handleaddvalueChange = (e) => {
    this.setState({ addvalue: e.target.value });
  };
  handleaddhallcomment = () => {
    axios
      .post(
        `http://121.4.187.232:8081/hallComment/createHallComment?content=${this.state.addvalue}`
      )
      .then((a) => {
        this.gethallcomment();
        this.setState({ addvalue: "" });
        message.success("评论成功！！");
      });
  };
  gethallcomment = () => {
    axios
      .get(`http://121.4.187.232:8081/hallComment/queryAllHallComment`)
      .then((a) => {
        const hallcommentdata = a.data;
        this.setState({ hallcommentdata });
      });
  };
  componentDidMount() {
    this.gethallcomment();
  }
  render() {
    const { hallcommentdata, addvalue } = this.state;
    return (
      <div className="hallcomment">
        <div className="title">大厅评论</div>
        <div className="hallcomment-list style-7">
          {hallcommentdata.map((commentitem, index) => (
            <Hallcommentbox key={index} commentitem={commentitem} />
          ))}
        </div>
        <div className="addhallcomment">
          <Input.TextArea
            className="hallcommentinput"
            autoSize
            placeholder="我也来说一句..."
            value={addvalue}
            onChange={this.handleaddvalueChange}
            maxLength={50}
          />
          <Button
            className="hallcommentbtn"
            onClick={this.handleaddhallcomment}
          >
            评论
          </Button>
        </div>
      </div>
    );
  }
}
