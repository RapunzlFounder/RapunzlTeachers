import axios from 'axios';
import { GRAPHQL_URL } from "../constants";
// import the GraphQL query text needed to retrieve the user big query data
import { USER_DETAILS } from '../graphql/queries/UserDetails';
import { ADMINISTRATOR_USER_DETAILS } from '../graphql/queries/AdministratorUserDetails';
import { MINI_USER_DETAILS } from '../graphql/queries/MiniUserDetails';
import { GET_SCHOOL_LIST } from '../graphql/queries/GetSchoolList';
import { COMPLETE_QUIZ } from '../graphql/mutations/CompleteQuiz';
import { IS_LOGOUT_REQUIRED } from '../graphql/queries/isLogoutRequired';
// import the action to update all of the courses and modules
import { updateAllCourses, updateAllPublicModules, updateMiniPublicModules, updateAllTeacherModules } from './coursemoduleActions';
// import the action to update all of the classroom students
import { updateAllClassrooms, updateMiniClassrooms } from './classroomActions';
// import the action to update the notification state
import { updateAllNotifications } from './notificationActions';
// import the action to update whether or not the Admin GUI is to be used
import { updateUseAdminGui } from './gameSettingsActions';
//import the actions to update the available prodcts and coin packages
// import the utility functions to convert arrays in objects
import { arrayToObjectID, arrayToObjectUserID, arrayToObjectModuleID, arrayToObjectQuizQuestionID, arrayToObjectSchoolName } from '../helper_functions/utilities';
export const COMPLETE_QUIZ_BEGIN = 'COMPLETE_QUIZ_BEGIN';
export const COMPLETE_QUIZ_SUCCESS = 'COMPLETE_QUIZ_SUCCESS';
export const COMPLETE_QUIZ_ERROR = 'COMPLETE_QUIZ_ERROR';
export const COMPLETE_QUIZ_FAILURE = 'COMPLETE_QUIZ_FAILURE';
export const GET_POSSIBLE_SCHOOLS_BEGIN = 'GET_POSSIBLE_SCHOOLS_BEGIN';
export const GET_POSSIBLE_SCHOOLS_SUCCESS = 'GET_POSSIBLE_SCHOOLS_SUCCESS';
export const GET_POSSIBLE_SCHOOLS_ERROR = 'GET_POSSIBLE_SCHOOLS_ERROR';
export const GET_POSSIBLE_SCHOOLS_FAILURE = 'GET_POSSIBLE_SCHOOLS_FAILURE';
export const FETCH_BIGQUERY_BEGIN = 'FETCH_BIGQUERY_BEGIN';
export const FETCH_BIGQUERY_SUCCESS = 'FETCH_BIGQUERY_SUCCESS';
export const FETCH_BIGQUERY_ERROR = 'FETCH_BIGQUERY_ERROR';
export const FETCH_BIGQUERY_FAILURE = 'FETCH_BIGQUERY_FAILURE';
export const FETCH_ADMIN_BIGQUERY_BEGIN = 'FETCH_ADMIN_BIGQUERY_BEGIN';
export const FETCH_ADMIN_BIGQUERY_SUCCESS = 'FETCH_ADMIN_BIGQUERY_SUCCESS';
export const FETCH_ADMIN_BIGQUERY_ERROR = 'FETCH_ADMIN_BIGQUERY_ERROR';
export const FETCH_ADMIN_BIGQUERY_FAILURE = 'FETCH_ADMIN_BIGQUERY_FAILURE';
export const FETCH_MINIQUERY_BEGIN = 'FETCH_BIGQUERY_BEGIN';
export const FETCH_MINIQUERY_SUCCESS = 'FETCH_BIGQUERY_SUCCESS';
export const FETCH_MINIQUERY_ERROR = 'FETCH_BIGQUERY_ERROR';
export const FETCH_MINIQUERY_FAILURE = 'FETCH_BIGQUERY_FAILURE';
export const UPDATE_USER_DATA_STATE = 'UPDATE_USER_DATA_STATE';
export const RESET_USERDATA_STATE = 'RESET_USERDATA_STATE';
export const RESET_USERDETAILS_ERRORS = 'RESET_USERDETAILS_ERRORS';
export const HTTP_ERROR = 'HTTP_ERROR';
export const SET_DAY_COLORS = 'SET_DAY_COLORS';
export const SET_NIGHT_COLORS = 'SET_NIGHT_COLORS';
export const SET_CRYPTO_COLORS = 'SET_CRYPTO_COLORS';
export const UPDATE_ADDRESS = 'UPDATE_ADDRESS';
export const UPDATE_SCHOOL_TEACHER_SUMMARIES = 'UPDATE_SCHOOL_TEACHER_SUMMARIES';
export const IS_LOGOUT_REQUIRED_BEGIN = 'IS_LOGOUT_REQUIRED_BEGIN';
export const IS_LOGOUT_REQUIRED_SUCCESS = 'IS_LOGOUT_REQUIRED_SUCCESS';
export const IS_LOGOUT_REQUIRED_ERROR = 'IS_LOGOUT_REQUIRED_ERROR';
export const IS_LOGOUT_REQUIRED_FAILURE = 'IS_LOGOUT_REQUIRED_FAILURE';

