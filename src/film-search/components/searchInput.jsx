import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getSearchTerm } from '../reducer';
import { fetchFilms } from '../actions';

import css from './searchInput.css';

const SearchInput = ({ searchTerm, onChangeInput }) => (
  <input
    type="text"
    placeholder="Search..."
    value={searchTerm}
    className={css.input}
    onChange={e => onChangeInput(e.target.value)}
  />
);

SearchInput.propTypes = {
  onChangeInput: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
};

export default connect(state => ({ searchTerm: getSearchTerm(state) }), {
  onChangeInput: fetchFilms,
})(SearchInput);
