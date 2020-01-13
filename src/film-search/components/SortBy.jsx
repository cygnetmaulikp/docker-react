import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getSortBy } from '../reducer';
import { changeSortOrder } from '../actions';

import css from './SortBy.css';

const SortBy = ({ sortBy, setSortBy }) => (
  <div className={css.root}>
    Sort By:
    <label htmlFor="title">
      <input
        type="radio"
        id="title"
        value="Title"
        checked={sortBy === 'Title'}
        onClick={() => setSortBy('Title')}
        onChange={() => {}}
      />
      Title
    </label>
    <label htmlFor="date">
      <input
        type="radio"
        value="Date"
        id="date"
        checked={sortBy === 'Date'}
        onClick={() => setSortBy('Date')}
        onChange={() => {}}
      />
      Date
    </label>
  </div>
);

SortBy.propTypes = {
  setSortBy: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
};

export default connect(state => ({ sortBy: getSortBy(state) }), {
  setSortBy: changeSortOrder,
})(SortBy);
