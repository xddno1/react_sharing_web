import React from "react";

import "./mapbox.css";

export default class Mapbox extends React.Component {
  render() {
    return (
      <div className="mapbox">
        <div className="title">疫情地图</div>
        <div className="map">
          <iframe
            src="https://www.lovestu.com/api/project/cnmapyinqing/obj.php"
            height="500"
            frameborder="no"
            border="0"
            width="300"
            title="j"
          ></iframe>
        </div>
      </div>
    );
  }
}
