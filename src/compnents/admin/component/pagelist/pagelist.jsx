import React from "react";
import { connect } from "react-redux";

import "./pagelist.css";

class Pagelist extends React.Component {
  render() {
    return <div className="pagelist">这是pagelist</div>;
  }
}
export default connect((state) => ({
  admintoken: state.admintoken,
}))(Pagelist);
