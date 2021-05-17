const Subject = require('../models/subject.js');

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const {StaticRouter} = require('react-router-dom');

const Content =require('root/src/components/page/content.common.jsx');
exports.app = (req, res, next) => {
  Subject.getRange(0, 100, (err, subjects) => {
    if(err) return next(err);
    const context = {};
    const appHTML = ReactDOMServer.renderToString(
      <StaticRouter location={req.url} context={context}>
        <Content items={subjects}/>
      </StaticRouter>
    )
    res.render('index', {
      title: 'JavaScript Playground',
      appHTML,
      _SSR_DATA: `<script type="text/javascript">var _SSR_DATA_subjects = '${JSON.stringify(subjects)}'</script>`
    });
  });
}
