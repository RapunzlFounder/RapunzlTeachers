import axios from 'axios';
import { GRAPHQL_URL } from "../constants";
// import the GraphQL query to check if a username is unique or not
import { IS_USERNAME_UNIQUE } from '../graphql/queries/IsUsernameUnique';
// import the GraphQL query to check if an email is unique or not
import { IS_EMAIL_UNIQUE } from '../graphql/queries/IsEmailUnique';
// import the GraphQL mutation text needed to create a new user
import { CREATE_USER } from '../graphql/mutations/CreateUser';
// import the GraphQL mutation text needed to login an existing user and get a JWT token
import { TOKEN_AUTH } from '../graphql/mutations/TokenAuth';
// import the GraphQL mutation text needed for when a user forgets their username
import { FORGOT_USERNAME } from '../graphql/mutations/ForgotUsername';
// import the GraphQL mutation text needed for when a user forgets their password
import { FORGOT_PASSWORD } from '../graphql/mutations/ForgotPassword';
// import the GraphQL mutation text needed for when a user wishes to change their password
import { CHANGE_PASSWORD } from '../graphql/mutations/ChangePassword';

import { logoutUserEducation } from './educationActions';
import { logoutUserSettings } from './gameSettingsActions';
import { logoutUserNotifications } from './notificationActions';
import { logoutUserProducts } from './productActions';
import { resetDashboard } from './dashboardActions';
import { updateAllPublicModules, logoutUserCourseModule, createTeacherEmptyCoursesModules } from './coursemoduleActions';
import { createTeacherEmptyClassrooms } from './classroomActions';
import { logoutUserClassroom } from './classroomActions';

import {
  arrayToObjectID,
} from '../helper_functions/utilities';

export const IS_USERNAME_UNIQUE_BEGIN = 'IS_USERNAME_UNIQUE_BEGIN';
export const IS_USERNAME_UNIQUE_SUCCESS = 'IS_USERNAME_UNIQUE_SUCCESS';
export const IS_USERNAME_UNIQUE_ERROR = 'IS_USERNAME_UNIQUE_ERROR';
export const IS_USERNAME_UNIQUE_FAILURE = 'IS_USERNAME_UNIQUE_FAILURE';
export const IS_EMAIL_UNIQUE_BEGIN = 'IS_EMAIL_UNIQUE_BEGIN';
export const IS_EMAIL_UNIQUE_SUCCESS = 'IS_EMAIL_UNIQUE_SUCCESS';
export const IS_EMAIL_UNIQUE_ERROR = 'IS_EMAIL_UNIQUE_ERROR';
export const IS_EMAIL_UNIQUE_FAILURE = 'IS_EMAIL_UNIQUE_FAILURE';
export const CREATE_USER_BEGIN = 'CREATE_USER_BEGIN';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_ERROR = 'CREATE_USER_ERROR';
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE';
export const UPDATE_LOGIN_STATE = 'UPDATE_LOGIN_STATE';
export const LOGIN_USER_BEGIN = 'LOGIN_USER_BEGIN';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const FORGOT_USERNAME_BEGIN = 'FORGOT_USERNAME_BEGIN';
export const FORGOT_USERNAME_SUCCESS = 'FORGOT_USERNAME_SUCCESS';
export const FORGOT_USERNAME_ERROR = 'FORGOT_USERNAME_ERROR';
export const FORGOT_USERNAME_FAILURE = 'FORGOT_USERNAME_FAILURE';
export const FORGOT_PASSWORD_BEGIN = 'FORGOT_PASSWORD_BEGIN';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_ERROR = 'FORGOT_PASSWORD_ERROR';
export const FORGOT_PASSWORD_FAILURE = 'FORGOT_PASSWORD_FAILURE';
export const CHANGE_PASSWORD_BEGIN = 'CHANGE_PASSWORD_BEGIN';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_ERROR = 'CHANGE_PASSWORD_ERROR';
export const CHANGE_PASSWORD_FAILURE = 'CHANGE_PASSWORD_FAILURE';
export const LOGOUT_USER_DETAILS = 'LOGOUT_USER_DETAILS';
//export const HTTP_ERROR = 'HTTP_ERROR';

export const IsUsernameUniqueBegin = () => ({
  type: IS_USERNAME_UNIQUE_BEGIN,
});

export const IsUsernameUniqueSuccess = result => ({
  type: IS_USERNAME_UNIQUE_SUCCESS,
  payload: { result }
});

export const IsUsernameUniqueError = error => ({
  type: IS_USERNAME_UNIQUE_ERROR,
  payload: { error }
});

