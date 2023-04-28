import storage from 'redux-persist/lib/storage';
import {
  OTHER_USER_DETAILS_BEGIN,
  OTHER_USER_DETAILS_SUCCESS,
  OTHER_USER_DETAILS_FAILURE,
  OTHER_USER_DETAILS_ERROR,
  OTHER_USER_CLSPOSNS_BEGIN,
  OTHER_USER_CLSPOSNS_SUCCESS,
  OTHER_USER_CLSPOSNS_FAILURE,
  OTHER_USER_CLSPOSNS_ERROR,
  RESET_SOCIAL_ERRORS,
  LOGOUT_USER_SOCIAL,
} from '../ActionTypes/socialActions';
import {
  SEARCH_USERS_FAILURE,
  SEARCH_USERS_ERROR
} from '../ActionTypes/searchActions';
import { persistReducer } from 'redux-persist';

const initialState = {
  loading: false,
  error: null,
  graphqlError: null,
  errorTitle: null,
};

const socialReducer = (state = initialState, action) => {
  switch(action.type) {
    case SEARCH_USERS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload.error,
          errorTitle: 'Search Users Failure'
        };
    case SEARCH_USERS_ERROR:
        return {
          ...state,
          loading: false,
          graphqlError: action.payload.error,
          errorTitle: 'Search Users Error'
        };
    case OTHER_USER_DETAILS_BEGIN:
        return {
          ...state,
          loading: true,
          error: null,
          graphqlError: null,
          errorTitle: null,
        };
    case OTHER_USER_DETAILS_SUCCESS:
        return{
          ...state,
          loading: false,  
        };
    case OTHER_USER_DETAILS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload.error,
          errorTitle: 'Other User Details Failure'
        };
    case OTHER_USER_DETAILS_ERROR:
        return {
          ...state,
          loading: false,
          graphqlError: action.payload.error,
          errorTitle: 'Other User Details Error'
        };
    case OTHER_USER_CLSPOSNS_BEGIN:
        return {
          ...state,
          loading: true,
          error: null,
          graphqlError: null,
          errorTitle: null,
        };
    case OTHER_USER_CLSPOSNS_SUCCESS:
        return{
          ...state,
          loading: false,  
        };
    case OTHER_USER_CLSPOSNS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload.error,
          errorTitle: 'Other User Closed Positions Failure'
        };
    case OTHER_USER_CLSPOSNS_ERROR:
        return {
          ...state,
          loading: false,
          graphqlError: action.payload.error,
          errorTitle: 'Other User Closed Positins Error'
        };
    // This action resets any errors that were produced by a graphql query or mutation so that the user pop up message only displays once
    case RESET_SOCIAL_ERRORS:
      return{
        ...state,
        graphqlError: null,
        error: null,
        errorTitle: null,
      };
    case LOGOUT_USER_SOCIAL:
      // reset the userDetails state to it's initial state and remove the persisted data from disk
      storage.removeItem('persist:root.social');
      return initialState;
    
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}

// the state keys below are blacklisted as we do not need to persist these to storage on the device.  All other state keys are persisted.
const persistConfig = {
  key: 'social',
  storage,
  blacklist: ['loading','error','graphqlError','graphqlMessage', 'errorTitle']
}

export default persistReducer(persistConfig, socialReducer);