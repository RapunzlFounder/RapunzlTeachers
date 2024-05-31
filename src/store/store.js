//src/store.js
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { APP_ENV } from '../constants/index'
// Imports: Redux
import rootReducer from '../reducers/index';

// Middleware: Redux Persist Config
const persistConfig = {
  key: 'root',
  storage,
  // ensure that the state merging goes down 2 levels so that if a new key is introduced into 
  // the state for a new build it does not get removed when the original state is retrieved from storage
  stateReconciler: autoMergeLevel2,
  // Whitelist (Save Specific Reducers)
  whitelist: [
    'userDataReducer', 'notificationReducer', 'productReducer', 'coursemoduleReducer', 'classroomReducer', 'firstVisitReducer', 
    'gameSettingsReducer', 'educationReducer', 'principalSuperintendentReducer', 
  ],
  // Blacklist (Don't Save Specific Reducers)
  blacklist: [
    'maintenanceReducer',
  ],
};

// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Redux: Store
export const store = configureStore({
  reducer: persistedReducer,
  devTools: APP_ENV !== 'Production',
  middleware: [thunk]
});

// Middleware: Redux Persist Persister
export const persistor = persistStore(store);
