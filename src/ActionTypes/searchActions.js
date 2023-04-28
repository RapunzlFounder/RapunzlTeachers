// import the GraphQL query text for search interactions
import { SEARCH_PORTAL_ASSETS } from '../graphql/queries/SearchTeacherPortalAssets';
import { SEARCH_USERS } from '../graphql/queries/SearchUsers';
import axios from 'axios';
import { GRAPHQL_URL } from "../constants";
export const SEARCH_PORTAL_ASSETS_FAILURE = 'SEARCH_PORTAL_ASSETS_FAILURE';
export const SEARCH_PORTAL_ASSETS_ERROR = 'SEARCH_PORTAL_ASSETS_ERROR';
export const SEARCH_USERS_FAILURE = 'SEARCH_USERS_FAILURE';
export const SEARCH_USERS_ERROR = 'SEARCH_USERS_ERROR';

export const searchPortalAssetsFailure = error => ({
  type: SEARCH_PORTAL_ASSETS_FAILURE,
  payload: { error },
});
export const searchPortalAssetsError = error => ({
  type: SEARCH_PORTAL_ASSETS_ERROR,
  payload: { error },
});
export const searchUsersFailure = error => ({
  type: SEARCH_USERS_FAILURE,
  payload: { error },
});
export const searchUsersError = error => ({
  type: SEARCH_USERS_ERROR,
  payload: { error },
});

// function to dispatch redux actions to get response from graphql query searchPortalAssets
// Input parameter 'searchKeyword' is set to True to search for portal assets based on a keyword search
// Input parameter 'searchStandard' is set to True to search for portal assets based on a Financial literacy standard search
// NOTE: both of these search types cannot be set to 'true' at the same time!!
export function SearchPortalAssets(token, searchKeyword, searchStandard, searchText) {
  return function(dispatch){
    return axios.post(GRAPHQL_URL, { query: SEARCH_PORTAL_ASSETS(searchKeyword, searchStandard, searchText) }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
      .then((json) => {
        if ('errors' in json.data) {
          dispatch(searchPortalAssetsError(json.data.errors[0].message));
          return {errors: json.data.errors};
        }
        else{
          return json.data.data.searchPortalAssets;
        }
      })
      .catch(error => dispatch(searchPortalAssetsFailure(error.message)));
  };
}

// function to dispatch redux actions to get response from graphql query searchUsers
export function SearchUsers(token, searchText) {
  return function(dispatch){
    return axios.post(GRAPHQL_URL, { query: SEARCH_USERS(searchText) }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
      .then((json) => {
        if ('errors' in json.data) {
          dispatch(searchUsersError(json.data.errors[0].message));
          return {errors: json.data.errors};
        }
        else{
          return json.data.data.searchUsers;
        }
      })
      .catch(error => dispatch(searchUsersFailure(error.message)));
  };
}
