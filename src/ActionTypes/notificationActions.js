// import the GraphQL query text for user details & interactions
import { GET_NOTIFICATIONS } from '../graphql/queries/GetNotifications';
import axios from 'axios';
import { GRAPHQL_URL } from "../constants";
// import the GraphQL mutation text for user details & interactions
import { SET_NOTIFICATIONS } from '../graphql/mutations/SetNotifications';
import { SET_READ_NOTIFICATIONS } from '../graphql/mutations/SetReadNotifications';
import { CLEAR_NOTIFICATIONS } from '../graphql/mutations/ClearNotifications';
import { arrayToObjectID } from '../helper_functions/utilities';

export const GET_NOTIFICATIONS_BEGIN = 'GET_NOTIFICATIONS_BEGIN';
export const GET_NOTIFICATIONS_SUCCESS = 'GET_NOTIFICATIONS_SUCCESS';
export const GET_NOTIFICATIONS_FAILURE = 'GET_NOTIFICATIONS_FAILURE';
export const GET_NOTIFICATIONS_ERROR = 'GET_NOTIFICATIONS_ERROR';
export const CLEAR_NOTIFICATIONS_BEGIN = 'CLEAR_NOTIFICATIONS_BEGIN';
export const CLEAR_NOTIFICATIONS_SUCCESS = 'CLEAR_NOTIFICATIONS_SUCCESS';
export const CLEAR_NOTIFICATIONS_FAILURE = 'CLEAR_NOTIFICATIONS_FAILURE';
export const CLEAR_NOTIFICATIONS_ERROR = 'CLEAR_NOTIFICATIONS_ERROR';
export const SET_NOTIFICATIONS_BEGIN = 'SET_NOTIFICATIONS_BEGIN';
export const SET_NOTIFICATIONS_SUCCESS = 'SET_NOTIFICATIONS_SUCCESS';
export const SET_NOTIFICATIONS_FAILURE = 'SET_NOTIFICATIONS_FAILURE';
export const SET_NOTIFICATIONS_ERROR = 'SET_NOTIFICATIONS_ERROR';
export const SET_READ_NOTIFICATIONS_BEGIN = 'SET_READ_NOTIFICATIONS_BEGIN';
export const SET_READ_NOTIFICATIONS_SUCCESS = 'SET_READ_NOTIFICATIONS_SUCCESS';
export const SET_READ_NOTIFICATIONS_FAILURE = 'SET_READ_NOTIFICATIONS_FAILURE';
export const SET_READ_NOTIFICATIONS_ERROR = 'SET_READ_NOTIFICATIONS_ERROR';
export const UPDATE_ALL_NOTIFICATIONS = 'UPDATE_ALL_NOTIFICATIONS';
export const UPDATE_NOTIFICATION_STATE = 'UPDATE_NOTIFICATION_STATE';
export const RESET_NOTIFICATION_STATE = 'RESET_NOTIFICATION_STATE';
export const RESET_NOTIFICATION_ERRORS = 'RESET_NOTIFICATION_ERRORS';
export const LOGOUT_USER_NOTIFICATIONS = 'LOGOUT_USER_NOTIFICATIONS';
//export const HTTP_ERROR = 'HTTP_ERROR';

export const getNotificationsBegin = () => ({
  type: GET_NOTIFICATIONS_BEGIN,
});
export const getNotificationsSuccess = notifications => ({
  type: GET_NOTIFICATIONS_SUCCESS,
  payload: { notifications },
});
export const getNotificationsFailure = error => ({
  type: GET_NOTIFICATIONS_FAILURE,
  payload: { error },
});
export const getNotificationsError = error => ({
  type: GET_NOTIFICATIONS_ERROR,
  payload: { error },
});

export const clearNotificationsBegin = () => ({
  type: CLEAR_NOTIFICATIONS_BEGIN,
});
export const clearNotificationsSuccess = () => ({
  type: CLEAR_NOTIFICATIONS_SUCCESS,
});
export const clearNotificationsFailure = error => ({
  type: CLEAR_NOTIFICATIONS_FAILURE,
  payload: { error },
});
export const clearNotificationsError = error => ({
  type: CLEAR_NOTIFICATIONS_ERROR,
  payload: { error },
});

export const setNotificationsBegin = () => ({
  type: SET_NOTIFICATIONS_BEGIN,
});
export const setNotificationsSuccess = (notifications, token, removeAll) => ({
  type: SET_NOTIFICATIONS_SUCCESS,
  notifications,
  token,
  removeAll
});
export const setNotificationsFailure = error => ({
  type: SET_NOTIFICATIONS_FAILURE,
  payload: { error },
});
export const setNotificationsError = error => ({
  type: SET_NOTIFICATIONS_ERROR,
  payload: { error },
});

