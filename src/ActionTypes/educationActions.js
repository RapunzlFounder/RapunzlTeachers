import { arrayToObjectID, arrayToObjectLikedID } from '../helper_functions/utilities';

import { GET_ARTICLES } from '../graphql/queries/GetArticles';
import { GET_LIKED_ARTICLES } from '../graphql/queries/GetLikedArticles';
import { ADD_LIKED_ARTICLE } from '../graphql/mutations/AddLikedArticle';
import { REMOVE_LIKED_ARTICLE } from '../graphql/mutations/RemoveLikedArticle';
import { GET_VIDEOS } from '../graphql/queries/GetVideos';
import { GET_LIKED_VIDEOS } from '../graphql/queries/GetLikedVideos';
import { ADD_LIKED_VIDEO } from '../graphql/mutations/AddLikedVideo';
import { REMOVE_LIKED_VIDEO } from '../graphql/mutations/RemoveLikedVideo';
import { GET_CLASSMATES } from '../graphql/queries/GetClassmates';

import axios from 'axios';
import { GRAPHQL_URL } from "../constants";

export const GET_ARTICLES_BEGIN = 'GET_ARTICLES_BEGIN';
export const GET_ARTICLES_SUCCESS = 'GET_ARTICLES_SUCCESS';
export const GET_ARTICLES_FAILURE = 'GET_ARTICLES_FAILURE';
export const GET_ARTICLES_ERROR = 'GET_ARTICLES_ERROR';
export const GET_CLASSMATES_BEGIN = 'GET_CLASSMATES_BEGIN';
export const GET_CLASSMATES_SUCCESS = 'GET_CLASSMATES_SUCCESS';
export const GET_CLASSMATES_FAILURE = 'GET_CLASSMATES_FAILURE';
export const GET_CLASSMATES_ERROR = 'GET_CLASSMATES_ERROR';
export const GET_LIKED_ARTICLES_BEGIN = 'GET_LIKED_ARTICLES_BEGIN';
export const GET_LIKED_ARTICLES_SUCCESS = 'GET_LIKED_ARTICLES_SUCCESS';
export const GET_LIKED_ARTICLES_FAILURE = 'GET_LIKED_ARTICLES_FAILURE';
export const GET_LIKED_ARTICLES_ERROR = 'GET_LIKED_ARTICLES_ERROR';
export const ADD_LIKED_ARTICLE_BEGIN = 'ADD_LIKED_ARTICLE_BEGIN';
export const ADD_LIKED_ARTICLE_SUCCESS = 'ADD_LIKED_ARTICLE_SUCCESS';
export const ADD_LIKED_ARTICLE_FAILURE = 'ADD_LIKED_ARTICLE_FAILURE';
export const ADD_LIKED_ARTICLE_ERROR = 'ADD_LIKED_ARTICLE_ERROR';
export const REMOVE_LIKED_ARTICLE_BEGIN = 'REMOVE_LIKED_ARTICLE_BEGIN';
export const REMOVE_LIKED_ARTICLE_SUCCESS = 'REMOVE_LIKED_ARTICLE_SUCCESS';
export const REMOVE_LIKED_ARTICLE_FAILURE = 'REMOVE_LIKED_ARTICLE_FAILURE';
export const REMOVE_LIKED_ARTICLE_ERROR = 'REMOVE_LIKED_ARTICLE_ERROR';

export const GET_VIDEOS_BEGIN = 'GET_VIDEOS_BEGIN';
export const GET_VIDEOS_SUCCESS = 'GET_VIDEOS_SUCCESS';
export const GET_VIDEOS_FAILURE = 'GET_VIDEOS_FAILURE';
export const GET_VIDEOS_ERROR = 'GET_VIDEOS_ERROR';
export const GET_LIKED_VIDEOS_BEGIN = 'GET_LIKED_VIDEOS_BEGIN';
export const GET_LIKED_VIDEOS_SUCCESS = 'GET_LIKED_VIDEOS_SUCCESS';
export const GET_LIKED_VIDEOS_FAILURE = 'GET_LIKED_VIDEOS_FAILURE';
export const GET_LIKED_VIDEOS_ERROR = 'GET_LIKED_VIDEOS_ERROR';
export const ADD_LIKED_VIDEO_BEGIN = 'ADD_LIKED_VIDEO_BEGIN';
export const ADD_LIKED_VIDEO_SUCCESS = 'ADD_LIKED_VIDEO_SUCCESS';
export const ADD_LIKED_VIDEO_FAILURE = 'ADD_LIKED_VIDEO_FAILURE';
export const ADD_LIKED_VIDEO_ERROR = 'ADD_LIKED_VIDEO_ERROR';
export const REMOVE_LIKED_VIDEO_BEGIN = 'REMOVE_LIKED_VIDEO_BEGIN';
export const REMOVE_LIKED_VIDEO_SUCCESS = 'REMOVE_LIKED_VIDEO_SUCCESS';
export const REMOVE_LIKED_VIDEO_FAILURE = 'REMOVE_LIKED_VIDEO_FAILURE';
export const REMOVE_LIKED_VIDEO_ERROR = 'REMOVE_LIKED_VIDEO_ERROR';

