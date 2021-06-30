import 'style/index.css';
const React = require('react');
import ReactDOM from 'react-dom'
import {BrowserRouter, HashRouter} from 'react-router-dom'
import Content from './components/page/content.jsx'
import api from './api.js'
function renderApp(items){
  const Router = process.env.NODE_ENV !== 'dev' ? BrowserRouter : HashRouter
  ReactDOM.render((
    <Router>
      <Content refreshNavItemsCallback={refreshNavItemsCallback} items={items} />
    </Router>
    ), document.getElementById('app'));
}
function refreshNavItemsCallback(){
  api('get', 'subjects', null, renderApp)
}
if(process.env.NODE_ENV !== 'dev') {
  renderApp(JSON.parse(_SSR_DATA_subjects))
}else{
  api('get', 'subjects', null, renderApp)
}
