// import the GraphQL query text needed to check if there is scheduled maintenance
import { IS_SCHEDULED_MAINTENANCE } from '../graphql/queries/IsScheduledMaintenance';
import axios from 'axios';
import { GRAPHQL_URL } from "../constants";

export const IS_SCHEDULED_MAINTENANCE_BEGIN = 'IS_SCHEDULED_MAINTENANCE_BEGIN';
export const IS_SCHEDULED_MAINTENANCE_SUCCESS = 'IS_SCHEDULED_MAINTENANCE_SUCCESS';
export const IS_SCHEDULED_MAINTENANCE_FAILURE = 'IS_SCHEDULED_MAINTENANCE_FAILURE';
export const IS_SCHEDULED_MAINTENANCE_ERROR = 'IS_SCHEDULED_MAINTENANCE_ERROR';
export const RESET_MAINTENANCE_STATE = 'RESET_MAINTENANCE_STATE';
//export const HTTP_ERROR = 'HTTP_ERROR';

export const fetchMaintenanceBegin = () => ({
  type: IS_SCHEDULED_MAINTENANCE_BEGIN,
});

export const fetchMaintenanceSuccess = isMaintenance => ({
  type: IS_SCHEDULED_MAINTENANCE_SUCCESS,
  payload: { isMaintenance },
});

export const fetchMaintenanceFailure = error => ({
  type: IS_SCHEDULED_MAINTENANCE_FAILURE,
  payload: { error },
});

export const fetchMaintenanceError = error => ({
  type: IS_SCHEDULED_MAINTENANCE_ERROR,
  payload: { error },
});

// action to reset the maintenance state to it's initial state
export const resetMaintenanceState = () => ({
  type: RESET_MAINTENANCE_STATE,
});
//export const httpError = (errorText) => ({
//  type: HTTP_ERROR,
//  errorText
//});

// function to dispatch redux actions to get a response from the graphql query isScheduledMaintenance
export function fetchMaintenance() {
  return function(dispatch){
    dispatch(fetchMaintenanceBegin());
    return axios.post(GRAPHQL_URL, { query: IS_SCHEDULED_MAINTENANCE }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((json) => {
        if ('errors' in json.data) {
          dispatch(fetchMaintenanceError(json.data.errors[0].message));
          return {errors: json.errors};
        }
        else{
          dispatch(fetchMaintenanceSuccess(json.data.data.isScheduledMaintenance));
          return json.data.data.isScheduledMaintenance;
        }
      })
      .catch(error => dispatch(fetchMaintenanceFailure(error.message)));
  };
}

// Handle HTTP errors since fetch won't.
//function handleErrors(response) {
//  if (!response.ok) {
//    dispatch(httpError("A Network Error has occurred. " + response.statusText));
//  }
//  return response;
//}
