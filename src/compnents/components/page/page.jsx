import React from "react";

import Hotbox from "../index/components/hotbox/hotbox";
import Mapbox from "../index/components/mapbox/mapbox";
import "./page.css";

export default class Page extends React.Component {
  render() {
    // const { pageid } = this.props.match.params;
    return (
      <div className="page">
        <div className="container clearfix">
          <div className="left">
            <h1>
              这是标题：title这是标题：title这是标题：title这是标题：title这是标题：title这是标题：title这是标题：title这是标题：title这是标题：title这是标题：title这是标题：title
            </h1>
            <div className="info">
              <span>hhh</span>
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
