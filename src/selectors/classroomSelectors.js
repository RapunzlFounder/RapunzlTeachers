import { createSelector } from 'reselect';
import {  objectToArray } from '../helper_functions/utilities';

const teacherClassroomsArraySelector = (state) => objectToArray(state.classroom.classrooms);

// selector for retrieving a specific teacher classroom
const teacherClassroomSelector = (state, props) => (props.classroomId in state.classroom.classrooms) ? state.classroom.classrooms[props.classroomId] : {};

// Used In Get All Teacher Classroom Courses
const teacherClassroomCoursesArraySelector = (state) => objectToArray(state.classroom.classroomCourses);

// selector to return all the Teacher Classrooms
export const getAllTeacherClassrooms = createSelector(
  [teacherClassroomsArraySelector],
  (teacherClassroomsArray) => {
    if (teacherClassroomsArray && teacherClassroomsArray.length > 0) {
        for (var i in teacherClassroomsArray){
            teacherClassroomsArray[i].studentList = objectToArray(teacherClassroomsArray[i].studentList);
            for (var a in teacherClassroomsArray[i].studentList){
                teacherClassroomsArray[i].studentList[a].stockCompetitionsEntered = objectToArray(teacherClassroomsArray[i].studentList[a].stockCompetitionsEntered);
                teacherClassroomsArray[i].studentList[a].cryptoCompetitionsEntered  = objectToArray(teacherClassroomsArray[i].studentList[a].cryptoCompetitionsEntered);
            }
        }
        return teacherClassroomsArray;
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
        teacherClassroom.studentList = objectToArray(teacherClassroom.studentList);
        for (var a in teacherClassroom.studentList){
            teacherClassroom.studentList[a].stockCompetitionsEntered = objectToArray(teacherClassroom.studentList[a].stockCompetitionsEntered);
            teacherClassroom.studentList[a].cryptoCompetitionsEntered  = objectToArray(teacherClassroom.studentList[a].cryptoCompetitionsEntered);
        }
            
        return teacherClassroom;
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
