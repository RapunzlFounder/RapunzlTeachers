import axios from 'axios';
import { GRAPHQL_URL } from "../constants";
import { CREATE_TEACHER_COURSE } from '../graphql/mutations/CreateTeacherCourse';
import { ADD_COURSE_MODULES } from '../graphql/mutations/AddCourseModules';
import { REMOVE_COURSE_MODULES } from '../graphql/mutations/RemoveCourseModules';
import { arrayToObjectID, stringifyIntArray } from '../helper_functions/utilities';

export const UPDATE_ALL_COURSES = 'UPDATE_ALL_COURSES';
export const UPDATE_PUBLIC_MODULES = 'UPDATE_PUBLIC_MODULES';
export const UPDATE_TEACHER_MODULES = 'UPDATE_TEACHER_MODULES';
export const CREATE_MODULE_BEGIN = 'CREATE_MODULE_BEGIN';
export const CREATE_MODULE_SUCCESS = 'CREATE_MODULE_SUCCESS';
export const CREATE_MODULE_FAILURE = 'CREATE_MODULE_FAILURE';
export const CREATE_MODULE_ERROR = 'CREATE_MODULE_ERROR';
export const UPDATE_MODULE_BEGIN = 'UPDATE_MODULE_BEGIN';
export const UPDATE_MODULE_SUCCESS = 'UPDATE_MODULE_SUCCESS';
export const UPDATE_MODULE_FAILURE = 'UPDATE_MODULE_FAILURE';
export const UPDATE_MODULE_ERROR = 'UPDATE_MODULE_ERROR';
export const REMOVE_MODULE_BEGIN = 'REMOVE_MODULE_BEGIN';
export const REMOVE_MODULE_SUCCESS = 'REMOVE_MODULE_SUCCESS';
export const REMOVE_MODULE_FAILURE = 'REMOVE_MODULE_FAILURE';
export const REMOVE_MODULE_ERROR = 'REMOVE_MODULE_ERROR';
export const CREATE_COURSE_BEGIN = 'CREATE_COURSE_BEGIN';
export const CREATE_COURSE_SUCCESS = 'CREATE_COURSE_SUCCESS';
export const CREATE_COURSE_FAILURE = 'CREATE_COURSE_FAILURE';
export const CREATE_COURSE_ERROR = 'CREATE_COURSE_ERROR';
export const ADD_COURSE_MODULE_BEGIN = 'ADD_COURSE_MODULE_BEGIN';
export const ADD_COURSE_MODULE_SUCCESS = 'ADD_COURSE_MODULE_SUCCESS';
export const ADD_COURSE_MODULE_FAILURE = 'ADD_COURSE_MODULE_FAILURE';
export const ADD_COURSE_MODULE_ERROR = 'ADD_COURSE_MODULE_ERROR';
export const REMOVE_COURSE_MODULE_BEGIN = 'REMOVE_COURSE_MODULE_BEGIN';
export const REMOVE_COURSE_MODULE_SUCCESS = 'REMOVE_COURSE_MODULE_SUCCESS';
export const REMOVE_COURSE_MODULE_FAILURE = 'REMOVE_COURSE_MODULE_FAILURE';
export const REMOVE_COURSE_MODULE_ERROR = 'REMOVE_COURSE_MODULE_ERROR';
export const CREATE_ARTICLE_BEGIN = 'CREATE_ARTICLE_BEGIN';
export const CREATE_ARTICLE_SUCCESS = 'CREATE_ARTICLE_SUCCESS';
export const CREATE_ARTICLE_FAILURE = 'CREATE_ARTICLE_FAILURE';
export const CREATE_ARTICLE_ERROR = 'CREATE_ARTICLE_ERROR';
export const UPDATE_ARTICLE_BEGIN = 'UPDATE_ARTICLE_BEGIN';
export const UPDATE_ARTICLE_SUCCESS = 'UPDATE_ARTICLE_SUCCESS';
export const UPDATE_ARTICLE_FAILURE = 'UPDATE_ARTICLE_FAILURE';
export const UPDATE_ARTICLE_ERROR = 'UPDATE_ARTICLE_ERROR';
export const REMOVE_ARTICLE_BEGIN = 'REMOVE_ARTICLE_BEGIN';
export const REMOVE_ARTICLE_SUCCESS = 'REMOVE_ARTICLE_SUCCESS';
export const REMOVE_ARTICLE_FAILURE = 'REMOVE_ARTICLE_FAILURE';
export const REMOVE_ARTICLE_ERROR = 'REMOVE_ARTICLE_ERROR';
export const CREATE_ASSESSMENT_BEGIN = 'CREATE_ASSESSMENT_BEGIN';
export const CREATE_ASSESSMENT_SUCCESS = 'CREATE_ASSESSMENT_SUCCESS';
export const CREATE_ASSESSMENT_FAILURE = 'CREATE_ASSESSMENT_FAILURE';
export const CREATE_ASSESSMENT_ERROR = 'CREATE_ASSESSMENT_ERROR';
export const UPDATE_ASSESSMENT_BEGIN = 'UPDATE_ASSESSMENT_BEGIN';
export const UPDATE_ASSESSMENT_SUCCESS = 'UPDATE_ASSESSMENT_SUCCESS';
export const UPDATE_ASSESSMENT_FAILURE = 'UPDATE_ASSESSMENT_FAILURE';
export const UPDATE_ASSESSMENT_ERROR = 'UPDATE_ASSESSMENT_ERROR';
export const REMOVE_ASSESSMENT_BEGIN = 'REMOVE_ASSESSMENT_BEGIN';
export const REMOVE_ASSESSMENT_SUCCESS = 'REMOVE_ASSESSMENT_SUCCESS';
export const REMOVE_ASSESSMENT_FAILURE = 'REMOVE_ASSESSMENT_FAILURE';
export const REMOVE_ASSESSMENT_ERROR = 'REMOVE_ASSESSMENT_ERROR';
export const CREATE_ACTIVITY_BEGIN = 'CREATE_ACTIVITY_BEGIN';
export const CREATE_ACTIVITY_SUCCESS = 'CREATE_ACTIVITY_SUCCESS';
export const CREATE_ACTIVITY_FAILURE = 'CREATE_ACTIVITY_FAILURE';
export const CREATE_ACTIVITY_ERROR = 'CREATE_ACTIVITY_ERROR';
export const UPDATE_ACTIVITY_BEGIN = 'UPDATE_ACTIVITY_BEGIN';
export const UPDATE_ACTIVITY_SUCCESS = 'UPDATE_ACTIVITY_SUCCESS';
export const UPDATE_ACTIVITY_FAILURE = 'UPDATE_ACTIVITY_FAILURE';
export const UPDATE_ACTIVITY_ERROR = 'UPDATE_ACTIVITY_ERROR';
export const REMOVE_ACTIVITY_BEGIN = 'REMOVE_ACTIVITY_BEGIN';
export const REMOVE_ACTIVITY_SUCCESS = 'REMOVE_ACTIVITY_SUCCESS';
export const REMOVE_ACTIVITY_FAILURE = 'REMOVE_ACTIVITY_FAILURE';
export const REMOVE_ACTIVITY_ERROR = 'REMOVE_ACTIVITY_ERROR';
export const RESET_COURSEMODULE_STATE = 'RESET_COURSEMODULE_STATE';
export const RESET_COURSEMODULE_ERRORS = 'RESET_COURSEMODULE_ERRORS'
export const LOGOUT_USER_COURSEMODULE = 'LOGOUT_USER_COURSEMODULE';
export const UPDATE_COURSEMODULE_DATA_STATE = 'UPDATE_COURSEMODULE_DATA_STATE';
export const CREATE_TEACHER_NO_COURSES_MODULES = 'CREATE_TEACHER_NO_COURSES_MODULES';

