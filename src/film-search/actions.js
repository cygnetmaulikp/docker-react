import client from '../client';

import {
  SET_SEARCH_TERM,
  SET_LOADING,
  SEARCH_FILM_SUCCESS,
  SEARCH_FILM_FAILURE,
  SET_CURRENT_PAGE,
  SET_SORT_BY,
} from './constants';
import { getSearchTerm, getCurrentPage, getMovies, getTotalMovies } from './reducer';

export const fetchFilms = searchTerm => async dispatch => {
  dispatch({ type: SET_SEARCH_TERM, payload: searchTerm });
  dispatch({ type: SET_LOADING, payload: true });

  try {
    const { data } = await client.get(`http://www.omdbapi.com/?apikey=93be3e36&s=${searchTerm}`);

    if (data && data.Response === 'True') {
      const { Search, totalResults } = data;

      dispatch({
        type: SEARCH_FILM_SUCCESS,
        payload: { movies: Search, totalResults },
      });
    } else {
      dispatch({
        type: SEARCH_FILM_SUCCESS,
        payload: { movies: [], totalResults: 0 },
      });
    }
  } catch (error) {
    dispatch({ type: SEARCH_FILM_FAILURE, payload: error });
  }
};

export const fetchNextFilms = pageEvent => async (dispatch, getState) => {
  const state = getState();
  const searchTerm = getSearchTerm(state);
  const currentPage = getCurrentPage(state);

  // eslint-disable-next-line no-nested-ternary
  const page = pageEvent === 'NEXT' ? currentPage + 1 : pageEvent === 'PREV' ? currentPage - 1 : 0;

  dispatch({ type: SET_LOADING, payload: true });
  dispatch({ type: SET_CURRENT_PAGE, payload: page });

  try {
    const { data } = await client.get(
      `http://www.omdbapi.com/?apikey=93be3e36&s=${searchTerm}&page=${page}`
    );

    if (data && data.Response === 'True') {
      const { Search, totalResults } = data;

      dispatch({
        type: SEARCH_FILM_SUCCESS,
        payload: { movies: Search, totalResults },
      });
    }
  } catch (error) {
    dispatch({ type: SEARCH_FILM_FAILURE, payload: error });
  }
};

const sortMovies = (data, sortBy) => {
  data.sort((a, b) => {
    if (a[sortBy] > b[sortBy]) return 1;
    if (a[sortBy] < b[sortBy]) return -1;
    return 0;
  });
};

export const changeSortOrder = sortByField => (dispatch, getState) => {
  dispatch({ type: SET_SORT_BY, payload: sortByField });
  const state = getState();
  const movies = [...getMovies(state)];
  const totalResults = getTotalMovies(state);

  if (movies.length && sortByField === 'Date') {
    sortMovies(movies, 'Year');

    dispatch({
      type: SEARCH_FILM_SUCCESS,
      payload: { movies, totalResults },
    });
  } else if (movies.length && sortByField === 'Title') {
    sortMovies(movies, 'Title');

    dispatch({
      type: SEARCH_FILM_SUCCESS,
      payload: { movies, totalResults },
    });
  }
};
