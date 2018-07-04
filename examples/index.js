import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader'; // eslint-disable-line import/no-extraneous-dependencies

import App from './components/App';

const rootEl = global.document.getElementById('app');
const render = AppComponent => {
    ReactDOM.render(
        <AppContainer>
            <AppComponent/>
        </AppContainer>,
        rootEl
    );
};

/* eslint-disable global-require, import/newline-after-import */
render(App);
if (module.hot)
    module.hot.accept(App, () => render(require('./components/App').default));
/* eslint-enable global-require, import/newline-after-import */
