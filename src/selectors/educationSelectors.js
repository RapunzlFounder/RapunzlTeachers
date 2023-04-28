import { createSelector } from 'reselect';
import { objectToArray } from '../helper_functions/utilities';

// selector function to transform the redux store object of open position objects for portfolio open positions to an array of open position objects
const articleArraySelector = (state) => objectToArray(state.education.articles);
const likedArticleArraySelector = (state) => objectToArray(state.education.likedArticles);
const videoArraySelector = (state) => objectToArray(state.education.videos);
const likedVideoArraySelector = (state) => objectToArray(state.education.likedVideos);
const articleKeywordArraySelector = (state) => objectToArray(state.education.articleKeywords);

export const getAllArticles = createSelector(
    [articleArraySelector],
    (articleArray) => {
      if (articleArray && articleArray.length > 0) {
        return articleArray;
      }
      return [];
    }
  )

export const getLikedArticleIDs = createSelector(
  [likedArticleArraySelector],
  (likedArticleArray) => {
    if (likedArticleArray && likedArticleArray.length > 0) {
      return likedArticleArray;
    }
    return [];
  }
)

export const getAllVideos = createSelector(
  [videoArraySelector],
  (videoArray) => {
    if (videoArray && videoArray.length > 0) {
      return videoArray;
    }
    return [];
  }
)

export const getLikedVideoIDs = createSelector(
  [likedVideoArraySelector],
  (likedVideoArray) => {
    if (likedVideoArray && likedVideoArray.length > 0) {
      return likedVideoArray;
    }
    return [];
  }
)

export const getArticleKeywords = createSelector(
    [articleKeywordArraySelector],
    (articleKeywordArray) => {
    // before returning the historical portfolio data array make sure that the data is not still loading and that there is actually a data array present.
    //  If not return an empty array.
      if (articleKeywordArray && articleKeywordArray.length > 0) {
        return articleKeywordArray;
      }
      return [];
    }
  )