export const RESET_EDUCATION_STATE = 'RESET_EDUCATION_STATE';
export const RESET_EDUCATION_ERRORS = 'RESET_EDUCATION_ERRORS'
export const LOGOUT_USER_EDUCATION = 'LOGOUT_USER_EDUCATION';

// GET ARTICLES
export const getArticlesBegin = () => ({
  type: GET_ARTICLES_BEGIN,
});
export const getArticlesSuccess = (articlesObject, lastArticleID) => ({
  type: GET_ARTICLES_SUCCESS,
  payload: { articlesObject, lastArticleID },
});
export const getArticlesFailure = error => ({
  type: GET_ARTICLES_FAILURE,
  payload: { error },
});
export const getArticlesError = error => ({
  type: GET_ARTICLES_ERROR,
  payload: { error },
});
// GET CLASSMATES
export const getClassmatesBegin = () => ({
  type: GET_CLASSMATES_BEGIN,
});
export const getClassmatesSuccess = (classmates, classmatesDateTime) => ({
  type: GET_CLASSMATES_SUCCESS,
  payload: { classmates, classmatesDateTime },
});
export const getClassmatesFailure = error => ({
  type: GET_CLASSMATES_FAILURE,
  payload: { error },
});
export const getClassmatesError = error => ({
  type: GET_CLASSMATES_ERROR,
  payload: { error },
});
// GET LIKED ARTICLES
export const getLikedArticlesBegin = () => ({
  type: GET_LIKED_ARTICLES_BEGIN,
});
export const getLikedArticlesSuccess = (likedArticlesObject) => ({
  type: GET_LIKED_ARTICLES_SUCCESS,
  payload: { likedArticlesObject },
});
export const getLikedArticlesFailure = error => ({
  type: GET_LIKED_ARTICLES_FAILURE,
  payload: { error },
});
export const getLikedArticlesError = error => ({
  type: GET_LIKED_ARTICLES_ERROR,
  payload: { error },
});
// ADD LIKED ARTICLE
export const addLikedArticleBegin = () => ({
  type: ADD_LIKED_ARTICLE_BEGIN,
});
export const addLikedArticleSuccess = (likedArticleID, articleID) => ({
  type: ADD_LIKED_ARTICLE_SUCCESS,
  payload: { likedArticleID, articleID },
});
export const addLikedArticleFailure = error => ({
  type: ADD_LIKED_ARTICLE_FAILURE,
  payload: { error },
});
export const addLikedArticleError = error => ({
  type: ADD_LIKED_ARTICLE_ERROR,
  payload: { error },
});
// REMOVE LIKED ARTICLE
export const removeLikedArticleBegin = () => ({
  type: REMOVE_LIKED_ARTICLE_BEGIN,
});
export const removeLikedArticleSuccess = (id) => ({
  type: REMOVE_LIKED_ARTICLE_SUCCESS,
  payload: { id },
});
export const removeLikedArticleFailure = error => ({
  type: REMOVE_LIKED_ARTICLE_FAILURE,
  payload: { error },
});
export const removeLikedArticleError = error => ({
  type: REMOVE_LIKED_ARTICLE_ERROR,
  payload: { error },
});
// GET VIDEOS
export const getVideosBegin = () => ({
  type: GET_VIDEOS_BEGIN,
});
export const getVideosSuccess = (videosObject, lastVideoID) => ({
  type: GET_VIDEOS_SUCCESS,
  payload: { videosObject, lastVideoID },
});
export const getVideosFailure = error => ({
  type: GET_VIDEOS_FAILURE,
  payload: { error },
});
export const getVideosError = error => ({
  type: GET_VIDEOS_ERROR,
  payload: { error },
});
// GET LIKED VIDEOS
export const getLikedVideosBegin = () => ({
  type: GET_LIKED_VIDEOS_BEGIN,
});
export const getLikedVideosSuccess = (likedVideosObject) => ({
  type: GET_LIKED_VIDEOS_SUCCESS,
  payload: { likedVideosObject },
});
export const getLikedVideosFailure = error => ({
  type: GET_LIKED_VIDEOS_FAILURE,
  payload: { error },
});
export const getLikedVideosError = error => ({
  type: GET_LIKED_VIDEOS_ERROR,
  payload: { error },
});
// ADD LIKED VIDEO
export const addLikedVideoBegin = () => ({
  type: ADD_LIKED_VIDEO_BEGIN,
});
export const addLikedVideoSuccess = (likedVideo, videoID) => ({
  type: ADD_LIKED_VIDEO_SUCCESS,
  payload: { likedVideo, videoID },
});
export const addLikedVideoFailure = error => ({
  type: ADD_LIKED_VIDEO_FAILURE,
  payload: { error },
});
export const addLikedVideoError = error => ({
  type: ADD_LIKED_VIDEO_ERROR,
  payload: { error },
});
// REMOVE LIKED VIDEO
export const removeLikedVideoBegin = () => ({
  type: REMOVE_LIKED_VIDEO_BEGIN,
});
export const removeLikedVideoSuccess = (id, success) => ({
  type: REMOVE_LIKED_VIDEO_SUCCESS,
  id,
  success
});
export const removeLikedVideoFailure = error => ({
  type: REMOVE_LIKED_VIDEO_FAILURE,
  payload: { error },
});
export const removeLikedVideoError = error => ({
  type: REMOVE_LIKED_VIDEO_ERROR,
  payload: { error },
});