export const IsUsernameUniqueFailure = error => ({
  type: IS_USERNAME_UNIQUE_FAILURE,
  payload: { error }
});

export const IsEmailUniqueBegin = () => ({
  type: IS_EMAIL_UNIQUE_BEGIN,
});

export const IsEmailUniqueSuccess = result => ({
  type: IS_EMAIL_UNIQUE_SUCCESS,
  payload: { result }
});

export const IsEmailUniqueError = error => ({
  type: IS_EMAIL_UNIQUE_ERROR,
  payload: { error }
});

export const IsEmailUniqueFailure = error => ({
  type: IS_EMAIL_UNIQUE_FAILURE,
  payload: { error }
});

export const createUserBegin = () => ({
  type: CREATE_USER_BEGIN,
});

export const createUserSuccess = (newUser, password) => ({
  type: CREATE_USER_SUCCESS,
  newUser,
  password
});

export const createUserError = error => ({
  type: CREATE_USER_ERROR,
  payload: { error },
});

export const createUserFailure = error => ({
  type: CREATE_USER_FAILURE,
  payload: { error },
});

export const loginUserBegin = () => ({
  type: LOGIN_USER_BEGIN,
});

export const loginUserSuccess = token => ({
  type: LOGIN_USER_SUCCESS,
  payload: { token },
});

export const loginUserError = error => ({
  type: LOGIN_USER_ERROR,
  payload: { error },
});
export const loginUserFailure = error => ({
  type: LOGIN_USER_FAILURE,
  payload: { error },
});

export const forgotUsernameBegin = () => ({
  type: FORGOT_USERNAME_BEGIN,
});

export const forgotUsernameSuccess = (result, date) => ({
  type: FORGOT_USERNAME_SUCCESS,
  payload: { result, date },
});

export const forgotUsernameError = error => ({
  type: FORGOT_USERNAME_ERROR,
  payload: { error },
});
export const forgotUsernameFailure = error => ({
  type: FORGOT_USERNAME_FAILURE,
  payload: { error },
});
export const forgotPasswordBegin = () => ({
  type: FORGOT_PASSWORD_BEGIN,
});

export const forgotPasswordSuccess = (result, date) => ({
  type: FORGOT_PASSWORD_SUCCESS,
  payload: { result, date },
});

export const forgotPasswordError = error => ({
  type: FORGOT_PASSWORD_ERROR,
  payload: { error },
});

export const forgotPasswordFailure = error => ({
  type: FORGOT_PASSWORD_FAILURE,
  payload: { error },
});

export const changePasswordBegin = () => ({
  type: CHANGE_PASSWORD_BEGIN,
});

export const changePasswordSuccess = (result) => ({
  type: CHANGE_PASSWORD_SUCCESS,
  payload: { result },
});

export const changePasswordError = error => ({
  type: CHANGE_PASSWORD_ERROR,
  payload: { error },
});

export const changePasswordFailure = error => ({
  type: CHANGE_PASSWORD_FAILURE,
  payload: { error },
});

export const updateLoginState = (name, status)=> ({
    type: UPDATE_LOGIN_STATE,
    name,
    status,
  });

export const logoutUserDetails = () => ({
  type: LOGOUT_USER_DETAILS,
});
//export const httpError = (errorText) => ({
//  type: HTTP_ERROR,
//  errorText
//});

