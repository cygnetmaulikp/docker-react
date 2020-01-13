import { composeWithDevTools } from 'redux-devtools-extension';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducerRegistry from '../reducer-registry';

export default history => {
  const middlewares = [thunkMiddleware.withExtraArgument({ history })];
  const reducer = combineReducers(reducerRegistry.getReducers());

  const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middlewares)));

  reducerRegistry.setChangeListener(reducers => {
    store.replaceReducer(combineReducers(reducers));
  });

  return store;
};
