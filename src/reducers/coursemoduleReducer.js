import storage from 'redux-persist/lib/storage';
import {
  UPDATE_ALL_COURSES,
  UPDATE_PUBLIC_MODULES,
  UPDATE_TEACHER_MODULES,
  CREATE_TEACHER_NO_COURSES_MODULES,
  // RESET_COURSEMODULE_STATE,
  CREATE_COURSE_BEGIN,
  CREATE_COURSE_SUCCESS,
  CREATE_COURSE_FAILURE,
  CREATE_COURSE_ERROR,
  ADD_COURSE_MODULE_BEGIN,
  ADD_COURSE_MODULE_SUCCESS,
  ADD_COURSE_MODULE_FAILURE,
  ADD_COURSE_MODULE_ERROR,
  REMOVE_COURSE_MODULE_BEGIN,
  REMOVE_COURSE_MODULE_SUCCESS,
  REMOVE_COURSE_MODULE_FAILURE,
  REMOVE_COURSE_MODULE_ERROR,
  UPDATE_COURSEMODULE_DATA_STATE,
  RESET_COURSEMODULE_ERRORS,
  LOGOUT_USER_COURSEMODULE,
  GET_FINLITSTANDARDS_BEGIN,
  GET_FINLITSTANDARDS_SUCCESS,
  GET_FINLITSTANDARDS_FAILURE,
  GET_FINLITSTANDARDS_ERROR,
  GET_MODULES_BEGIN,
  GET_MODULES_SUCCESS,
  GET_MODULES_FAILURE,
  GET_MODULES_ERROR
} from '../ActionTypes/coursemoduleActions';
import {
  SEARCH_PORTAL_ASSETS_ERROR,
  SEARCH_PORTAL_ASSETS_FAILURE
} from '../ActionTypes/searchActions';

import { persistReducer } from 'redux-persist';

const initialState = {
  loading: false,
  error: null,
  graphqlError: null,
  errorTitle: null,
  availablePublicModules: {},
  teacherCreatedModules: {},
  teacherCourses: {},
  financialLiteracyStandards: {},
};

