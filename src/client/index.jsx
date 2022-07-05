import * as React from 'react';
import * as ReactDom from 'react-dom';
import { App } from '../App';

window.addEventListener('load', () => {
  ReactDom.hydrate(<App />, document.getElementById('react_root'));
});
