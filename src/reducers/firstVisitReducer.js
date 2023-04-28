import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { UPDATE_FIRSTVISIT_STATE, RESET_FIRSTVISIT } from '../ActionTypes/firstVisitActions';

const initialState = {
  competitionScreen: true,
  educationScreen: true,
  firstUpgrade: true,
  newsScreen: true,
  searchScreen: true,
  stockScreen: true,
  tradeScreen: true,
  dailyPicksTutorial: true,
  gracePeriod: true,
  upcomingExpiration: true,
  // Checks Up To 3 Times - Every Session, Then 1 A Week Later
  addBirthdayModal: 1,
  addBirthdayTime: null,
  // Checks Up To 4 Times - Every Day
  addPhoneNumberModal: 1,
  addPhoneNumberTime: null,
  // Checks Up To 5 Times - Once Per Day (3) & Then Every Other Day
  addNotificationsModal: 1,
  addNotificationsTime: null,
  // Checks Up To 3 Times - Every 5 Days
  addProfilePictureModal: 1,
  addProfilePictureTime: null,
  // Checks Up To 5 Times - Every 3 Days
  checkQuizPrizesModal: 1,
  checkQuizPrizesTime: null,
};

const firstVisitReducer = (state = initialState, action) => {
  switch(action.type) {
    case UPDATE_FIRSTVISIT_STATE:
      // Update the state of one key in the userDetails portion of the overall state.
      return {
        ...state,
        [action.name]: action.status,
      };  

    case RESET_FIRSTVISIT:
        // reset the firstvisit state to it's initial state
        storage.removeItem('persist:root.firstvisit');
        return initialState;

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}

// the state keys below are blacklisted as we do not need to persist these to storage on the device.  All other state keys are persisted.
const persistConfig = {
  key: 'firstvisit',
  storage,
}

export default persistReducer(persistConfig, firstVisitReducer);