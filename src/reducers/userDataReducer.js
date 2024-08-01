import storage from 'redux-persist/lib/storage';
import {
  IS_USERNAME_UNIQUE_BEGIN,
  IS_USERNAME_UNIQUE_SUCCESS,
  IS_USERNAME_UNIQUE_ERROR,
  IS_USERNAME_UNIQUE_FAILURE,
  IS_EMAIL_UNIQUE_BEGIN,
  IS_EMAIL_UNIQUE_SUCCESS,
  IS_EMAIL_UNIQUE_ERROR,
  IS_EMAIL_UNIQUE_FAILURE,
  CREATE_USER_BEGIN,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  CREATE_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_ERROR,
  FORGOT_USERNAME_BEGIN,
  FORGOT_USERNAME_SUCCESS,
  FORGOT_USERNAME_FAILURE,
  FORGOT_USERNAME_ERROR,
  FORGOT_PASSWORD_BEGIN,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  FORGOT_PASSWORD_ERROR,
  CHANGE_PASSWORD_BEGIN,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERROR,
  CHANGE_PASSWORD_FAILURE,
  UPDATE_LOGIN_STATE,
  LOGOUT_USER_DETAILS,
} from '../ActionTypes/loginActions';
import {
  COMPLETE_QUIZ_BEGIN,
  COMPLETE_QUIZ_SUCCESS,
  COMPLETE_QUIZ_ERROR,
  COMPLETE_QUIZ_FAILURE,
  GET_POSSIBLE_SCHOOLS_BEGIN,
  GET_POSSIBLE_SCHOOLS_SUCCESS,
  GET_POSSIBLE_SCHOOLS_FAILURE,
  GET_POSSIBLE_SCHOOLS_ERROR,
  FETCH_BIGQUERY_BEGIN,
  FETCH_BIGQUERY_SUCCESS,
  FETCH_BIGQUERY_ERROR,
  FETCH_BIGQUERY_FAILURE,
  FETCH_ADMIN_BIGQUERY_BEGIN,
  FETCH_ADMIN_BIGQUERY_SUCCESS,
  FETCH_ADMIN_BIGQUERY_ERROR,
  FETCH_ADMIN_BIGQUERY_FAILURE,
  FETCH_MINIQUERY_BEGIN,
  FETCH_MINIQUERY_SUCCESS,
  FETCH_MINIQUERY_ERROR,
  FETCH_MINIQUERY_FAILURE,
  UPDATE_USER_DATA_STATE,
  // RESET_USERDATA_STATE,  
  RESET_USERDETAILS_ERRORS,
  SET_DAY_COLORS,
  SET_NIGHT_COLORS,
  SET_CRYPTO_COLORS,
  UPDATE_ADDRESS,
  IS_LOGOUT_REQUIRED_BEGIN,
  IS_LOGOUT_REQUIRED_SUCCESS,
  IS_LOGOUT_REQUIRED_ERROR,
  IS_LOGOUT_REQUIRED_FAILURE,
} from '../ActionTypes/userDataActions';
import {
  UPDATE_COIN_BALANCE_INFO,
  UPDATE_USER_LEVEL_INFO,
} from '../ActionTypes/userAccountActions';
import { 
  RESEND_VERIFICATION_BEGIN,
  RESEND_VERIFICATION_SUCCESS,
  RESEND_VERIFICATION_FAILURE,
  RESEND_VERIFICATION_ERROR,
  FETCH_VERIFICATION_STATUS_BEGIN,
  FETCH_VERIFICATION_STATUS_SUCCESS,
  FETCH_VERIFICATION_STATUS_FAILURE,
  FETCH_VERIFICATION_STATUS_ERROR,
} from '../ActionTypes/verificationActions';
import {
  SEND_USER_PAYOUT_BEGIN,
  SEND_USER_PAYOUT_SUCCESS,
  SEND_USER_PAYOUT_FAILURE,
  SEND_USER_PAYOUT_ERROR,
} from '../ActionTypes/payoutActions';

