import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import {} from "antd";
import "antd/dist/antd.css";

import "./app.css";
import Footer from "./components/footer/footer";
import Header from "./header/header";
import Index from "./index/index";
import Page from "./page/page";
import Admin from "./admin/admin";
import Mybacktop from "./mybacktop/mybacktop";

export default class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Switch>
          <Route path="/index" component={Index} />
          <Route path="/page/:pageid" component={Page} />
          <Route path="/admin" component={Admin} />
          <Redirect to="/index" />
        </Switch>
        <Footer />
        <Mybacktop />
      </>
    );
  }
}
// import React from "react";
// import { Menu, Button } from "antd";

// import "antd/dist/antd.css";
// import {
//   AppstoreOutlined,
//   MenuUnfoldOutlined,
//   MenuFoldOutlined,
//   PieChartOutlined,
//   DesktopOutlined,
//   ContainerOutlined,
//   MailOutlined,
// } from "@ant-design/icons";

// const { SubMenu } = Menu;

// export default class App extends React.Component {
//   state = {
//     collapsed: false,
//   };

//   toggleCollapsed = () => {
//     this.setState({
//       collapsed: !this.state.collapsed,
//     });
//   };

//   render() {
//     return (
//       <div style={{ width: 256 }}>
//         <Button
//           type="primary"
//           onClick={this.toggleCollapsed}
//           style={{ marginBottom: 16 }}
//         >
//           {React.createElement(
//             this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined
//           )}
//         </Button>
//         <Menu
//           defaultSelectedKeys={["1"]}
//           defaultOpenKeys={["sub1"]}
//           mode="inline"
//           theme="dark"
//           inlineCollapsed={this.state.collapsed}
//         >
//           <Menu.Item key="1" icon={<PieChartOutlined />}>
//             Option 1
//           </Menu.Item>
//           <Menu.Item key="2" icon={<DesktopOutlined />}>
//             Option 2
//           </Menu.Item>
//           <Menu.Item key="3" icon={<ContainerOutlined />}>
//             Option 3
//           </Menu.Item>
//           <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
//             <Menu.Item key="5">Option 5</Menu.Item>
//             <Menu.Item key="6">Option 6</Menu.Item>
//             <Menu.Item key="7">Option 7</Menu.Item>
//             <Menu.Item key="8">Option 8</Menu.Item>
//           </SubMenu>
//           <SubMenu
//             key="sub2"
//             icon={<AppstoreOutlined />}
//             title="Navigation Two"
//           >
//             <Menu.Item key="9">Option 9</Menu.Item>
//             <Menu.Item key="10">Option 10</Menu.Item>
//             <SubMenu key="sub3" title="Submenu">
//               <Menu.Item key="11">Option 11</Menu.Item>
//               <Menu.Item key="12">Option 12</Menu.Item>
//             </SubMenu>
//           </SubMenu>
//         </Menu>
//       </div>
//     );
//   }
// }