export const isLogoutRequiredBegin = () => ({
  type: IS_LOGOUT_REQUIRED_BEGIN,
});

export const isLogoutRequiredSuccess = (logoutRequired) => ({
  type: IS_LOGOUT_REQUIRED_SUCCESS,
  payload: { logoutRequired }
});

export const isLogoutRequiredError = error => ({
  type: IS_LOGOUT_REQUIRED_ERROR,
  payload: { error }
});

export const isLogoutRequiredFailure = error => ({
  type: IS_LOGOUT_REQUIRED_FAILURE,
  payload: { error }
});

export const completeQuizBegin = () => ({
  type: COMPLETE_QUIZ_BEGIN,
});
export const completeQuizSuccess = (quizCompleted, accountBalance) => ({
  type: COMPLETE_QUIZ_SUCCESS,
  payload: { quizCompleted, accountBalance }
});
export const completeQuizError = error => ({
  type: COMPLETE_QUIZ_ERROR,
  payload: { error }
});
export const completeQuizFailure = error => ({
  type: COMPLETE_QUIZ_FAILURE,
  payload: { error }
});

export const getPossibleSchoolsBegin = () => ({
  type: GET_POSSIBLE_SCHOOLS_BEGIN,
});
export const getPossibleSchoolsSuccess = schools => ({
  type: GET_POSSIBLE_SCHOOLS_SUCCESS,
  payload: { schools }
});
export const getPossibleSchoolsError = error => ({
  type: GET_POSSIBLE_SCHOOLS_ERROR,
  payload: { error }
});
export const getPossibleSchoolsFailure = error => ({
  type: GET_POSSIBLE_SCHOOLS_FAILURE,
  payload: { error }
});

export const fetchBigQueryBegin = () => ({
  type: FETCH_BIGQUERY_BEGIN,
});

export const fetchMiniQueryBegin = () => ({
  type: FETCH_MINIQUERY_BEGIN,
});

export const fetchMiniQuerySuccess = (logoutRequired, product, productFeatures) => ({
  type: FETCH_MINIQUERY_SUCCESS,
  payload: { logoutRequired, product, productFeatures }

});

export const fetchBigQuerySuccess = userDetails => ({
    type: FETCH_BIGQUERY_SUCCESS,
    payload: { userDetails }
});

export const fetchBigQueryError = error => ({
  type: FETCH_BIGQUERY_ERROR,
  payload: { error }
});

export const fetchMiniQueryError = error => ({
  type: FETCH_MINIQUERY_ERROR,
  payload: { error }
});

export const fetchBigQueryFailure = error => ({
    type: FETCH_BIGQUERY_FAILURE,
    payload: { error }
});

export const fetchMiniQueryFailure = error => ({
  type: FETCH_MINIQUERY_FAILURE,
  payload: { error }
});

export const fetchAdminBigQueryBegin = () => ({
  type: FETCH_ADMIN_BIGQUERY_BEGIN,
});

export const fetchAdminBigQuerySuccess = userDetails => ({
  type: FETCH_ADMIN_BIGQUERY_SUCCESS,
  payload: { userDetails }
});

export const fetchAdminBigQueryError = error => ({
  type: FETCH_ADMIN_BIGQUERY_ERROR,
  payload: { error }
});

export const fetchAdminBigQueryFailure = error => ({
  type: FETCH_ADMIN_BIGQUERY_FAILURE,
  payload: { error }
});

export const UpdateSchoolTeacherSummaries = schoolTeacherSummaries => ({
  type: UPDATE_SCHOOL_TEACHER_SUMMARIES,
  payload: { schoolTeacherSummaries }
});

// this updates an individual property of the userDetails state. eg to change the state property 
export const updateUserDataState = (name, status) => ({
    type: UPDATE_USER_DATA_STATE,
    name,
    status
});

// action to reset any user details errors so that the error message pop up will no longer be visible
export const resetUserDetailsErrors = () => ({
  type: RESET_USERDETAILS_ERRORS,
});

// action to reset the userDetail state to it's initial state
export const resetUserDataState = () => ({
  type: RESET_USERDATA_STATE,
});

// action to update user's address when they link payout info
export const updateAddress = (address1, address2, city, state, zip) => ({
  type: UPDATE_ADDRESS,
  payload: { address1, address2, city, state, zip }
})

// action to reset the app colors to Day colors
export const setDayColors = () => ({
  type: SET_DAY_COLORS,
});

// action to reset the app colors to Night colors
export const setNightColors = () => ({
  type: SET_NIGHT_COLORS,
});

// action to reset the app colors to Night colors
export const setCryptoColors = () => ({
  type: SET_CRYPTO_COLORS,
});

export const httpError = (errorText) => ({
  type: HTTP_ERROR,
  errorText
});

