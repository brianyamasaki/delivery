import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import catch22deliveryApi from '../api/catch22delivery';
import { ASYNC_STORAGE_KEY_CATEGORIES } from '../constants';

const INITIAL_STATE = {
  errorMessage: '',
  refreshing: false,
  categories: [],
  selectedCategories: [],
  selString: ''
};
const FETCH_START = 'fetch_start';
const FETCH_CATEGORIES = 'fetch_results';
const FETCH_ERROR = 'fetch_error';
const TOGGLE_SELECTION = 'toggle_selection';

const getSelectionArray = (categories) => {
  const selectionArray = new Array(categories.length);
  categories.forEach(
    (item, i) => (selectionArray[i] = item.slug === 'all' ? true : false)
  );
  return selectionArray;
};

const getToggledSelectedCategories = (
  iToggle,
  selectedCategories,
  categories
) => {
  let isAnythingOtherThanAllSelected = false;
  let iAll = 0;

  // selecting All deselects everyone else
  if (categories[iToggle].slug === 'all' && !selectedCategories[iToggle]) {
    return categories.map((item, i) => (i === iToggle ? true : false));
  }
  const newSelected = selectedCategories.map((sel, i) => {
    //toggle the selection
    const val = i === iToggle ? !sel : sel;
    if (categories[i].slug === 'all') {
      iAll = i;
    } else if (val) {
      isAnythingOtherThanAllSelected = true;
    }
    return val;
  });
  newSelected[iAll] = !isAnythingOtherThanAllSelected ? true : false;
  return newSelected;
};

const categoriesToString = (categories, selectedCategories) => {
  const iAll = categories.findIndex((cat) => cat.slug === 'all');
  if (selectedCategories[iAll]) {
    return null;
  }
  const selStrings = [];
  selectedCategories.forEach((sel, i) => {
    if (sel) {
      selStrings.push(categories[i].id);
    }
  });
  return selStrings.join(', ');
};

const categoryReducer = (state, action) => {
  let selectedCategories;
  let selString;
  switch (action.type) {
    case FETCH_START:
      return {
        ...INITIAL_STATE,
        refreshing: true
      };
    case FETCH_CATEGORIES:
      selectedCategories = getSelectionArray(action.payload);
      selString = categoriesToString(action.payload, selectedCategories);
      return {
        ...state,
        errorMessage: '',
        refreshing: false,
        categories: action.payload,
        selectedCategories,
        selString
      };
    case FETCH_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
        refreshing: false
      };
    case TOGGLE_SELECTION:
      selectedCategories = getToggledSelectedCategories(
        action.payload,
        state.selectedCategories,
        state.categories
      );
      selString = categoriesToString(state.categories, selectedCategories);
      return {
        ...state,
        selectedCategories,
        selString
      };
    default:
      return state;
  }
};
const getEditedCategoryList = (responseData) => {
  return responseData.map(({ name, slug, id }) => {
    return {
      name,
      slug,
      id
    };
  });
};
const dayInMilliseconds = 1000 * 60 * 60 * 24;

const fetchCategories = (dispatch) => async () => {
  dispatch({
    type: FETCH_START
  });
  try {
    const savedCategories = JSON.parse(
      await AsyncStorage.getItem(ASYNC_STORAGE_KEY_CATEGORIES)
    );
    const expiryTime = new Date().getTime() - dayInMilliseconds;
    if (savedCategories && savedCategories.fetchTime > expiryTime) {
      dispatch({
        type: FETCH_CATEGORIES,
        payload: savedCategories.categories
      });
      return;
    }
  } catch (err) {
    console.log(`AsyncStorage failure: ${err.message}`);
  }
  try {
    const response = await catch22deliveryApi.get('/categories', {
      params: {
        per_page: 50
      }
    });
    const editedCategories = getEditedCategoryList(response.data);
    dispatch({
      type: FETCH_CATEGORIES,
      payload: editedCategories
    });
    const fetchTime = new Date().getTime();
    await AsyncStorage.setItem(
      ASYNC_STORAGE_KEY_CATEGORIES,
      JSON.stringify({
        fetchTime,
        categories: editedCategories
      })
    );
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: FETCH_ERROR,
      payload: err.message
    });
  }
};

const toggleCategory = (dispatch) => (iCat) => {
  dispatch({
    type: TOGGLE_SELECTION,
    payload: iCat
  });
};

export const { Context, Provider } = createDataContext(
  categoryReducer,
  { fetchCategories, toggleCategory },
  INITIAL_STATE
);
