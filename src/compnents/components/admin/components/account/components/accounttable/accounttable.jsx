import React from "react";
import { Table } from "antd";

import "./accounttable.css";

export default class Accounttable extends React.Component {
  state = {
    dataSource: [
      {
        key: "1",
        name: "胡彦斌",
        age: 32,
      },
      {
        key: "2",
        name: "胡彦祖",
        age: 42,
        address: "西湖区湖底公园1号",
      },
      {
        key: "3",
        name: "胡彦斌",
        age: 32,
      },
      {
        key: "4",
        name: "胡彦祖",
        age: 42,
        address: "西湖区湖底公园1号",
      },
      {
        key: "15",
        name: "胡彦斌",
        age: 32,
      },
    ],
    columns: [
      {
        title: "姓名",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "年龄",
        dataIndex: "age",
        key: "age",
      },
      {
        title: "住址",
        dataIndex: "address",
        key: "address",
      },
    ],
  };

  render() {
    const { dataSource, columns } = this.state;
    return <Table dataSource={dataSource} columns={columns} bordered />;
  }
}
