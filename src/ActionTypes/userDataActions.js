import axios from 'axios';
import { GRAPHQL_URL } from "../constants";
// import the GraphQL query text needed to retrieve the user big query data
import { USER_DETAILS } from '../graphql/queries/UserDetails';
import { GET_SCHOOL_LIST } from '../graphql/queries/GetSchoolList';
import { COMPLETE_QUIZ } from '../graphql/mutations/CompleteQuiz';
// import the action to update all of the courses and modules
import { updateAllCourses, updateAllPublicModules, updateAllTeacherModules } from './coursemoduleActions';
// import the action to update all of the classroom students
import { updateAllClassrooms, updateMiniClassrooms } from './classroomActions';
// import the action to update the notification state
import { updateAllNotifications } from './notificationActions';
//import the actions to update the available prodcts and coin packages
// import the utility functions to convert arrays in objects
import { arrayToObjectID, arrayToObjectUserID, arrayToObjectModuleID, arrayToObjectQuizQuestionID } from '../helper_functions/utilities';
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
export const FETCH_MINIQUERY_BEGIN = 'FETCH_BIGQUERY_BEGIN';
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
              return {errors: json.data.errors};
            }
            else{
              // Transform arrays in the UserDetails object to objects that further contain objects.
              // This ensures that the when state is updated in the Redux store there is no need to iterate over the arrays.
              var mainReturnedObj = json.data.data;
              // convert the courses array of objects into an objects of objects
              const coursesObject = arrayToObjectID(mainReturnedObj.teacherUserDetails.courses);
              mainReturnedObj.teacherUserDetails.courses = coursesObject;
              for (var property1 in mainReturnedObj.teacherUserDetails.courses){
                let courseModules = {};
                // convert the course modules array of objects into an objects of objects
                if (mainReturnedObj.teacherUserDetails.courses[property1].courseModules.length > 0){
                  courseModules = arrayToObjectID(mainReturnedObj.teacherUserDetails.courses[property1].courseModules);
                }
                mainReturnedObj.teacherUserDetails.courses[property1].courseModules = courseModules;
              }
              dispatch(updateAllCourses(mainReturnedObj.teacherUserDetails.courses));
              // convert the available public modules array of objects into an objects of objects
              const publicModules = arrayToObjectID(mainReturnedObj.teacherUserDetails.availablePublicModules);
              mainReturnedObj.teacherUserDetails.availablePublicModules = publicModules;
              for (var property2 in mainReturnedObj.teacherUserDetails.availablePublicModules){
                // convert the available public module teacher guides array of objects into an objects of objects
                const publicModuleGuides = arrayToObjectID(mainReturnedObj.teacherUserDetails.availablePublicModules[property2].teacherGuides);
                mainReturnedObj.teacherUserDetails.availablePublicModules[property2].teacherGuides = publicModuleGuides;
                // convert the available public module articles array of objects into an objects of objects
                const publicModuleArticles = arrayToObjectID(mainReturnedObj.teacherUserDetails.availablePublicModules[property2].articles);
                mainReturnedObj.teacherUserDetails.availablePublicModules[property2].articles = publicModuleArticles;
                // convert the available public module activities array of objects into an objects of objects
                const publicModuleActivities = arrayToObjectID(mainReturnedObj.teacherUserDetails.availablePublicModules[property2].activities);
                mainReturnedObj.teacherUserDetails.availablePublicModules[property2].activities = publicModuleActivities;
                // convert the available public module assessment questions into an object of objects
                const publicModuleAssessmentQuestions = arrayToObjectID(mainReturnedObj.teacherUserDetails.availablePublicModules[property2].assessments.questions);
                mainReturnedObj.teacherUserDetails.availablePublicModules[property2].assessments.questions = publicModuleAssessmentQuestions;
                // convert the available public module videos array of objects into an objects of objects
                const publicModuleVideos = arrayToObjectID(mainReturnedObj.teacherUserDetails.availablePublicModules[property2].videos);
                mainReturnedObj.teacherUserDetails.availablePublicModules[property2].videos = publicModuleVideos;
              }
              dispatch(updateAllPublicModules(mainReturnedObj.teacherUserDetails.availablePublicModules));
              // convert the teacher created modules array of objects into an objects of objects
              const teacherModules = arrayToObjectID(mainReturnedObj.teacherUserDetails.teacherCreatedModules);
              mainReturnedObj.teacherUserDetails.teacherCreatedModules = teacherModules;
              for (var property3 in mainReturnedObj.teacherUserDetails.teacherCreatedModules){
                // convert the teacher created module teacher guides array of objects into an objects of objects
                const teacherModuleGuides = arrayToObjectID(mainReturnedObj.teacherUserDetails.teacherCreatedModules[property3].teacherGuides);
                mainReturnedObj.teacherUserDetails.teacherCreatedModules[property3].teacherGuides = teacherModuleGuides;
                // convert the teacher created module articles array of objects into an objects of objects
                const teacherModuleArticles = arrayToObjectID(mainReturnedObj.teacherUserDetails.teacherCreatedModules[property3].articles);
                mainReturnedObj.teacherUserDetails.teacherCreatedModules[property3].articles = teacherModuleArticles;
                // convert the teacher created module activities array of objects into an objects of objects
                const teacherModuleActivities = arrayToObjectID(mainReturnedObj.teacherUserDetails.teacherCreatedModules[property3].activities);
                mainReturnedObj.teacherUserDetails.teacherCreatedModules[property3].activities = teacherModuleActivities;
                // convert the teacher created module assessment questions into an object of objects
                const teacherModuleAssessmentQuestions = arrayToObjectID(mainReturnedObj.teacherUserDetails.teacherCreatedModules[property3].assessments.questions);
                mainReturnedObj.teacherUserDetails.teacherCreatedModules[property3].assessments.questions = teacherModuleAssessmentQuestions;
                // convert the teacher created module videos array of objects into an objects of objects
                const teacherModuleVideos = arrayToObjectID(mainReturnedObj.teacherUserDetails.teacherCreatedModules[property3].videos);
                mainReturnedObj.teacherUserDetails.teacherCreatedModules[property3].videos = teacherModuleVideos;
              }              
              dispatch(updateAllTeacherModules(mainReturnedObj.teacherUserDetails.teacherCreatedModules));
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
              // return true
              const returnVal = true;
              return returnVal;
            }
          })
          .catch(error => dispatch(fetchBigQueryFailure(error.message)));
  };
}

