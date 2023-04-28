// import the GraphQL mutation text for verification interactions
import { RESEND_VERIFICATION } from '../graphql/mutations/ResendVerification';
import { GET_VERIFIED_STATUS } from '../graphql/queries/GetVerifiedStatus';

import axios from 'axios';
import { GRAPHQL_URL } from "../constants";

export const RESEND_VERIFICATION_BEGIN = 'RESEND_VERIFICATION_BEGIN';
export const RESEND_VERIFICATION_SUCCESS = 'RESEND_VERIFICATION_SUCCESS';
export const RESEND_VERIFICATION_FAILURE = 'RESEND_VERIFICATION_FAILURE';
export const RESEND_VERIFICATION_ERROR = 'RESEND_VERIFICATION_ERROR';
export const FETCH_VERIFICATION_STATUS_BEGIN = 'FETCH_VERIFICATION_STATUS_BEGIN';
export const FETCH_VERIFICATION_STATUS_SUCCESS = 'FETCH_VERIFICATION_STATUS_SUCCESS';
export const FETCH_VERIFICATION_STATUS_FAILURE = 'FETCH_VERIFICATION_STATUS_FAILURE';
export const FETCH_VERIFICATION_STATUS_ERROR = 'FETCH_VERIFICATION_STATUS_ERROR';

//export const HTTP_ERROR = 'HTTP_ERROR';

export const resendVerificationBegin = () => ({
  type: RESEND_VERIFICATION_BEGIN,
});
export const resendVerificationSuccess = result => ({
  type: RESEND_VERIFICATION_SUCCESS,
  payload: { result },
});
export const resendVerificationFailure = error => ({
  type: RESEND_VERIFICATION_FAILURE,
  payload: { error },
});
export const resendVerificationError = error => ({
  type: RESEND_VERIFICATION_ERROR,
  payload: { error },
});
export const fetchVerificationStatusBegin = () => ({
  type: FETCH_VERIFICATION_STATUS_BEGIN,
});
export const fetchVerificationStatusSuccess = result => ({
  type: FETCH_VERIFICATION_STATUS_SUCCESS,
  payload: { result },
});
export const fetchVerificationStatusFailure = error => ({
  type: FETCH_VERIFICATION_STATUS_FAILURE,
  payload: { error },
});
export const fetchVerificationStatusError = error => ({
  type: FETCH_VERIFICATION_STATUS_ERROR,
  payload: { error },
});
//export const httpError = (errorText) => ({
//  type: HTTP_ERROR,
//  errorText
//});


// function to dispatch redux actions to get response from graphql mutation resendVerification
export function ResendVerification(token) {
  return function(dispatch){
    dispatch(resendVerificationBegin());
    return axios.post(GRAPHQL_URL, { query: RESEND_VERIFICATION }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
      .then((json) => {
        if ('errors' in json.data) {
          dispatch(resendVerificationError(json.data.errors[0].message));
          return {errors: json.data.errors};
        }
        else{
          dispatch(resendVerificationSuccess(json.data.data.resendVerification.result));
          return json.data.data.resendVerification.result;
        }
      })
      .catch(error => dispatch(resendVerificationFailure(error.message)));
  };
}

// function to dispatch redux actions to get response from graphql mutation getVerification status
export function FetchVerificationStatus(token) {
  return function(dispatch){
    dispatch(fetchVerificationStatusBegin());
    return axios.post(GRAPHQL_URL, { query: GET_VERIFIED_STATUS }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
      .then((json) => {
        if ('errors' in json.data) {
          dispatch(fetchVerificationStatusError(json.data.errors[0].message));
          return {errors: json.data.errors};
        }
        else{
          dispatch(fetchVerificationStatusSuccess(json.data.data.getVerifiedStatus));
          return json.data.data.getVerifiedStatus;
        }
      })
      .catch(error => dispatch(fetchVerificationStatusFailure(error.message)));
  };
}

// Handle HTTP errors since fetch won't.
//function handleErrors(response) {
//  if (!response.ok) {
//    dispatch(httpError("A Network Error has occurred. " + response.statusText));
//  }
//  return response;
//}
