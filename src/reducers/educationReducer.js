import storage from 'redux-persist/lib/storage';
import { removeKey } from '../helper_functions/utilities';
import { persistReducer } from 'redux-persist';
import {
  GET_ARTICLES_BEGIN,
  GET_ARTICLES_SUCCESS,
  GET_ARTICLES_FAILURE,
  GET_ARTICLES_ERROR,
  GET_CLASSMATES_BEGIN,
  GET_CLASSMATES_SUCCESS,
  GET_CLASSMATES_FAILURE,
  GET_CLASSMATES_ERROR,
  GET_LIKED_ARTICLES_BEGIN,
  GET_LIKED_ARTICLES_SUCCESS,
  GET_LIKED_ARTICLES_FAILURE,
  GET_LIKED_ARTICLES_ERROR,
  ADD_LIKED_ARTICLE_BEGIN,
  ADD_LIKED_ARTICLE_SUCCESS,
  ADD_LIKED_ARTICLE_FAILURE,
  ADD_LIKED_ARTICLE_ERROR,
  REMOVE_LIKED_ARTICLE_BEGIN,
  REMOVE_LIKED_ARTICLE_SUCCESS,
  REMOVE_LIKED_ARTICLE_FAILURE,
  REMOVE_LIKED_ARTICLE_ERROR,
  GET_VIDEOS_BEGIN,
  GET_VIDEOS_SUCCESS,
  GET_VIDEOS_FAILURE,
  GET_VIDEOS_ERROR,
  GET_LIKED_VIDEOS_BEGIN,
  GET_LIKED_VIDEOS_SUCCESS,
  GET_LIKED_VIDEOS_FAILURE,
  GET_LIKED_VIDEOS_ERROR,
  ADD_LIKED_VIDEO_BEGIN,
  ADD_LIKED_VIDEO_SUCCESS,
  ADD_LIKED_VIDEO_FAILURE,
  ADD_LIKED_VIDEO_ERROR,
  REMOVE_LIKED_VIDEO_BEGIN,
  REMOVE_LIKED_VIDEO_SUCCESS,
  REMOVE_LIKED_VIDEO_FAILURE,
  REMOVE_LIKED_VIDEO_ERROR,
  RESET_EDUCATION_ERRORS,
  // RESET_EDUCATION_STATE,
  LOGOUT_USER_EDUCATION,
} from '../ActionTypes/educationActions';

const initialState = {
  loading: false,
  error: null,
  graphqlError: null,
  errorTitle: null,
  articles: {},
  lastArticleID: 0,
  lastArticleTime: new Date(),
  videos: {},
  lastVideoID: 0,
  lastVideoTime: new Date(),
  // courses: {},
  // lastCourseID: 0,
  // lastCourseTime: new Date(),
  articleKeywords: {},
  videoKeywords: {},
  likedArticles: {},
  likedVideos: {},
  classmates: {},
  classmatesDateTime: new Date()
};

