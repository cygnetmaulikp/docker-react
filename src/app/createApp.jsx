import React from 'react';

import createHistory from './history';
import createStore from './store';
import App from './component/App';

export default () => {
  const history = createHistory();
  const store = createStore(history);

  return { app: <App history={history} store={store} />, history, store };
};
