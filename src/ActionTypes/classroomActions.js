import axios from 'axios';
import { GRAPHQL_URL } from "../constants";
import { CREATE_TEACHER_CLASSROOM } from '../graphql/mutations/CreateTeacherClassroom';
import { REMOVE_TEACHER_CLASSROOM } from '../graphql/mutations/RemoveTeacherClassroom';
import { ADD_CLASSROOM_STUDENTS, STRINGIFY_STUDENTS_LIST } from '../graphql/mutations/AddClassroomStudents';
import { REMOVE_CLASSROOM_STUDENTS } from '../graphql/mutations/RemoveClassroomStudents';
import { arrayToObjectID, arrayToObjectUserID, arrayToObjectModuleID, arrayToObjectQuizQuestionID } from '../helper_functions/utilities';
import { CREATE_TEACHER_CLASSROOM_COURSE } from '../graphql/mutations/CreateTeacherClassroomCourse';
import { REMOVE_TEACHER_CLASSROOM_COURSE } from '../graphql/mutations/RemoveTeacherClassroomCourse';
import { stringifyIntArray } from '../helper_functions/utilities';

export const CREATE_TEACHER_NO_CLASSROOMS = 'CREATE_TEACHER_NO_CLASSROOMS';
export const UPDATE_ALL_CLASSROOMS = 'UPDATE_ALL_CLASSROOMS';
export const UPDATE_MINI_CLASSROOMS = 'UPDATE_MINI_CLASSROOMS';
export const CREATE_CLASSROOM_BEGIN = 'CREATE_CLASSROOM_BEGIN';
export const CREATE_CLASSROOM_SUCCESS = 'CREATE_CLASSROOM_SUCCESS';
export const CREATE_CLASSROOM_FAILURE = 'CREATE_CLASSROOM_FAILURE';
export const CREATE_CLASSROOM_ERROR = 'CREATE_CLASSROOM_ERROR';
export const REMOVE_CLASSROOM_BEGIN = 'REMOVE_CLASSROOM_BEGIN';
export const REMOVE_CLASSROOM_SUCCESS = 'REMOVE_CLASSROOM_SUCCESS';
export const REMOVE_CLASSROOM_FAILURE = 'REMOVE_CLASSROOM_FAILURE';
export const REMOVE_CLASSROOM_ERROR = 'REMOVE_CLASSROOM_ERROR';
export const CREATE_CLASSROOM_COURSE_BEGIN = 'CREATE_CLASSROOM_COURSE_BEGIN';
export const CREATE_CLASSROOM_COURSE_SUCCESS = 'CREATE_CLASSROOM_COURSE_SUCCESS';
export const CREATE_CLASSROOM_COURSE_FAILURE = 'CREATE_CLASSROOM_COURSE_FAILURE';
export const CREATE_CLASSROOM_COURSE_ERROR = 'CREATE_CLASSROOM_COURSE_ERROR';
export const REMOVE_CLASSROOM_COURSE_BEGIN = 'REMOVE_CLASSROOM_COURSE_BEGIN';
export const REMOVE_CLASSROOM_COURSE_SUCCESS = 'REMOVE_CLASSROOM_COURSE_SUCCESS';
export const REMOVE_CLASSROOM_COURSE_FAILURE = 'REMOVE_CLASSROOM_COURSE_FAILURE';
export const REMOVE_CLASSROOM_COURSE_ERROR = 'REMOVE_CLASSROOM_COURSE_ERROR';
export const ADD_STUDENTS_BEGIN = 'ADD_STUDENTS_BEGIN';
export const ADD_STUDENTS_SUCCESS = 'ADD_STUDENTS_SUCCESS';
export const ADD_STUDENTS_FAILURE = 'ADD_STUDENTS_FAILURE';
export const ADD_STUDENTS_ERROR = 'ADD_STUDENTS_ERROR';
export const UPDATE_STUDENT_BEGIN = 'UPDATE_STUDENT_BEGIN';
export const UPDATE_STUDENT_SUCCESS = 'UPDATE_STUDENT_SUCCESS';
export const UPDATE_STUDENT_FAILURE = 'UPDATE_STUDENT_FAILURE';
export const UPDATE_STUDENT_ERROR = 'UPDATE_STUDENT_ERROR';
export const REMOVE_STUDENTS_BEGIN = 'REMOVE_STUDENTS_BEGIN';
export const REMOVE_STUDENTS_SUCCESS = 'REMOVE_STUDENTS_SUCCESS';
export const REMOVE_STUDENTS_FAILURE = 'REMOVE_STUDENTS_FAILURE';
export const REMOVE_STUDENTS_ERROR = 'REMOVE_STUDENTS_ERROR';
export const RESET_CLASSROOM_STATE = 'RESET_CLASSROOM_STATE';
export const RESET_CLASSROOM_ERRORS = 'RESET_CLASSROOM_ERRORS'
export const LOGOUT_USER_CLASSROOM = 'LOGOUT_USER_CLASSROOM';
export const UPDATE_CLASSROOM_DATA_STATE = 'UPDATE_CLASSROOM_DATA_STATE';

