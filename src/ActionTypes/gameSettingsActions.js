export const UPDATE_LEVELS_STATE = 'UPDATE_LEVELS_STATE';
export const UPDATE_XP_STATE = 'UPDATE_XP_STATE';
export const UPDATE_COIN_EVENT_GRANTS = 'UPDATE_COIN_EVENT_GRANTS';
export const UPDATE_COIN_GRANTS = 'UPDATE_COIN_GRANTS';
export const CHANGE_CHART_TYPE = 'CHANGE_CHART_TYPE';
export const CHANGE_THEME = 'CHANGE_THEME';
export const CHANGE_ASSET_TYPE = 'CHANGE_ASSET_TYPE';
export const CHANGE_SEARCH_TYPE = 'CHANGE_SEARCH_TYPE';
export const CHANGE_COIN_DATE = 'CHANGE_COIN_DATE';
export const RESET_GAMESETTINGS = 'RESET_GAMESETTINGS';
export const UPDATE_CHART_LOADED_STATE = 'UPDATE_CHART_LOADED_STATE';
export const LOGOUT_USER_SETTINGS = 'LOGOUT_USER_SETTINGS';
export const UPDATE_APP_VISIBLE = 'UPDATE_APP_VISIBLE';
export const UPDATE_WEBSOCKET_CONNECTED = 'UPDATE_WEBSOCKET_CONNECTED';
export const UPDATE_USE_ADMIN_GUI = 'UPDATE_USE_ADMIN_GUI';
export const SET_LANGUAGE = 'SET_LANGUAGE';

// this updates the language property of the gamesettings state.
export const setLanguage = (language) => ({
    type: SET_LANGUAGE,
    payload: language,
});
// this updates Whether or not the regular Teacher Gui or the Administrator (Principal or Superintendent) Gui is being used
export const updateUseAdminGui = (useAdminGUI) => ({
    type: UPDATE_USE_ADMIN_GUI,
    payload: { useAdminGUI },
});

// this updates Whether or not the Websocket is connected
export const updateWebsocketConnected = (websocketConnected) => ({
    type: UPDATE_WEBSOCKET_CONNECTED,
    payload: { websocketConnected },
});

// this updates Whether or not the WebApp is visible
export const updateIsVisible = (appVisible) => ({
    type: UPDATE_APP_VISIBLE,
    payload: { appVisible },
});

// this updates the levels property of the gamesettings state.  
export const updateLevelsState = (levels) => ({
    type: UPDATE_LEVELS_STATE,
    payload: { levels },
});

// this updates the xpEvents property of the gamesettings state.  
export const updatXPEventsState = (xpEvents) => ({
    type: UPDATE_XP_STATE,
    payload: { xpEvents },
});

// this updates the coinGrantEvents property of the gamesettings state.  
export const updatCoinGrantEventsState = (coinGrantEvents) => ({
    type: UPDATE_COIN_EVENT_GRANTS,
    payload: { coinGrantEvents },
});

// this updates the coinGrants property of the gamesettings state, ie the coin grtants that the user has actually received  
export const updatCoinGrantsState = (coinGrants) => ({
    type: UPDATE_COIN_GRANTS,
    payload: { coinGrants },
});

// this updates the chartType property of the gamesettings state between LINE, OHLC, CANDLESTICK
export const changeChartType = (chartType) => ({
    type: CHANGE_CHART_TYPE,
    payload: { chartType },
});

// this updates the theme property of the gamesettings state between Light and Dark
export const changeTheme = (theme) => ({
    type: CHANGE_THEME,
    payload: { theme },
});

// this updates the asset property of the gamesettings state between equities and crypto
export const changeAssetType = (asset) => ({
    type: CHANGE_ASSET_TYPE,
    payload: { asset },
});

// this updates the searchType property of the gamesettings between NAME & SYMBOL
export const changeSearchType = (searchType) => ({
    type: CHANGE_SEARCH_TYPE,
    payload: { searchType },
})

// this updates the coinDate propety of the gamesettings state to determine when user receives next coin
export const changeCoinDate = (date) => ({
    type: CHANGE_COIN_DATE,
    payload: { date },
})

// action to reset the gamesettings state to it's initial state
export const resetGameSettingsState = () => ({
    type: RESET_GAMESETTINGS,
  });

// this updates the chartLoaded gamesettings state.  
export const updateChartLoadedState = (chartLoaded) => ({
    type: UPDATE_CHART_LOADED_STATE,
    payload: { chartLoaded },
});

export const logoutUserSettings = () => ({
    type: LOGOUT_USER_SETTINGS,
  });
