import React from "react";
import axios from "axios";
import { Table, Tabs, Input, Button, Upload, Modal, message } from "antd";
import { connect } from "react-redux";
import {
  HighlightOutlined,
  PictureOutlined,
  DownloadOutlined,
  CommentOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";

import "./neworeditpage.css";

const { TabPane } = Tabs;

// 此处代码为大杂烩，不建议阅读

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
class Neworeditpage extends React.Component {
  constructor(props) {
    super(props);
    const { pageid } = props.match.params;
    console.log(1);
    let pagetitle = "",
      pagecontent = "",
      imgList = [],
      resourceList = [];

    if (pageid !== "newpage") {
      axios
        .get(
          ` http://121.4.187.232:8081/passage/passageResources?passageID=${pageid}`
        )
        .then((a) => {
          pagetitle = a.data[0].title;
          pagecontent = a.data[0].content;
          this.setState({ pagetitle, pagecontent });

          // 资源
          for (let i in a.data[1]) {
            // 获取名字
            let name = a.data[1][i].address.split("/")[4];
            name = name.split("");
            name.splice(0, 36);
            name = name.join("");
            let resource = {
              uid: `-${i}`,
              status: "done",
              name,
              delid: a.data[1][i].id,
            };
            resourceList.push(resource);
            this.setState({ resourceList });
          }
          // 图片
          for (let i in a.data[2]) {
            let blobobj = this.base64ToBlob({
              b64data: a.data[2][i],
              contentType: "image/png",
            });
            let blob = "";
            blobobj.then((res) => {
              blob = res.preview;
              let img = {
                uid: `-${i}`,
                name: "image.png",
                status: "done",
                url: blob,
                imgid: i,
              };
              imgList.push(img);
              this.setState({ imgList });
            });
          }
        });
    }
    this.state = {
      pagetitle,
      pagecontent,
      pageid,
      previewVisible: false,
      previewImage: "",
      previewTitle: "",
      imgList,
      submitimg: [],
      delimg: [],
      resourceList: [],
      submitresource: [],
      delresource: [],
    };
  }
  base64ToBlob = ({ b64data = "", contentType = "", sliceSize = 512 } = {}) => {
    return new Promise((resolve, reject) => {
      // 使用 atob() 方法将数据解码
      let byteCharacters = atob(b64data);
      let byteArrays = [];
      for (
        let offset = 0;
        offset < byteCharacters.length;
        offset += sliceSize
      ) {
        let slice = byteCharacters.slice(offset, offset + sliceSize);
        let byteNumbers = [];
        for (let i = 0; i < slice.length; i++) {
          byteNumbers.push(slice.charCodeAt(i));
        }
        // 8 位无符号整数值的类型化数组。内容将初始化为 0。
        // 如果无法分配请求数目的字节，则将引发异常。
        byteArrays.push(new Uint8Array(byteNumbers));
      }
      let result = new Blob(byteArrays, {
        type: contentType,
      });
      result = Object.assign(result, {
        // 这里一定要处理一下 URL.createObjectURL
        preview: URL.createObjectURL(result),
        name: `XXX.png`,
      });
      resolve(result);
    });
  };
  handleCancel = () => this.setState({ previewVisible: false });

  handleimgPreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };
  handleresourceChange = ({ fileList }) => {
    let { submitresource, delresource } = this.state;
    // 减少时在此处更新状态，增加时在请求拦截的函数customRequest更新状态
    if (fileList.length < this.state.resourceList.length) {
      for (let i of this.state.resourceList) {
        if (i.status === "removed") {
          if (i.delid) {
            delresource.push(i.delid);
            this.setState({ delresource });
          } else {
            for (let j in submitresource) {
              if (submitresource[j].uid === i.uid) {
                // 该数据无需渲染，所以可以用splice方法
                submitresource.splice(j, 1);
                this.setState({ submitresource });
              }
            }
          }
        }
      }
      this.setState({ resourceList: fileList });
    }
  };
  handleimgChange = ({ fileList }) => {
    let { submitimg, delimg } = this.state;
    // for (let i of fileList)
    // 减少时在此处更新状态，增加时在请求拦截的函数customRequest更新状态
    if (fileList.length < this.state.imgList.length) {
      for (let i of this.state.imgList) {
        if (i.status === "removed") {
          if (i.imgid) {
            delimg.push(i.imgid);
            this.setState({ delimg });
          } else {
            for (let j in submitimg) {
              if (submitimg[j].uid === i.uid) {
                // 该数据无需渲染，所以可以用splice方法
                submitimg.splice(j, 1);
                this.setState({ submitimg });
              }
            }
          }
        }
      }
      this.setState({ imgList: fileList });
    }
  };
  customRequestresource = (e) => {
    const { name, uid } = e.file;
    let { submitresource } = this.state;
    submitresource = [...submitresource, e.file];
    this.setState({ submitresource });
    const newfile = {
      uid,
      name,
      url: "",
      status: "done",
    };
    let { resourceList } = this.state;
    resourceList = [...resourceList, newfile];
    this.setState({ resourceList });
    // 资源增加时在此处更新状态
  };
  customRequestimg = (e) => {
    const { name, uid } = e.file;
    let { submitimg } = this.state;
    submitimg = [...submitimg, e.file];
    this.setState({ submitimg });
    const filebase64 = getBase64(e.file);
    filebase64.then((res) => {
      const newfile = {
        uid,
        name,
        url: res,
        status: "done",
      };
      let { imgList } = this.state;
      imgList = [...imgList, newfile];
      this.setState({ imgList });
    });
  };
  uplodaimg = () => {
    const { submitimg, delimg } = this.state;
    let formData = new FormData();
    formData.append("passageID", this.state.pageid);
    for (let i in submitimg) {
      if (submitimg[i]) {
        formData.append("file", submitimg[i]);
      }
    }
    // 上传图片
    axios({
      method: "post",
      url: "http://121.4.187.232:8081/admin/uploadImg",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        token: this.props.admintoken,
      },
    })
      .then((e) => {
        message.success("上传成功");
        // 删除图片
        for (let i of delimg) {
          axios({
            method: "post",
            url: `http://121.4.187.232:8081/admin/deleteImg?imgID=${i}`,
            headers: {
              token: this.props.admintoken,
            },
          })
            .then((e) => {
              message.success("删除成功");
            })
            .catch((e) => {
              message.error("删除失败");
            });
        }
      })
      .catch((e) => {
        message.success("上传失败");
      });
  };
  getpage = () => {
    let pagetitle = "",
      pagecontent = "",
      imgList = [],
      resourceList = [];
    axios
      .get(
        ` http://121.4.187.232:8081/passage/passageResources?passageID=${this.props.match.params}`
      )
      .then((a) => {
        pagetitle = a.data[0].title;
        pagecontent = a.data[0].content;
        this.setState({ pagetitle, pagecontent });

        // 资源
        for (let i in a.data[1]) {
          // 获取名字
          let name = a.data[1][i].address.split("/")[4];
          name = name.split("");
          name.splice(0, 36);
          name = name.join("");
          let resource = {
            uid: `-${i}`,
            status: "done",
            name,
            delid: a.data[1][i].id,
          };
          resourceList.push(resource);
          this.setState({ resourceList });
        }
        // 图片
        for (let i in a.data[2]) {
          let blobobj = this.base64ToBlob({
            b64data: a.data[2][i],
            contentType: "image/png",
          });
          let blob = "";
          blobobj.then((res) => {
            blob = res.preview;
            let img = {
              uid: `-${i}`,
              name: "image.png",
              status: "done",
              url: blob,
              imgid: i,
            };
            imgList.push(img);
            this.setState({ imgList });
          });
        }
      });
  };
  chagetac = () => {
    const { history } = this.props;
    const { pagetitle, pagecontent } = this.state;
    axios({
      method: "post",
      url: `http://121.4.187.232:8081/admin/createPassage?content=${pagecontent}&title=${pagetitle}`,
      headers: {
        token: this.props.admintoken,
      },
    }).then((a) => {
      if (a.data.msg === "Token已经过期!!!") {
        message.error(a.data.msg);
      } else {
        const pageid = a.data.split(":")[1];
        this.setState({ pageid }, () => {
          history.replace(`/admin/page/${pageid}`);
        });
        message.success("创建成功");
      }
    });
  };
  uplodaresource = () => {
    const { submitresource, delresource } = this.state;

    // 上传资源
    let formData = new FormData();
    formData.append("passageID", this.state.pageid);
    for (let i of submitresource) {
      formData.append("file", i);
    }
    axios({
      method: "post",
      url: "http://121.4.187.232:8081/admin/uploadResources",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        token: this.props.admintoken,
      },
    })
      .then((e) => {
        message.success("上传成功");
        // 删除资源
        for (let i of delresource) {
          axios({
            method: "post",
            url: `http://121.4.187.232:8081/admin/deleteResources?resourcesID=${i}`,
            headers: {
              token: this.props.admintoken,
            },
          })
            .then((e) => {
              message.success("删除成功");
            })
            .catch(() => {
              message.error("删除失败");
            });
        }
      })
      .catch((e) => {
        message.error("上传失败");
      });
  };
  callback = (key) => {
    // console.log(key);
  };
  textonchange = (e) => {
    const pagecontent = e.target.value;
    this.setState({ pagecontent });
  };
  titleonchange = (e) => {
    const pagetitle = e.target.value;
    this.setState({ pagetitle });
  };
  componentDidMount() {
    console.log(2);
  }
  componentDidUpdate() {
    console.log(3);
  }
  render() {
    // const { pageid } = this.state;
    const { previewVisible, previewImage, imgList, resourceList, pageid } =
      this.state;

    const { history } = this.props;

    return (
      <div className="neworeditpage">
        <div className="ct">
          <Tabs defaultActiveKey="1" onChange={this.callback}>
            <TabPane
              tab={
                <span>
                  <HighlightOutlined />
                  正文
                </span>
              }
              key="1"
            >
              <div className="texttab clearfix">
                <h3>标题:</h3>
                <Input
                  className="titleinput"
                  value={this.state.pagetitle}
                  onChange={this.titleonchange}
                />
                <h3>正文:</h3>
                <Input.TextArea
                  className="textinput"
                  autoSize={{ minRows: 10 }}
                  showCount
                  maxLength={100}
                  value={this.state.pagecontent}
                  onChange={this.textonchange}
                />
                <div className="buttoneara">
                  <Button className="submitbutton" onClick={this.chagetac}>
                    {history.location.pathname !== "/admin/page/newpage"
                      ? "保存"
                      : "新建"}
                  </Button>
                </div>
              </div>
            </TabPane>
            {history.location.pathname !== "/admin/page/newpage" && (
              <>
                <TabPane
                  tab={
                    <span>
                      <PictureOutlined />
                      图片
                    </span>
                  }
                  key="2"
                >
                  <div className="imgtab clearfix">
                    <Upload
                      listType="picture-card"
                      customRequest={this.customRequestimg}
                      fileList={imgList}
                      onPreview={this.handleimgPreview}
                      onChange={this.handleimgChange}
                      accept=".png"
                    >
                      {imgList.length < 8 && (
                        <div>
                          <PlusOutlined />
                          <div style={{ marginTop: 8 }}>添加</div>
                        </div>
                      )}
                    </Upload>
                    <div className="buttoneara">
                      {pageid !== "newpage" && (
                        <Button
                          className="submitbutton"
                          onClick={this.uplodaimg}
                        >
                          保存
                        </Button>
                      )}
                    </div>
                    <Modal
                      visible={previewVisible}
                      title={null}
                      footer={null}
                      onCancel={this.handleCancel}
                    >
                      <img
                        alt="example"
                        style={{ width: "100%" }}
                        src={previewImage}
                      />
                    </Modal>
                  </div>
                </TabPane>
                <TabPane
                  tab={
                    <span>
                      <DownloadOutlined />
                      资源
                    </span>
                  }
                  key="3"
                >
                  <div className="resourcetab clearfix">
                    <Upload
                      listType=""
                      maxCount={3}
                      multiple
                      customRequest={this.customRequestresource}
                      fileList={resourceList}
                      // onPreview={this.handleimgPreview}
                      onChange={this.handleresourceChange}
                    >
                      <Button icon={<UploadOutlined />}>添加资源</Button>
                    </Upload>
                    <div className="buttoneara">
                      {pageid !== "newpage" && (
                        <Button
                          className="submitbutton"
                          onClick={this.uplodaresource}
                        >
                          保存
                        </Button>
                      )}
                    </div>
                  </div>
                </TabPane>
                <TabPane
                  tab={
                    <span>
                      <CommentOutlined />
                      评论
                    </span>
                  }
                  key="4"
                >
                  <div className="pagecommenttab">
                    <h1>文章评论</h1>
                    <Table />
                  </div>
                </TabPane>
              </>
            )}
          </Tabs>
        </div>
      </div>
    );
  }
}
export default connect((state) => ({
  admintoken: state.admintoken,
}))(Neworeditpage);