// this creates empty teacher classrooms and classroomCourses objects and is only called when the Teacher user is first created 
export const createTeacherEmptyClassrooms = () => ({
  type: CREATE_TEACHER_NO_CLASSROOMS,
});
// this updates all of the classrooms retrieved by either the big query or when a teacher user account is created
export const updateAllClassrooms = (classrooms, classroomCourses) => ({
  type: UPDATE_ALL_CLASSROOMS,
  payload: { classrooms, classroomCourses },
});
// this updates all of the Teacher classrooms retrieved by the mini query 
export const updateMiniClassrooms = (classrooms) => ({
  type: UPDATE_MINI_CLASSROOMS,
  payload: { classrooms },
});
// Create a teacher classroom
export const createClassroomBegin = () => ({
  type: CREATE_CLASSROOM_BEGIN,
});
// success when the teacher has created their classroom 
export const createClassroomSuccess = (classroomObject) => ({
  type: CREATE_CLASSROOM_SUCCESS,
  payload: { classroomObject },
});
export const createClassroomFailure = error => ({
  type: CREATE_CLASSROOM_FAILURE,
  payload: { error },
});
export const createClassroomError = error => ({
  type: CREATE_CLASSROOM_ERROR,
  payload: { error },
});
// Remove a teacher classroom
export const removeClassroomBegin = () => ({
  type: REMOVE_CLASSROOM_BEGIN,
});
// success when the teacher has removed their classroom 
export const removeClassroomSuccess = (classroomsObject) => ({
  type: REMOVE_CLASSROOM_SUCCESS,
  payload: { classroomsObject },
});
export const removeClassroomFailure = error => ({
  type: REMOVE_CLASSROOM_FAILURE,
  payload: { error },
});
export const removeClassroomError = error => ({
  type: REMOVE_CLASSROOM_ERROR,
  payload: { error },
});
// Create a teacher classroom Course
export const createClassroomCourseBegin = () => ({
  type: CREATE_CLASSROOM_COURSE_BEGIN,
});
// success when the teacher has created their classroom course
export const createClassroomCourseSuccess = (classroomCourseObject) => ({
  type: CREATE_CLASSROOM_COURSE_SUCCESS,
  payload: { classroomCourseObject },
});
export const createClassroomCourseFailure = error => ({
  type: CREATE_CLASSROOM_COURSE_FAILURE,
  payload: { error },
});
export const createClassroomCourseError = error => ({
  type: CREATE_CLASSROOM_COURSE_ERROR,
  payload: { error },
});
// Remove a teacher classroom Course
export const removeClassroomCourseBegin = () => ({
  type: REMOVE_CLASSROOM_COURSE_BEGIN,
});
// success when the teacher has removed their classroom course 
export const removeClassroomCourseSuccess = (classroomCourseIdList) => ({
  type: REMOVE_CLASSROOM_COURSE_SUCCESS,
  payload: { classroomCourseIdList },
});
export const removeClassroomCourseFailure = error => ({
  type: REMOVE_CLASSROOM_COURSE_FAILURE,
  payload: { error },
});
export const removeClassroomCourseError = error => ({
  type: REMOVE_CLASSROOM_COURSE_ERROR,
  payload: { error },
});
// Add a list of Students to a teacher classroom.  The classroom does not need to exist to add the students
export const addStudentsBegin = () => ({
  type: ADD_STUDENTS_BEGIN,
});
// success when the teacher has added students to their classroom 
export const addStudentsSuccess = (classroomObject) => ({
  type: ADD_STUDENTS_SUCCESS,
  payload: { classroomObject },
});
export const addStudentsFailure = error => ({
  type: ADD_STUDENTS_FAILURE,
  payload: { error },
});
export const addStudentsError = error => ({
  type: ADD_STUDENTS_ERROR,
  payload: { error },
});
// Remove a list of Students from a teacher classroom.  
export const removeStudentsBegin = () => ({
  type: REMOVE_STUDENTS_BEGIN,
});
// success when the teacher has removed students from their classroom 
export const removeStudentsSuccess = (classroomObject) => ({
  type: REMOVE_STUDENTS_SUCCESS,
  payload: { classroomObject },
});
export const removeStudentsFailure = error => ({
  type: REMOVE_STUDENTS_FAILURE,
  payload: { error },
});
export const removeStudentsError = error => ({
  type: REMOVE_STUDENTS_ERROR,
  payload: { error },
});
export const logoutUserClassroom = () => ({
  type: LOGOUT_USER_CLASSROOM,
});

