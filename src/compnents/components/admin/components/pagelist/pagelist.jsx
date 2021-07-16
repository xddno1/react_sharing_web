import React from "react";
import { Table, Button, Popconfirm, message } from "antd";
import { connect } from "react-redux";
import axios from "axios";

import "./pagelist.css";
const { Column } = Table;

class Pagelist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        current: 1,
        pageSize: 6,
      },
      pagedata: [],
      resourcetotal: -1,
      loading: true,
    };
    const { current, pageSize } = this.state.pagination;
    axios
      .get(
        `http://121.4.187.232:8081/passage/queryAllPassage?pageNo=${current}&pageSize=${pageSize}`
      )
      .then((e) => {
        const resourcetotal = e.data.passageItemCount;
        const pagedata = e.data.passageItem.map((e) => e[0]);
        this.setState({ resourcetotal, pagedata, loading: false });
      });
  }

  handleedit = (id) => {
    this.props.history.push(`/admin/page/${id}`);
  };
  handledelete = (id) => {
    axios({
      method: "post",
      url: `http://121.4.187.232:8081/admin/deletePassage?passageID=${id}`,
      headers: {
        token: this.props.admintoken,
      },
    }).then((e) => {
      message.success("删除成功！");
    });
  };
  handleTableChange = (pagination, filters, sorter) => {
    const { current, pageSize } = pagination;

    this.setState({ pagination, loading: true }, () => {
      axios
        .get(
          `http://121.4.187.232:8081/passage/queryAllPassage?pageNo=${current}&pageSize=${pageSize}`
        )
        .then((e) => {
          const resourcetotal = e.data.passageItemCount;
          const pagedata = e.data.passageItem.map((e) => e[0]);
          this.setState({ resourcetotal, pagedata, loading: false });
        });
    });
  };

  render() {
    let { pagination, pagedata, resourcetotal, loading } = this.state;
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
            onChange={this.handleTableChange}
            loading={loading}
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
