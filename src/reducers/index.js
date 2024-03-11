// Imports: Dependencies
import { combineReducers } from 'redux';
// Imports: Reducers
import maintenanceReducer from './maintenanceReducer';
import coursemoduleReducer from './coursemoduleReducer';
import classroomReducer from './classroomReducer';
import userDataReducer from './userDataReducer';
import educationReducer from './educationReducer';
import productReducer from './productReducer';
import notificationReducer from './notificationReducer';
import firstVisitReducer from './firstVisitReducer';
import gameSettingsReducer from './gameSettingsReducer';
import payoutReducer from './payoutReducer';
import supportReducer from './supportReducer';
import socialReducer from './socialReducer';
import dashboardNavReducer from './dashboardNavReducer';
import principalSuperintendentReducer from './principalSuperintendentReducer';

// Redux: Root Reducer
const rootReducer = combineReducers({
  classroom: classroomReducer,
  coursesmodules: coursemoduleReducer,
  dashboard: dashboardNavReducer,
  education: educationReducer,
  firstvisit: firstVisitReducer,
  gamesettings: gameSettingsReducer,
  maintenance: maintenanceReducer,
  notification: notificationReducer,
  payout: payoutReducer,
  product: productReducer,
  socialReducer: socialReducer,
  support: supportReducer,
  userDetails: userDataReducer,
  principalSuperintendent: principalSuperintendentReducer,
});

// Exports
export default rootReducer;