// NOTE:  make sure that the input parameter 'studentsList' is an array of one or more of the following object
// Make sure that double quotes atre used for the string and date format input fileds in each object

// { email: "welshman@me.edu",
//	 firstname: "Chris",
//	 lastName: "Thomas",
//	birthDate: "2008-06-06",
// }
export function createTeacherClassroom(token, classroomName, studentsList, classYear) {
  return function(dispatch){
    // convert the array of student objects to a string 
    const stringifyStudentList = STRINGIFY_STUDENTS_LIST(studentsList)
    const mutationText = CREATE_TEACHER_CLASSROOM(classroomName, stringifyStudentList, classYear)
    dispatch(createClassroomBegin());
    return axios.post(GRAPHQL_URL, { query: mutationText }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
    })
      .then((json) => {
        if ('errors' in json.data) {
          dispatch(createClassroomError(json.data.errors[0].message));
          return {errors: json.data.errors};
        }
        else{
          // Transform arrays in the returned Teacher classroom object to objects that further contain objects.
          // This ensures that the when state is updated in the Redux store there is no need to iterate over the arrays.
          // convert the classroom array of students into an object of objects
          var mainReturnedObj = json.data.data.createTeacherclassroom;
          const classroomStudents = arrayToObjectUserID(mainReturnedObj.classroom.studentList);
          mainReturnedObj.classroom.studentList = classroomStudents; 
          for (var property in mainReturnedObj.classroom.studentList){
            // convert the classroom array of student stock competitions entered into an onbject of objects
            const studentStockCompsEntered = arrayToObjectID(mainReturnedObj.classroom.studentList[property].stockCompetitionsEntered);
            mainReturnedObj.classroom.studentList[property].stockCompetitionsEntered = studentStockCompsEntered;
            // convert the classroom array of student crypto competitions entered into an onbject of objects
            const studentCryptoCompsEntered = arrayToObjectID(mainReturnedObj.classroom.studentList[property].cryptoCompetitionsEntered);
            mainReturnedObj.classroom.studentList[property].cryptoCompetitionsEntered = studentCryptoCompsEntered;
            // convert the classroom array of student Module Assessment or Quiz Scores into an onbject of objects
            const studentModuleAssessmentScores = arrayToObjectModuleID(mainReturnedObj.classroom.studentList[property].moduleAssessmentScores);
            mainReturnedObj.classroom.studentList[property].moduleAssessmentScores = studentModuleAssessmentScores;
            // convert the student list module assessment score question results into an object of objects
            for (var key6 in mainReturnedObj.classroom.studentList[property].moduleAssessmentScores){
              const studentModuleAssessmentScoreAnswers = arrayToObjectQuizQuestionID(mainReturnedObj.classroom.studentList[property].moduleAssessmentScores[key6].questionResults);
              mainReturnedObj.classroom.studentList[property].moduleAssessmentScores[key6].questionResults = studentModuleAssessmentScoreAnswers;
            }
          }
          dispatch(createClassroomSuccess(mainReturnedObj.classroom));
          return json.data.data;
        }
      })
      .catch(error => dispatch(createClassroomFailure(error.message)));
  };
}

