import React from "react";
import { connect } from "react-redux";

import "./newpage.css";

class Newpage extends React.Component {
  render() {
    return <div className="newpage">这是newpage</div>;
  }
}
export default connect((state) => ({
  admintoken: state.admintoken,
}))(Newpage);
