import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getTotalMovies, getCurrentPage } from '../reducer';
import { fetchNextFilms } from '../actions';

import css from './Pagination.css';

const Pagination = ({ totalMovies, fetchNewFilms, currentPage }) => {
  return (
    totalMovies > 0 && (
      <div className={css.pagination}>
        <button
          type="button"
          onClick={() => fetchNewFilms('PREV')}
          disabled={currentPage === 1}
          className={css.btnPrev}
        >
          Previous
        </button>
        {`showing 10 records of ${totalMovies}`}

        <button
          type="button"
          className={css.btnNext}
          disabled={totalMovies === 0 || Math.ceil(totalMovies / 10) <= currentPage}
          onClick={() => fetchNewFilms('NEXT')}
        >
          Next
        </button>
      </div>
    )
  );
};

Pagination.propTypes = {
  totalMovies: PropTypes.oneOf([PropTypes.number, PropTypes.string]).isRequired,
  fetchNewFilms: PropTypes.func.isRequired,
};

export default connect(
  state => ({ totalMovies: getTotalMovies(state), currentPage: getCurrentPage(state) }),
  { fetchNewFilms: fetchNextFilms }
)(Pagination);
