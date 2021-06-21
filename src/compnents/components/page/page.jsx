import axios from "axios";
import React from "react";

import Hotbox from "../index/components/hotbox/hotbox";
import Mapbox from "../index/components/mapbox/mapbox";
import "./page.css";

export default class Page extends React.Component {
  constructor(props) {
    super(props);

    axios
      .get(
        ` http://121.4.187.232:8081/passage/passageResources?passageID=${props.match.params.pageid}`
      )
      .then((e) => {
        const { title, content } = e.data[0];
        const img = [];

        for (let i in e.data[2]) {
          img.push("data:image/png;base64," + e.data[2][i]);
        }
        const resources = e.data[1];
        this.setState({ title, content, img, resources });
      });

    this.state = {
      pageid: props.match.params.pageid,
      title: "",
      content: "",
      img: [],
      resources: [],
    };
  }
  downloadresource = (index) => {
    console.log(this.state.resources[index].address);

    axios({
      method: "post",
      url: `http://121.4.187.232:8081/passage/downResources?filePath=${this.state.resources[index].address}`,
      responseType: "blob",
    }).then((res) => {
      console.log(res);
      res = res.data;
      let blob = new Blob([res], { type: res.type });
      let downloadElement = document.createElement("a");
      let href = window.URL.createObjectURL(blob);
      downloadElement.href = href;
      downloadElement.download = this.state.resources[index].address;
      document.body.appendChild(downloadElement);
      downloadElement.click();
      document.body.removeChild(downloadElement);
      window.URL.revokeObjectURL(href);
    });
  };
  render() {
    // const { pageid } = this.props.match.params;
    const { title, content, img, resources } = this.state;
    console.log(resources);
    return (
      <div className="page">
        <div className="container clearfix">
          <div className="left">
            <h1>{title}</h1>
            <div className="info">
              <span>{content}</span>
            </div>
            <div className="text">
              <span>{content}</span>
            </div>
            <div>
              <h2>描述图片</h2>
              {img &&
                img.map((imgdata, index) => (
                  <div className="imgct" key={index}>
                    <img src={imgdata} alt="" className="page-picture" />
                    <span className="page-picture-describe">图片</span>
                  </div>
                ))}
            </div>
            <div className="resource">
              <h2>资源下载</h2>

              {resources.map((item, index) => {
                let name = item.address.split("/")[4];
                name = name.split("");
                name.splice(0, 36);
                name = name.join("");
                console.log(item);
                return (
                  <div key={index}>
                    <span className="resource-title">
                      资源{index + 1}：
                      <span
                        className="resource-link"
                        onClick={() => this.downloadresource(index)}
                      >
                        {name}
                      </span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="right">
            <Hotbox />
            <Mapbox />
          </div>
        </div>
      </div>
    );
  }
}
