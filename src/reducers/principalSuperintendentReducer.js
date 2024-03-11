import storage from 'redux-persist/lib/storage';
import {
  UPDATE_SCHOOL_TEACHER_SUMMARIES
} from '../ActionTypes/userDataActions';
import { LOGOUT_PRINCIPAL_SUPERINTENDENT,
    GET_PORTAL_USER_TYPE_BEGIN,
    GET_PORTAL_USER_TYPE_SUCCESS, 
    GET_PORTAL_USER_TYPE_ERROR,
    GET_PORTAL_USER_TYPE_FAILURE } from '../ActionTypes/loginActions';
import { persistReducer } from 'redux-persist';
import { removeKey } from '../helper_functions/utilities';

const initialState = {
  loading: false,
  error: null,
  graphqlError: null,
  errorTitle: null,
  lastRetrievedTime: new Date(),
  schoolTeacherSummaries: {
    'my school': {
      schoolId: 0,
      teacherSummaries:{
        id: 0,
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        picture: null,
        courses: {
          id: 0,
          courseName: '',
          createdAt: null,
          lastModifiedAt: null,
          isPrivate: false,
          courseModules: {
            id: 0,
            name: '',
            isPrivate: false,
            isRapunzlModule: true,
            teacherId: 0,
          },
        },
        dateJoined: null,
        lastUpdated: null,
        classrooms: {
          id: 0,
          className: '',
          classYear: null,
          createdAt: null,
          lastModifiedAt: null,
          noStudents: 0,
        },
        classroomCourses:{
          id: 0,
          classId: 0,
          className: '',
          courseId: 0,
          courseName: '',
          createdAt: null,
          isActive: true,
        }, 
      },
    },
  }
};

const principalSuperintendentReducer = (state = initialState, action) => {
  switch(action.type) {
    // this updates all of the teacher summaries for all of the schools.  If the user is a principal there will only be one school, but if the 
    // user is a Superintendent there may be many schools and their teachers
    case UPDATE_SCHOOL_TEACHER_SUMMARIES:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors.
      // eslint-disable-next-line
        return {
          ...state,
          loading: false,
          error: null,
          graphqlError: null,
          errorTitle: null,
          lastRetrievedTime: new Date(),
          schoolTeacherSummaries: action.payload.schoolTeacherSummaries,  
        };
     
     // the following 4 action types handle the dermining what type of Teacher Portal user has logged in.
     case GET_PORTAL_USER_TYPE_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors.
      return {
        ...state,
        loading: true,
        error: null,
        graphqlError: null,
        errorTitle: null,
      };

    case GET_PORTAL_USER_TYPE_SUCCESS:
      // All done: set loading "false".
      return {
        ...state,
        loading: false,
        error: null,
        graphqlError: null,
        errorTitle: null,      
      };
    
    case GET_PORTAL_USER_TYPE_ERROR:
      // The request did not fail, it did return, but it did generate a graphql error and some graphql
      // server generated error text that should be displayed to the user.
      // Save the graphql error to the redux store, so we can display it somewhere.
      return {
        ...state,
        loading: false,
        error: null,
        graphqlError: action.payload.error,
        errorTitle: 'Teacher Portal User Type Error',
      };
    
    case GET_PORTAL_USER_TYPE_FAILURE:
      // The request failed for some reason, perhaps network related, perhaps not. This not a graphql generated error. Set loading to "false".
      // Save the error, so we can display it somewhere.
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        graphqlError: null,
        errorTitle: 'User Login Failure',
      };

    case LOGOUT_PRINCIPAL_SUPERINTENDENT:
      // reset the state to it's initial state and remove the persisted data from disk
      storage.removeItem('persist:root.principalSuperintendent');
      return initialState;
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}

// the state keys below are blacklisted as we do not need to persist these to storage on the device.  All other state keys are persisted.
const persistConfig = {
  key: 'principalSuperintendent',
  storage,
  blacklist: ['loading','error','graphqlError','graphqlMessage', 'errorTitle']
}

export default persistReducer(persistConfig, principalSuperintendentReducer);
