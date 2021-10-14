import createSagaMiddleware from '@redux-saga/core';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import rootSaga from '../sagas/UsersSaga';


const sagaMiddleware = createSagaMiddleware();
const middlewares = [thunk, sagaMiddleware];

export default function configureStore(preloadedState) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(
      applyMiddleware(...middlewares)
    )
  );

  sagaMiddleware.run(rootSaga);
  return store;
}