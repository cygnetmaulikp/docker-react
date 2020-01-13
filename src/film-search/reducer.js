import update from 'immutability-helper';

import {
  NAME,
  SET_SEARCH_TERM,
  SEARCH_FILM_REQUEST,
  SEARCH_FILM_SUCCESS,
  SEARCH_FILM_FAILURE,
  SET_LOADING,
  SET_CURRENT_PAGE,
  SET_SORT_BY,
} from './constants';

const initialState = {
  searchTerm: '',
  loading: false,
  movies: [],
  totalMovies: 0,
  currentPage: 1,
  sortBy: 'Title',
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_SEARCH_TERM:
      return update(state, { searchTerm: { $set: payload } });

    case SET_CURRENT_PAGE:
      return update(state, { currentPage: { $set: payload } });

    case SET_SORT_BY:
      return update(state, { sortBy: { $set: payload } });

    case SET_LOADING:
      return update(state, { loading: { $set: payload } });

    case SEARCH_FILM_REQUEST:
      return update(state, { loading: { $set: true } });

    case SEARCH_FILM_SUCCESS: {
      return update(state, {
        loading: { $set: false },
        movies: { $set: payload.movies },
        totalMovies: { $set: payload.totalResults },
      });
    }

    case SEARCH_FILM_FAILURE:
      return update(state, { loading: { $set: false } });

    default:
      return initialState;
  }
};

export const getSearchTerm = state => state[NAME].searchTerm;
export const getMovies = state => state[NAME].movies;
export const getTotalMovies = state => state[NAME].totalMovies;
export const getCurrentPage = state => state[NAME].currentPage;
export const getSortBy = state => state[NAME].sortBy;
export const isLoading = state => state[NAME].loading;
