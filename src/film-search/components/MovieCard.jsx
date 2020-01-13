import React, { useState } from 'react';
import PropTypes from 'prop-types';

import css from './MovieCard.css';

const MovieCard = ({ movie }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={css.cardHeader} role="button" onClick={() => setIsExpanded(!isExpanded)}>
      <div>{movie.Title}</div>
      {isExpanded && (
        <div className={css.padder}>
          <div>
            <div className={css.padder}>{`Year: ${movie.Year}`}</div>
            <div className={css.padder}>{`IMDBID: ${movie.imdbID}`}</div>
          </div>
          <div className={css.padder}>
            <img src={movie.Poster} alt="" />
          </div>
        </div>
      )}
    </div>
  );
};

MovieCard.defaultProps = {
  movie: {},
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    Year: PropTypes.string,
    imdbID: PropTypes.string,
    Poster: PropTypes.string,
  }),
};

export default MovieCard;
