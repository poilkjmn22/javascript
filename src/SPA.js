const React = require('react');
import ReactDOM from 'react-dom'
import {BrowserRouter, HashRouter} from 'react-router-dom'
import Content from './components/page/content.jsx'
import axios from 'axios'
function renderApp(items){
  const Router = process.env.NODE_ENV !== 'dev' ? BrowserRouter : HashRouter
  ReactDOM.render((
    <Router>
      <Content items={items} />
    </Router>
    ), document.getElementById('app'));
}
if(process.env.NODE_ENV !== 'dev') {
  renderApp(JSON.parse(_SSR_DATA_subjects))
}else{
  axios.get('/api/subjects')
    .then(res => {
      renderApp(res.data)
    })
    .catch(e => console.log(e))
}
