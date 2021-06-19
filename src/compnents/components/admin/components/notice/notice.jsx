import React from "react";
import axios from "axios";
import { Button, Modal, Input, message } from "antd";
import { connect } from "react-redux";

import "./notice.css";

// message被挡住了
message.config({
  top: 100,
});
class Notice extends React.Component {
  state = {
    notice: "",
    noticeold: "",
    noticenew: "",
    visible: false,
    editornew: "",
  };
  handleedit = () => {
    const noticeold = this.state.notice;
    this.setState({ visible: true, editornew: "edit", noticeold });
  };
  handlenew = () => {
    this.setState({ visible: true, editornew: "new" });
  };
  handleCancel = () => {
    this.setState({ visible: false, editornew: "", noticeold: "" });
  };
  handleOk = () => {
    const { editornew, noticeold, noticenew } = this.state;
    let sentnotice = editornew === "edit" ? noticeold : noticenew;
    sentnotice = sentnotice.trim();
    if (sentnotice) {
      axios({
        method: "post",
        url: `http://121.4.187.232:8081/admin/updateNotice?content=${sentnotice}`,
        headers: {
          token: this.props.admintoken,
        },
      })
        .then((e) => {
          this.gethallnotice();
          this.setState(
            { visible: false, noticenew: "", noticeold: "" },
            () => {
              message.success("发布成功", 5);
            }
          );
        })
        .catch((e) => {
          message.error("发布失败");
        });
    } else {
      message.error("请输入内容");
    }
  };
  handleinputchange = (e) => {
    const { editornew } = this.state;
    editornew === "edit"
      ? this.setState({ noticeold: e.target.value })
      : this.setState({ noticenew: e.target.value });
  };
  gethallnotice = () => {
    axios.get(`http://121.4.187.232:8081/notice/queryNotice`).then((a) => {
      const notice = a.data;
      this.setState({ notice });
    });
  };
  componentDidMount() {
    this.gethallnotice();
  }
  render() {
    const { notice, noticenew, noticeold, visible, editornew } = this.state;
    return (
      <div className="notice">
        <div className="bg">
          <div className="ct clearfix">
            <h1>公告管理</h1>
            <div className="noticeshow">
              <span>{notice}</span>
            </div>
            <div className="control">
              <span className="edit">
                <Button className="btn" onClick={this.handleedit}>
                  编辑
                </Button>
              </span>
              <span className="new">
                <Button className="btn" onClick={this.handlenew}>
                  新建
                </Button>
              </span>
            </div>
          </div>
        </div>
        <Modal
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
          closable={false}
        >
          <div className="editnoticemodal clearfix">
            <Input.TextArea
              rows={4}
              value={editornew === "edit" ? noticeold : noticenew}
              onChange={this.handleinputchange}
              autoSize={{ minRows: 5 }}
              maxLength={200}
              showCount={true}
            />
            <div className="modalcontrol">
              <span className="edit">
                <Button className="btn" onClick={this.handleCancel}>
                  取消
                </Button>
              </span>
              <span className="new">
                <Button className="btn" onClick={this.handleOk}>
                  发布
                </Button>
              </span>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default connect((state) => ({
  admintoken: state.admintoken,
}))(Notice);