// ERRORS
// action to reset the instrument state to it's initial state
export const resetInstrumentState = () => ({
  type: RESET_EDUCATION_STATE,
});
// action to reset any instrument errors so that the error message pop up will no longer be visible
export const resetEducationErrors = () => ({
  type: RESET_EDUCATION_ERRORS,
});

export const logoutUserEducation = () => ({
  type: LOGOUT_USER_EDUCATION,
});
// GET ARTICLES
// Function to dispatch redux actions to get a response from the graphql query getArticles
export function getArticles(token, lastID) {
  return function(dispatch){
    dispatch(getArticlesBegin());
    return axios.post(GRAPHQL_URL, { query: GET_ARTICLES(lastID) }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
    })
      .then((json) => {
        if ('errors' in json.data) {
          dispatch(getArticlesError(json.data.errors[0].message));
          return {errors: json.data.errors};
        }
        else {
          let lastArticleID = parseInt(lastID);
          let articlesObject = arrayToObjectID(json.data.data.getArticles);
          // eslint-disable-next-line          
          if (json.data.data.getArticles.length != 0) {
            lastArticleID = parseInt(json.data.data.getArticles[0].id);
          }
          dispatch(getArticlesSuccess(articlesObject, lastArticleID));
          return json.data.data.getArticles;
        }
      })
      .catch(error => dispatch(getArticlesFailure(error.message)));
  };
}

// GET CLASSMATES
// Function to dispatch redux actions to get a response from the graphql query getClassmates
export function getClassmates(token, schoolID, classmatesDateTime) {
  return function(dispatch){
    dispatch(getClassmatesBegin());
    return axios.post(GRAPHQL_URL, { query: GET_CLASSMATES(schoolID) }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
    })
      .then((json) => {
        if ('errors' in json.data) {
          dispatch(getClassmatesError(json.data.errors[0].message));
          return {errors: json.data.errors};
        }
        else {
          dispatch(getClassmatesSuccess(json.data.data.getClassmates, classmatesDateTime));
          return json.data.data.getClassmates;
        }
      })
      .catch(error => dispatch(getClassmatesFailure(error.message)));
  };
}

// GET LIKED ARTICLES
// Function to dispatch redux actions to get a response from the graphql query getLikedArticles
export function getLikedArticles(token) {
  return function(dispatch){
    dispatch(getLikedArticlesBegin());
    return axios.post(GRAPHQL_URL, { query: GET_LIKED_ARTICLES }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
    })
      .then((json) => {
        if ('errors' in json.data) {
          dispatch(getLikedArticlesError(json.data.errors[0].message));
          return {errors: json.data.errors};
        }
        else {
          const likedArticlesObject = arrayToObjectLikedID(json.data.data.getLikedArticles);
          dispatch(getLikedArticlesSuccess(likedArticlesObject));
          return json.data.data.getLikedArticles;
        }
      })
      .catch(error => dispatch(getLikedArticlesFailure(error.message)));
  };
}

