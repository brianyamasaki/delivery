import createDataContext from './createDataContext';

const INITIAL_STATE = {
  locationText: '',
  latitude: null,
  longitude: null
};
const TEXT_LOCATION = 'text_location';
const COORD_LOCATION = 'coord_location';

const locationReducer = (state, action) => {
  switch (action.type) {
    case TEXT_LOCATION:
      return {
        ...INITIAL_STATE,
        locationText: action.payload
      };
    case COORD_LOCATION:
      return {
        ...INITIAL_STATE,
        latitude: action.payload.latitude,
        longitude: action.payload.longitude
      };
    default:
      return state;
  }
};

const setLocationText = dispatch => location => {
  dispatch({
    type: TEXT_LOCATION,
    payload: location
  });
};

const setLocationCoord = dispatch => ({ latitude, longitude }) => {
  dispatch({
    type: COORD_LOCATION,
    payload: { latitude, longitude }
  });
};

export const { Context, Provider } = createDataContext(
  locationReducer,
  { setLocationCoord, setLocationText },
  INITIAL_STATE
);
