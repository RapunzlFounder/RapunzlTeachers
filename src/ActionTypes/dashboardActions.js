
export const UPDATE_DASHBOARD_STATE = 'UPDATE_DASHBOARD_STATE';
export const SET_MENU_TAB = 'SET_MENU_TAB';
export const RESET_DASHBOARD = 'RESET_DASHBOARD';
export const QUICK_ACCESS_ADD_STUDENTS = 'QUICK_ACCESS_ADD_STUDENTS';
export const QUICK_ACCESS_COURSE_BUILDER = 'QUICK_ACCESS_COURSE_BUILDER';
export const SELECT_CLASSROOM = 'SELECT_CLASSROOM';
export const TOGGLE_ADD_STUDENTS = 'TOGGLE_ADD_STUDENTS';
export const TOGGLE_COURSE_BUILDER = 'TOGGLE_COURSE_BUILDER';
export const VIEW_ASSIGNED_CLASS = 'VIEW_ASSIGNED_CLASS'

// this updates an individual property of the firstvisit state. eg to change the state property of an individual screen 
export const updateDashboard = (name, status) => ({
  type: UPDATE_DASHBOARD_STATE,
  name,
  status
});

// This updates the Main Menu Tab Selected On The Left Side Of The Dashboard
export const setMenuTab = (visibleTab) => ({
  type: SET_MENU_TAB,
  visibleTab
});

export const quickAccessAddStudents = () => ({
  type: QUICK_ACCESS_ADD_STUDENTS,
});

export const quickAccessCourseBuilder = () => ({
  type: QUICK_ACCESS_COURSE_BUILDER,
});

export const selectClassroom = (classID) => ({
  type: SELECT_CLASSROOM,
  classID
});

export const toggleAddStudents = () => ({
  type: TOGGLE_ADD_STUDENTS,
});

export const toggleCourseBuilder = () => ({
  type: TOGGLE_COURSE_BUILDER,
});

export const viewAssignedClass = (classID) => ({
  type: VIEW_ASSIGNED_CLASS,
  classID
});

// action to reset the firstvisit state to it's initial state
export const resetDashboard = () => ({
  type: RESET_DASHBOARD,
});