// this creates an empty teacher courses object and an teacher created modules object and is only called when the Teacher user is first created 
export const createTeacherEmptyCoursesModules = () => ({
  type: CREATE_TEACHER_NO_COURSES_MODULES,
});
// this updates all of the courses and modules retrieved by the big query 
export const updateAllCourses = (coursesObject) => ({
  type: UPDATE_ALL_COURSES,
  payload: { coursesObject },
});
// this updates all of the teacher created modules retrieved by the big query 
export const updateAllTeacherModules = (teacherModulesObject) => ({
  type: UPDATE_TEACHER_MODULES,
  payload: { teacherModulesObject },
});
// this updates all of the available public modules retrieved when a teacher user account is created or when the teacher logs in and the big query runs
export const updateAllPublicModules = (publicModulesObject) => ({
  type: UPDATE_PUBLIC_MODULES,
  payload: { publicModulesObject },
});

// Actions to Create a Teacher Course from a list of modules
export const createCourseBegin = () => ({
  type: CREATE_COURSE_BEGIN,
});
// success when the teacher has created a course by selecting modules to include in the course.
export const createCourseSuccess = (courseId, courseObject) => ({
  type: CREATE_COURSE_SUCCESS,
  payload: { courseId, courseObject },
});
export const createCourseFailure = error => ({
  type: CREATE_COURSE_FAILURE,
  payload: { error },
});
export const createCourseError = error => ({
  type: CREATE_COURSE_ERROR,
  payload: { error },
});

// Actions to add modules to a Teacher Course 
export const addCourseModulesBegin = () => ({
  type: ADD_COURSE_MODULE_BEGIN,
});
// success when the Teacher has added modules to a course by selecting modules to include in the course.
export const addCourseModulesSuccess = (courseId, courseObject) => ({
  type: ADD_COURSE_MODULE_SUCCESS,
  payload: { courseId, courseObject },
});
export const addCourseModulesFailure = error => ({
  type: ADD_COURSE_MODULE_FAILURE,
  payload: { error },
});
export const addCourseModulesError = error => ({
  type: ADD_COURSE_MODULE_ERROR,
  payload: { error },
});

