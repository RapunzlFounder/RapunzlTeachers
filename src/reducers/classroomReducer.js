import storage from 'redux-persist/lib/storage';
import {
  UPDATE_ALL_CLASSROOMS,
  UPDATE_MINI_CLASSROOMS,
  // RESET_CLASSROOM_STATE,
  UPDATE_CLASSROOM_DATA_STATE,
  RESET_CLASSROOM_ERRORS,
  LOGOUT_USER_CLASSROOM,
  CREATE_CLASSROOM_BEGIN,
  CREATE_CLASSROOM_SUCCESS,
  CREATE_CLASSROOM_FAILURE,
  CREATE_CLASSROOM_ERROR,
  REMOVE_CLASSROOM_BEGIN,
  REMOVE_CLASSROOM_SUCCESS,
  REMOVE_CLASSROOM_FAILURE,
  REMOVE_CLASSROOM_ERROR,
  ADD_STUDENTS_BEGIN,
  ADD_STUDENTS_SUCCESS,
  ADD_STUDENTS_FAILURE,
  ADD_STUDENTS_ERROR,
  REMOVE_STUDENTS_BEGIN,
  REMOVE_STUDENTS_SUCCESS,
  REMOVE_STUDENTS_FAILURE,
  REMOVE_STUDENTS_ERROR,
  CREATE_TEACHER_NO_CLASSROOMS,
  CREATE_CLASSROOM_COURSE_BEGIN,
  CREATE_CLASSROOM_COURSE_SUCCESS,
  CREATE_CLASSROOM_COURSE_FAILURE,
  CREATE_CLASSROOM_COURSE_ERROR,
  REMOVE_CLASSROOM_COURSE_BEGIN,
  REMOVE_CLASSROOM_COURSE_SUCCESS,
  REMOVE_CLASSROOM_COURSE_FAILURE,
  REMOVE_CLASSROOM_COURSE_ERROR,
} from '../ActionTypes/classroomActions';
import { persistReducer } from 'redux-persist';
import { removeKey } from '../helper_functions/utilities';

const initialState = {
  loading: false,
  error: null,
  graphqlError: null,
  errorTitle: null,
  classroomLastRetrievedTime: new Date(),
  classrooms: {
    0: {
        id: 0,
        className: '',
        createdAt: null,
        lastModifiedAt: null,
        noStudents: 0,
        studentList: {
          0:{
            userId: 0,
            firstName: '',
            lastName: '',
            username: '',
            numberOfFriends: null,
            lastUpdated: null,
            numberOfStockTrades: null,
            numberOfStockPositions: null,
            defaultStockPortfolioID: null,	
            stockPortfolioPerformance: null,
            stockCompetitionsEntered: {
              0: {
                id: 0,
                title: '',
                status: null,
                startDate: null,
                startTime: null,
                endDate: null,
                endTime: null,
                competitorCount: null,
                compRank: null,
                compPerformance: null,
              }
            },
            numberOfCryptoTrades: null,
            numberOfCryptoPositions: null,
            cryptoPortfolioPerformance: null,	
            defaultCryptoPortfolioID: null,
            cryptoCompetitionsEntered: {
              0: {
                id: 0,
                title: '',
                status: null,
                startDate: null,
                startTime: null,
                endDate: null,
                endTime: null,
                competitorCount: null,
                compRank: null,
                compPerformance: null,
              }
            },
            moduleAssessmentScores: {
              0: {
                moduleId: 0,
                moduleName: '',
                percentComplete: 0,
                percentCorrect: 0,
                questionResults: {
                  0: {
                  quizQuestionId: 0,
                  moduleQuestionNumber: null,
                  studentAnswer: '',
                  answerCorrect: false,
                  noAttempts: 0,
                  lastAttemptAt: null
                  }
                }
              },
            },
          },
        }
      },
  },
  classroomCourses:{
    0: {
      id: 0,
			classId: null,
			className: '',
			courseId: null,
			courseName: '',
			createdAt: null,
			isActive: false
    }
  }
};

