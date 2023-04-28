import { GET_PAYOUT_HISTORY } from '../graphql/queries/GetPayoutHistory';
import { REQUEST_PAYOUT } from '../graphql/mutations/RequestPayout';
import { GET_PAYOUT_INFO } from '../graphql/queries/GetPayoutInfo';
import { ADD_PAYOUT_INFO } from '../graphql/mutations/AddPayoutInfo';

import { updateAddress } from './userDataActions';
import axios from 'axios';
import { GRAPHQL_URL } from "../constants";

export const GET_PAYOUT_HISTORY_BEGIN = 'GET_PAYOUT_HISTORY_BEGIN';
export const GET_PAYOUT_HISTORY_SUCCESS = 'GET_PAYOUT_HISTORY_SUCCESS';
export const GET_PAYOUT_HISTORY_FAILURE = 'GET_PAYOUT_HISTORY_FAILURE';
export const GET_PAYOUT_HISTORY_ERROR = 'GET_PAYOUT_HISTORY_ERROR';
export const GET_PAYOUT_INFO_BEGIN = 'GET_PAYOUT_INFO_BEGIN';
export const GET_PAYOUT_INFO_SUCCESS = 'GET_PAYOUT_INFO_SUCCESS';
export const GET_PAYOUT_INFO_FAILURE = 'GET_PAYOUT_INFO_FAILURE';
export const GET_PAYOUT_INFO_ERROR = 'GET_PAYOUT_INFO_ERROR';
export const ADD_PAYOUT_INFO_BEGIN = 'ADD_PAYOUT_INFO_BEGIN';
export const ADD_PAYOUT_INFO_SUCCESS = 'ADD_PAYOUT_INFO_SUCCESS';
export const ADD_PAYOUT_INFO_FAILURE = 'ADD_PAYOUT_INFO_FAILURE';
export const ADD_PAYOUT_INFO_ERROR = 'ADD_PAYOUT_INFO_ERROR';
export const SEND_USER_PAYOUT_BEGIN = 'SEND_USER_PAYOUT_BEGIN';
export const SEND_USER_PAYOUT_SUCCESS = 'SEND_USER_PAYOUT_SUCCESS';
export const SEND_USER_PAYOUT_FAILURE = 'SEND_USER_PAYOUT_FAILURE';
export const SEND_USER_PAYOUT_ERROR = 'SEND_USER_PAYOUT_ERROR';

export const RESET_PAYOUT_STATE = 'RESET_PAYOUT_STATE';
export const RESET_PAYOUT_ERRORS = 'RESET_PAYOUT_ERRORS'

// GET PAYOUT HISTORY
export const getPayoutHistoryBegin = () => ({
  type: GET_PAYOUT_HISTORY_BEGIN,
});
export const getPayoutHistorySuccess = () => ({
  type: GET_PAYOUT_HISTORY_SUCCESS,
});
export const getPayoutHistoryFailure = error => ({
  type: GET_PAYOUT_HISTORY_FAILURE,
  payload: { error },
});
export const getPayoutHistoryError = error => ({
  type: GET_PAYOUT_HISTORY_ERROR,
  payload: { error },
});

// GET PAYOUT INFO
export const getPayoutInfoBegin = () => ({
  type: GET_PAYOUT_INFO_BEGIN,
});
export const getPayoutInfoSuccess = (getPayoutInfo) => ({
  type: GET_PAYOUT_INFO_SUCCESS,
  payload: { getPayoutInfo },
});
export const getPayoutInfoFailure = error => ({
  type: GET_PAYOUT_INFO_FAILURE,
  payload: { error },
});
export const getPayoutInfoError = error => ({
  type: GET_PAYOUT_INFO_ERROR,
  payload: { error },
});

