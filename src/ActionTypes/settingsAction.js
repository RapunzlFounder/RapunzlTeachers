import { CHANGE_PASSWORD } from '../graphql/mutations/ChangePassword';
import { CONTACT_SUPPORT } from '../graphql/mutations/ContactSupport';
import axios from 'axios';
import { GRAPHQL_URL } from "../constants";
export const CHANGE_PASSWORD_BEGIN = 'CHANGE_PASSWORD_BEGIN';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_FAILURE = 'CHANGE_PASSWORD_FAILURE';
export const CHANGE_PASSWORD_ERROR = 'CHANGE_PASSWORD_ERROR';
export const CONTACT_SUPPORT_BEGIN = 'CONTACT_SUPPORT_BEGIN';
export const CONTACT_SUPPORT_SUCCESS = 'CONTACT_SUPPORT_SUCCESS';
export const CONTACT_SUPPORT_FAILURE = 'CONTACT_SUPPORT_FAILURE';
export const CONTACT_SUPPORT_ERROR = 'CONTACT_SUPPORT_ERROR';

export const changePasswordBegin = () => ({
  type: CHANGE_PASSWORD_BEGIN,
});
export const changePasswordSuccess = result => ({
  type: CHANGE_PASSWORD_SUCCESS,
  payload: { result },
});
export const changePasswordFailure = error => ({
  type: CHANGE_PASSWORD_FAILURE,
  payload: { error },
});
export const changePasswordError = error => ({
  type: CHANGE_PASSWORD_ERROR,
  payload: { error },
});

export const contactSupportBegin = () => ({
  type: CONTACT_SUPPORT_BEGIN,
});
export const contactSupportSuccess = () => ({
  type: CONTACT_SUPPORT_SUCCESS,
});
export const contactSupportFailure = (error) => ({
  type: CONTACT_SUPPORT_FAILURE,
  payload: { error },
});
export const contactSupportError = (error) => ({
  type: CONTACT_SUPPORT_ERROR,
  payload: { error },
});

// function to dispatch redux actions to get a response from the graphql mutation changePassword
export function SendChangePassword(token, oldPass, newPass, confirmPass) {
  return function(dispatch){
    dispatch(changePasswordBegin());
    return axios.post(GRAPHQL_URL, { query: CHANGE_PASSWORD(oldPass, newPass, confirmPass) }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((json) => {
        if ('errors' in json.data) {
          dispatch(changePasswordError(json.data.errors[0].message));
          return {errors: json.data.errors};
        }
        else{
          dispatch(changePasswordSuccess(json.data.data.result));
          return json.data.data.result;
        }
      })
      .catch(error => dispatch(changePasswordFailure(error.message)));
  };
}

// function to dispatch redux actions to send support message to server to email to support@rapunzl.org for users to communicate
// with app support in case of an issue
export function ContactSupport(token, text) {
  return function(dispatch) {
    dispatch(contactSupportBegin());
    return axios.post(GRAPHQL_URL, { query: CONTACT_SUPPORT(text) }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
      .then((json) => {
        if ('errors' in json.data) {
          dispatch(contactSupportError(json.data.errors[0].message));
          return {errors: json.data.errors};
        } else {
          dispatch(contactSupportSuccess());
          return { success: true };
        }
      })
      .catch(error => dispatch(contactSupportFailure(error.message)));
  };
}

// Handle HTTP errors since fetch won't.
//function handleErrors(response) {
//  if (!response.ok) {
//    dispatch(httpError("A Network Error has occurred. " + response.statusText));
//  }
//  return response;
//}
