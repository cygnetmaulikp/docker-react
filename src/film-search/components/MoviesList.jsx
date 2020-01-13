import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getMovies } from '../reducer';

import Pagination from './Pagination';
import MovieCard from './MovieCard';

const MoviesList = ({ movies }) => (
  <div>
    {movies.map(movie => (
      <MovieCard key={Math.random()} movie={movie} />
    ))}

    <Pagination />
  </div>
);

MoviesList.defaultProps = {
  movies: [],
};

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      Title: PropTypes.string,
      Year: PropTypes.string,
      imdbID: PropTypes.string,
      Poster: PropTypes.string,
    })
  ),
};

export default connect(
  state => ({
    movies: getMovies(state),
  }),
  {}
)(MoviesList);
