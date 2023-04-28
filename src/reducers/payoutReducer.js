
// The Reducer Which Handles The Actual Requesting For Payouts is in userDataReducer because it updates the account balance.
// These cases are all handled in the payout reducer because we do not store any information related to payout history or account info on the device.
// This means that none of these reducers have payloads, with the exception of possible errors.

import {
  GET_PAYOUT_HISTORY_BEGIN,
  GET_PAYOUT_HISTORY_SUCCESS,
  GET_PAYOUT_HISTORY_FAILURE,
  GET_PAYOUT_HISTORY_ERROR,
  GET_PAYOUT_INFO_BEGIN,
  GET_PAYOUT_INFO_SUCCESS,
  GET_PAYOUT_INFO_FAILURE,
  GET_PAYOUT_INFO_ERROR,
  ADD_PAYOUT_INFO_BEGIN,
  ADD_PAYOUT_INFO_SUCCESS,
  ADD_PAYOUT_INFO_FAILURE,
  ADD_PAYOUT_INFO_ERROR,
} from '../ActionTypes/payoutActions';

const initialState = {
  loading: false,
  error: null,
  graphqlError: null,
  errorTitle: null,
  accName: null,
  routingNo: null,
  isChecking: null,
  isSavings: null,
};

export default function payoutReducer(state = initialState, action) {
  switch(action.type) {
    case GET_PAYOUT_HISTORY_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
        graphqlError: null,
        errorTitle: null,
      };
    case GET_PAYOUT_HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case GET_PAYOUT_HISTORY_FAILURE:
      return {
        ...state,
        loading: false,
        graphqlError: action.payload.error,
        errorTitle: 'Failure Getting Payout History'
      };
    case GET_PAYOUT_HISTORY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        errorTitle: 'Error Getting Payout History'
      };
    
    case GET_PAYOUT_INFO_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
        graphqlError: null,
        errorTitle: null,
      };
    case GET_PAYOUT_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        accName: action.payload.getPayoutInfo.accName,
        routingNo: action.payload.getPayoutInfo.routingNo,
        isChecking: action.payload.getPayoutInfo.isChecking,
        isSavings: action.payload.getPayoutInfo.isSavings,
      };
    case GET_PAYOUT_INFO_FAILURE:
      return {
        ...state,
        loading: false,
        graphqlError: action.payload.error,
        errorTitle: 'Failure Getting Payout Info'
      };
    case GET_PAYOUT_INFO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        errorTitle: 'Error Getting Payout Info'
      };

    case ADD_PAYOUT_INFO_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
        graphqlError: null,
        errorTitle: null,
      };
    case ADD_PAYOUT_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        accName: action.payload.accountName,
        routingNo: action.payload.routingNumber,
        isChecking: action.payload.isChecking,
        isSavings: action.payload.isSavings,
      };
    case ADD_PAYOUT_INFO_FAILURE:
      return {
        ...state,
        loading: false,
        graphqlError: action.payload.error,
        errorTitle: 'Failure Adding Payout Info'
      };
    case ADD_PAYOUT_INFO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        errorTitle: 'Error Adding Payout Info'
      };
    
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}