export function removeTeacherClassroom(token, classroomId) {
  return function(dispatch){
    dispatch(removeClassroomBegin());
    return axios.post(GRAPHQL_URL, { query: REMOVE_TEACHER_CLASSROOM(classroomId) }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
    })
      .then((json) => {
        if ('errors' in json.data) {
          dispatch(removeClassroomError(json.data.errors[0].message));
          return {errors: json.data.errors};
        }
        else{
          // Transform arrays in the returned Teacher classrooms object to objects that further contain objects.
          // This ensures that the when state is updated in the Redux store there is no need to iterate over the arrays.
          // convert the classroom array of students into an object of objects
          var mainReturnedObj = json.data.data.removeTeacherclassroom;
          // convert the classrooms array of classrooms into an object of objects
          const classroomsObject = arrayToObjectID(mainReturnedObj.classrooms);
          mainReturnedObj.classrooms = classroomsObject; 
          for (var property4 in mainReturnedObj.classrooms){
            // convert the classroom array of students into an onbject of objects
            const studentsObject = arrayToObjectUserID(mainReturnedObj.classrooms[property4].studentList);
            mainReturnedObj.classrooms[property4].studentList = studentsObject; 
            for (var key5 in mainReturnedObj.classrooms[property4].studentList){
              // convert the classroom array of student stock competitions entered into an onbject of objects
              const studentStockCompsEntered = arrayToObjectID(mainReturnedObj.classrooms[property4].studentList[key5].stockCompetitionsEntered);
              mainReturnedObj.classrooms[property4].studentList[key5].stockCompetitionsEntered = studentStockCompsEntered;
              // convert the classroom array of student crypto competitions entered into an onbject of objects
              const studentCryptoCompsEntered = arrayToObjectID(mainReturnedObj.classrooms[property4].studentList[key5].cryptoCompetitionsEntered);
              mainReturnedObj.classrooms[property4].studentList[key5].cryptoCompetitionsEntered = studentCryptoCompsEntered;
              // convert the classroom array of student Module Assessment or Quiz Scores into an onbject of objects
              const studentModuleAssessmentScores = arrayToObjectModuleID(mainReturnedObj.classrooms[property4].studentList[key5].moduleAssessmentScores);
              mainReturnedObj.classrooms[property4].studentList[key5].moduleAssessmentScores = studentModuleAssessmentScores;
              // convert the student list module assessment score question results into an object of objects
              for (var key6 in mainReturnedObj.classrooms[property4].studentList[key5].moduleAssessmentScores){
                const studentModuleAssessmentScoreAnswers = arrayToObjectQuizQuestionID(mainReturnedObj.classrooms[property4].studentList[key5].moduleAssessmentScores[key6].questionResults);
                mainReturnedObj.classrooms[property4].studentList[key5].moduleAssessmentScores[key6].questionResults = studentModuleAssessmentScoreAnswers;
              }
            }
          }
          dispatch(removeClassroomSuccess(mainReturnedObj.classrooms));
          return json.data.data;
        }
      })
      .catch(error => dispatch(removeClassroomFailure(error.message)));
  };
}

