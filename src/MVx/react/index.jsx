import "root/style/index.scss";
import React from 'react';
import ReactDom from 'react-dom';

import HelloWorld from './components/HelloWorld.jsx';
import Clock from './components/clock/clock.jsx';

ReactDom.render(
  <div>
    <HelloWorld 
      id="ember"
      frameworkName="Ember.js"
      title="A framework for creating ambitious web applications" />
    <HelloWorld 
      id="backbone"
      frameworkName="Backbone.js"
      title="Backbone.js gives structures to web applications" />
    <HelloWorld 
      id="vue"
      frameworkName="Vue.js"
      title="a MVW Framework is friendly to new developer" />
    <HelloWorld 
      id="angular"
      frameworkName="Angular.js"
      title="Superheroic JavaScript MVW Framework" />
  </div>,
  document.getElementById('app')
);

ReactDom.render(
  <Clock />,
  document.getElementById('clock')
)