// ADD PAYOUT INFO
export const addPayoutInfoBegin = () => ({
  type: ADD_PAYOUT_INFO_BEGIN,
});
export const addPayoutInfoSuccess = (accountName, routingNumber, isChecking, isSaving) => ({
  type: ADD_PAYOUT_INFO_SUCCESS,
  payload: { accountName, routingNumber, isChecking, isSaving }
});
export const addPayoutInfoFailure = error => ({
  type: ADD_PAYOUT_INFO_FAILURE,
  payload: { error },
});
export const addPayoutInfoError = error => ({
  type: ADD_PAYOUT_INFO_ERROR,
  payload: { error },
});

// SEND USER PAYOUT
export const sendUserPayoutBegin = () => ({
  type: SEND_USER_PAYOUT_BEGIN,
});
export const sendUserPayoutSuccess = (updatedAccountBalance) => ({
  type: SEND_USER_PAYOUT_SUCCESS,
  payload: { updatedAccountBalance },
});
export const sendUserPayoutFailure = error => ({
  type: SEND_USER_PAYOUT_FAILURE,
  payload: { error },
});
export const sendUserPayoutError = error => ({
  type: SEND_USER_PAYOUT_ERROR,
  payload: { error },
});

// ERRORS
// action to reset the state to it's initial state
export const resetProductState = () => ({
  type: RESET_PAYOUT_STATE,
});
// action to reset any errors so that the error message pop up will no longer be visible
export const resetProductErrors = () => ({
  type: RESET_PAYOUT_ERRORS,
});

export function GetPayoutHistory(token) {
  return function(dispatch){
    dispatch(getPayoutHistoryBegin());
    return axios.post(GRAPHQL_URL, { query: GET_PAYOUT_HISTORY }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
    })
      .then((json) => {
        if ('errors' in json.data) {
          dispatch(getPayoutHistoryError(json.data.errors[0].message));
          return {errors: json.data.errors};
        }
        else{
          dispatch(getPayoutHistorySuccess());
          return json.data.data.getPayouts;
        }
      })
      .catch(error => dispatch(getPayoutHistoryFailure(error.message)));
  };
}

export function SendUserPayout(token, amount) {
  return function(dispatch){
    dispatch(sendUserPayoutBegin());
    return axios.post(GRAPHQL_URL, { query: REQUEST_PAYOUT(amount) }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
    })
      .then((json) => {
        if ('errors' in json.data) {
          dispatch(sendUserPayoutError(json.data.errors[0].message));
          return {errors: json.data.errors};
        }
        else{
          dispatch(sendUserPayoutSuccess(json.data.data.requestPayout.accountBalance));
          return json.data.data;
        }
      })
      .catch(error => dispatch(sendUserPayoutFailure(error.message)));
  };
}

export function GetPayoutInfo(token) {
  return function(dispatch){
    dispatch(getPayoutInfoBegin());
    return axios.post(GRAPHQL_URL, { query: GET_PAYOUT_INFO }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
    })
      .then((json) => {
        if ('errors' in json.data) {
          dispatch(getPayoutInfoError(json.data.errors[0].message));
          return {errors: json.data.errors};
        }
        else{
          dispatch(getPayoutInfoSuccess(json.data.data.getPayoutInfo));
          return json.data.data.getPayoutInfo;
        }
      })
      .catch(error => dispatch(getPayoutInfoFailure(error.message)));
  };
}

export function AddPayoutInfo(token, accountName, routingNumber, accountNumber, isChecking, isSaving, ssn, address1, address2, city, state, zip) {
  return function(dispatch){
    dispatch(addPayoutInfoBegin());
    return axios.post(GRAPHQL_URL, { query: ADD_PAYOUT_INFO(accountName, routingNumber, accountNumber, isChecking, isSaving, ssn, address1, address2, city, state, zip) }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
    })
      .then((json) => {
        if ('errors' in json.data) {
          dispatch(addPayoutInfoError(json.data.errors[0].message));
          return {errors: json.data.errors};
        }
        else{
          dispatch(addPayoutInfoSuccess(accountName, routingNumber, isChecking, isSaving));
          dispatch(updateAddress(address1, address2, city, state, zip));
          return json.data.data;
        }
      })
      .catch(error => dispatch(addPayoutInfoFailure(error.message)));
  };
}
