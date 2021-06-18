import React from "react";
import { BackTop } from "antd";


import "./mybacktop.css";

export default function Mybacktop() {
  return (
    <div className="mybacktop">
      <BackTop>
        <div className="ant-fade-enter ant-fade-enter-active ant-fade">
          <div className="normal-top"></div>
        </div>
      </BackTop>
    </div>
  );
}
