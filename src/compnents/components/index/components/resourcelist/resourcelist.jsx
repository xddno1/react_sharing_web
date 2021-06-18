import React from "react";
import PubSub from "pubsub-js";
import axios from "axios";

import "./resourcelist.css";
import Resourcebox from "./components/resourcebox/resourcebox";

export default class Resourcelist extends React.Component {
  state = {
    resources: [],
    resourcetotal: 1,
    currentpage: 1,
    pageSize: 10,
    nofrist: false,
  };
  componentDidMount() {
    const { currentpage, pageSize } = this.state;
    axios
      .get(
        `http://121.4.187.232:8081/passage/queryAllPassage?pageNo=${currentpage}&pageSize=${pageSize}`
      )
      .then((e) => {
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
  componentDidUpdate() {
    if (this.props.location.state) {
      const { currentpage, pageSize } = this.props.location.state;
      if (
        this.state.currentpage !== currentpage ||
        this.state.pageSize !== pageSize
      ) {
        axios
          .get(
            `http://121.4.187.232:8081/passage/queryAllPassage?pageNo=${currentpage}&pageSize=${pageSize}`
          )
          .then((e) => {
            const resourcetotal = e.data.passageItemCount;
            const resources = e.data.passageItem;
            this.setState({
              resourcetotal,
              resources,
              currentpage,
              pageSize,
            });
            PubSub.publish("resourcetotal", resourcetotal);
            PubSub.publish("currentpage", currentpage);
            document.body.scrollTop = document.documentElement.scrollTop = 0;
          });
      }
    }
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
