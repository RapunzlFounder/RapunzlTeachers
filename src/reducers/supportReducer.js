
import {
  CONTACT_SUPPORT_BEGIN,
  CONTACT_SUPPORT_SUCCESS,
  CONTACT_SUPPORT_FAILURE,
  CONTACT_SUPPORT_ERROR,
} from '../ActionTypes/settingsAction';

const initialState = {
  loading: false,
  error: null,
  graphqlError: null,
  errorTitle: null,
};

export default function supportReducer(state = initialState, action) {
  switch(action.type) {
    case CONTACT_SUPPORT_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
        graphqlError: null,
        errorTitle: null,
      };

    case CONTACT_SUPPORT_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case CONTACT_SUPPORT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        errorTitle: 'Failure Sending Message',
      };

    case CONTACT_SUPPORT_ERROR:
      return {
        ...state,
        loading: false,
        graphqlError: action.payload.error,
        errorTitle: 'Error Sending Message',
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}