import React from "react";

import "./footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="clearfix">
          <div className="footerlist">
            <p>
              免责声明：本站为个人博客，博客所发布的一切破解补丁、注册机和注册信息及软件的文章仅限用于学习和研究目的；不得将上述内容用于商业或者非法用途，否则，一切后果请用户自负。本站信息来自网络，版权争议与本站无关，您必须在下载后的24个小时之内，从您的电脑中彻底删除上述内容。访问和下载本站内容，说明您已同意上述条款。
            </p>
            <p>本站为非盈利性站点，本站不贩卖软件，所有内容不作为商业行为。</p>
            <p>
              Copyright © 2021 兜兜阁 - 备案号：
              <span>xxxxxxxxxx</span>
            </p>
          </div>
          <div className="iconlist">
            <i className="qq"></i>
            <i className="wx"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