// function to dispatch redux actions to get a response from the graphql query teacherUserDetails
export function fetchBigQuery(token) {
    return function (dispatch) {
      dispatch(fetchBigQueryBegin());
      return axios.post(GRAPHQL_URL, { query: USER_DETAILS }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
          .then((json) => {
            if ("errors" in json.data){
              dispatch(fetchBigQueryError(json.data.errors[0].message));
              return { errors: json.data.errors };
            }
            else{
              // Transform arrays in the UserDetails object to objects that further contain objects.
              // This ensures that the when state is updated in the Redux store there is no need to iterate over the arrays.
              var mainReturnedObj = json.data.data;
              // convert the courses array of objects into an objects of objects
              const coursesObject = arrayToObjectID(mainReturnedObj.teacherUserDetails.courses);
              mainReturnedObj.teacherUserDetails.courses = coursesObject;
              // the following is no longer used as the teacher course modules are now stored as an array of objects to preserve the order of the objects
              //for (var property1 in mainReturnedObj.teacherUserDetails.courses){
              //  let courseModules = {};
                // convert the course modules array of objects into an objects of objects
              //  if (mainReturnedObj.teacherUserDetails.courses[property1].courseModules.length > 0){
              //    courseModules = arrayToObjectID(mainReturnedObj.teacherUserDetails.courses[property1].courseModules);
              //  }
              //  mainReturnedObj.teacherUserDetails.courses[property1].courseModules = courseModules;
              //}
              dispatch(updateAllCourses(mainReturnedObj.teacherUserDetails.courses));
              // convert the available public modules array of objects into an objects of objects
              const publicModules = arrayToObjectID(mainReturnedObj.teacherUserDetails.availablePublicModules);
              mainReturnedObj.teacherUserDetails.availablePublicModules = publicModules;
              for (var property2 in mainReturnedObj.teacherUserDetails.availablePublicModules){
                // convert the available public module teacher guides array of objects into an objects of objects
                if (mainReturnedObj.teacherUserDetails.availablePublicModules[property2].teacherGuides && mainReturnedObj.teacherUserDetails.availablePublicModules[property2].teacherGuides != null){
                  const publicModuleGuides = arrayToObjectID(mainReturnedObj.teacherUserDetails.availablePublicModules[property2].teacherGuides);
                  mainReturnedObj.teacherUserDetails.availablePublicModules[property2].teacherGuides = publicModuleGuides;
                }
                else{
                  mainReturnedObj.teacherUserDetails.availablePublicModules[property2].teacherGuides = {};
                }
                // convert the available public module articles array of objects into an objects of objects
                if (mainReturnedObj.teacherUserDetails.availablePublicModules[property2].articles && mainReturnedObj.teacherUserDetails.availablePublicModules[property2].articles != null){
                  const publicModuleArticles = arrayToObjectID(mainReturnedObj.teacherUserDetails.availablePublicModules[property2].articles);
                  mainReturnedObj.teacherUserDetails.availablePublicModules[property2].articles = publicModuleArticles;
                }
                else{
                  mainReturnedObj.teacherUserDetails.availablePublicModules[property2].articles = {};
                }
                // convert the available public module activities array of objects into an objects of objects
                if (mainReturnedObj.teacherUserDetails.availablePublicModules[property2].activities && mainReturnedObj.teacherUserDetails.availablePublicModules[property2].activities != null){
                  const publicModuleActivities = arrayToObjectID(mainReturnedObj.teacherUserDetails.availablePublicModules[property2].activities);
                  mainReturnedObj.teacherUserDetails.availablePublicModules[property2].activities = publicModuleActivities;
                }
                else{
                  mainReturnedObj.teacherUserDetails.availablePublicModules[property2].activities = {};
                }
                // convert the available public module assessment questions into an object of objects
                if (mainReturnedObj.teacherUserDetails.availablePublicModules[property2].assessments && mainReturnedObj.teacherUserDetails.availablePublicModules[property2].assessments.questions != null){
                  const publicModuleAssessmentQuestions = arrayToObjectID(mainReturnedObj.teacherUserDetails.availablePublicModules[property2].assessments.questions);
                  mainReturnedObj.teacherUserDetails.availablePublicModules[property2].assessments.questions = publicModuleAssessmentQuestions;
                }
                else{
                  mainReturnedObj.teacherUserDetails.availablePublicModules[property2].assessments = {};
                }
                // convert the available public module videos array of objects into an objects of objects
                if (mainReturnedObj.teacherUserDetails.availablePublicModules[property2].videos && mainReturnedObj.teacherUserDetails.availablePublicModules[property2].videos != null){
                  const publicModuleVideos = arrayToObjectID(mainReturnedObj.teacherUserDetails.availablePublicModules[property2].videos);
                  mainReturnedObj.teacherUserDetails.availablePublicModules[property2].videos = publicModuleVideos;
                }
                else{
                  mainReturnedObj.teacherUserDetails.availablePublicModules[property2].videos = {};
                }
              }
              dispatch(updateAllPublicModules(mainReturnedObj.teacherUserDetails.availablePublicModules, mainReturnedObj.teacherUserDetails.lastPublicModuleId));
              // convert the teacher created modules array of objects into an objects of objects
              const teacherModules = arrayToObjectID(mainReturnedObj.teacherUserDetails.teacherCreatedModules);
              mainReturnedObj.teacherUserDetails.teacherCreatedModules = teacherModules;
              for (var property3 in mainReturnedObj.teacherUserDetails.teacherCreatedModules){
                // convert the teacher created module teacher guides array of objects into an objects of objects
                if (mainReturnedObj.teacherUserDetails.teacherCreatedModules[property3].teacherGuides && mainReturnedObj.teacherUserDetails.teacherCreatedModules[property3].teacherGuides != null){
                  const teacherModuleGuides = arrayToObjectID(mainReturnedObj.teacherUserDetails.teacherCreatedModules[property3].teacherGuides);
                  mainReturnedObj.teacherUserDetails.teacherCreatedModules[property3].teacherGuides = teacherModuleGuides;
                }
                else{
                  mainReturnedObj.teacherUserDetails.teacherCreatedModules[property3].teacherGuides = {};
                }
                // convert the teacher created module articles array of objects into an objects of objects
                if (mainReturnedObj.teacherUserDetails.teacherCreatedModules[property3].articles && mainReturnedObj.teacherUserDetails.teacherCreatedModules[property3].articles != null){
                  const teacherModuleArticles = arrayToObjectID(mainReturnedObj.teacherUserDetails.teacherCreatedModules[property3].articles);
                  mainReturnedObj.teacherUserDetails.teacherCreatedModules[property3].articles = teacherModuleArticles;
                }
                else{
                  mainReturnedObj.teacherUserDetails.teacherCreatedModules[property3].articles = {};
                }
                // convert the teacher created module activities array of objects into an objects of objects
                if (mainReturnedObj.teacherUserDetails.teacherCreatedModules[property3].activities && mainReturnedObj.teacherUserDetails.teacherCreatedModules[property3].activities != null){
                  const teacherModuleActivities = arrayToObjectID(mainReturnedObj.teacherUserDetails.teacherCreatedModules[property3].activities);
                  mainReturnedObj.teacherUserDetails.teacherCreatedModules[property3].activities = teacherModuleActivities;
                }
                else{
                  mainReturnedObj.teacherUserDetails.teacherCreatedModules[property3].activities = {};
                }
                // convert the teacher created module assessment questions into an object of objects
                if (mainReturnedObj.teacherUserDetails.teacherCreatedModules[property3].assessments && mainReturnedObj.teacherUserDetails.teacherCreatedModules[property3].assessments.questions != null){
                  const teacherModuleAssessmentQuestions = arrayToObjectID(mainReturnedObj.teacherUserDetails.teacherCreatedModules[property3].assessments.questions);
                  mainReturnedObj.teacherUserDetails.teacherCreatedModules[property3].assessments.questions = teacherModuleAssessmentQuestions;
                }
                else{
                  mainReturnedObj.teacherUserDetails.teacherCreatedModules[property3].assessments = {};
                }
                // convert the teacher created module videos array of objects into an objects of objects
                if (mainReturnedObj.teacherUserDetails.teacherCreatedModules[property3].videos && mainReturnedObj.teacherUserDetails.teacherCreatedModules[property3].videos != null){
                  const teacherModuleVideos = arrayToObjectID(mainReturnedObj.teacherUserDetails.teacherCreatedModules[property3].videos);
                  mainReturnedObj.teacherUserDetails.teacherCreatedModules[property3].videos = teacherModuleVideos;
                }
              }              
              dispatch(updateAllTeacherModules(mainReturnedObj.teacherUserDetails.teacherCreatedModules ));
              // convert the classrooms array of classrooms into an object of objects
              const classroomsObject = arrayToObjectID(mainReturnedObj.teacherUserDetails.classrooms);
              mainReturnedObj.teacherUserDetails.classrooms = classroomsObject; 
              for (var property4 in mainReturnedObj.teacherUserDetails.classrooms){
                // convert the classroom array of students into an onbject of objects
                const studentsObject = arrayToObjectUserID(mainReturnedObj.teacherUserDetails.classrooms[property4].studentList);
                mainReturnedObj.teacherUserDetails.classrooms[property4].studentList = studentsObject; 
                for (var key5 in mainReturnedObj.teacherUserDetails.classrooms[property4].studentList){
                  // convert the classroom array of student stock competitions entered into an onbject of objects
                  const studentStockCompsEntered = arrayToObjectID(mainReturnedObj.teacherUserDetails.classrooms[property4].studentList[key5].stockCompetitionsEntered);
                  mainReturnedObj.teacherUserDetails.classrooms[property4].studentList[key5].stockCompetitionsEntered = studentStockCompsEntered;
                  // convert the classroom array of student crypto competitions entered into an onbject of objects
                  const studentCryptoCompsEntered = arrayToObjectID(mainReturnedObj.teacherUserDetails.classrooms[property4].studentList[key5].cryptoCompetitionsEntered);
                  mainReturnedObj.teacherUserDetails.classrooms[property4].studentList[key5].cryptoCompetitionsEntered = studentCryptoCompsEntered;
                  // convert the classroom array of student Module Assessment or Quiz Scores into an onbject of objects
                  const studentModuleAssessmentScores = arrayToObjectModuleID(mainReturnedObj.teacherUserDetails.classrooms[property4].studentList[key5].moduleAssessmentScores);
                  mainReturnedObj.teacherUserDetails.classrooms[property4].studentList[key5].moduleAssessmentScores = studentModuleAssessmentScores;
                  // convert the student list module assessment score question results into an object of objects
                  for (var key6 in mainReturnedObj.teacherUserDetails.classrooms[property4].studentList[key5].moduleAssessmentScores){
                    const studentModuleAssessmentScoreAnswers = arrayToObjectQuizQuestionID(mainReturnedObj.teacherUserDetails.classrooms[property4].studentList[key5].moduleAssessmentScores[key6].questionResults);
                    mainReturnedObj.teacherUserDetails.classrooms[property4].studentList[key5].moduleAssessmentScores[key6].questionResults = studentModuleAssessmentScoreAnswers;
                  }
                }
              }
              
              // convert the classrooms array of classroom Courses into an object of objects
              const classroomCoursesObject = arrayToObjectID(mainReturnedObj.teacherUserDetails.classroomCourses);
              mainReturnedObj.teacherUserDetails.classroomCourses = classroomCoursesObject; 
              // add all of the courses and modules to the redux state
              dispatch(updateAllClassrooms(mainReturnedObj.teacherUserDetails.classrooms, mainReturnedObj.teacherUserDetails.classroomCourses));
              dispatch(updateAllNotifications(mainReturnedObj.teacherUserDetails.allowNotifications, mainReturnedObj.teacherUserDetails.unreadNotifications));
              // update the teacher userDetails state
              dispatch(fetchBigQuerySuccess(mainReturnedObj.teacherUserDetails));
              // update that the regular Teacher GUI is to be used and not the Admin GUI
              dispatch(updateUseAdminGui(false));
              // return true
              const returnVal = true;
              return returnVal;
            }
          })
          .catch(error => {
            dispatch(fetchBigQueryFailure(error.message));
            return { errors: [{ message: error.message }]};
          });
  };
}

// function to dispatch redux actions to get a response from the graphql query administratorUserDetails
export function fetchAdministratorBigQuery(token) {
  return function (dispatch) {
    dispatch(fetchAdminBigQueryBegin());
    return axios.post(GRAPHQL_URL, { query: ADMINISTRATOR_USER_DETAILS }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
        .then((json) => {
          if ("errors" in json.data){
            dispatch(fetchAdminBigQueryError(json.data.errors[0].message));
            return { errors: json.data.errors };
          }
          else{
            // Transform arrays in the UserDetails object to objects that further contain objects.
            // This ensures that the when state is updated in the Redux store there is no need to iterate over the arrays.
            var mainReturnedObj = json.data.data.administratorUserDetails;
            
            // convert the available public modules array of objects into an objects of objects
            const publicModules = arrayToObjectID(mainReturnedObj.availablePublicModules);
            mainReturnedObj.availablePublicModules = publicModules;
            for (var property2 in mainReturnedObj.availablePublicModules){
              // convert the available public module teacher guides array of objects into an objects of objects
              if (mainReturnedObj.availablePublicModules[property2].teacherGuides && mainReturnedObj.availablePublicModules[property2].teacherGuides != null){
                const publicModuleGuides = arrayToObjectID(mainReturnedObj.availablePublicModules[property2].teacherGuides);
                mainReturnedObj.availablePublicModules[property2].teacherGuides = publicModuleGuides;
              }
              else{
                mainReturnedObj.availablePublicModules[property2].teacherGuides = {};
              }
              // convert the available public module articles array of objects into an objects of objects
              if (mainReturnedObj.availablePublicModules[property2].articles && mainReturnedObj.availablePublicModules[property2].articles != null){
                const publicModuleArticles = arrayToObjectID(mainReturnedObj.availablePublicModules[property2].articles);
                mainReturnedObj.availablePublicModules[property2].articles = publicModuleArticles;
              }
              else{
                mainReturnedObj.availablePublicModules[property2].articles = {};
              }
              // convert the available public module activities array of objects into an objects of objects
              if (mainReturnedObj.availablePublicModules[property2].activities && mainReturnedObj.availablePublicModules[property2].activities != null){
                const publicModuleActivities = arrayToObjectID(mainReturnedObj.availablePublicModules[property2].activities);
                mainReturnedObj.availablePublicModules[property2].activities = publicModuleActivities;
              }
              else{
                mainReturnedObj.availablePublicModules[property2].activities = {};
              }
              // convert the available public module assessment questions into an object of objects
              if (mainReturnedObj.availablePublicModules[property2].assessments && mainReturnedObj.availablePublicModules[property2].assessments.questions != null){
                const publicModuleAssessmentQuestions = arrayToObjectID(mainReturnedObj.availablePublicModules[property2].assessments.questions);
                mainReturnedObj.availablePublicModules[property2].assessments.questions = publicModuleAssessmentQuestions;
              }
              else{
                mainReturnedObj.availablePublicModules[property2].assessments = {};
              }
              // convert the available public module videos array of objects into an objects of objects
              if (mainReturnedObj.availablePublicModules[property2].videos && mainReturnedObj.availablePublicModules[property2].videos != null){
                const publicModuleVideos = arrayToObjectID(mainReturnedObj.availablePublicModules[property2].videos);
                mainReturnedObj.availablePublicModules[property2].videos = publicModuleVideos;
              }
              else{
                mainReturnedObj.availablePublicModules[property2].videos = {};
              }
            }
            dispatch(updateAllPublicModules(mainReturnedObj.availablePublicModules, mainReturnedObj.lastPublicModuleId));
            // convert the teacher created modules array of objects into an objects of objects
            const teacherModules = arrayToObjectID(mainReturnedObj.teacherCreatedModules);
            mainReturnedObj.teacherCreatedModules = teacherModules;
            for (var property3 in mainReturnedObj.teacherCreatedModules){
              // convert the teacher created module teacher guides array of objects into an objects of objects
              if (mainReturnedObj.teacherCreatedModules[property3].teacherGuides && mainReturnedObj.teacherCreatedModules[property3].teacherGuides != null){
                const teacherModuleGuides = arrayToObjectID(mainReturnedObj.teacherCreatedModules[property3].teacherGuides);
                mainReturnedObj.teacherCreatedModules[property3].teacherGuides = teacherModuleGuides;
              }
              else{
                mainReturnedObj.teacherCreatedModules[property3].teacherGuides = {};
              }
              // convert the teacher created module articles array of objects into an objects of objects
              if (mainReturnedObj.teacherCreatedModules[property3].articles && mainReturnedObj.teacherCreatedModules[property3].articles != null){
                const teacherModuleArticles = arrayToObjectID(mainReturnedObj.teacherCreatedModules[property3].articles);
                mainReturnedObj.teacherCreatedModules[property3].articles = teacherModuleArticles;
              }
              else{
                mainReturnedObj.teacherCreatedModules[property3].articles = {};
              }
              // convert the teacher created module activities array of objects into an objects of objects
              if (mainReturnedObj.teacherCreatedModules[property3].activities && mainReturnedObj.teacherCreatedModules[property3].activities != null){
                const teacherModuleActivities = arrayToObjectID(mainReturnedObj.teacherCreatedModules[property3].activities);
                mainReturnedObj.teacherCreatedModules[property3].activities = teacherModuleActivities;
              }
              else{
                mainReturnedObj.teacherCreatedModules[property3].activities = {};
              }
              // convert the teacher created module assessment questions into an object of objects
              if (mainReturnedObj.teacherCreatedModules[property3].assessments && mainReturnedObj.teacherCreatedModules[property3].assessments.questions != null){
                const teacherModuleAssessmentQuestions = arrayToObjectID(mainReturnedObj.teacherCreatedModules[property3].assessments.questions);
                mainReturnedObj.teacherCreatedModules[property3].assessments.questions = teacherModuleAssessmentQuestions;
              }
              else{
                mainReturnedObj.teacherCreatedModules[property3].assessments = {};
              }
              // convert the teacher created module videos array of objects into an objects of objects
              if (mainReturnedObj.teacherCreatedModules[property3].videos && mainReturnedObj.teacherCreatedModules[property3].videos != null){
                const teacherModuleVideos = arrayToObjectID(mainReturnedObj.teacherCreatedModules[property3].videos);
                mainReturnedObj.teacherCreatedModules[property3].videos = teacherModuleVideos;
              }
            }              
            dispatch(updateAllTeacherModules(mainReturnedObj.teacherCreatedModules ));
            // convert the array of School Teacher Summaries into an object of objects.  The main key is the name of the school
            const schoolTeacherSummariesObject = arrayToObjectSchoolName(mainReturnedObj.schoolTeacherSummaries);
            mainReturnedObj.schoolTeacherSummaries = schoolTeacherSummariesObject;
            for (var property5 in mainReturnedObj.schoolTeacherSummaries){
              // convert the Teacher Summaries array into an object of objects
              const teacherSummariesObject = arrayToObjectID(mainReturnedObj.schoolTeacherSummaries[property5].teacherSummaries);
              mainReturnedObj.schoolTeacherSummaries[property5].teacherSummaries = teacherSummariesObject;
              // convert the teacher courses array of objects into an objects of objects
              const coursesObject = arrayToObjectID(mainReturnedObj.schoolTeacherSummaries[property5].teacherSummaries.courses);
              mainReturnedObj.schoolTeacherSummaries[property5].teacherSummaries.courses = coursesObject;
              //for (var property1 in mainReturnedObj.schoolTeacherSummaries[property5].teacherSummaries.courses){
              //  let courseModules = {};
                // convert the course modules array of objects into an objects of objects
              //  if (mainReturnedObj.schoolTeacherSummaries[property5].teacherSummaries.courses[property1].courseModules.length > 0){
              //    courseModules = arrayToObjectID(mainReturnedObj.schoolTeacherSummaries[property5].teacherSummaries.courses[property1].courseModules);
              //  }
              //  mainReturnedObj.schoolTeacherSummaries[property5].teacherSummaries.courses[property1].courseModules = courseModules;
              //}
              // convert the teacher classrooms array of classrooms into an object of objects
              const classroomsObject = arrayToObjectID(mainReturnedObj.schoolTeacherSummaries[property5].teacherSummaries.classrooms);
              mainReturnedObj.schoolTeacherSummaries[property5].teacherSummaries.classrooms = classroomsObject; 
              // convert the array of classroom Courses into an object of objects
              const classroomCoursesObject = arrayToObjectID(mainReturnedObj.schoolTeacherSummaries[property5].teacherSummaries.classroomCourses);
              mainReturnedObj.schoolTeacherSummaries[property5].teacherSummaries.classroomCourses = classroomCoursesObject; 
            }  
            // add all of the School Teacher Summaries to the redux state
            dispatch(UpdateSchoolTeacherSummaries(mainReturnedObj.schoolTeacherSummaries));
            // update the school administrative userDetails state
            dispatch(fetchAdminBigQuerySuccess(mainReturnedObj));
            // update that the Admin GUI is to be used and not the regular Teacher GUI
            dispatch(updateUseAdminGui(true));
            // return true
            const returnVal = true;
            return returnVal;
          }
        })
        .catch(error => {
          dispatch(fetchBigQueryFailure(error.message));
          return { errors: [{ message: error.message }]};
        });
};
}

// function to dispatch redux actions to get a response from the graphql query miniTeacherUserDetails
export function fetchMiniQuery(token, lastPublicModuleID) {
  return function (dispatch) {
    dispatch(fetchMiniQueryBegin());
    return axios.post(GRAPHQL_URL, { query: MINI_USER_DETAILS(lastPublicModuleID) }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
        .then((json) => {
          if ("errors" in json.data){
            dispatch(fetchMiniQueryError(json.data.errors[0].message));
            return {errors: json.data.errors};
          }
          else{
            // Transform arrays in the miniTeaxcherUserDetails object to objects that further contain objects.
            // This ensures that the when state is updated in the Redux store there is no need to iterate over the arrays.
            var mainReturnedObj = json.data.data;
            // convert the available public modules array of objects into an objects of objects
            const publicModules = arrayToObjectID(mainReturnedObj.miniTeacherUserDetails.availablePublicModules);
            mainReturnedObj.miniTeacherUserDetails.availablePublicModules = publicModules;
            for (var property2 in mainReturnedObj.miniTeacherUserDetails.availablePublicModules){
              // convert the available public module teacher guides array of objects into an objects of objects
              if (mainReturnedObj.miniTeacherUserDetails.availablePublicModules[property2].teacherGuides && mainReturnedObj.miniTeacherUserDetails.availablePublicModules[property2].teacherGuides != null){
                const publicModuleGuides = arrayToObjectID(mainReturnedObj.miniTeacherUserDetails.availablePublicModules[property2].teacherGuides);
                mainReturnedObj.miniTeacherUserDetails.availablePublicModules[property2].teacherGuides = publicModuleGuides;
              }
              else{
                mainReturnedObj.miniTeacherUserDetails.availablePublicModules[property2].teacherGuides = {};
              }
              // convert the available public module articles array of objects into an objects of objects
              if (mainReturnedObj.miniTeacherUserDetails.availablePublicModules[property2].articles && mainReturnedObj.miniTeacherUserDetails.availablePublicModules[property2].articles != null){
                const publicModuleArticles = arrayToObjectID(mainReturnedObj.miniTeacherUserDetails.availablePublicModules[property2].articles);
                mainReturnedObj.miniTeacherUserDetails.availablePublicModules[property2].articles = publicModuleArticles;
              }
              else{
                mainReturnedObj.miniTeacherUserDetails.availablePublicModules[property2].articles = {};
              }
              // convert the available public module activities array of objects into an objects of objects
              if (mainReturnedObj.miniTeacherUserDetails.availablePublicModules[property2].activities && mainReturnedObj.miniTeacherUserDetails.availablePublicModules[property2].activities != null){
                const publicModuleActivities = arrayToObjectID(mainReturnedObj.miniTeacherUserDetails.availablePublicModules[property2].activities);
                mainReturnedObj.miniTeacherUserDetails.availablePublicModules[property2].activities = publicModuleActivities;
              }
              else{
                mainReturnedObj.miniTeacherUserDetails.availablePublicModules[property2].activities = {};
              }
              // convert the available public module assessment questions into an object of objects
              if (mainReturnedObj.miniTeacherUserDetails.availablePublicModules[property2].assessments && mainReturnedObj.miniTeacherUserDetails.availablePublicModules[property2].assessments.questions != null){
                const publicModuleAssessmentQuestions = arrayToObjectID(mainReturnedObj.miniTeacherUserDetails.availablePublicModules[property2].assessments.questions);
                mainReturnedObj.miniTeacherUserDetails.availablePublicModules[property2].assessments.questions = publicModuleAssessmentQuestions;
              }
              else{
                mainReturnedObj.miniTeacherUserDetails.availablePublicModules[property2].assessments = {};
              }
              // convert the available public module videos array of objects into an objects of objects
              if (mainReturnedObj.miniTeacherUserDetails.availablePublicModules[property2].videos && mainReturnedObj.miniTeacherUserDetails.availablePublicModules[property2].videos != null){
                const publicModuleVideos = arrayToObjectID(mainReturnedObj.miniTeacherUserDetails.availablePublicModules[property2].videos);
                mainReturnedObj.miniTeacherUserDetails.availablePublicModules[property2].videos = publicModuleVideos;
              }
              else{
                mainReturnedObj.miniTeacherUserDetails.availablePublicModules[property2].videos = {};
              }
            }
            dispatch(updateMiniPublicModules(mainReturnedObj.miniTeacherUserDetails.availablePublicModules, mainReturnedObj.miniTeacherUserDetails.lastPublicModuleId));
            // convert the classrooms array of classrooms into an object of objects
            const classroomsObject = arrayToObjectID(mainReturnedObj.miniTeacherUserDetails.classrooms);
            mainReturnedObj.miniTeacherUserDetails.classrooms = classroomsObject; 
            for (var property1 in mainReturnedObj.miniTeacherUserDetails.classrooms){
              // convert the classroom array of students into an onbject of objects
              const studentsObject = arrayToObjectUserID(mainReturnedObj.miniTeacherUserDetails.classrooms[property1].studentList);
              mainReturnedObj.miniTeacherUserDetails.classrooms[property1].studentList = studentsObject; 
              for (var key1 in mainReturnedObj.miniTeacherUserDetails.classrooms[property1].studentList){
                // convert the classroom array of student stock competitions entered into an onbject of objects
                const studentStockCompsEntered = arrayToObjectID(mainReturnedObj.miniTeacherUserDetails.classrooms[property1].studentList[key1].stockCompetitionsEntered);
                mainReturnedObj.miniTeacherUserDetails.classrooms[property1].studentList[key1].stockCompetitionsEntered = studentStockCompsEntered;
                // convert the classroom array of student crypto competitions entered into an onbject of objects
                const studentCryptoCompsEntered = arrayToObjectID(mainReturnedObj.miniTeacherUserDetails.classrooms[property1].studentList[key1].cryptoCompetitionsEntered);
                mainReturnedObj.miniTeacherUserDetails.classrooms[property1].studentList[key1].cryptoCompetitionsEntered = studentCryptoCompsEntered;
                // convert the classroom array of student Module Assessment or Quiz Scores into an onbject of objects
                const studentModuleAssessmentScores = arrayToObjectModuleID(mainReturnedObj.miniTeacherUserDetails.classrooms[property1].studentList[key1].moduleAssessmentScores);
                mainReturnedObj.miniTeacherUserDetails.classrooms[property1].studentList[key1].moduleAssessmentScores = studentModuleAssessmentScores;
                // convert the student list module assessment score question results into an object of objects
                for (var key2 in mainReturnedObj.miniTeacherUserDetails.classrooms[property1].studentList[key1].moduleAssessmentScores){
                  const studentModuleAssessmentScoreAnswers = arrayToObjectQuizQuestionID(mainReturnedObj.miniTeacherUserDetails.classrooms[property1].studentList[key1].moduleAssessmentScores[key2].questionResults);
                  mainReturnedObj.miniTeacherUserDetails.classrooms[property1].studentList[key1].moduleAssessmentScores[key2].questionResults = studentModuleAssessmentScoreAnswers;
                }
              }
            }
            // add all of the courses and modules to the redux state
            dispatch(updateMiniClassrooms(mainReturnedObj.miniTeacherUserDetails.classrooms));
            // update the teacher userDetails state
            dispatch(fetchMiniQuerySuccess(mainReturnedObj.miniTeacherUserDetails.logoutRequired, 
              mainReturnedObj.miniTeacherUserDetails.currentProduct, mainReturnedObj.miniTeacherUserDetails.productFeatures));
            // return true
            const returnVal = true;
            return returnVal;
          }
        })
        .catch(error => dispatch(fetchMiniQueryFailure(error.message)));
  }
}

// function to handle getting possible schools for a user
export function getPossibleSchools(token, email) {
  return function(dispatch){
    dispatch(getPossibleSchoolsBegin());
    return axios.post(GRAPHQL_URL, { query: GET_SCHOOL_LIST(email) }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
      .then((json) => {
        if ('errors' in json.data) {
          dispatch(getPossibleSchoolsError(json.data.errors[0].message));
          return { errors: json.data.errors };
        } else {
          dispatch(getPossibleSchoolsSuccess(json.data.data));
          return json.data.data;
        }
      })
      .catch(error => dispatch(getPossibleSchoolsFailure(error.message)));
  }
}

export function completeQuiz(token, quizCompleted, accountBalance) {
  return function(dispatch){
    dispatch(completeQuizBegin());
    return axios.post(GRAPHQL_URL, { query: COMPLETE_QUIZ(quizCompleted) }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
      .then((json) => {
        if ('errors' in json) {
          dispatch(completeQuizError(json.data.errors[0].message));
          return {errors: json.data.errors};
        }
        else
        {
          dispatch(completeQuizSuccess(quizCompleted, accountBalance));
          return json.data.data.completeQuiz;
        }
      })
      .catch(error => dispatch(completeQuizFailure(error.message)));
  };
}

export function isLogoutRequired(token) {
  return function(dispatch){
    dispatch(isLogoutRequiredBegin());
    return axios.post(GRAPHQL_URL, { query: IS_LOGOUT_REQUIRED }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
      .then((json) => {
        if ('errors' in json) {
          dispatch(isLogoutRequiredError(json.data.errors[0].message));
          return {errors: json.data.errors};
        }
        else
        {
          dispatch(isLogoutRequiredSuccess(json.data.data.isLogoutRequired));
          return json.data.data.isLogoutRequired;
        }
      })
      .catch(error => dispatch(isLogoutRequiredFailure(error.message)));
  };
}