export function logoutUser() {
  return function(dispatch){
    dispatch(logoutUserDetails());
    dispatch(logoutUserCourseModule());
    dispatch(logoutUserClassroom());
    dispatch(logoutUserEducation());
    dispatch(logoutUserSettings());
    dispatch(logoutUserNotifications());
    dispatch(logoutUserProducts());
    dispatch(resetDashboard());
  };
}
// Action Creator function to dispatch redux actions to determine if an username is unique or not in the user database table.
export function isUsernameUnique(username) {
  return function(dispatch){
    dispatch(IsUsernameUniqueBegin());
    return axios.post(GRAPHQL_URL, { query: IS_USERNAME_UNIQUE(username) }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((json) => {
        if ('errors' in json.data) {
          dispatch(IsUsernameUniqueError(json.data.errors[0].message));
          return {errors: json.data.errors};
        }
        else{
          dispatch(IsUsernameUniqueSuccess(json.data.data.isUsernameUnique));
          return json.data.data.isUsernameUnique;
        }
      })
      .catch(error => dispatch(IsUsernameUniqueFailure(error.message)));
  };
}

// Action Creator function to dispatch redux actions to determine if an email is unique or not in the user database table.
export function isEmailUnique(email) {
  return function(dispatch){
    dispatch(IsEmailUniqueBegin());
    return axios.post(GRAPHQL_URL, { query: IS_EMAIL_UNIQUE(email) }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((json) => {
        if ('errors' in json.data) {
          dispatch(IsEmailUniqueError(json.data.errors[0].message));
          return {errors: json.data.errors};
        }
        else{
          dispatch(IsEmailUniqueSuccess(json.data.data.isEmailUnique));
          return json.data.data.isEmailUnique;
        }
      })
      .catch(error => dispatch(IsEmailUniqueFailure(error.message)));
  };
}

// Action Creator function to dispatch redux actions & get response from graphql mutation createUser.
// userDetail input object looks like the following:
// userDetails { username: "asd", lastName: "afaf", email: "abc@ert.com", password: "asfaf2525", birthDate: "YYYY-MM-DD"}
// invitationCode is an integer
export function createUser(userDetail, invitationCode) {
  return function(dispatch){
    dispatch(createUserBegin());
    const mutationText = CREATE_USER(userDetail.username, userDetail.firstName, userDetail.lastName, userDetail.email, userDetail.password,
      userDetail.birthDate, invitationCode);
    return axios.post(GRAPHQL_URL, { query: mutationText }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((json) => {
        if ('errors' in json.data) {
          dispatch(createUserError(json.data.errors.message));
          return {errors: json.data.errors};
        }
        else{
          var mainReturnedObj = json.data.data;
          const possibleSchoolsObject= arrayToObjectID(mainReturnedObj.createTeacheruser.newUser.possibleSchools);
          mainReturnedObj.createTeacheruser.newUser.possibleSchools = possibleSchoolsObject;
          // convert the available public modules array of objects into an objects of objects
          const publicModules = arrayToObjectID(mainReturnedObj.createTeacheruser.newUser.availablePublicModules);
          mainReturnedObj.createTeacheruser.newUser.availablePublicModules = publicModules;
          for (var property in mainReturnedObj.createTeacheruser.newUser.availablePublicModules){
            // convert the available public module teacher guides array of objects into an objects of objects
            if (mainReturnedObj.createTeacheruser.newUser.availablePublicModules[property].teacherGuides && mainReturnedObj.createTeacheruser.newUser.availablePublicModules[property].teacherGuides != null){
              const publicModuleGuides = arrayToObjectID(mainReturnedObj.createTeacheruser.newUser.availablePublicModules[property].teacherGuides);
              mainReturnedObj.createTeacheruser.newUser.availablePublicModules[property].teacherGuides = publicModuleGuides;
            }
            else{
              mainReturnedObj.createTeacheruser.newUser.availablePublicModules[property].teacherGuides = {};
            }
            // convert the available public module articles array of objects into an objects of objects
            if (mainReturnedObj.createTeacheruser.newUser.availablePublicModules[property].articles && mainReturnedObj.createTeacheruser.newUser.availablePublicModules[property].articles != null){
              const publicModuleArticles = arrayToObjectID(mainReturnedObj.createTeacheruser.newUser.availablePublicModules[property].articles);
              mainReturnedObj.createTeacheruser.newUser.availablePublicModules[property].articles = publicModuleArticles;
            }
            else{
              mainReturnedObj.createTeacheruser.newUser.availablePublicModules[property].articles = {};
            }
            // convert the available public module activities array of objects into an objects of objects
            if(mainReturnedObj.createTeacheruser.newUser.availablePublicModules[property].activities && mainReturnedObj.createTeacheruser.newUser.availablePublicModules[property].activities != null){
              const publicModuleActivities = arrayToObjectID(mainReturnedObj.createTeacheruser.newUser.availablePublicModules[property].activities);
              mainReturnedObj.createTeacheruser.newUser.availablePublicModules[property].activities = publicModuleActivities;
            }
            else{
              mainReturnedObj.createTeacheruser.newUser.availablePublicModules[property].activities = {};
            }
            // convert the available public module assessment questions into an object of objects
            if (mainReturnedObj.createTeacheruser.newUser.availablePublicModules[property].assessments && mainReturnedObj.createTeacheruser.newUser.availablePublicModules[property].assessments.questions != null){
              const publicModuleAssessmentQuestions = arrayToObjectID(mainReturnedObj.createTeacheruser.newUser.availablePublicModules[property].assessments.questions);
              mainReturnedObj.createTeacheruser.newUser.availablePublicModules[property].assessments.questions = publicModuleAssessmentQuestions;
            }
            else{
              mainReturnedObj.createTeacheruser.newUser.availablePublicModules[property].assessments = {};
            }
            // convert the available public module videos array of objects into an objects of objects
            if(mainReturnedObj.createTeacheruser.newUser.availablePublicModules[property].videos && mainReturnedObj.createTeacheruser.newUser.availablePublicModules[property].videos != null){
              const publicModuleVideos = arrayToObjectID(mainReturnedObj.createTeacheruser.newUser.availablePublicModules[property].videos);
              mainReturnedObj.createTeacheruser.newUser.availablePublicModules[property].videos = publicModuleVideos;
            }
              //
          }
          dispatch(updateAllPublicModules(mainReturnedObj.createTeacheruser.newUser.availablePublicModules));
          dispatch(createUserSuccess(mainReturnedObj.createTeacheruser.newUser, userDetail.password));
          dispatch(createTeacherEmptyCoursesModules());
          dispatch(createTeacherEmptyClassrooms());
          dispatch(resetDashboard());
          return true;

        }
      })
      .catch(error => {
        dispatch(createUserFailure(error.message))
        return { errors: [{ message: error.message }] };
      });
  };
}

// Action Creator function to dispatch redux actions to authenticate an existing user and get a JWT token from the graphql mutation tokenAuth.
export function loginUser(userLogin) {
  return function(dispatch) {
    dispatch(loginUserBegin());
    return axios.post(GRAPHQL_URL, { query: TOKEN_AUTH(userLogin.username, userLogin.password) }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((json) => {
        if ('errors' in json.data) {
          dispatch(loginUserError(json.data.errors[0].message));
          dispatch(resetDashboard());
          return false;
        }
        else{
          dispatch(loginUserSuccess('JWT ' + json.data.data.tokenAuth.token));
          dispatch(resetDashboard());
          return { token: 'JWT ' + json.data.data.tokenAuth.token};
        }
      })
      //.catch(error => dispatch(loginUserFailure(error.message)));
      .catch(error => {
        return { errors: [{ message: error.message }]}
      });
  };
}

// Action Creator function to dispatch redux actions when an existing user has forgotten their username.
export function forgotUsername(email, type) {
  return function(dispatch){
    dispatch(forgotUsernameBegin());
    return axios.post(GRAPHQL_URL, { query: FORGOT_USERNAME(email, type) }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((json) => {
        if ('errors' in json.data) {
          dispatch(forgotUsernameError(json.data.errors[0].message));
          return {errors: json.data.errors};
        }
        else{
          const today = new Date();
          dispatch(forgotUsernameSuccess(json.data.data.forgotUsername.result, today));
          return json.data.data.forgotUsername.result;
        }
      })
      .catch(error => dispatch(forgotUsernameFailure(error.message)));
  };
}

// Action Creator function to dispatch redux actions when an existing user has forgotten their password.
// A new random 8 digit password is created and returned by the mutation.
export function forgotPassword(email, type) {
  return function(dispatch){
    dispatch(forgotPasswordBegin());
    return axios.post(GRAPHQL_URL, { query: FORGOT_PASSWORD(email, type) }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((json) => {
        if ('errors' in json.data) {
          dispatch(forgotPasswordError(json.data.errors[0].message));
          return {errors: json.data.errors};
        }
        else{
          const today = new Date();
          dispatch(forgotPasswordSuccess(json.data.data.forgotPassword.result, today));
          return json.data.data.forgotPassword.result;
        }
      })
      .catch(error => dispatch(forgotPasswordFailure(error.message)));
  };
}

// Action Creator function to dispatch redux actions when an existing user wishes to change their password.
export function changePassword(token, newPass, confirmPass) {
  return function(dispatch){
    dispatch(changePasswordBegin());
    return axios.post(GRAPHQL_URL, { query: CHANGE_PASSWORD(newPass, confirmPass) }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
    })
      .then((json) => {
        if ('errors' in json.data) {
          dispatch(changePasswordError(json.data.errors[0].message));
          return {errors: json.data.errors};
        }
        else{
          dispatch(changePasswordSuccess(json.data.data.changePassword.result));
          return json.data.data.changePassword.result;
        }
      })
      .catch(error => dispatch(changePasswordFailure(error.message)));
  };
}

// Handle HTTP errors since fetch won't.
//function handleErrors(response) {
//  if (!response.ok) {
//    dispatch(httpError("A Network Error has occurred. " + response.statusText));
//  }
//  return response;
//}