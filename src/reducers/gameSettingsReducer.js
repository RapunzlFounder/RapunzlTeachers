import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import SymbolTypes from '../graphql/enums/SymbolTypes';
import {
  UPDATE_LEVELS_STATE,
  UPDATE_XP_STATE,
  UPDATE_COIN_GRANTS,
  UPDATE_COIN_EVENT_GRANTS,
  CHANGE_CHART_TYPE,
  CHANGE_THEME,
  CHANGE_ASSET_TYPE,
  CHANGE_SEARCH_TYPE,
  CHANGE_COIN_DATE,
  // RESET_GAMESETTINGS,
  UPDATE_CHART_LOADED_STATE,
  LOGOUT_USER_SETTINGS,
  UPDATE_APP_VISIBLE,
  UPDATE_WEBSOCKET_CONNECTED,
  UPDATE_USE_ADMIN_GUI,
  SET_LANGUAGE
} from '../ActionTypes/gameSettingsActions';

const initialState = {
  loading: false,
  error: null,
  graphqlError: null,
  errorTitle: null,
  levels: null,
  xpEvents: null,
  coinGrantEvents: {},
  coinGrants: {},
  coinDate: null,
  appVersion: null,
  chartLoaded: false,
  chartType: 'LINE',
  searchType: 'SYMBOL',
  asset: SymbolTypes.US_Stock,
  theme: 'Light',
  appVisible: true,
  websocketConnected: false,
  useAdminGUI: false,
  language: localStorage.getItem('i18nextLng') || 'en-US'
};

const gameSettingsReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_LANGUAGE:
      localStorage.setItem('i18nextLng', action.payload); // Persist the language in local storage
      return {
        ...state,
        language: action.payload,
      }
    case UPDATE_USE_ADMIN_GUI:
      // Update the state to indicate if the Admin Gui is to be used or not
      return {
        ...state,
        useAdminGUI: action.payload.useAdminGUI,
      }
    case UPDATE_WEBSOCKET_CONNECTED:
      // Update the state to indicate if the Websocket is connected to the server or not
      return {
        ...state,
        websocketConnected: action.payload.websocketConnected,
      }
    case UPDATE_APP_VISIBLE:
      // Update the state to indicate if the WebApp is visible or not
      return {
        ...state,
        appVisible: action.payload.appVisible,
      }
    case CHANGE_CHART_TYPE:
      // Update the state of one key in the gameSettings portion of the overall state.
      return {
        ...state,
        chartType: action.payload.chartType,
      }
    case CHANGE_THEME:
      // Update thes tate of one key in the gameSettings portion of the overall state
      return {
        ...state,
        theme: action.payload.theme,
      }
    case CHANGE_ASSET_TYPE:
      // Update the state of one key in the gameSettings portion of the overall state.
      return {
        ...state,
        asset: action.payload.asset,
      }
    case CHANGE_SEARCH_TYPE:
      // Update the state of one key in the gameSettings portion
      return {
        ...state,
        searchType: action.payload.searchType,
      }
    case CHANGE_COIN_DATE:
      return {
        ...state,
        coinDate: action.payload.date,
      }
    case UPDATE_LEVELS_STATE:
      // Update the state of one key in the gameSettings portion of the overall state.
      return {
        ...state,
        levels: action.payload.levels,
      };  
    case UPDATE_XP_STATE:
      // Update the state of one key in the gameSettings portion of the overall state.
      return {
        ...state,
        xpEvents: action.payload.xpEvents,
      }; 

    case UPDATE_COIN_EVENT_GRANTS:
      // Update the state of one key in the gameSettings portion of the overall state.
      return {
        ...state,
        coinGrantEvents: action.payload.coinGrantEvents,
      };  

    case UPDATE_COIN_GRANTS:
      // Update the state of one key in the gameSettings portion of the overall state.
      return {
        ...state,
        coinGrants: action.payload.coinGrants,
      };  

    case UPDATE_CHART_LOADED_STATE:
      return {
        ...state,
        chartLoaded: action.payload.chartLoaded,
      };
    
        // reset the competition state to it's initial state
    case LOGOUT_USER_SETTINGS:
      // reset the game settings state to it's initial state and remove the persisted data from disk
      storage.removeItem('persist:root.gamesettings');
      return initialState;

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}

// the state keys below are blacklisted as we do not need to persist these to storage on the device.  All other state keys are persisted.
const persistConfig = {
  key: 'gamesettings',
  storage,
}

export default persistReducer(persistConfig, gameSettingsReducer);