export const setReadNotificationsBegin = () => ({
  type: SET_READ_NOTIFICATIONS_BEGIN,
});
export const setReadNotificationsSuccess = (idArray) => ({
  type: SET_READ_NOTIFICATIONS_SUCCESS,
  idArray,
});
export const setReadNotificationsFailure = error => ({
  type: SET_READ_NOTIFICATIONS_FAILURE,
  payload: { error },
});
export const setReadNotificationsError = error => ({
  type: SET_READ_NOTIFICATIONS_ERROR,
  payload: { error },
});
export const updateAllNotifications = (allowNotifications, unreadNotifications) => ({
  type: UPDATE_ALL_NOTIFICATIONS,
  payload: { allowNotifications, unreadNotifications } 
});
// this updates an individual property of the notifications state. eg to change the state property 
export const updateNotificationState = (name, status) => ({
  type: UPDATE_NOTIFICATION_STATE,
  name,
  status
});
// action to reset the notification state to it's initial state
export const resetNotificationState = () => ({
  type: RESET_NOTIFICATION_STATE,
});
// action to reset any notification errors so that the error message pop up will no longer be visible
export const resetNotificationErrors = () => ({
  type: RESET_NOTIFICATION_ERRORS,
});

export const logoutUserNotifications = () => ({
  type: LOGOUT_USER_NOTIFICATIONS,
});
//export const httpError = (errorText) => ({
//  type: HTTP_ERROR,
//  errorText
//});

// function to dispatch redux actions to get response from graphql notification history query getNotifications 
export function FetchNotifications(token, number, lastnotifID) {
  return function(dispatch){
    dispatch(getNotificationsBegin());
    return axios.post(GRAPHQL_URL, { query: GET_NOTIFICATIONS(number, lastnotifID) }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
    })
      .then((json) => {
        if ('errors' in json.data) {
          dispatch(getNotificationsError(json.data.errors[0].message));
          return {errors: json.data.errors};
        }
        else{
          // 
          const notificationsObject = arrayToObjectID(json.data.data.getNotifications);
          dispatch(getNotificationsSuccess(notificationsObject));
          return json.data.data.getNotifications;
        }
      })
      .catch(error => dispatch(getNotificationsFailure(error.message)));
  };
}

// function to dispatch redux actions to get response from graphql mutation setNotifications
// The possible values of the input parameter 'platform' are 'IOS' and 'ANDROID'.  Send them in as a string but DO NOT stringify them.
export function SendNotificationsSettings(token, notifToken, platform, notificationsArray, removeAll=false) {
  return function(dispatch){
    dispatch(setNotificationsBegin());
    const mutationText = SET_NOTIFICATIONS(notifToken, platform, notificationsArray, removeAll);
    return axios.post(GRAPHQL_URL, { query: mutationText }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
    })
      .then((json) => {
        if ('errors' in json.data) {
          dispatch(setNotificationsError(json.data.errors[0].message));
          return {errors: json.data.errors};
        }
        else{
          // convert the list of notification type objects to objects of objects
          const notificationsettingsObject = arrayToObjectID(json.data.data.setNotifications.notifications);
          dispatch(setNotificationsSuccess(notificationsettingsObject, notifToken, removeAll));
          return json.data.data.setNotifications.notifications;
        }
      })
      .catch(error => dispatch(setNotificationsFailure(error.message)));
  };
}

// function to dispatch redux actions to get response from graphql mutation setReadNotifications
export function SendReadNotifications(token, idArray) {
  return function(dispatch){
    dispatch(setReadNotificationsBegin());
    return axios.post(GRAPHQL_URL, { query: SET_READ_NOTIFICATIONS(idArray) }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
    })
      .then((json) => {
        if ('errors' in json.data) {
          dispatch(setReadNotificationsError(json.data.errors[0].message));
          return {errors: json.data.errors};
        }
        else{
          // only dispatch the action to update notifications to "read" if the returned "success" message from the graphql server is true.
          if (json.data.data.setReadnotifications.status.success){
            dispatch(setReadNotificationsSuccess(idArray));
          }
          // if there is an XP event returned it relates to the one off first notification received event
          // eslint-disable-next-line
          if (json.data.data.setReadnotifications.status.xpEvents != null && json.data.data.setReadnotifications.status.xpEvents.length > 0){
            dispatch(updateNotificationState('firstNotificationSent', true))
          }
          return json.data.data.setReadnotifications.status.xpEvents;
        }
      })
      .catch(error => dispatch(setReadNotificationsFailure(error.message)));
  };
}

// function to dispatch redux actions to get response from graphql mutation clearUsernotifications.  This removes the expo notification token and removes all of the user's notification types. 
export function ClearNotifications(token) {
  return function(dispatch){
    dispatch(clearNotificationsBegin());
    return axios.post(GRAPHQL_URL, { query: CLEAR_NOTIFICATIONS() }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
    })
      .then((json) => {
        if ('errors' in json.data) {
          dispatch(clearNotificationsError(json.data.errors[0].message));
          return {errors: json.data.errors};
        }
        else{
          // only dispatch the action to clear all notifications and remove the token if the returned "success" message from the graphql server is true.
          if (json.data.data.clearUsernotifications.success){
            dispatch(clearNotificationsSuccess());
          }
          return json.data.data.clearUsernotifications.success;
        }
      })
      .catch(error => dispatch(clearNotificationsFailure(error.message)));
  };
}

// Handle HTTP errors since fetch won't.
//function handleErrors(response) {
//  if (!response.ok) {
//    dispatch(httpError("A Network Error has occurred. " + response.statusText));
//  }
//  return response;
//}