const educationReducer = (state = initialState, action) => {
  switch(action.type) {

    // HANDLES FETCHING CLASSMATES OF STUDENT USERS ------
    case GET_CLASSMATES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
        graphqlError: null,
        errorTitle: null
      }
    case GET_CLASSMATES_SUCCESS:
      return {
        ...state,
        loading: false,
        classmates: action.payload.classmates,
        classmatesDateTime: action.payload.dateTime,
        error: null,
        graphqlError: null,
        errorTitle: null
      }
    case GET_CLASSMATES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        // graphqlError: 'There was a failure connecting to our servers to fetch your classmates. Please contact support.'
        errorTitle: 'Error Searching For Classmates',
      };
    case GET_CLASSMATES_ERROR:
      return {
        ...state,
        loading: false,
        graphqlError: action.payload.error,
        // graphqlError: 'There was a failure connecting to our servers to fetch your classmates. Please contact support.'
        errorTitle: 'Failure Searching For Classmates',
      };
      
    // -----------------------------------------------------    

    // GET ARTICLES
    case GET_ARTICLES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
        graphqlError: null,
        errorTitle: null,
      };
    case GET_ARTICLES_SUCCESS:
      let originalArticlesObject = JSON.parse(JSON.stringify(state.articles));
      let newID = state.lastArticleID;
      let originalArticleKeywordsObject = JSON.parse(JSON.stringify(state.articleKeywords));
      if (action.payload.lastArticleID > state.lastArticleID) {
        newID = action.payload.lastArticleID;
        // eslint-disable-next-line
        for (var key in action.payload.articlesObject) {
          originalArticlesObject[key] = action.payload.articlesObject[key];
        }
      }
      return {
        ...state,
        loading: false,
        articles: originalArticlesObject,
        lastArticleID: newID,
        lastArticleTime: new Date(),
        articleKeywords: originalArticleKeywordsObject,
      };
    case GET_ARTICLES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        errorTitle: 'Get Articles Failure'
      };
    case GET_ARTICLES_ERROR:
      return {
        ...state,
        loading: false,
        graphqlError: action.payload.error,
        errorTitle: 'Get Articles Failure'
      };
    
    // GET LIKED ARTICLES
    case GET_LIKED_ARTICLES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
        graphqlError: null,
        errorTitle: null,
      };
    case GET_LIKED_ARTICLES_SUCCESS:
      return {
        ...state,
        loading: false,
        likedArticles: action.payload.likedArticlesObject,
      };
    case GET_LIKED_ARTICLES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        errorTitle: 'Get Liked Articles Failure'
      };
    case GET_LIKED_ARTICLES_ERROR:
      return {
        ...state,
        loading: false,
        graphqlError: action.payload.error,
        errorTitle: 'Get Liked Articles Failure'
      };

    // ADD LIKED ARTICLE
    case ADD_LIKED_ARTICLE_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
        graphqlError: null,
        errorTitle: null,
      };
    case ADD_LIKED_ARTICLE_SUCCESS:
      let originalLikedArticles = JSON.parse(JSON.stringify(state.likedArticles));
      originalLikedArticles[action.payload.likedArticleID] = action.payload.articleID;
      return {
        ...state,
        loading: false,
        likedArticles: originalLikedArticles,
      };
    case ADD_LIKED_ARTICLE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        errorTitle: 'Add Liked Article Failure'
      };
    case ADD_LIKED_ARTICLE_ERROR:
      return {
        ...state,
        loading: false,
        graphqlError: action.payload.error,
        errorTitle: 'Add Liked Article Failure'
      };

    // REMOVE LIKED ARTICLE
    case REMOVE_LIKED_ARTICLE_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
        graphqlError: null,
        errorTitle: null,
      };
    case REMOVE_LIKED_ARTICLE_SUCCESS:
      let originalLikedArticlesObject = JSON.parse(JSON.stringify(state.likedArticles));
      let newLikedArticlesObject = removeKey(originalLikedArticlesObject, action.payload.id);
      return {
        ...state,
        loading: false,
        likedArticles: newLikedArticlesObject,
      };
    case REMOVE_LIKED_ARTICLE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        errorTitle: 'Remove Liked Article Failure'
      };
    case REMOVE_LIKED_ARTICLE_ERROR:
      return {
        ...state,
        loading: false,
        graphqlError: action.payload.error,
        errorTitle: 'Remove Liked Article Failure'
      };

    // GET VIDEOS
    case GET_VIDEOS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
        graphqlError: null,
        errorTitle: null,
      };
    case GET_VIDEOS_SUCCESS:
      let originalVideosObject = JSON.parse(JSON.stringify(state.videos));
      let newVideoID = state.lastVideoID;
      let originalVideoKeywordsObject = JSON.parse(JSON.stringify(state.videoKeywords));
      if (action.payload.lastVideoID >state.lastVideoID) {
        newVideoID = action.payload.lastVideoID;
        // eslint-disable-next-line
        for (var key in action.payload.videosObject) {
          originalVideosObject[key] = action.payload.videosObject[key];
        }
      } 
      return {
        ...state,
        loading: false,
        videos: originalVideosObject,
        lastVideoID: newVideoID,
        lastVideoTime: new Date(),
        videoKeywords: originalVideoKeywordsObject,
      };
    case GET_VIDEOS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        errorTitle: 'Get Videos Failure'
      };
    case GET_VIDEOS_ERROR:
      return {
        ...state,
        loading: false,
        graphqlError: action.payload.error,
        errorTitle: 'Get Videos Failure'
      };

    // GET LIKED VIDEOS
    case GET_LIKED_VIDEOS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
        graphqlError: null,
        errorTitle: null,
      };
    case GET_LIKED_VIDEOS_SUCCESS:
      return {
        ...state,
        loading: false,
        likedVideos: action.payload.likedVideosObject,
      };
    case GET_LIKED_VIDEOS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        errorTitle: 'Get Liked Videos Failure'
      };
    case GET_LIKED_VIDEOS_ERROR:
      return {
        ...state,
        loading: false,
        graphqlError: action.payload.error,
        errorTitle: 'Get Liked Videos Failure'
      };

    // ADD LIKED VIDEO
    case ADD_LIKED_VIDEO_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
        graphqlError: null,
        errorTitle: null,
      };
    case ADD_LIKED_VIDEO_SUCCESS:
      let originalLikedVideos = JSON.parse(JSON.stringify(state.likedVideos));
      originalLikedVideos[action.payload.likedVideo] = action.payload.videoID;
      return {
        ...state,
        loading: false,
        likedVideos: originalLikedVideos,
      };
    case ADD_LIKED_VIDEO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        errorTitle: 'Add Liked Video Failure'
      };
    case ADD_LIKED_VIDEO_ERROR:
      return {
        ...state,
        loading: false,
        graphqlError: action.payload.error,
        errorTitle: 'Add Liked Video Failure'
      };

    // REMOVE LIKED VIDEO
    case REMOVE_LIKED_VIDEO_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
        graphqlError: null,
        errorTitle: null,
      };
    case REMOVE_LIKED_VIDEO_SUCCESS:
      let originalLikedVideosObject = JSON.parse(JSON.stringify(state.likedVideos));
      let newLikedVideosObject = removeKey(originalLikedVideosObject, action.payload.id);
      return {
        ...state,
        loading: false,
        likedVideos: newLikedVideosObject,
      };
    case REMOVE_LIKED_VIDEO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        errorTitle: 'Remove Liked Video Failure'
      };
    case REMOVE_LIKED_VIDEO_ERROR:
      return {
        ...state,
        loading: false,
        graphqlError: action.payload.error,
        errorTitle: 'Remove Liked Video Failure'
      };
    // This action resets any errors that were produced by a graphql query or mutation so that the user pop up message only displays once
    case RESET_EDUCATION_ERRORS:
      return{
        ...state,
        graphqlError: null,
        error: null,
        errorTitle: null,
      };

    // reset the competition state to it's initial state
    case LOGOUT_USER_EDUCATION:
      // reset the portfolio state to it's initial state and remove the persisted data from disk
      storage.removeItem('persist:root.education');
      return initialState;

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}

// the state keys below are blacklisted as we do not need to persist these to storage on the device.  All other state keys are persisted.
const persistConfig = {
  key: 'education',
  storage,
}

export default persistReducer(persistConfig, educationReducer);