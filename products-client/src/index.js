import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';
import WebFontLoader from 'webfontloader';


import { BrowserRouter } from 'react-router-dom'

WebFontLoader.load({
 google: {
    families: ['Roboto:300,400,500,700', 'Material Icons'],
  },
});

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
     <BrowserRouter>
        <App />
     </BrowserRouter>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