// Actions to remove modules from a Teacher Course
export const removeCourseModulesBegin = () => ({
  type: REMOVE_COURSE_MODULE_BEGIN,
});
// success when the teacher has removed modules from a course.
export const removeCourseModulesSuccess = (courseId, courseObject) => ({
  type: REMOVE_COURSE_MODULE_SUCCESS,
  payload: { courseId, courseObject },
});
export const removeCourseModulesFailure = error => ({
  type: REMOVE_COURSE_MODULE_FAILURE,
  payload: { error },
});
export const removeCourseModulesError = error => ({
  type: REMOVE_COURSE_MODULE_ERROR,
  payload: { error },
});
export const logoutUserCourseModule = () => ({
  type: LOGOUT_USER_COURSEMODULE,
});

// the 'modulesList' input is an array of Module Id's that are to be included in the Teqcher Course
// the 'isPrivate' input should initially be set to True so that the course can only be viewed and used by the Teacher who created it
// the 'courseName' input is a descriptive name that the teacher wants to use for the course they are creating
export function createTeacherCourse(token, courseName, isPrivate, modulesList) {
  return function(dispatch){
    // convert the array of module Id's to a string 
    const stringifyModulesList = stringifyIntArray(modulesList)
    // generate the graphql mutation syntax
    const mutationText = CREATE_TEACHER_COURSE(courseName, isPrivate, stringifyModulesList)
    dispatch(createCourseBegin());
    return axios.post(GRAPHQL_URL, { query: mutationText }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
    })
      .then((json) => {
        if ('errors' in json.data) {
          dispatch(createCourseError(json.data.errors[0].message));
          return {errors: json.data.errors};
        }
        else{
          // Transform arrays in the Teacher course object to objects that further contain objects.
          // This ensures that the when state is updated in the Redux store there is no need to iterate over the arrays.
          var mainReturnedObj = json.data.data.createTeachercourse.newCourse;
          let courseModules = {};
          if (mainReturnedObj.courseModules.length > 0){
            courseModules = arrayToObjectID(mainReturnedObj.courseModules);
          }
          mainReturnedObj.courseModules = courseModules;
          dispatch(createCourseSuccess(mainReturnedObj.id, mainReturnedObj));
          return json.data.data;
        }
      })
      .catch(error => dispatch(createCourseFailure(error.message)));
  };
}

// the 'modulesList' input is an array of Module Id's that are to be added to the Teqcher Course
// the 'courseId' is the database ID of the course that the Teacher set up previously
export function addModuletoCourse(token, courseId, modulesList) {
  return function(dispatch){
    // convert the array of module Id's to a string 
    const stringifyModulesList = stringifyIntArray(modulesList)
    const mutationText = ADD_COURSE_MODULES(courseId, stringifyModulesList)
    dispatch(addCourseModulesBegin());
    return axios.post(GRAPHQL_URL, { query: mutationText }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
    })
      .then((json) => {
        if ('errors' in json.data) {
          dispatch(addCourseModulesError(json.data.errors[0].message));
          return {errors: json.data.errors};
        }
        else{
          // Transform arrays in the Teacher course object to objects that further contain objects.
          // This ensures that the when state is updated in the Redux store there is no need to iterate over the arrays.
          var mainReturnedObj = json.data.data.addCoursemodules.updatedCourse;
          let courseModules = {};
          if (mainReturnedObj.courseModules.length > 0){
            courseModules = arrayToObjectID(mainReturnedObj.courseModules);
          }
          mainReturnedObj.courseModules = courseModules;
          dispatch(addCourseModulesSuccess(mainReturnedObj.id, mainReturnedObj));
          return json.data.data;
        }
      })
      .catch(error => dispatch(addCourseModulesFailure(error.message)));
  };
}

// the 'modulesList' input is an array of Module Id's that are to be removed from the Teacher Course
// the 'courseId' is the database ID of the course that the Teacher set up previously
export function removeCourseModules(token, courseId, modulesList) {
  return function(dispatch){
    // convert the array of module Id's to a string 
    const stringifyModulesList = stringifyIntArray(modulesList)
    const mutationText = REMOVE_COURSE_MODULES(courseId, stringifyModulesList)
    dispatch(removeCourseModulesBegin());
    return axios.post(GRAPHQL_URL, { query: mutationText }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
    })
      .then((json) => {
        if ('errors' in json.data) {
          dispatch(removeCourseModulesError(json.data.errors[0].message));
          return {errors: json.data.errors};
        }
        else{
          // Transform arrays in the Teacher course object to objects that further contain objects.
          // This ensures that the when state is updated in the Redux store there is no need to iterate over the arrays.
          var mainReturnedObj = json.data.data.removeCoursemodules.updatedCourse;
          let courseModules = {};
          if (mainReturnedObj.courseModules.length > 0){
            courseModules = arrayToObjectID(mainReturnedObj.courseModules);
          }
          mainReturnedObj.courseModules = courseModules;
          dispatch(removeCourseModulesSuccess(mainReturnedObj.id, mainReturnedObj));
          return json.data.data;
        }
      })
      .catch(error => dispatch(removeCourseModulesFailure(error.message)));
  };
}

