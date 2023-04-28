import storage from 'redux-persist/lib/storage';
import {
  GET_NOTIFICATIONS_BEGIN,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAILURE,
  GET_NOTIFICATIONS_ERROR,
  CLEAR_NOTIFICATIONS_BEGIN,
  CLEAR_NOTIFICATIONS_SUCCESS,
  CLEAR_NOTIFICATIONS_FAILURE,
  CLEAR_NOTIFICATIONS_ERROR,
  SET_NOTIFICATIONS_BEGIN,
  SET_NOTIFICATIONS_SUCCESS,
  SET_NOTIFICATIONS_FAILURE,
  SET_NOTIFICATIONS_ERROR,
  SET_READ_NOTIFICATIONS_BEGIN,
  SET_READ_NOTIFICATIONS_SUCCESS,
  SET_READ_NOTIFICATIONS_FAILURE,
  SET_READ_NOTIFICATIONS_ERROR,
  UPDATE_ALL_NOTIFICATIONS,
  UPDATE_NOTIFICATION_STATE,
  // RESET_NOTIFICATION_STATE,
  RESET_NOTIFICATION_ERRORS,
  LOGOUT_USER_NOTIFICATIONS,
} from '../ActionTypes/notificationActions';

import { persistReducer } from 'redux-persist';

// the property 'viewed' is set to false initially.  When notifiction hve beem viewed by the user this is set to 'true' and 
// mutation to set viewed notifications to true is sent to the server
const initialState = {
  loading: false,
  error: null,
  graphqlError: null,
  errorTitle: null,
  allowNotifications: false,
  notificationTypes: {},
  notificationToken: null,
  notifications: {},
  lastReadID: 0,
  lastnotifID: 0,
  displayNumber: 25,
  firstNotificationSent: false,
  lastRetrievedNotificationsTime: new Date(),
  unreadNotifications: false,
};

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
    // the following 4 action types handle the creation of a new user account
    case UPDATE_ALL_NOTIFICATIONS:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors.
      return {
        ...state,
        loading: false,
        error: null,
        graphqlError: null,
        errorTitle: null,
        allowNotifications: action.payload.allowNotifications,
        unreadNotifications: action.payload.unreadNotifications,
      };
    case UPDATE_NOTIFICATION_STATE:
      // Update the state of one key in the userDetails portion of the overall state.
      return {
        ...state,
        [action.name]: action.status,
        error: null,
        graphqlError: null,
        errorTitle: null,
      };  
    case GET_NOTIFICATIONS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
        graphqlError: null,
        errorTitle: null,
      };
    case GET_NOTIFICATIONS_SUCCESS:
      // create a new object for the notifications state property.
      // This must be a deep copy to preserve the immutability of state objects.
      let originalNotificationsObject = JSON.parse(JSON.stringify(state.notifications));
      let lastnotifID = state.lastnotifID;
      
      for (var key in action.payload.notifications){
        if(action.payload.notifications[key].id > lastnotifID){
          lastnotifID = action.payload.notifications[key].id
        }
        originalNotificationsObject[key] = action.payload.notifications[key];
      }
      return{
        ...state,
        loading: false,
        lastnotifID: lastnotifID,
        notifications: originalNotificationsObject,
        lastRetrievedNotificationsTime: new Date(),
      }
    case GET_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        errorTitle: 'Get Push Notifications Failure'
      };
    case GET_NOTIFICATIONS_ERROR:
      return {
        ...state,
        loading: false,
        graphqlError: action.payload.error,
        errorTitle: 'Get Push Notifications Error'
      };
    
    case CLEAR_NOTIFICATIONS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
        graphqlError: null,
        errorTitle: null,
      };
    case CLEAR_NOTIFICATIONS_SUCCESS:
      return{
        ...state,
        loading: false,
        allowNotifications: false,
        notificationTypes: {},
        notificationToken: null,
      }
    case CLEAR_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        errorTitle: 'Clear Push Notifications Failure'
      };
    case CLEAR_NOTIFICATIONS_ERROR:
      return {
        ...state,
        loading: false,
        graphqlError: action.payload.error,
        errorTitle: 'Clear Push Notifications Error'
      };
    case SET_NOTIFICATIONS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
        graphqlError: null,
        errorTitle: null,
      };
    case SET_NOTIFICATIONS_SUCCESS:
      // if removeAll is true then all notification types must be removed as well as the notification token
      // eslint-disable-next-line
      if (action.removeAll == true){
        return {
          ...state,
          loading: false,
          allowNotifications: false,
          notificationTypes: {},
          notificationToken: null,
        };
      }
      else {
        return {
          ...state,
          loading: false,
          allowNotifications: true,
          notificationTypes: action.notifications,
          notificationToken: action.token,
        };
      }
    case SET_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        errorTitle: 'Change Push Notifications Failure'
      };
    case SET_NOTIFICATIONS_ERROR:
      return {
        ...state,
        loading: false,
        graphqlError: action.payload.error,
        errorTitle: 'Change Push Notifications Error'
      };
    case SET_READ_NOTIFICATIONS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
        graphqlError: null,
        errorTitle: null,
      };
    case SET_READ_NOTIFICATIONS_SUCCESS:
      // create a new object for the notifications state property.
      // This must be a deep copy to preserve the immutability of state objects.
      let ogNotificationsObject = JSON.parse(JSON.stringify(state.notifications));
      // iterate over the array of push notification id's to update to "read"
      for(var i=0;i < action.idArray.length; i++){
        // check if the id is an object key in the notifications state property copy.  If so update it's read property to true, if not throw an error.
        if (action.idArray[i] in ogNotificationsObject){
          ogNotificationsObject[action.idArray[i]].read = true;
        }
        else{
          return{
            ...state,
            loading: false,
            error: "Something went wrong...The Push Notification Id " + action.idArray[i] + " does not exist in your Received Push Notifications.",
            graphqlError: null,
            errorTitle: "Read Notifications Error",
          };
        }
      }
      return{
        ...state,
        loading: false,
        notifications: ogNotificationsObject,
        unreadNotifications: false,
      }
    case SET_READ_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        errorTitle: 'Read Notifications Failure'
      };
    case SET_READ_NOTIFICATIONS_ERROR:
      return {
        ...state,
        loading: false,
        graphqlError: action.payload.error,
        errorTitle: 'Read Notifications Error'
      };
      // This action resets any errors that were produced by a graphql query or mutation so that the user pop up message only displays once
    case RESET_NOTIFICATION_ERRORS:
      return{
        ...state,
        graphqlError: null,
        error: null,
        errorTitle: null,
      };
    case LOGOUT_USER_NOTIFICATIONS:
      // reset the notification state to it's initial state and remove the persisted data from disk
      storage.removeItem('persist:root.notification');
      return initialState;
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}

// the state keys below are blacklisted as we do not need to persist these to storage on the device.  All other state keys are persisted.
const persistConfig = {
  key: 'notification',
  storage,
  blacklist: ['loading','error','graphqlError','graphqlMessage', 'errorTitle']
}

export default persistReducer(persistConfig, notificationReducer);