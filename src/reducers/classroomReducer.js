import storage from 'redux-persist/lib/storage';
import {
  UPDATE_ALL_CLASSROOMS,
  UPDATE_ALL_DEMO_CLASSROOMS,
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
  RESET_STUDENT_PASSWORD_BEGIN,
  RESET_STUDENT_PASSWORD_SUCCESS,
  RESET_STUDENT_PASSWORD_FAILURE,
  RESET_STUDENT_PASSWORD_ERROR,
  CREATE_TEACHER_NO_CLASSROOMS,
  CREATE_CLASSROOM_COURSE_BEGIN,
  CREATE_CLASSROOM_COURSE_SUCCESS,
  CREATE_CLASSROOM_COURSE_FAILURE,
  CREATE_CLASSROOM_COURSE_ERROR,
  REMOVE_CLASSROOM_COURSE_BEGIN,
  REMOVE_CLASSROOM_COURSE_SUCCESS,
  REMOVE_CLASSROOM_COURSE_FAILURE,
  REMOVE_CLASSROOM_COURSE_ERROR,
  WEBSOCKET_QUIZSCORE_UPDATE,
} from '../ActionTypes/classroomActions';

import { WEBSOCKET_PORTFOLIO_UPDATE } from '../ActionTypes/portfolioActions';
import { WEBSOCKET_COMPETITION_UPDATE } from '../ActionTypes/competitionActions';
import { persistReducer } from 'redux-persist';
import { removeKey } from '../helper_functions/utilities';
import SymbolType from '../graphql/enums/SymbolTypes';

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
            emailVerified: null,
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
  },
  demoClassrooms: {
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
            emailVerified: null,
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
  demoClassroomCourses:{
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
     // this updates all of the classrooms and students in the demo classrooms state and is only called if a user logs out of the app 
     case UPDATE_ALL_DEMO_CLASSROOMS:
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
          demoClassrooms: action.payload.classrooms, 
          demoClassroomCourses: action.payload.classroomCourses,
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
    // HANDLES TEACHER RESETTING A STUDENTS PASSWORD
    case RESET_STUDENT_PASSWORD_BEGIN: 
      return {
        ...state,
        loading: true,
        error: null,
        graphqlError: null,
        errorTitle: null,
      }
    case RESET_STUDENT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        graphqlError: null,
        errorTitle: null,
      }
    case RESET_STUDENT_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        errorTitle: 'Failed To Reset Student Password',
      }
    case RESET_STUDENT_PASSWORD_ERROR:
      return {
        ...state,
        loading: false,
        graphqlError: action.payload.error,
        errorTitle: 'Error Resetting Student Password',
      }
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
    // this updates the Stock portfolio performance for a student in the classroom when a websocket portfolio performance update is received.
    case WEBSOCKET_PORTFOLIO_UPDATE:
      originalClassroomsObject = JSON.parse(JSON.stringify(state.classrooms));
      // need to iterate through all of the classrooms that the teacher has registered on the Teacher Portal in order to update the portfolio performance
      perf_loops:
      for (const classId in originalClassroomsObject){
        // next iterate through the studentList for the classroom
        for (const studentId in originalClassroomsObject[classId].studentList){
          if (action.portfolioType == SymbolType.US_Stock && action.portfolioID == originalClassroomsObject[classId].studentList[studentId].defaultStockPortfolioID){
            originalClassroomsObject[classId].studentList[studentId].stockPortfolioPerformance = action.totalPercentChange;
            break perf_loops;
          }
          else if (action.portfolioType == SymbolType.Crypto && action.portfolioID == originalClassroomsObject[classId].studentList[studentId].defaultCryptoPortfolioID){
            originalClassroomsObject[classId].studentList[studentId].cryptoPortfolioPerformance = action.totalPercentChange;
            break perf_loops;
          }  
        }
      }
      return {
        ...state,
        loading: false,
        error: null,
        graphqlError: null,
        errorTitle: null,
        classrooms: originalClassroomsObject,
      }
    // this updates the Stock competition performance for a student in the classroom when a websocket competition update is received.
    case WEBSOCKET_COMPETITION_UPDATE:
      originalClassroomsObject = JSON.parse(JSON.stringify(state.classrooms));
      // need to iterate through all of the classrooms that the teacher has registered on the Teacher Portal in order to update the competition performance
      comp_loops:
      for (const classId in originalClassroomsObject){   
        // iterate through the students in the classroom 
        for (const studentId in originalClassroomsObject[classId].studentList){
          if (action.portfolioType == SymbolType.US_Stock){
            for (const compId in originalClassroomsObject[classId].studentList[studentId].stockCompetitionsEntered){
              if (compId == action.participantInfo.competitionID){
                originalClassroomsObject[classId].studentList[studentId].stockCompetitionsEntered[compId].compRank = action.participantInfo.myRank;
                originalClassroomsObject[classId].studentList[studentId].stockCompetitionsEntered[compId].compPerformance = action.participantInfo.myPerformance;
                break comp_loops;
              }
            }
          }
          if (action.portfolioType == SymbolType.Crypto){
            for (const compId in originalClassroomsObject[classId].studentList[studentId].cryptoCompetitionsEntered){
              if (compId == action.participantInfo.competitionID){
                originalClassroomsObject[classId].studentList[studentId].cryptoCompetitionsEntered[compId].compRank = action.participantInfo.myRank;
                originalClassroomsObject[classId].studentList[studentId].cryptoCompetitionsEntered[compId].compPerformance = action.participantInfo.myPerformance;
                break comp_loops;
              }
            }
          }
        }
      }
      return {
        ...state,
        loading: false,
        error: null,
        graphqlError: null,
        errorTitle: null,
        classrooms: originalClassroomsObject,
      }  
    // this updates the Module assessment quiz scores for a student in the classroom when a websocket quiz score update is received.
    case WEBSOCKET_QUIZSCORE_UPDATE:
      originalClassroomsObject = JSON.parse(JSON.stringify(state.classrooms));
      // need to iterate through all of the classrooms that the teacher has registered on the Teacher Portal in order to update the competition performance
      quizscore_loops:
      for (const classId in originalClassroomsObject){   
        // iterate through the students in the classroom 
        for (const studentId in originalClassroomsObject[classId].studentList){
          if (action.studentUserID == studentId){
            for (const moduleId in originalClassroomsObject[classId].studentList[studentId].moduleAssessmentScores){
              if (action.moduleID == moduleId){
                originalClassroomsObject[classId].studentList[studentId].moduleAssessmentScores[moduleId].percentComplete = action.percentComplete;
                originalClassroomsObject[classId].studentList[studentId].moduleAssessmentScores[moduleId].percentCorrect = action.percentCorrect;
                for (const quizQuestionId in originalClassroomsObject[classId].studentList[studentId].moduleAssessmentScores[moduleId].questionResults){
                  if (action.quizQuestionId == quizQuestionId){
                    originalClassroomsObject[classId].studentList[studentId].moduleAssessmentScores[moduleId].questionResults[quizQuestionId].moduleQuestionNumber = action.moduleQuestionNumber;
                    originalClassroomsObject[classId].studentList[studentId].moduleAssessmentScores[moduleId].questionResults[quizQuestionId].studentAnswer = action.studentAnswer;
                    originalClassroomsObject[classId].studentList[studentId].moduleAssessmentScores[moduleId].questionResults[quizQuestionId].answerCorrect = action.answerCorrect;
                    originalClassroomsObject[classId].studentList[studentId].moduleAssessmentScores[moduleId].questionResults[quizQuestionId].noAttempts = action.noAttempts;
                    originalClassroomsObject[classId].studentList[studentId].moduleAssessmentScores[moduleId].questionResults[quizQuestionId].lastAttemptAt = action.lastAttemptAt;
                    break quizscore_loops;
                  }
                }
              }
            }
          }
        }
      }
      return {
        ...state,
        loading: false,
        error: null,
        graphqlError: null,
        errorTitle: null,
        classrooms: originalClassroomsObject,
      }
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