import { persistReducer } from 'redux-persist';
import { current } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  schoolLoading: false,
  loggedIn: false,
  newLogin: true,
  bigQueryLoaded: false,
  didWalk: false,
  jwtToken: null,
  id: null,
  isActive: false,
  email: '',
  emailVerified: null,
  username: '',
  firstName: '',
  lastName: '',
  error: null,
  graphqlError: null,
  errorTitle: null,
  picture: null,
  phoneNumber: '',
  isTeacher: false,
  isSuperintendent: false,
  isPrincipal: false,
  birthDate: null,
  address1: null,
  address2: null,
  addressCity: null,
  addressState: null,
  addressZipCode: null,
  lastUpdated: null,
  school: null,
  schoolId: null,
  district: null,
  districtId: null,
  dateJoined: null,
  marketOpen: false,
  quizCompleted: 0,
  profilePicAdded: false,
  lastGetUsername: null,
  lastResetPassword: null,
  logoutRequired: false,
  changePasswordRequired: false,
  currentProduct:{
    id: 0,
    name: '',
    description: '',
    monthlyCost: 0,
    annualCost: 0,
    expiresAt: null,
    isActive: true,
    productSubject: '',
  },
  productFeatures:{
    id: 0,
    createClassroom: false,
    removeClassroom: false,
    addClassroomStudents: false,
    removeClassroomStudents: false,
    createCourse: false,
    removeCourse: false,
    createClassroomCourse: false,
    removeClassroomCourse: false,  
    viewClassrooms: false,  
    viewCourses: false,
    viewClassroomCourses: false,
    addAssignments: false,
    removeAssignments: false,
    viewAssignments: false,
    viewStudentPortfolios: false,
    viewRapunzlCurriculums: false,
    createPrivateCurriculums: false,
  },
  appColors: {
    // GENERAL COLORS
    blue: '#3ac7ff',
    gold: '#ffcd44',
    fluorescentGreen: '#14e3b6',
    green: '#bfffde',
    darkGreen: '#064a31',
    grey: '#37373D',
    lightGrey: '#8E8E99',
    orange: '#ed6a18',
    purple: '#b027f5',
    red: '#ff330f',
    white: '#FAFAFF',

    // SHADOWS
    greenShadow: '#013024',
    redShadow: '#7a0000',
    shadow: '#002b1c',

    // GRADIENTS
    fluorescent: ['#06bd95', '#14e3b6'],
    goldGradient: ['#ffcd44','#f5c131'],
    gradient: ['#094c3a', '#013024'],
    greenGradient: ['#007154', '#008966'],
    greenLoadingGradient: ['#81eacc', '#6ae2c0'],
    orangeGradient: ['#ed6a18', '#f78548'],
    purpleGradient: ['#9328c9', '#630691'],
    redGradient: ['#EA4848', '#f46161'],
    redLoadingGradient: ['#ed7272', '#db5353'],
    subGradient: ['#009b79', '#02775d'],

    // HEADER
    headerBG: '#094c3a',
    headerFG: '#013024',
    headerGreen: '#FAFAFF',
    headerTint: '#ceffea',
    headerText: '#ceffea',

    // HOME
    home: '#135243',
    homeBorder: '#2c8f71',
    homeIcon: '#31edbe',

    // LOADING
    loadingGreenBG: '#094c3a',
    loadingRedBG: '#f7b4b4',

    // MAIN
    accent: '#52e5c5',
    accent2: '#1e614f',
    mainText: '#e0fff2',
    subtext: '#FAFAFF',
    tileBG: '#bfffee',
    largeNumber: '#b4edde',

    // PERFORMANCE
    perfUp: '#0ee3ae',
    perfDown: '#f54020',

    // SENTIMENT
    orangeBG: '#e69867',
    redBG: '#ff4242',
    greenBG: 'a3ffe3',
   
    // TABS
    activeTab: '#FAFAFF',
    inactiveTab: '#52e5c5',

    facebookColor: '#3b5998',
    venmoColor: '#3d95ce',
    paypalColor: '#253B80',
    supportMenu: '#00ffc3',
  },
};

