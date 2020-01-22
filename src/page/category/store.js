import { createStore, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';
import logger from 'redux-logger';
import mainReducer from './reducers/main.js';

const reduxDevtools = window.devToolsExtension ? window.devToolsExtension() : f=>f

const store = createStore(mainReducer, compose(applyMiddleware(logger, thunk), reduxDevtools));

export default store;