import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import catch22deliveryApi from '../api/catch22delivery';
import { ASYNC_STORAGE_KEY_POSTS } from '../constants';
const INITIAL_STATE = {
  errorMessage: '',
  refreshing: false,
  posts: []
};
const FETCH_START = 'fetch_start';
const FETCH_POSTS = 'fetch_posts';
const FETCH_ERROR = 'fetch_error';

const postsReducer = (state, action) => {
  switch (action.type) {
    case FETCH_START:
      return {
        ...INITIAL_STATE,
        refreshing: true
      };
    case FETCH_POSTS:
      return {
        ...state,
        errorMessage: '',
        refreshing: false,
        posts: action.payload
      };
    case FETCH_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
        refreshing: false
      };
    default:
      return state;
  }
};
// const findContent(content, before, after) {
//   const iStart = content.indexOf(before) + content.length;
//   const iEnd =
//   return;
// }
const getEditedPostsList = (posts) => {
  // console.log('getEditedPostsList: ', posts);
  let editedPosts = [];
  try {
    editedPosts = posts.map(({ id, slug, title, categories, _links }) => {
      const mediaLinkUrl =
        _links && _links['wp:featuredmedia'] && _links['wp:featuredmedia'][0]
          ? _links['wp:featuredmedia'][0].href
          : null;
      return {
        id,
        slug,
        title: title.rendered,
        // content: content.rendered,
        categories,
        mediaLinkUrl
        // orderUrl:
        // message
      };
    });
  } catch (err) {
    console.log(err.message);
  }
  console.log(editedPosts);
  return editedPosts;
};

const dayInMilliseconds = 1000 * 60 * 60 * 24;

const fetchPosts = (dispatch) => async (catString) => {
  const now = new Date().getTime();
  dispatch({
    type: FETCH_START
  });
  // try {
  //   const savedCategories = JSON.parse(
  //     await AsyncStorage.getItem(ASYNC_STORAGE_KEY_POSTS)
  //   );
  //   const expiryTime = now - dayInMilliseconds;
  //   if (savedCategories && savedCategories.fetchTime > expiryTime) {
  //     dispatch({
  //       type: FETCH_POSTS,
  //       payload: savedCategories.categories
  //     });
  //     return;
  //   }
  // } catch (err) {
  //   console.log(`AsyncStorage failure: ${err.message}`);
  // }
  try {
    const params = {
      per_page: 20
    };
    if (catString) {
      params.categories = catString;
    }

    const response = await catch22deliveryApi.get('/posts', {
      params
    });
    const editedCategories = getEditedPostsList(response.data);
    console.log(editedCategories);
    dispatch({
      type: FETCH_POSTS,
      payload: editedCategories
    });
    // await AsyncStorage.setItem(
    //   ASYNC_STORAGE_KEY_POSTS,
    //   JSON.stringify({
    //     fetchTime: now,
    //     categories: editedCategories
    //   })
    // );
  } catch (err) {
    dispatch({
      type: FETCH_ERROR,
      payload: err.message
    });
  }
};

export const { Context, Provider } = createDataContext(
  postsReducer,
  { fetchPosts },
  INITIAL_STATE
);