const userDataReducer = (state = initialState, action) => {
  switch(action.type) {
    // the following 4 actions determine if the user is required to logout or not
    case IS_LOGOUT_REQUIRED_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
        graphqlError: null,
        errorTitle: null,
      };
    case IS_LOGOUT_REQUIRED_SUCCESS:
      return {
        ...state,
        loading: false,
        logoutRequired: action.payload.logoutRequired,
      };
    case IS_LOGOUT_REQUIRED_ERROR:
      return {
        ...state,
        loading: false,
        graphqlError: action.payload.error,
        errorTitle: 'Logout Required Error'
      };
    case IS_LOGOUT_REQUIRED_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        errorTitle: 'Logout Required Failure'
      };
    // the following 4 action types handle the verification of whether or not a username is unique
    case IS_USERNAME_UNIQUE_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors.
      return {
        ...state,
        loading: true,
        error: null,
        graphqlError: null,
        errorTitle: null,
        loggedIn: false,
        newLogin: false,
      };

    case IS_USERNAME_UNIQUE_SUCCESS:
      // All done: set loading "false".
      // Also, populate the store state for the created account
      return {
        ...state,
        loading: false,
      };
    
    case IS_USERNAME_UNIQUE_ERROR:
      // The request did not fail, it did return, but it did generate a graphql error and some graphql
      // server generated error text that should be displayed to the user.
      // Save the graphql error to the redux store, so we can display it somewhere.
      return {
        ...state,
        loading: false,
        graphqlError: action.payload.error,
        errorTitle: 'Is Username Unique Error'
      };
    
    case IS_USERNAME_UNIQUE_FAILURE:
      // The request failed for some reason, perhaps network related, perhaps not. This not a graphql generated error. Set loading to "false".
      // Save the error, so we can display it somewhere.
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        errorTitle: 'Is Username Unique Failure'
      };
    case COMPLETE_QUIZ_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
        graphqlError: null,
        errorTitle: null,
      };
    case COMPLETE_QUIZ_SUCCESS:
      return {
        ...state,
        loading: false,
        quizCompleted: action.payload.quizCompleted,
        accountBalance: action.payload.accountBalance,
      };
    case COMPLETE_QUIZ_ERROR:
      return {
        ...state,
        loading: false,
        graphqlError: action.payload.error,
        errorTitle: 'Error Completing Quiz'
      };
    case COMPLETE_QUIZ_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        errorTitle: 'Failuring Completing Quiz'
      };
    case SEND_USER_PAYOUT_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
        graphqlError: null,
        errorTitle: null,
      };
    case SEND_USER_PAYOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        accountBalance: action.payload.updatedAccountBalance,
      };
    case SEND_USER_PAYOUT_FAILURE:
      return {
        ...state,
        loading: false,
        graphqlError: action.payload.error,
        errorTitle: 'Error Requesting Payout'
      };
    case SEND_USER_PAYOUT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        errorTitle: 'Failuring Requesting Payout'
      };
    // the following 4 action types handle getting a list of possible schools
    case GET_POSSIBLE_SCHOOLS_BEGIN:
      return {
        ...state,
        schoolLoading: true,
        error: null,
        graphqlError: null,
        errorTitle: null,
      }
    case GET_POSSIBLE_SCHOOLS_SUCCESS:
      return {
        ...state,
        schoolLoading: false,
      }
    case GET_POSSIBLE_SCHOOLS_ERROR:
      return {
        ...state,
        schoolLoading: false,
        graphqlError: action.payload.error,
        errorTitle: 'We Had An Error Finding Schools'
      }
    case GET_POSSIBLE_SCHOOLS_FAILURE:
      return {
        ...state,
        schoolLoading: false,
        error: action.payload.error,
        errorTitle: 'Something Failed Fetching Schools'
      }
    // the following 4 action types handle the verification of whether or not a email is unique
    case IS_EMAIL_UNIQUE_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors.
      return {
        ...state,
        loading: true,
        error: null,
        graphqlError: null,
        errorTitle: null,
        loggedIn: false,
        newLogin: false,
      };

    case IS_EMAIL_UNIQUE_SUCCESS:
      // All done: set loading "false".
      // Also, populate the store state for the created account
      return {
        ...state,
        loading: false,
      };
    
    case IS_EMAIL_UNIQUE_ERROR:
      // The request did not fail, it did return, but it did generate a graphql error and some graphql
      // server generated error text that should be displayed to the user.
      // Save the graphql error to the redux store, so we can display it somewhere.
      return {
        ...state,
        loading: false,
        graphqlError: action.payload.error,
        errorTitle: 'There Was An Error Checking Email'
      };
    
    case IS_EMAIL_UNIQUE_FAILURE:
      // The request failed for some reason, perhaps network related, perhaps not. This not a graphql generated error. Set loading to "false".
      // Save the error, so we can display it somewhere.
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        errorTitle: 'Checking Email Failed'
      };

    // the following 4 action types handle the creation of a new user account
    case CREATE_USER_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors.
      return {
        ...state,
        loading: true,
        error: null,
        graphqlError: null,
        errorTitle: null,
        loggedIn: false,
        newLogin: false,
        jwtToken: null,
      };

    case CREATE_USER_SUCCESS:
      // All done: set loading "false".
      // Also, populate the store state for the created account
      return {
        ...state,
        loading: false,
        id: action.newUser.id,
        isActive: action.newUser.isActive,
        isTeacher: action.newUser.isTeacher,
        email: action.newUser.email,
        username: action.newUser.username,
        firstName: action.newUser.firstName,
        lastName: action.newUser.lastName,
        birthDate: action.newUser.birthDate,
        didWalk: false,
        
      };
    
    case CREATE_USER_ERROR:
      // The request did not fail, it did return,,did generate a graphql error and some graphql
      // server generated error text that should ,ayed to the user.
      // Save the graphql error to the redux stor, can display it somewhere.
      return {
        ...state,
        loading: false,
        graphqlError: action.payload.error,
        errorTitle: 'Create User Error'
      };
    
    case CREATE_USER_FAILURE:
      // The request failed for some reason, perh,ork related, perhaps not. This not a graphql generated error. Set loading to "false".
      // Save the error, so we can display it som,
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        errorTitle: 'Create User Error'
      };

    case UPDATE_LOGIN_STATE:
      // Update the state of one key in the userAuth portion of the overall state.
      return {
        ...state,
        [action.name]: action.status,
        error: null,
        graphqlError: null,
        errorTitle: null,
      };

    // the following 4 action types handle the login of an existing user account and the return of a JWT token
    case LOGIN_USER_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors.
      return {
        ...state,
        loading: true,
        error: null,
        loggedIn: false,
        newLogin: false,
        graphqlError: null,
        errorTitle: null,
      };

    case LOGIN_USER_SUCCESS:
      // All done: set loading "false".
      // Also, populate the store state for the JWT token
      return {
        ...state,
        loading: false,
        loggedIn: true,
        newLogin: true,
        jwtToken: action.payload.token,        
      };
    
    case LOGIN_USER_ERROR:
      // The request did not fail, it did return, but it did generate a graphql error and some graphql
      // server generated error text that should be displayed to the user.
      // Save the graphql error to the redux store, so we can display it somewhere.
      return {
        ...state,
        loading: false,
        graphqlError: action.payload.error,
        errorTitle: 'User Login Error',
        jwtToken: null,
      };
    
    case LOGIN_USER_FAILURE:
      // The request failed for some reason, perhaps network related, perhaps not. This not a graphql generated error. Set loading to "false".
      // Save the error, so we can display it somewhere.
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        errorTitle: 'User Login Failure',
        jwtToken: null,
      };

    // the following 4 action types handle the a user who has forgotten their username
    case FORGOT_USERNAME_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors.
      return {
        ...state,
        loading: true,
        error: null,
        graphqlError: null,
        errorTitle: null,
      };

    case FORGOT_USERNAME_SUCCESS:
      // All done: set loading "false".
      // Also, populate the store state for the JWT token
      return {
        ...state,
        loading: false,
        graphqlError: action.payload.result,
        errorTitle: 'Forgot Username Success',
        lastGetUsername: action.payload.date,
      };
    
    case FORGOT_USERNAME_ERROR:
      // The request did not fail, it did return, but it did generate a graphql error and some graphql
      // server generated error text that should be displayed to the user.
      // Save the graphql error to the redux store, so we can display it somewhere.
      return {
        ...state,
        loading: false,
        graphqlError: action.payload.error,
        errorTitle: 'Forgot Username Error',
      };
    
    case FORGOT_USERNAME_FAILURE:
      // The request failed for some reason, perhaps network related, perhaps not. This not a graphql generated error. Set loading to "false".
      // Save the error, so we can display it somewhere.
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        errorTitle: 'Forgot Username Error',
      };  

    // the following 4 action types handle the a user who has forgotten their password
    case FORGOT_PASSWORD_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors.
      return {
        ...state,
        loading: true,
        error: null,
        graphqlError: null,
        errorTitle: null,
      };

    case FORGOT_PASSWORD_SUCCESS:
      // All done: set loading "false".
      // Also, populate the store state for the JWT token
      return {
        ...state,
        loading: false,
        graphqlError: action.payload.result,
        errorTitle: 'Forgot Password Success',
      };
    
    case FORGOT_PASSWORD_ERROR:
      // The request did not fail, it did return, but it did generate a graphql error and some graphql
      // server generated error text that should be displayed to the user.
      // Save the graphql error to the redux store, so we can display it somewhere.
      return {
        ...state,
        loading: false,
        graphqlError: action.payload.error,
        errorTitle: 'Forgot Password Error',
      };
    
    case FORGOT_PASSWORD_FAILURE:
      // The request failed for some reason, perhaps network related, perhaps not. This not a graphql generated error. Set loading to "false".
      // Save the error, so we can display it somewhere.
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        errorTitle: 'Forgot Password Error',
      };    

    // the following 4 action types handle the a user who has changed their password
    case CHANGE_PASSWORD_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors.
      return {
        ...state,
        loading: true,
        error: null,
        graphqlError: null,
        errorTitle: null,
      };

    case CHANGE_PASSWORD_SUCCESS:
      // All done: set loading "false".
      // Also, populate the store state for the JWT token
      return {
        ...state,
        loading: false,
        graphqlError: action.payload.result,
        errorTitle: 'Change Password Success',
      };
    
    case CHANGE_PASSWORD_ERROR:
      // The request did not fail, it did return, but it did generate a graphql error and some graphql
      // server generated error text that should be displayed to the user.
      // Save the graphql error to the redux store, so we can display it somewhere.
      return {
        ...state,
        loading: false,
        graphqlError: action.payload.error,
        errorTitle: 'Forgot Password Error',
      };
    
    case CHANGE_PASSWORD_FAILURE:
      // The request failed for some reason, perhaps network related, perhaps not. This not a graphql generated error. Set loading to "false".
      // Save the error, so we can display it somewhere.
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        errorTitle: 'Forgot Password Error',
      };   

    // the following 4 action types handle the a user is requesting a resend of the verificartion email 
    case RESEND_VERIFICATION_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors.
      return {
        ...state,
        loading: true,
        error: null,
        graphqlError: null,
        errorTitle: null,
      };

    case RESEND_VERIFICATION_SUCCESS:
      // All done: set loading "false".
      // Also, populate the store state for the JWT token
      return {
        ...state,
        loading: false,
        graphqlError: action.payload.result,
        errorTitle: 'Resend Verification Email Success',
      };
    
    case RESEND_VERIFICATION_ERROR:
      // The request did not fail, it did return, but it did generate a graphql error and some graphql
      // server generated error text that should be displayed to the user.
      // Save the graphql error to the redux store, so we can display it somewhere.
      return {
        ...state,
        loading: false,
        graphqlError: action.payload.error,
        errorTitle: 'Resend Verification Email Error',
      };

    case RESEND_VERIFICATION_FAILURE:
      // The request failed for some reason, perhaps network related, perhaps not. This not a graphql generated error. Set loading to "false".
      // Save the error, so we can display it somewhere.
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        errorTitle: 'Resend Verification Email Error',
      }; 
      
     // the following 4 action types handle fetching the user's verified email status
    case FETCH_VERIFICATION_STATUS_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors.
      return {
        ...state,
        loading: true,
        error: null,
        graphqlError: null,
        errorTitle: null,
      };

    case FETCH_VERIFICATION_STATUS_SUCCESS:
      // All done: set loading "false".
      // Also, populate the store state for the JWT token
      return {
        ...state,
        loading: false,
        emailVerified: action.payload.result,
      };
    
    case FETCH_VERIFICATION_STATUS_ERROR:
      // The request did not fail, it did return, but it did generate a graphql error and some graphql
      // server generated error text that should be displayed to the user.
      // Save the graphql error to the redux store, so we can display it somewhere.
      return {
        ...state,
        loading: false,
        graphqlError: action.payload.error,
        errorTitle: 'Fetch Email Verified Error',
      };

    case FETCH_VERIFICATION_STATUS_FAILURE:
      // The request failed for some reason, perhaps network related, perhaps not. This not a graphql generated error. Set loading to "false".
      // Save the error, so we can display it somewhere.
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        errorTitle: 'Fetch Email Verified Error',
      };  
    
    case FETCH_BIGQUERY_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: null,
        graphqlError: null
      };

    case FETCH_BIGQUERY_SUCCESS:
      // All done: set loading "false".
      // Also, replace the maintenance bool with the one from the server
      return {
        ...state,
        loading: false,
        id: action.payload.userDetails.id,
        email: action.payload.userDetails.email,
        emailVerified: action.payload.userDetails.emailVerified,
        firstName: action.payload.userDetails.firstName,
        lastName: action.payload.userDetails.lastName,
        username: action.payload.userDetails.username,
        picture: action.payload.userDetails.picture,
        phoneNumber: action.payload.userDetails.phoneNumber,
        isTeacher: action.payload.userDetails.isTeacher,
        birthDate: action.payload.userDetails.birthDate,
        lastUpdated: action.payload.userDetails.lastUpdated,
        address1: action.payload.userDetails.address1,
        address2: action.payload.userDetails.address2,
        addressCity: action.payload.userDetails.addressCity,
        addressState: action.payload.userDetails.addressState,
        addressZipCode: action.payload.userDetails.addressZipCode,
        school: action.payload.userDetails.school,
        schoolId: action.payload.userDetails.schoolId,
        district: action.payload.userDetails.district,
        districtId: action.payload.userDetails.districtId,
        dateJoined: action.payload.userDetails.dateJoined,
        newLogin: false,
        bigQueryLoaded: true,
        logoutRequired: action.payload.userDetails.logoutRequired,
        changePasswordRequired: action.payload.userDetails.changePasswordRequired,
      };

    case FETCH_BIGQUERY_ERROR:
      // The request failed. It's done. So set loading to "false".
      // Save the error, so we can display it somewhere.
      // Since it failed, we don't have the isMaintenance bool from the server set maintenance to false.
      return {
        ...state,
        loading: false,
        graphqlError: action.payload.error,
        errorTitle: 'Fetch Main User Data Error'
      };

    case FETCH_BIGQUERY_FAILURE:
      // The request failed. It's done. So set loading to "false".
      // Save the error, so we can display it somewhere.
      // Since it failed, we don't have the isMaintenance bool from the server set maintenance to false.
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        errorTitle: 'Fetch Main User Data Failure'
      };

      case FETCH_ADMIN_BIGQUERY_BEGIN:
        // Mark the state as "loading" so we can show a spinner or something
        // Also, reset any errors. We're starting fresh.
        return {
          ...state,
          loading: true,
          error: null,
          graphqlError: null
        };
  
      case FETCH_ADMIN_BIGQUERY_SUCCESS:
        // All done: set loading "false".
        // Also, replace the maintenance bool with the one from the server
        return {
          ...state,
          loading: false,
          id: action.payload.userDetails.id,
          email: action.payload.userDetails.email,
          emailVerified: action.payload.userDetails.emailVerified,
          firstName: action.payload.userDetails.firstName,
          lastName: action.payload.userDetails.lastName,
          username: action.payload.userDetails.username,
          picture: action.payload.userDetails.picture,
          phoneNumber: action.payload.userDetails.phoneNumber,
          isTeacher: action.payload.userDetails.isTeacher,
          isSuperintendent: action.payload.userDetails.isSuperintendent,
          birthDate: action.payload.userDetails.birthDate,
          lastUpdated: action.payload.userDetails.lastUpdated,
          address1: action.payload.userDetails.address1,
          address2: action.payload.userDetails.address2,
          addressCity: action.payload.userDetails.addressCity,
          addressState: action.payload.userDetails.addressState,
          addressZipCode: action.payload.userDetails.addressZipCode,
          school: action.payload.userDetails.school,
          schoolId: action.payload.userDetails.schoolId,
          district: action.payload.userDetails.district,
          districtId: action.payload.userDetails.districtId,
          dateJoined: action.payload.userDetails.dateJoined,
          newLogin: false,
          bigQueryLoaded: true,
          logoutRequired: action.payload.userDetails.logoutRequired,
          changePasswordRequired: action.payload.userDetails.changePasswordRequired,
        };
  
      case FETCH_ADMIN_BIGQUERY_ERROR:
        // The request failed. It's done. So set loading to "false".
        // Save the error, so we can display it somewhere.
        // Since it failed, we don't have the isMaintenance bool from the server set maintenance to false.
        return {
          ...state,
          loading: false,
          graphqlError: action.payload.error,
          errorTitle: 'Fetch Administrative User Data Error'
        };
  
      case FETCH_ADMIN_BIGQUERY_FAILURE:
        // The request failed. It's done. So set loading to "false".
        // Save the error, so we can display it somewhere.
        // Since it failed, we don't have the isMaintenance bool from the server set maintenance to false.
        return {
          ...state,
          loading: false,
          error: action.payload.error,
          errorTitle: 'Fetch Administrative User Data Failure'
        };

    case FETCH_MINIQUERY_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
          ...state,
          loading: true,
          error: null,
          graphqlError: null
      };
  
    case FETCH_MINIQUERY_SUCCESS:
      // All done: set loading "false".
      return {
          ...state,
          loading: false,
          logoutRequired: action.payload.logoutRequired,
      };
  
    case FETCH_MINIQUERY_ERROR:
      // The request failed. It's done. So set loading to "false".
      // Save the error, so we can display it somewhere.
      // Since it failed, we don't have the isMaintenance bool from the server set maintenance to false.
      return {
          ...state,
          loading: false,
          graphqlError: action.payload.error,
          errorTitle: 'Fetch Mini User Data Error'
      };
  
    case FETCH_MINIQUERY_FAILURE:
      // The request failed. It's done. So set loading to "false".
      // Save the error, so we can display it somewhere.
      // Since it failed, we don't have the isMaintenance bool from the server set maintenance to false.
      return {
          ...state,
          loading: false,
          error: action.payload.error,
          errorTitle: 'Fetch Mini User Data Failure'
      };

    case UPDATE_USER_LEVEL_INFO:
      return {
        ...state,
        expPointsBalance: action.userLevel.xpPointsBalance,
        currentLevel: action.userLevel.currentLevelNumber,
        nextLevelExp: action.userLevel.nextLevelXP,
        error: null,
        graphqlError: null,
        errorTitle: null,
      };  
    case UPDATE_COIN_BALANCE_INFO:
      return {
        ...state,
        coinBalance: action.coinBalance,
        error: null,
        graphqlError: null,
        errorTitle: null,
      }; 
    case UPDATE_USER_DATA_STATE:
      // Update the state of one key in the userDetails portion of the overall state.
      return {
        ...state,
        [action.name]: action.status,
        error: null,
        graphqlError: null,
        errorTitle: null,
      };  
    // This action resets any errors that were produced by a graphql query or mutation so that the user pop up message only displays once
    case RESET_USERDETAILS_ERRORS:
      return{
        ...state,
        graphqlError: null,
        error: null,
        errorTitle: null,
      };

    case SET_NIGHT_COLORS:
      return{
        ...state,
        appColors: {
          // GENERAL COLORS
          blue: '#3ac7ff',
          gold: '#ffcd44',
          fluorescentGreen: '#14e3b6',
          green: '#bfffde',
          darkGreen: '#064a31',
          grey: '#37373D',
          lightGrey: '#8E8E99',
          orange: '#ed6a18',
          purple: '#b027f5',
          red: '#ff330f',
          white: '#FAFAFF',
      
          // SHADOWS
          greenShadow: '#013024',
          redShadow: '#7a0000',
      
          // GRADIENTS
          fluorescent: ['#06bd95', '#14e3b6'],
          goldGradient: ['#ffcd44','#f5c131'],
          gradient: ['#094c3a', '#013024'],
          greenGradient: ['#007154', '#008966'],
          greenLoadingGradient: ['#81eacc', '#6ae2c0'],
          orangeGradient: ['#ed6a18', '#f78548'],
          purpleGradient: ['#9328c9', '#630691'],
          redGradient: ['#EA4848', '#f46161'],
          redLoadingGradient: ['#ed7272', '#db5353'],
          subGradient: ['#009b79', '#02775d'],
      
          // HEADER
          headerBG: '#094c3a',
          headerFG: '#013024',
          headerGreen: '#FAFAFF',
          headerTint: '#ceffea',
          headerText: '#ceffea',
      
          // HOME
          home: '#135243',
          homeBorder: '#2c8f71',
          homeIcon: '#31edbe',
      
          // LOADING
          loadingGreenBG: '#094c3a',
          loadingRedBG: '#f7b4b4',
      
          // MAIN
          accent: '#52e5c5',
          accent2: '#1e614f',
          mainText: '#e0fff2',
          subtext: '#FAFAFF',
          tileBG: '#bfffee',
          largeNumber: '#b4edde',
      
          // PERFORMANCE
          perfUp: '#12b78e',
          perfDown: '#ff330f',
      
          // SENTIMENT
          orangeBG: '#e69867',
          redBG: '#ff4242',
          greenBG: 'a3ffe3',
         
          // TABS
          activeTab: '#FAFAFF',
          inactiveTab: '#52e5c5',
      
          facebookColor: '#3b5998',
          venmoColor: '#3d95ce',
          paypalColor: '#253B80',

          supportMenu: '#00ffc3',
        }
      };

    case SET_CRYPTO_COLORS:
      return {
        ...state,
        appColors: {
          // GENERAL COLORS
          blue: '#3ac7ff',
          gold: '#ffcd44',
          fluorescentGreen: '#14e3b6',
          green: '#009b79',
          darkGreen: '#064a31',
          grey: '#37373D',
          lightGrey: '#8E8E99',
          orange: '#ed6a18',
          purple: '#290066',
          red: '#ff330f',
          white: '#FAFAFF',
      
          // SHADOWS
          greenShadow: '#013024',
          redShadow: '#7a0000',
      
          // GRADIENTS
          fluorescent: ['#06bd95', '#14e3b6'],
          goldGradient: ['#ffcd44','#f5c131'],
          gradient: ['#160038', '#15042e'],
          greenGradient: ['#007154', '#008966'],
          greenLoadingGradient: ['#81eacc', '#6ae2c0'],
          orangeGradient: ['#ed6a18', '#f78548'],
          purpleGradient: ['#9328c9', '#630691'],
          redGradient: ['#EA4848', '#f46161'],
          redLoadingGradient: ['#ed7272', '#db5353'],
          subGradient: ['#009b79', '#02775d'],
      
          // HEADER
          headerBG: '#19003d',
          headerFG: '#2e0b5e',
          headerGreen: '#FAFAFF',
          headerTint: '#dbbfff',
          headerText: '#dbbfff',
      
          // HOME
          home: '#b027f5',
          homeBorder: '#2c8f71',
          homeIcon: '#31edbe',
      
          // LOADING
          loadingGreenBG: '#270038',
          loadingRedBG: '#f7b4b4',
      
          // MAIN
          accent: '#491296',
          accent2: '#1e614f',
          mainText: '#e0fff2',
          subtext: '#FAFAFF',
          tileBG: '#bfffee',
          largeNumber: '#b4edde',
      
          // PERFORMANCE
          perfUp: '#12b78e',
          perfDown: '#ff330f',
      
          // SENTIMENT
          orangeBG: '#e69867',
          redBG: '#ff4242',
          greenBG: 'a3ffe3',
         
          // TABS
          activeTab: '#FAFAFF',
          inactiveTab: '#52e5c5',
      
          facebookColor: '#3b5998',
          venmoColor: '#3d95ce',
          paypalColor: '#253B80',

          supportMenu: '#00ffc3',
        }
      };

    case SET_DAY_COLORS:
      return{
        ...state,
        appColors: {
          // GENERAL COLORS
          blue: '#0790c6',
          fluorescentGreen: '#14e3b6',
          gold: '#f2a93b',
          green: '#009b79',
          darkGreen: '#043623',
          grey: '#37373D',
          lightGrey: '#8E8E99',
          orange: '#ed6a18',
          purple: '#b027f5',
          red: '#EA4848',
      
          white: '#FAFAFF',
      
          // SHADOWS
          greenShadow: '#009b79',
          redShadow: '#d6160f',
      
          // GRADIENTS
          fluorescent: ['#06bd95', '#14e3b6'],
          goldGradient: ['#fcd174','#f7c14d'],
          gradient: ['#e5fff8', '#b5fce6'],
          greenGradient: ['#007154', '#008966'],
          greenLoadingGradient: ['#81eacc', '#6ae2c0'],
          orangeGradient: ['#ed6a18', '#f78548'],
          purpleGradient: ['#9328c9', '#630691'],
          redGradient: ['#EA4848', '#f46161'],
          redLoadingGradient: ['#ed7272', '#db5353'],
          subGradient: ['#009b79', '#02775d'],
      
          // HEADER
          headerBG: '#e5fff8',
          headerFG: '#b5fce6',
          headerGreen: '#014936',
          headerTint: '#007154',
          headerText: '#007154',
      
          // HOME
          home: '#007154',
          homeBorder: '#9df9e5',
          homeIcon: '#035e47',
      
          // LOADING
          loadingGreenBG: '#81eacc',
          loadingRedBG: '#f7b4b4',
      
          // MAIN
          accent: '#52e5c5',
          accent2: '#c2f0e4',
          mainText: '#002B20',
          subtext: '#007154',
          tileBG: '#bfffee',
          largeNumber: '#0b4c3f',
      
          // PERFORMANCE
          perfUp: '#007154',
          perfDown: '#EA4848',
      
          // SENTIMENT
          orangeBG: '#e69867',
          redBG: '#ffbdbd',
          greenBG: 'a3ffe3',
      
          // TABS
          activeTab: '#007154',
          inactiveTab: '#52e5c5',
      
          facebookColor: '#3b5998',
          venmoColor: '#3d95ce',
          paypalColor: '#253B80',
      
          supportMenu: '#00ffc3',
        }
      };
      
    case UPDATE_ADDRESS:
      return {
        ...state,
        address1: action.payload.address1,
        address2: action.payload.address2,
        addressCity: action.payload.city,
        addressState: action.payload.state,
        addressZipCode: action.payload.zip,
      }
    case LOGOUT_USER_DETAILS:
      // reset the userDetails state to it's initial state
      storage.removeItem('persist:root.userDetails');
      return initialState;
      
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}

// the state keys below are blacklisted as we do not need to persist these to storage on the device.  All other state keys are persisted.
const persistConfig = {
  key: 'userDetails',
  storage,
  blacklist: ['loading', 'error','graphqlError','graphqlMessage', 'errorTitle']
}

export default persistReducer(persistConfig, userDataReducer);