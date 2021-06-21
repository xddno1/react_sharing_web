import React from "react";
import { Table, Button, Popconfirm } from "antd";
import { connect } from "react-redux";
import axios from "axios";

import "./pagelist.css";
const { Column } = Table;

class Pagelist extends React.Component {
  state = {
    pagination: {
      current: 1,
      pageSize: 6,
    },

    pagedata: [],
    resourcetotal: -1,
  };
  handleedit = (id) => {
    this.props.history.push(`/admin/page/${id}`);
  };
  handledelete = (id) => {
    console.log(id);
  };
  componentDidMount() {
    const { current, pageSize } = this.state.pagination;
    axios
      .get(
        `http://121.4.187.232:8081/passage/queryAllPassage?pageNo=${current}&pageSize=${pageSize}`
      )
      .then((e) => {
        const resourcetotal = e.data.passageItemCount;
        const pagedata = e.data.passageItem.map((e) => e[0]);
        this.setState({ resourcetotal, pagedata });
      });
  }
  render() {
    let { pagination, pagedata, resourcetotal } = this.state;
    pagination = {
      ...pagination,
      total: resourcetotal,
    };
    return (
      <div className="pagelist">
        <div className="ct">
          <h1>所有文章</h1>
          <Table
            rowKey={(record) => (record ? record.id : record)}
            dataSource={pagedata}
            pagination={pagination}
            bordered
          >
            <Column
              title="标题"
              dataIndex="title"
              key="title"
              ellipsis={true}
              width="30%"
            />
            <Column
              title="内容"
              dataIndex="content"
              key="content"
              ellipsis={true}
            />
            <Column
              title="操作"
              dataIndex="id"
              key="id"
              ellipsis={true}
              width="134px"
              render={(id) => (
                <>
                  <Button
                    size="small"
                    type="primary"
                    className="pagelistedit"
                    onClick={() => this.handleedit(id)}
                  >
                    编辑
                  </Button>
                  <Popconfirm
                    title="删除后不可找回"
                    okText="确认"
                    cancelText="取消"
                    onConfirm={() => this.handledelete(id)}
                  >
                    <Button
                      size="small"
                      type="primary"
                      danger
                      className="pagelistdel"
                    >
                      删除
                    </Button>
                  </Popconfirm>
                </>
              )}
            />
          </Table>
        </div>
      </div>
    );
  }
}
export default connect((state) => ({
  admintoken: state.admintoken,
}))(Pagelist);
