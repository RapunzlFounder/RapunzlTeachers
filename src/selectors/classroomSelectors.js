import { createSelector } from 'reselect';
import {  objectToArray } from '../helper_functions/utilities';

const teacherClassroomsArraySelector = (state) => objectToArray(state.classroom.classrooms);
const demoClassroomsArraySelector = (state) => objectToArray(state.classroom.demoClassrooms);
// selector for retrieving a specific teacher classroom
const teacherClassroomSelector = (state, props) => (props.classroomId in state.classroom.classrooms) ? state.classroom.classrooms[props.classroomId] : {};

// Used In Get All Teacher Classroom Courses
const teacherClassroomCoursesArraySelector = (state) => objectToArray(state.classroom.classroomCourses);
const demoClassroomCoursesArraySelector = (state) => objectToArray(state.classroom.demoClassroomCourses);
// selector to return all the Teacher Classrooms
export const getAllTeacherClassrooms = createSelector(
  [teacherClassroomsArraySelector],
  (teacherClassroomsArray) => {
    if (teacherClassroomsArray && teacherClassroomsArray.length > 0) {
      let teacherClassroomsArrayCopy = JSON.parse(JSON.stringify(teacherClassroomsArray));
      for (var i in teacherClassroomsArrayCopy){
        teacherClassroomsArrayCopy[i].studentList = objectToArray(teacherClassroomsArrayCopy[i].studentList);
        for (var a in teacherClassroomsArrayCopy[i].studentList){
          teacherClassroomsArrayCopy[i].studentList[a].stockCompetitionsEntered = objectToArray(teacherClassroomsArrayCopy[i].studentList[a].stockCompetitionsEntered);
          teacherClassroomsArrayCopy[i].studentList[a].cryptoCompetitionsEntered  = objectToArray(teacherClassroomsArrayCopy[i].studentList[a].cryptoCompetitionsEntered);
          // convert the classroom object of student Module Assessment or Quiz Scores into an array of objects
          teacherClassroomsArrayCopy[i].studentList[a].moduleAssessmentScores = objectToArray(teacherClassroomsArrayCopy[i].studentList[a].moduleAssessmentScores);
          // convert the student list module assessment score question results into an array of objects
          for (var b in teacherClassroomsArrayCopy[i].studentList[a].moduleAssessmentScores){
            teacherClassroomsArrayCopy[i].studentList[a].moduleAssessmentScores[b].questionResults = objectToArray(teacherClassroomsArrayCopy[i].studentList[a].moduleAssessmentScores[b].questionResults);
          }
        }
      }
        return teacherClassroomsArrayCopy;
    }
    else{
      return [];
    }
  }
)

export const getAllDemoClassrooms = createSelector(
  [demoClassroomsArraySelector],
  (demoClassroomsArray) => {
    if (demoClassroomsArray && demoClassroomsArray.length > 0) {
      let teacherClassroomsArrayCopy = JSON.parse(JSON.stringify(demoClassroomsArray));
      for (var i in teacherClassroomsArrayCopy){
        teacherClassroomsArrayCopy[i].studentList = objectToArray(teacherClassroomsArrayCopy[i].studentList);
        for (var a in teacherClassroomsArrayCopy[i].studentList){
          teacherClassroomsArrayCopy[i].studentList[a].stockCompetitionsEntered = objectToArray(teacherClassroomsArrayCopy[i].studentList[a].stockCompetitionsEntered);
          teacherClassroomsArrayCopy[i].studentList[a].cryptoCompetitionsEntered  = objectToArray(teacherClassroomsArrayCopy[i].studentList[a].cryptoCompetitionsEntered);
          // convert the classroom object of student Module Assessment or Quiz Scores into an array of objects
          teacherClassroomsArrayCopy[i].studentList[a].moduleAssessmentScores = objectToArray(teacherClassroomsArrayCopy[i].studentList[a].moduleAssessmentScores);
          // convert the student list module assessment score question results into an array of objects
          for (var b in teacherClassroomsArrayCopy[i].studentList[a].moduleAssessmentScores){
            teacherClassroomsArrayCopy[i].studentList[a].moduleAssessmentScores[b].questionResults = objectToArray(teacherClassroomsArrayCopy[i].studentList[a].moduleAssessmentScores[b].questionResults);
          }
        }
      }
        return teacherClassroomsArrayCopy;
    }
    else{
      return [];
    }
  }
)

// selector to return a specific Teacher Classroom
export const getTeacherClassroom = createSelector(
    [teacherClassroomSelector],
    (teacherClassroom) => {
      if (teacherClassroom && teacherClassroom != null) {
        let teacherClassroomCopy = JSON.parse(JSON.stringify(teacherClassroom));
        teacherClassroomCopy.studentList = objectToArray(teacherClassroomCopy.studentList);
        for (var a in teacherClassroomCopy.studentList){
          teacherClassroomCopy.studentList[a].stockCompetitionsEntered = objectToArray(teacherClassroomCopy.studentList[a].stockCompetitionsEntered);
          teacherClassroomCopy.studentList[a].cryptoCompetitionsEntered  = objectToArray(teacherClassroomCopy.studentList[a].cryptoCompetitionsEntered);
          // convert the classroom object of student Module Assessment or Quiz Scores into an array of objects
          teacherClassroomCopy.studentList[a].moduleAssessmentScores = objectToArray(teacherClassroomCopy.studentList[a].moduleAssessmentScores);
          // convert the student list module assessment score question results into an array of objects
          for (var b in teacherClassroomCopy.studentList[a].moduleAssessmentScores){
            teacherClassroomCopy.studentList[a].moduleAssessmentScores[b].questionResults = objectToArray(teacherClassroomCopy.studentList[a].moduleAssessmentScores[b].questionResults);
          }
        }
            
        return teacherClassroomCopy;
      }
      else{
        return [];
      }
    }
  )

// Selector For Retrieving All Teacher Classroom Courses
export const getAllTeacherClassroomCourses = createSelector(
  [teacherClassroomCoursesArraySelector],
  (teacherClassroomCoursesArray) => {
    if (teacherClassroomCoursesArray && teacherClassroomCoursesArray.length > 0) {
      return teacherClassroomCoursesArray;
    }
    else{
      return [];
    }
  }
)

// Selector For Retrieving All Demo Classroom Courses
export const getAllDemoClassroomCourses = createSelector(
  [demoClassroomCoursesArraySelector],
  (demoClassroomCoursesArray) => {
    if (demoClassroomCoursesArray && demoClassroomCoursesArray.length > 0) {
      return demoClassroomCoursesArray;
    }
    else{
      return [];
    }
  }
)
