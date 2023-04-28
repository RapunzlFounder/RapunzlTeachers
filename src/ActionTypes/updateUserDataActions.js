// import the GraphQL mutation text needed to change user data
import { UPDATE_USER } from '../graphql/mutations/UpdateUser';
import axios from 'axios';
import { GRAPHQL_URL } from "../constants";
import { updateUserLevelInfo, updateCoinBalanceInfo } from './userAccountActions';

export const UPDATE_USER_BEGIN = 'UPDATE_USER_BEGIN';
export const UPDATE_USER_DATA_STATE = 'UPDATE_USER_DATA_STATE';
export const UPDATE_USER_ERROR = 'UPDATE_USER_ERROR';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';
//export const HTTP_ERROR = 'HTTP_ERROR';

export const updateUserBegin = () => ({
  type: UPDATE_USER_BEGIN,
});

export const updateUserSuccess = (name, status) => ({
  type: UPDATE_USER_DATA_STATE,
  name,
  status,
});

export const updateUserError = error => ({
  type: UPDATE_USER_ERROR,
  payload: { error },
});

export const updateUserFailure = error => ({
  type: UPDATE_USER_FAILURE,
  payload: { error },
});
//export const httpError = (errorText) => ({
//  type: HTTP_ERROR,
//  errorText
//});
/**
 * Summary. This Action Creator is used to update .
 *
 * Description. The names of all of the UserUpdateInput fields are as follows:
 *      firstName, lastName, email, bio, picture, allowNotfications, overEighteen, backtestEquity, defaultEquityShares,
 *  defaultFuturesContracts, defaultForexSize, school, schoolId, allowShorts, allowOptions, facebookToken, birthDate, phoneNumber.
 *
 *  The names of all of the BaseUserInfo return type fields are as follows:
 *      id, username, email, emailVerified, firstName, lastName, bio, picture, allowNotfications, overEighteen, backtestEquity, defaultEquityShares,
 *   defaultFuturesContracts, defaultForexSize, isStudent, school, allowShorts, allowOptions, facebookToken, birthDate, phoneNumber.
 *
 * @param {array}  updateName   The namne of the UserUpdateInput field that is to be updated, eg firstName, lastName etc..
 * @param {array}  updateValue   The value of the UserUpdateInput field that is to be updated, eg 'John' for firstName etc..
 * @param {array}  returnName   The name of the BaseUserInfo return field that is to be returned from the mutation, eg ' etc..
 */
// function to dispatch redux actions to update user data and get a response
export function updateUser(token, updateName, updateValue, returnName) {
    return function(dispatch){
      dispatch(updateUserBegin());
      return axios.post(GRAPHQL_URL, { query: UPDATE_USER(updateName, updateValue, returnName) }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
        .then(json => {
          if ("errors" in json.data) {
            dispatch(updateUserError(json.data.errors[0].message));
            return {errors: json.data.errors};
          }
          else {
            // eslint-disable-next-line
            if (updateName[0] != 'phoneNumber' && updateName[0] != 'uniqueID') {
              // iterate over the returned object keys and values and update the user data state for each
              for (var key in json.data.data.updateUser.baseUserInfo) {
                // update the userDetails state
                dispatch(updateUserSuccess(key, json.data.data.updateUser.baseUserInfo[key]));
              }
            }
            // eslint-disable-next-line
            else if (updateName[0] == 'phoneNumber') {
              dispatch(updateUserSuccess('phoneNumber', updateValue[0]));
            } else {
              dispatch(updateUserSuccess('uniqueID', updateValue[0]));
            }
            const xpEvents = json.data.data.updateUser.baseUserInfo.xpEvents;
            const coinEvents = json.data.data.updateUser.baseUserInfo.coinEvents;
            const userLevel = json.data.data.updateUser.baseUserInfo.userLevel;
            if (!!xpEvents && xpEvents.length > 0){
              dispatch(updateUserLevelInfo(userLevel));
            }
            if (!!coinEvents && coinEvents.length > 0){
              for (var i in coinEvents){
                dispatch(updateCoinBalanceInfo(coinEvents[i].coinBalance));
              }
            }
            return xpEvents;
          }
        })
        .catch(error => dispatch(updateUserFailure(error.message)));
    };
  }

  // Handle HTTP errors since fetch won't.
//function handleErrors(response) {
//  if (!response.ok) {
//    dispatch(httpError("A Network Error has occurred. " + response.statusText));
//  }
//  return response;
//}

