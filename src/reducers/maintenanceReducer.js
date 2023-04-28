
import {
  IS_SCHEDULED_MAINTENANCE_BEGIN,
  IS_SCHEDULED_MAINTENANCE_SUCCESS,
  IS_SCHEDULED_MAINTENANCE_FAILURE,
  RESET_MAINTENANCE_STATE,
} from '../ActionTypes/maintenanceActions';

const initialState = {
  loading: true,
  maintenance: false,
  startDate: null,
  startTime: null,
  endDate: null,
  endTime: null,
  error: null,
  graphqlError: ''
};

export default function maintenanceReducer(state = initialState, action) {
  switch(action.type) {
    case IS_SCHEDULED_MAINTENANCE_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: null
      };

    case IS_SCHEDULED_MAINTENANCE_SUCCESS:
      // All done: set loading "false".
      // Also, replace the maintenance bool with the one from the server
      return {
        ...state,
        loading: false,
        maintenance: action.payload.isMaintenance.isMaintenance,
        startDate: action.payload.isMaintenance.startDate,
        startTime: action.payload.isMaintenance.startTime,
        endDate: action.payload.isMaintenance.endDate,
        endTime: action.payload.isMaintenance.endTime,
      };

    case IS_SCHEDULED_MAINTENANCE_FAILURE:
      // The request failed. It's done. So set loading to "false".
      // Save the error, so we can display it somewhere.
      // Since it failed, we don't have the isMaintenance bool from the server set maintenance to false.
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        maintenance: false
      };
    
    case RESET_MAINTENANCE_STATE:
      // Resets State To Initial State
      return {
        ...state,
        loading: false,
        maintenance: false,
        startDate: null,
        startTime: null,
        endDate: null,
        endTime: null,
        error: null,
        graphqlError: ''
      }

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}