const coursemoduleReducer = (state = initialState, action) => {
  switch(action.type) {
    // this creates an empty teacherCreatedModules object and an empty teacherCourses object when the teacher user is first created
    case CREATE_TEACHER_NO_COURSES_MODULES:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors.
      // eslint-disable-next-line
        return {
          ...state,
          loading: false,
          error: null,
          graphqlError: null,
          errorTitle: null,
          teacherCreatedModules: {},
          teacherCourses: {},
        };
    // this updates all of the teacherCourses state and is only called if a user logs out of the app
    case UPDATE_ALL_COURSES:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors.
      // eslint-disable-next-line
        return {
          ...state,
          loading: false,
          error: null,
          graphqlError: null,
          errorTitle: null,
          teacherCourses: action.payload.coursesObject,
        };
    // this updates all of the coursesmodules state and is only called if a user logs out of the app or creates a new account
    case UPDATE_TEACHER_MODULES:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors.
      // eslint-disable-next-line
        return {
          ...state,
          loading: false,
          error: null,
          graphqlError: null,
          errorTitle: null,
          teacherCreatedModules:action.payload.teacherModulesObject,
        };
    // HANDLES CREATING A TEACHER COURSE
    case CREATE_COURSE_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
        graphqlError: null,
        errorTitle: null
      }
    case CREATE_COURSE_SUCCESS:
      // create a new object for the teacherCourses state property.
      // This must be a deep copy to preserve the immutability of state objects.
      let originalCoursesObject = JSON.parse(JSON.stringify(state.teacherCourses));
      // add the newly created Teacher Course
      originalCoursesObject[action.payload.courseId] = action.payload.courseObject;
      
      return {
        ...state,
        loading: false,
        error: null,
        graphqlError: null,
        errorTitle: null,
        teacherCourses: originalCoursesObject,
      }
    case CREATE_COURSE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        // graphqlError: 'There was a failure connecting to our servers to create your New Course. Please contact support.'
        errorTitle: 'Failure Creating New Course',
      };
    case CREATE_COURSE_ERROR:
      return {
        ...state,
        loading: false,
        graphqlError: action.payload.error,
        // graphqlError: 'There was an error connecting to our servers to create your New Course. Please contact support.'
        errorTitle: 'Error Creating New Course',
      };
    // HANDLES ADDING MODULES TO A TEACHER COURSE
    case ADD_COURSE_MODULE_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
        graphqlError: null,
        errorTitle: null
      }
    case ADD_COURSE_MODULE_SUCCESS:
      // create a new object for the teacherCourses state property.
      // This must be a deep copy to preserve the immutability of state objects.
      originalCoursesObject = JSON.parse(JSON.stringify(state.teacherCourses));
      // add the newly created Teacher Course
      originalCoursesObject[action.payload.courseId] = action.payload.courseObject;
      
      return {
        ...state,
        loading: false,
        error: null,
        graphqlError: null,
        errorTitle: null,
        teacherCourses: originalCoursesObject,
      }
    case ADD_COURSE_MODULE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        // graphqlError: 'There was a failure connecting to our servers to add modules to your Course. Please contact support.'
        errorTitle: 'Failure Adding Module To Course',
      };
    case ADD_COURSE_MODULE_ERROR:
      return {
        ...state,
        loading: false,
        graphqlError: action.payload.error,
        // graphqlError: 'There was an error connecting to our servers to add modules to your Course. Please contact support.'
        errorTitle: 'Error Adding Module To Course',
      };
    // HANDLES REMOVING MODULES FROM A TEACHER COURSE
    case REMOVE_COURSE_MODULE_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
        graphqlError: null,
        errorTitle: null
      }
    case REMOVE_COURSE_MODULE_SUCCESS:
      // create a new object for the teacherCourses state property.
      // This must be a deep copy to preserve the immutability of state objects.
      originalCoursesObject = JSON.parse(JSON.stringify(state.teacherCourses));
      // add the newly created Teacher Course
      originalCoursesObject[action.payload.courseId] = action.payload.courseObject;
      
      return {
        ...state,
        loading: false,
        error: null,
        graphqlError: null,
        errorTitle: null,
        teacherCourses: originalCoursesObject,
      }
    case REMOVE_COURSE_MODULE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        // graphqlError: 'There was a failure connecting to our servers to remove a module from your Course. Please contact support.'
        errorTitle: 'Failure Removing Module From Course',
      };
    case REMOVE_COURSE_MODULE_ERROR:
      return {
        ...state,
        loading: false,
        graphqlError: action.payload.error,
        // graphqlError: 'There was an error connecting to our servers to remove a module from your Course. Please contact support.'
        errorTitle: 'Error Removing Module From Course',
      };
    // HANDLES GETTING THE FINANCIAL LITERACY STANDARDS
    case GET_FINLITSTANDARDS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
        graphqlError: null,
        errorTitle: null
      }
    case GET_FINLITSTANDARDS_SUCCESS:     
      return {
        ...state,
        loading: false,
        error: null,
        graphqlError: null,
        errorTitle: null,
        financialLiteracyStandards: action.payload.standardsObject
      } 
    case GET_FINLITSTANDARDS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        // graphqlError: 'There was a failure connecting to our servers to retrieve the Financial Literacy Standards. Please contact support.'
        errorTitle: 'Failure Retrieving Financial Literacy Standards',
      };
    case GET_FINLITSTANDARDS_ERROR:
      return {
        ...state,
        loading: false,
        graphqlError: action.payload.error,
        // graphqlError: 'There was an error connecting to our servers to retrieve the Financial Literacy Standards. Please contact support.'
        errorTitle: 'Error Retrieving Financial Literacy Standards',
      }; 
    // HANDLES GETTING THE TEACHER PORTAL MODULES
    case GET_MODULES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
        graphqlError: null,
        errorTitle: null
      }
    case GET_MODULES_SUCCESS:    
      let originaPublicModulesObject = JSON.parse(JSON.stringify(state.availablePublicModules));
      let originaTeacherModulesObject = JSON.parse(JSON.stringify(state.teacherCreatedModules));
      // iterate over the module id keys in the modulesObject
      for (var key in action.modulesObject) {
        // if the module is a Rapunzl created module add it  to the originaPublicModulesObject
        if (action.modulesObject[key].isRapunzlModule){
          originaPublicModulesObject[key] = action.modulesObject[key];
        }
        else{
          originaTeacherModulesObject[key] = action.modulesObject[key];
        }
      }
      return {
        ...state,
        loading: false,
        error: null,
        graphqlError: null,
        errorTitle: null,
        availablePublicModules: originaPublicModulesObject,
        teacherCreatedModules: originaTeacherModulesObject,
      } 
    case GET_MODULES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        errorTitle: 'Failure Retrieving Teacher Portal Modules',
      };
    case GET_MODULES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        errorTitle: 'Error Retrieving Teacher Portal Modules'
      }
    // this updates availablePublicModules portion of the coursesmodules state and is called when a user creates a new account
    case UPDATE_PUBLIC_MODULES:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors.
      // eslint-disable-next-line
        return {
          ...state,
          loading: false,
          error: null,
          graphqlError: null,
          errorTitle: null,
          availablePublicModules: action.payload.publicModulesObject, 
        };
    case UPDATE_COURSEMODULE_DATA_STATE:
        // Update the state of one key in the coursesmodules of the overall state.
        return {
          ...state,
          [action.name]: action.status,
          error: null,
          graphqlError: null,
          errorTitle: null,
        }; 
    case SEARCH_PORTAL_ASSETS_FAILURE:
          return {
            ...state,
            loading: false,
            error: action.payload.error,
            errorTitle: 'Search Teacher Portal Assets Failure'
          };
    case SEARCH_PORTAL_ASSETS_ERROR:
          return {
            ...state,
            loading: false,
            graphqlError: action.payload.error,
            errorTitle: 'Search Teacher Portal Assets Error'
          };
    // This action resets any errors that were produced by a graphql query or mutation so that the user pop up message only displays once
    case RESET_COURSEMODULE_ERRORS:
        return{
          ...state,
          graphqlError: null,
          error: null,
          errorTitle: null,
        };
    case LOGOUT_USER_COURSEMODULE:
      // reset the portfolio state to it's initial state and remove the persisted data from disk
      storage.removeItem('persist:root.coursesmodules');
      return initialState;
    default:
      // ALWAYS have a default case in a reducer
      return state;
    }
}

// the state keys below are blacklisted as we do not need to persist these to storage on the device.  All other state keys are persisted.
const persistConfig = {
  key: 'coursesmodules',
  storage,
  blacklist: ['loading','error','graphqlError','graphqlMessage', 'errorTitle']
}

export default persistReducer(persistConfig, coursemoduleReducer);