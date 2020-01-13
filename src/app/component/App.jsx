import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Router, Route, Switch } from 'react-router';
import PropTypes from 'prop-types';
import React from 'react';

import withSuspense from '../../HOC/withSuspense';

const FilmSearchPage = withSuspense(React.lazy(() => import('../../film-search/FilmSearch')));

const App = ({ store, history }) => (
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path="/" component={FilmSearchPage} />
      </Switch>
    </Router>
  </Provider>
);

App.propTypes = {
  history: PropTypes.shape({}).isRequired,
  store: PropTypes.shape({}).isRequired,
};

export default App;
