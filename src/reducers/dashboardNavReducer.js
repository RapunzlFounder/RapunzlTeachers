import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import {
  UPDATE_DASHBOARD_STATE,
  SET_MENU_TAB,
  QUICK_ACCESS_ADD_STUDENTS,
  QUICK_ACCESS_COURSE_BUILDER,
  TOGGLE_ADD_STUDENTS,
  TOGGLE_COURSE_BUILDER,
  SELECT_CLASSROOM,
  VIEW_ASSIGNED_CLASS,
  RESET_DASHBOARD,
} from '../ActionTypes/dashboardActions';

const initialState = {
  visibleTab: 1,
  previousTab: null,
  courseBuilderVisible: false,
  addingStudents: false,
  creatingClassroom: false,
  selectedClassroom: false,
  expandedLibrary: false,
  pdfVisible: false
};

const dashboardNavReducer = (state = initialState, action) => {
  switch(action.type) {
    case UPDATE_DASHBOARD_STATE:
      // Update the state of one key in the userDetails portion of the overall state.
      return {
        ...state,
        [action.name]: action.status,
      };
    
    case SET_MENU_TAB:
      return {
        ...state,
        visibleTab: action.visibleTab,
        previousTab: state.visibleTab,
        courseBuilderVisible: false,
        addingStudents: false,
        creatingClassroom: false,
        selectedClassroom: null
      }

    case QUICK_ACCESS_ADD_STUDENTS:
      return {
        ...state,
        visibleTab: 3,
        previousTab: state.visibleTab,
        courseBuilderVisible: false,
        addingStudents: true,
        creatingClassroom: true,
        selectedClassroom: null
      }

    case QUICK_ACCESS_COURSE_BUILDER:
      return {
        ...state,
        visibleTab: 2,
        previousTab: state.visibleTab,
        courseBuilderVisible: true,
        addingStudents: false,
        creatingClassroom: false,
        selectedClassroom: null,
      }

    case SELECT_CLASSROOM:
      return {
        ...state,
        selectedClassroom: action.classID
      }

    case TOGGLE_ADD_STUDENTS: 
      return {
        ...state,
        visibleTab: 3,
        previousTab: state.visibleTab,
        courseBuilderVisible: false,
        addingStudents: !state.addingStudents,
        creatingClassroom: false,
        selectedClassroom: state.selectedClassroom
      }
    
    case TOGGLE_COURSE_BUILDER:
      return {
        ...state,
        visibleTab: 2,
        previousTab: state.visibleTab,
        courseBuilderVisible: !state.courseBuilderVisible,
        addingStudents: false,
        creatingClassroom: false,
        selectedClassroom: null
      }
    
    case VIEW_ASSIGNED_CLASS:
      return {
        ...state,
        visibleTab: 3,
        previousTab: state.visibleTab,
        courseBuilderVisible: false,
        addingStudents: false,
        creatingClassroom: false,
        selectedClassroom: action.classID
      }
    
    case RESET_DASHBOARD:
        // reset the firstvisit state to it's initial state
        storage.removeItem('persist:root.dashboard');
        return initialState;

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}

// the state keys below are blacklisted as we do not need to persist these to storage on the device.  All other state keys are persisted.
const persistConfig = {
  key: 'dashboard',
  storage,
}

export default persistReducer(persistConfig, dashboardNavReducer);