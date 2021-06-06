/* eslint no-underscore-dangle: 0 */
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import createRootReducer from './store';

const enhancers: [] = [];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = (window && (window as any).__REDUX_DEVTOOLS_EXTENSIONS_COMPOSE__) || compose;

  if (typeof devToolsExtension === 'function') {
    // @ts-ignore
    enhancers.push(devToolsExtension());
  }
}

function configureStore(preloadedState = {}) {
  const store = createStore(
    createRootReducer(),
    preloadedState, // может понадобиться для SSR
    compose(applyMiddleware(thunk), ...enhancers),
  );

  return store;
}

export default configureStore;
