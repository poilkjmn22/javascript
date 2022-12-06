// const NavList = require("../models/nav-list.js");

// const React = require('react');
// const ReactDOMServer = require('react-dom/server');
// const {StaticRouter} = require('react-router-dom');

// const Content =require('root/src/components/page/content.common.jsx');
exports.app = (req, res, next) => {
  // NavList.getRange(0, 100, (err, navList) => {
  // if (err) return next(err);
  res.render("index");
  // const context = {};
  // const appHTML = ReactDOMServer.renderToString(
  //   <StaticRouter location={req.url} context={context}>
  //     <Content items={navList}/>
  //   </StaticRouter>
  // )
  // res.render('index', {
  //   title: 'JavaScript Playground',
  //   appHTML,
  //   _SSR_DATA: `<script type="text/javascript">var _SSR_DATA_navList = '${JSON.stringify(navList)}'</script>`
  // });
  // });
};