const classroomReducer = (state = initialState, action) => {
  switch(action.type) {
    // this creates an empty classrooms object and an empty classroomCourses object when the teacher user is first created
    case CREATE_TEACHER_NO_CLASSROOMS:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors.
      // eslint-disable-next-line
        return {
          ...state,
          loading: false,
          error: null,
          graphqlError: null,
          errorTitle: null,
          classrooms: {},
          classroomCourses: {},
        };
    // this updates all of the classrooms and students in the classrooms state and is only called if a user logs out of the app 
    case UPDATE_ALL_CLASSROOMS:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors.
      // eslint-disable-next-line
        return {
          ...state,
          loading: false,
          error: null,
          graphqlError: null,
          errorTitle: null,
          classroomLastRetrievedTime: new Date(),
          classrooms: action.payload.classrooms, 
          classroomCourses: action.payload.classroomCourses,
        };
     // this updates all of the Teacher classrooms and students in the classrooms state and is only called by the Teacher Mini Query
     case UPDATE_MINI_CLASSROOMS:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors.
      // eslint-disable-next-line
        return {
          ...state,
          loading: false,
          error: null,
          graphqlError: null,
          errorTitle: null,
          classroomLastRetrievedTime: new Date(),
          classrooms: action.payload.classrooms, 
        };
    // HANDLES CREATING A TEACHER CLASSROOM
    case CREATE_CLASSROOM_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
        graphqlError: null,
        errorTitle: null
      }
    case CREATE_CLASSROOM_SUCCESS:
      let originalClassroomsObject = JSON.parse(JSON.stringify(state.classrooms));
      originalClassroomsObject[action.payload.classroomObject.id] = action.payload.classroomObject;
      return {
        ...state,
        loading: false,
        error: null,
        graphqlError: null,
        errorTitle: null,
        classrooms: originalClassroomsObject,
      }
    case CREATE_CLASSROOM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        // graphqlError: 'There was a failure connecting to our servers to create your Classroom. Please contact support.'
        errorTitle: 'Failure Creating Teacher Classroom',
      };
    case CREATE_CLASSROOM_ERROR:
      return {
        ...state,
        loading: false,
        graphqlError: action.payload.error,
        // graphqlError: 'There was an error connecting to our servers to create your Classroom. Please contact support.'
        errorTitle: 'Error Creating Teacher Classroom',
      };
    // HANDLES REMOVING A TEACHER CLASSROOM
    case REMOVE_CLASSROOM_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
        graphqlError: null,
        errorTitle: null
      }
    case REMOVE_CLASSROOM_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        graphqlError: null,
        errorTitle: null,
        classrooms: action.payload.classroomsObject,
      }
    case REMOVE_CLASSROOM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        // graphqlError: 'There was a failure connecting to our servers to remove your Classroom. Please contact support.'
        errorTitle: 'Failure Removing Teacher Classroom',
      };
    case REMOVE_CLASSROOM_ERROR:
      return {
        ...state,
        loading: false,
        graphqlError: action.payload.error,
        // graphqlError: 'There was an error connecting to our servers to remove your Classroom. Please contact support.'
        errorTitle: 'Error Removing Teacher Classroom',
      };
    // HANDLES CREATING A TEACHER CLASSROOM COURSE
    case CREATE_CLASSROOM_COURSE_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
        graphqlError: null,
        errorTitle: null
      }
    case CREATE_CLASSROOM_COURSE_SUCCESS:
      let originalClassroomCoursesObject = JSON.parse(JSON.stringify(state.classroomCourses));
      originalClassroomCoursesObject[action.payload.classroomCourseObject.id] = action.payload.classroomCourseObject;
      return {
        ...state,
        loading: false,
        error: null,
        graphqlError: null,
        errorTitle: null,
        classroomCourses: originalClassroomCoursesObject,
      }
    case CREATE_CLASSROOM_COURSE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        // graphqlError: 'There was a failure connecting to our servers to create your Classroom Course. Please contact support.'
        errorTitle: 'Failure Creating Teacher Classroom Course',
      };
    case CREATE_CLASSROOM_COURSE_ERROR:
      return {
        ...state,
        loading: false,
        graphqlError: action.payload.error,
        // graphqlError: 'There was an error connecting to our servers to create your Classroom Course. Please contact support.'
        errorTitle: 'Error Creating Teacher Classroom Course',
      };
    // HANDLES REMOVING ONE OR MORE TEACHER CLASSROOM COURSES
    case REMOVE_CLASSROOM_COURSE_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
        graphqlError: null,
        errorTitle: null
      }
    case REMOVE_CLASSROOM_COURSE_SUCCESS:
      originalClassroomCoursesObject = JSON.parse(JSON.stringify(state.classroomCourses));
      // iterate over the array of classroomCourses that were removed and if they are in originalClassroomCourseObject remove them
      for (var i in action.payload.classroomCourseIdList){
        if (action.payload.classroomCourseIdList[i] in originalClassroomCoursesObject){
          const newClassroomCoursesObj = removeKey(originalClassroomCoursesObject, action.payload.classroomCourseIdList[i]);
          originalClassroomCoursesObject = newClassroomCoursesObj;
        }
      }
      return {
        ...state,
        loading: false,
        error: null,
        graphqlError: null,
        errorTitle: null,
        classroomCourses: originalClassroomCoursesObject,
      }
    case REMOVE_CLASSROOM_COURSE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        // graphqlError: 'There was a failure connecting to our servers to remove your Classroom Course. Please contact support.'
        errorTitle: 'Failure Removing Teacher Classroom Course',
      };
    case REMOVE_CLASSROOM_COURSE_ERROR:
      return {
        ...state,
        loading: false,
        graphqlError: action.payload.error,
        // graphqlError: 'There was an error connecting to our servers to remove your Classroom Course. Please contact support.'
        errorTitle: 'Error Removing Teacher Classroom Course',
      };
    // HANDLES ADDING ONE OR MORE STUDENTS TO AN EXISTING CLASSROOM
    case ADD_STUDENTS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
        graphqlError: null,
        errorTitle: null
      }
    case ADD_STUDENTS_SUCCESS:
      let originalClassroomsObject2 = JSON.parse(JSON.stringify(state.classrooms));
      originalClassroomsObject2[action.payload.classroomObject.id] = action.payload.classroomObject;
      return {
        ...state,
        loading: false,
        error: null,
        graphqlError: null,
        errorTitle: null,
        classrooms: originalClassroomsObject2,
      }
    case ADD_STUDENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        // graphqlError: 'There was a failure connecting to our servers to add Students to your Classroom. Please contact support.'
        errorTitle: 'Failure Adding Students to Classroom',
      };
    case ADD_STUDENTS_ERROR:
      return {
        ...state,
        loading: false,
        graphqlError: action.payload.error,
        // graphqlError: 'There was an error connecting to our servers to add students to your classroom. Please contact support.'
        errorTitle: 'Error Adding Students to Classroom',
      };
    // HANDLES REMOVING ONE OR MORE STUDENTS FROM AN EXISTING CLASSROOM
    case REMOVE_STUDENTS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
        graphqlError: null,
        errorTitle: null
      }
    case REMOVE_STUDENTS_SUCCESS:
      let originalClassroomsObject3 = JSON.parse(JSON.stringify(state.classrooms));
      originalClassroomsObject3[action.payload.classroomObject.id] = action.payload.classroomObject;
      return {
        ...state,
        loading: false,
        error: null,
        graphqlError: null,
        errorTitle: null,
        classrooms: originalClassroomsObject3,
      }
    case REMOVE_STUDENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        // graphqlError: 'There was a failure connecting to our servers to remove Students from your Classroom. Please contact support.'
        errorTitle: 'Failure Removing Students from Classroom',
      };
    case REMOVE_STUDENTS_ERROR:
      return {
        ...state,
        loading: false,
        graphqlError: action.payload.error,
        // graphqlError: 'There was an error connecting to our servers to remove students from your classroom. Please contact support.'
        errorTitle: 'Error Removing Students from Classroom',
      };
    
    case UPDATE_CLASSROOM_DATA_STATE:
        return {
          ...state,
          [action.name]: action.status,
          error: null,
          graphqlError: null,
          errorTitle: null,
        }; 
    // This action resets any errors that were produced by a graphql query or mutation so that the user pop up message only displays once
    case RESET_CLASSROOM_ERRORS:
        return{
          ...state,
          graphqlError: null,
          error: null,
          errorTitle: null,
        };
    case LOGOUT_USER_CLASSROOM:
      // reset the portfolio state to it's initial state and remove the persisted data from disk
      storage.removeItem('persist:root.classroom');
      return initialState;
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}

// the state keys below are blacklisted as we do not need to persist these to storage on the device.  All other state keys are persisted.
const persistConfig = {
  key: 'classroom',
  storage,
  blacklist: ['loading','error','graphqlError','graphqlMessage', 'errorTitle']
}

export default persistReducer(persistConfig, classroomReducer);