import React from "react";
import PubSub from "pubsub-js";
import axios from "axios";

import "./resourcelist.css";
import Resourcebox from "./component/resourcebox/resourcebox";

export default class Resourcelist extends React.Component {
  state = {
    resources: [],
    resourcetotal: 1,
    currentpage: -1,
    pageSize: -1,
    nofrist: false,
  };
  getresourcebox() {
    const data = this.props.location.state;
    console.log(data);
    if (this.state.nofrist) {
      if (data) {
        console.log(1);
        const { currentpage, pageSize } = data;
        if (
          this.state.currentpage !== currentpage ||
          this.state.pageSize !== pageSize
        ) {
          axios
            .get(
              `http://121.4.187.232:8081/passage/queryAllPassage?pageNo=${currentpage}&pageSize=${pageSize}`
            )
            .then((e) => {
              console.log(e.data.passageItem);
              const resourcetotal = e.data.passageItemCount;
              const resources = e.data.passageItem;
              this.setState({
                resourcetotal,
                resources,
                currentpage,
                pageSize,
              });
              PubSub.publish("resourcetotal", resourcetotal);
            });
        }
      }
    } else {
      const currentpage = 1;
      const pageSize = 10;
      axios
        .get(
          `http://121.4.187.232:8081/passage/queryAllPassage?pageNo=${currentpage}&pageSize=${pageSize}`
        )
        .then((e) => {
          console.log(e.data.passageItem);
          const resourcetotal = e.data.passageItemCount;
          const resources = e.data.passageItem;
          PubSub.publish("resourcetotal", resourcetotal);
          this.setState({
            resourcetotal,
            resources,
            currentpage,
            pageSize,
            nofrist: true,
          });
        });
    }
  }
  componentDidUpdate() {
    this.getresourcebox();
  }
  componentDidMount() {
    this.getresourcebox();
  }
  render() {
    const { resources } = this.state;
    return (
      <div className="resourcelist">
        {resources.map((item, index) => (
          <Resourcebox key={index} item={item} />
        ))}
      </div>
    );
  }
}
