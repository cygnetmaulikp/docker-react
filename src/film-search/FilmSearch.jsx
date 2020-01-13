import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import reducerRegistry from '../reducer-registry';

import reducer, { isLoading } from './reducer';
import { NAME } from './constants';
import SearchInput from './components/searchInput';
import MoviesList from './components/MoviesList';
import SortBy from './components/SortBy';
import css from './FilmSearch.css';

/** register reducer run time */
reducerRegistry.register(NAME, reducer);

class FilmSearch extends PureComponent {
  render() {
    const { loading } = this.props;
    return (
      <div className={css.root}>
        <h1>Film Search</h1>
        <div className={css.filter}>
          <SearchInput />
          {loading && (
            // eslint-disable-next-line jsx-a11y/label-has-associated-control
            <label htmlFor="" className={css.loading}>
              loading...
            </label>
          )}
          <SortBy />
        </div>
        <div className={css.movieList}>
          <MoviesList />
        </div>
      </div>
    );
  }
}

FilmSearch.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default connect(
  state => ({
    loading: isLoading(state),
  }),
  {}
)(FilmSearch);