// GET LIKED VIDEOS
// Function to dispatch redux actions to get a response from the graphql query getLikedVideos
export function getLikedVideos(token) {
  return function(dispatch){
    dispatch(getLikedVideosBegin());
    return axios.post(GRAPHQL_URL, { query: GET_LIKED_VIDEOS }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
    })
      .then((json) => {
        if ('errors' in json.data) {
          dispatch(getLikedVideosError(json.data.errors[0].message));
          return {errors: json.data.errors};
        }
        else {
          const likedVideosObject = arrayToObjectLikedID(json.data.data.getLikedVideos);
          dispatch(getLikedVideosSuccess(likedVideosObject));
          return json.data.data.getLikedVideos;
        }
      })
      .catch(error => dispatch(getVideosFailure(error.message)));
  };
}

// ADD LIKED ARTICLE
// function to dispatch redux actions to get response from graphql mutation addLikedArticle
export function SendAddLikedArticle(token, articleID) {
  return function(dispatch){
    dispatch(addLikedArticleBegin());
    return axios.post(GRAPHQL_URL, { query: ADD_LIKED_ARTICLE(articleID) }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
    })
      .then((json) => {
        if ('errors' in json.data) {
          dispatch(addLikedArticleError(json.data.errors[0].message));
          return {errors: json.data.errors};
        }
        else {
          dispatch(addLikedArticleSuccess(json.data.data.addLikedarticle.success, articleID));
          return json.data.data.addLikedarticle;
        }
      })
      .catch(error => dispatch(addLikedArticleFailure(error.message)));
  };
}

// REMOVE LIKED ARTICLE
// function to dispatch redux actions to get response from graphql mutation removeLikedArticle
export function SendRemoveLikedArticle(token, likedArticleID) {
  return function(dispatch){
    dispatch(removeLikedArticleBegin());
    return axios.post(GRAPHQL_URL, { query: REMOVE_LIKED_ARTICLE(likedArticleID) }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
    })
      .then((json) => {
        if ('errors' in json.data) {
          dispatch(removeLikedArticleError(json.data.errors[0].message));
          return {errors: json.data.errors};
        }
        else{
          dispatch(removeLikedArticleSuccess(likedArticleID));
          return json.data.data.removeLikedarticle;
        }
      })
      .catch(error => dispatch(removeLikedArticleFailure(error.message)));
  };
}

// GET VIDEOS
// Function to dispatch redux actions to get a response from the graphql query getVideos
export function getVideos(token, lastID) {
  return function(dispatch){
    dispatch(getVideosBegin());
    return axios.post(GRAPHQL_URL, { query: GET_VIDEOS(lastID) }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
    })
      .then((json) => {
        if ('errors' in json.data) {
          dispatch(getVideosError(json.data.errors[0].message));
          return {errors: json.data.errors};
        }
        else {
          let lastVideoID = parseInt(lastID);
          let videosObject = arrayToObjectID(json.data.data.getVideos);
          // eslint-disable-next-line
          if (json.data.data.getVideos.length != 0) {
            lastVideoID = parseInt(json.data.data.getVideos[0].id);
          }
          dispatch(getVideosSuccess(videosObject, lastVideoID));
          return json.data.data.videos;
        }
      })
      .catch(error => dispatch(getVideosFailure(error.message)));
  };
}

// ADD LIKED VIDEO
// function to dispatch redux actions to get response from graphql mutation addLikedVideo
export function SendAddLikedVideo(token, videoID) {
  return function(dispatch){
    dispatch(addLikedVideoBegin());
    return axios.post(GRAPHQL_URL, { query: ADD_LIKED_VIDEO(videoID) }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
    })
      .then((json) => {
        if ('errors' in json.data) {
          dispatch(addLikedVideoError(json.data.errors[0].message));
          return {errors: json.data.errors};
        }
        else{
          let likedVideo = json.data.data.addLikedvideo.id;
          dispatch(addLikedVideoSuccess(likedVideo, videoID));
          return json.data.data.addLikedvideo;
        }
      })
      .catch(error => dispatch(addLikedVideoFailure(error.message)));
  };
}

// REMOVE LIKED VIDEO
// function to dispatch redux actions to get response from graphql mutation removeLikedVideo
export function SendRemoveLikedVideo(token, likedVideoID) {
  return function(dispatch){
    dispatch(removeLikedVideoBegin());
    return axios.post(GRAPHQL_URL, { query: REMOVE_LIKED_VIDEO(likedVideoID) }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
    })
      .then((json) => {
        if ('errors' in json.data) {
          dispatch(removeLikedVideoError(json.data.errors[0].message));
          return {errors: json.data.errors};
        }
        else{
          if (json.data.data.removeLikedvideo.success) {
            dispatch(removeLikedVideoSuccess(likedVideoID, json.data.data.removeLikedvideo.success));
          }
          return json.data.data.removeLikedvideo;
        }
      })
      .catch(error => dispatch(removeLikedVideoFailure(error.message)));
  };
}