// NOTE:  make sure that the input parameter 'studentsList' is an array of one or more of the following object
// Make sure that double quotes are used for the string and date format input fileds in each object
// { email: "welshman@me.edu", firstname: "Chris", lastName: "Thomas", birthDate: "2008-06-06" }
export function addStudentsToClassroom(token, classroomId, studentsList) {
  return function(dispatch){
    // convert the array of student objects to a string 
    const stringifyStudentList = STRINGIFY_STUDENTS_LIST(studentsList)
    const mutationText = ADD_CLASSROOM_STUDENTS(classroomId, stringifyStudentList)
    dispatch(addStudentsBegin());
    return axios.post(GRAPHQL_URL, { query: mutationText }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
    })
      .then((json) => {
        if ('errors' in json.data) {
          dispatch(addStudentsError(json.data.errors[0].message));
          return {errors: json.data.errors};
        }
        else{
          // Transform arrays in the returned Teacher classroom object to objects that further contain objects.
          // This ensures that the when state is updated in the Redux store there is no need to iterate over the arrays.
          // convert the classroom array of students into an object of objects
          var mainReturnedObj = json.data.data.addClassroomstudents;
          const classroomStudents = arrayToObjectUserID(mainReturnedObj.classroom.studentList);
          mainReturnedObj.classroom.studentList = classroomStudents; 
          for (var property in mainReturnedObj.classroom.studentList){
            // convert the classroom array of student stock competitions entered into an onbject of objects
            const studentStockCompsEntered = arrayToObjectID(mainReturnedObj.classroom.studentList[property].stockCompetitionsEntered);
            mainReturnedObj.classroom.studentList[property].stockCompetitionsEntered = studentStockCompsEntered;
            // convert the classroom array of student crypto competitions entered into an onbject of objects
            const studentCryptoCompsEntered = arrayToObjectID(mainReturnedObj.classroom.studentList[property].cryptoCompetitionsEntered);
            mainReturnedObj.classroom.studentList[property].cryptoCompetitionsEntered = studentCryptoCompsEntered;
            // convert the classroom array of student Module Assessment or Quiz Scores into an onbject of objects
            const studentModuleAssessmentScores = arrayToObjectModuleID(mainReturnedObj.classroom.studentList[property].moduleAssessmentScores);
            mainReturnedObj.classroom.studentList[property].moduleAssessmentScores = studentModuleAssessmentScores;
            // convert the student list module assessment score question results into an object of objects
            for (var key7 in mainReturnedObj.classroom.studentList[property].moduleAssessmentScores){
              const studentModuleAssessmentScoreAnswers = arrayToObjectQuizQuestionID(mainReturnedObj.classroom.studentList[property].moduleAssessmentScores[key7].questionResults);
              mainReturnedObj.classroom.studentList[property].moduleAssessmentScores[key7].questionResults = studentModuleAssessmentScoreAnswers;
            }
          }
          dispatch(addStudentsSuccess(mainReturnedObj.classroom));
          return json.data.data;
        }
      })
      .catch(error => {
        dispatch(addStudentsFailure(error.message))
        return { errors: [{ message: error.message }]};
      });
  };
}