// function to dispatch redux actions to get a response from the graphql query miniTeacherUserDetails
export function fetchMiniQuery(token) {
  return function (dispatch) {
    dispatch(fetchMiniQueryBegin());
    return axios.post(GRAPHQL_URL, { query: USER_DETAILS }, {
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
            // convert the classrooms array of classrooms into an object of objects
            const classroomsObject = arrayToObjectID(mainReturnedObj.miniTeacherUserDetails);
            mainReturnedObj.miniTeacherUserDetails = classroomsObject; 
            for (var property1 in mainReturnedObj.miniTeacherUserDetails){
              // convert the classroom array of students into an onbject of objects
              const studentsObject = arrayToObjectUserID(mainReturnedObj.miniTeacherUserDetails[property1].studentList);
              mainReturnedObj.miniTeacherUserDetails[property1].studentList = studentsObject; 
              for (var key1 in mainReturnedObj.miniTeacherUserDetails[property1].studentList){
                // convert the classroom array of student stock competitions entered into an onbject of objects
                const studentStockCompsEntered = arrayToObjectID(mainReturnedObj.miniTeacherUserDetails[property1].studentList[key1].stockCompetitionsEntered);
                mainReturnedObj.miniTeacherUserDetails[property1].studentList[key1].stockCompetitionsEntered = studentStockCompsEntered;
                // convert the classroom array of student crypto competitions entered into an onbject of objects
                const studentCryptoCompsEntered = arrayToObjectID(mainReturnedObj.miniTeacherUserDetails[property1].studentList[key1].cryptoCompetitionsEntered);
                mainReturnedObj.miniTeacherUserDetails[property1].studentList[key1].cryptoCompetitionsEntered = studentCryptoCompsEntered;
                // convert the classroom array of student Module Assessment or Quiz Scores into an onbject of objects
                const studentModuleAssessmentScores = arrayToObjectModuleID(mainReturnedObj.miniTeacherUserDetails[property1].studentList[key1].moduleAssessmentScores);
                mainReturnedObj.miniTeacherUserDetails[property1].studentList[key1].moduleAssessmentScores = studentModuleAssessmentScores;
                // convert the student list module assessment score question results into an object of objects
                for (var key2 in mainReturnedObj.miniTeacherUserDetails[property1].studentList[key1].moduleAssessmentScores){
                  const studentModuleAssessmentScoreAnswers = arrayToObjectQuizQuestionID(mainReturnedObj.miniTeacherUserDetails[property1].studentList[key1].moduleAssessmentScores[key2].questionResults);
                  mainReturnedObj.miniTeacherUserDetails[property1].studentList[key1].moduleAssessmentScores[key2].questionResults = studentModuleAssessmentScoreAnswers;
                }
              }
            }
            // add all of the courses and modules to the redux state
            dispatch(updateMiniClassrooms(mainReturnedObj.miniTeacherUserDetails));
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
          return json.data.completeQuiz;
        }
      })
      .catch(error => dispatch(completeQuizFailure(error.message)));
  };
}

