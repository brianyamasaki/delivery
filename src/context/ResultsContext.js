import createDataContext from './createDataContext';
import yelpApi from '../api/yelp';

const INITIAL_STATE = {
  errorMessage: '',
  refreshing: false,
  results: []
};
const FETCH_START = 'fetch_start';
const FETCH_RESULTS = 'fetch_results';
const FETCH_ERROR = 'fetch_error';

const resultReducer = (state, action) => {
  switch (action.type) {
    case FETCH_START:
      return {
        ...state,
        errorMessage: '',
        refreshing: true
      };
    case FETCH_RESULTS:
      return {
        ...state,
        refreshing: false,
        results: action.payload
      };
    case FETCH_ERROR:
      return {
        ...state,
        errorMessage: action.payload
      };
    default:
      return state;
  }
};

const fetchResults = dispatch => async (bundle, categories) => {
  const catParms = categories ? `&categories=${categories}` : '';
  const locParms = bundle.location
    ? `&location=${bundle.location}`
    : `&latitude=${bundle.latitude}&longitude=${bundle.longitude}`;
  const parms = `?term=restaurants${locParms}${catParms}`;
  dispatch({
    type: FETCH_START
  });
  try {
    const response = await yelpApi.get('/search', {
      params: {
        term: 'restaurants',
        location: bundle.location
      }
    });
    dispatch({
      type: FETCH_RESULTS,
      payload: response.data.businesses
    });
  } catch (err) {
    dispatch({
      type: FETCH_ERROR,
      payload: err.message
    });
  }
};

export const { Context, Provider } = createDataContext(
  resultReducer,
  { fetchResults },
  INITIAL_STATE
);