// NOTE:  make sure that the input parameter 'studentsList' is an array of userId's for the student that are to be removed from the classroom
export function removeStudentsFromClassroom(token, classroomId, studentsList) {
  return function(dispatch){
     // convert the array of student user Id's to a string 
     const stringifyStudentsList = stringifyIntArray(studentsList)
     // generate the graphql mutation syntax
     const mutationText = REMOVE_CLASSROOM_STUDENTS(classroomId, stringifyStudentsList)
    dispatch(removeStudentsBegin());
    return axios.post(GRAPHQL_URL, { query: mutationText }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
    })
      .then((json) => {
        if ('errors' in json.data) {
          dispatch(removeStudentsError(json.data.errors[0].message));
          return {errors: json.data.errors};
        }
        else{
          // Transform arrays in the returned Teacher classroom object to objects that further contain objects.
          // This ensures that the when state is updated in the Redux store there is no need to iterate over the arrays.
          // convert the classroom array of students into an object of objects
          var mainReturnedObj = json.data.data.removeClassroomstudents;
          const classroomStudents = arrayToObjectUserID(mainReturnedObj.classroom.studentList);
          mainReturnedObj.classroom.studentList = classroomStudents; 
          for (var property in mainReturnedObj.classroom.studentList){
            // convert the classroom array of student stock competitions entered into an onbject of objects
            const studentStockCompsEntered = arrayToObjectID(mainReturnedObj.classroom.studentList[property].stockCompetitionsEntered);
            mainReturnedObj.classroom.studentList[property].stockCompetitionsEntered = studentStockCompsEntered;
            // convert the classroom array of student crypto competitions entered into an onbject of objects
            const studentCryptoCompsEntered = arrayToObjectID(mainReturnedObj.classroom.studentList[property].cryptoCompetitionsEntered);
            mainReturnedObj.classroom.studentList[property].cryptoCompetitionsEntered = studentCryptoCompsEntered;
            // convert the classroom array of student Module Assessment or Quiz Scores into an onbject of objects
            const studentModuleAssessmentScores = arrayToObjectModuleID(mainReturnedObj.classroom.studentList[property].moduleAssessmentScores);
            mainReturnedObj.classroom.studentList[property].moduleAssessmentScores = studentModuleAssessmentScores;
            // convert the student list module assessment score question results into an object of objects
            for (var key7 in mainReturnedObj.classroom.studentList[property].moduleAssessmentScores){
              const studentModuleAssessmentScoreAnswers = arrayToObjectQuizQuestionID(mainReturnedObj.classroom.studentList[property].moduleAssessmentScores[key7].questionResults);
              mainReturnedObj.classroom.studentList[property].moduleAssessmentScores[key7].questionResults = studentModuleAssessmentScoreAnswers;
            }
          }
          dispatch(removeStudentsSuccess(mainReturnedObj.classroom));
          return json.data.data;
        }
      })
      .catch(error => {
        dispatch(removeStudentsFailure(error.message));
        return { errors: [{ message: error.message }]};
      });
  };
}


// This adds an existing Teacher Course to a Teacher's exisiting classroom.  The required inputs are 'classroomId', which is the database Id of the classroom
// that the teacher wishes to add the course to, and 'courseId', which is the database Id of the Teacher course that the Teacher is adding 
// to the classroom.
export function createTeacherClassroomCourse(token, classroomId, courseId) {
  return function(dispatch){
    dispatch(createClassroomCourseBegin());
    return axios.post(GRAPHQL_URL, { query: CREATE_TEACHER_CLASSROOM_COURSE(classroomId, courseId) }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
    })
      .then((json) => {
        if ('errors' in json.data) {
          dispatch(createClassroomCourseError(json.data.errors[0].message));
          return {errors: json.data.errors};
        }
        else{
          dispatch(createClassroomCourseSuccess(json.data.data.createTeacherclassroomcourse.classroomCourse));
          return json.data.data;
        }
      })
      .catch(error => {
        dispatch(createClassroomCourseFailure(error.message));
        return { errors: [{ message: error.message }]};
      });
  };
}

// This removes an existing Teacher Course from a Teacher's exisiting classroom.  The required input is 'classroomCoursesToRemove' which 
// is an array of the database Classroom Course Id's (as opposed to Classroom Id's and Course Id's).  The array is provided to allow the 
// teacher to remove 1 or more courses from Classrooms at the same time.
export function removeTeacherClassroomCourse(token, classroomCoursesToRemove) {
  return function(dispatch){
    dispatch(removeClassroomCourseBegin());
    return axios.post(GRAPHQL_URL, { query: REMOVE_TEACHER_CLASSROOM_COURSE(classroomCoursesToRemove) }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
    })
      .then((json) => {
        if ('errors' in json.data) {
          dispatch(removeClassroomCourseError(json.data.errors[0].message));
          return {errors: json.data.errors};
        }
        else{
          if (json.data.data.removeTeacherclassroomcourse.success){
            dispatch(removeClassroomCourseSuccess(classroomCoursesToRemove));
          }
          return json.data.data;
        }
      })
      .catch(error => dispatch(removeClassroomCourseFailure(error.message)));
  };
}


