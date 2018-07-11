import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

import configureStore from 'config/store';
import App from './views/App';

import 'style.scss';

const store = configureStore().store;

ReactDOM.render(
    <AppContainer>
        <Provider store = { store }>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </AppContainer>,
    document.getElementById('app')
);