import { createSelector } from 'reselect';
import {  objectToArray } from '../helper_functions/utilities';

// selector for retrieving the Teacher Summaries for all of the schools
const schoolsTeacherSummariesArraySelector = (state) => objectToArray(state.principalSuperintendent.schoolTeacherSummaries);
// selector for retrieving the Teacher Summaries for a specific school
const schoolTeacherSummariesArraySelector = (state, props) => (props.schoolName in state.principalSuperintendent.schoolTeacherSummaries) ? state.principalSuperintendent.schoolTeacherSummaries[props.schoolName] : {};

// selector to return an array of all of the Teacher Summaries for all of the Schools
export const getAllSchoolTeacherSummaries = createSelector(
  [schoolsTeacherSummariesArraySelector],
  (schoolsTeacherSummariesArray) => {
    if (schoolsTeacherSummariesArray && schoolsTeacherSummariesArray.length > 0) {
      let schoolsTeacherSummariesArrayCopy = JSON.parse(JSON.stringify(schoolsTeacherSummariesArray));
      for (var i in schoolsTeacherSummariesArrayCopy){
        schoolsTeacherSummariesArrayCopy[i].teacherSummaries = objectToArray(schoolsTeacherSummariesArrayCopy[i].teacherSummaries);
        for (var a in schoolsTeacherSummariesArrayCopy[i].teacherSummaries){
          schoolsTeacherSummariesArrayCopy[i].teacherSummaries[a].courses = objectToArray(schoolsTeacherSummariesArrayCopy[i].teacherSummaries[a].courses);
          for (var b in schoolsTeacherSummariesArrayCopy[i].teacherSummaries[a].courses){
            schoolsTeacherSummariesArrayCopy[i].teacherSummaries[a].courses[b].courseModules = objectToArray(schoolsTeacherSummariesArrayCopy[i].teacherSummaries[a].courses[b].courseModules);
          }
          schoolsTeacherSummariesArrayCopy[i].teacherSummaries[a].classrooms = objectToArray(schoolsTeacherSummariesArrayCopy[i].teacherSummaries[a].classrooms);
          schoolsTeacherSummariesArrayCopy[i].teacherSummaries[a].classroomCourses = objectToArray(schoolsTeacherSummariesArrayCopy[i].teacherSummaries[a].classroomCourses);
        }
      }
        return schoolsTeacherSummariesArrayCopy;
    }
    else{
      return [];
    }
  }
)

// selector to return an array of all of the Teacher Summaries for a specific School
export const getSchoolTeacherSummaries = createSelector(
  [schoolTeacherSummariesArraySelector],
  (schoolTeacherSummariesArray) => {
    if (schoolTeacherSummariesArray && schoolTeacherSummariesArray.length > 0) {
      let schoolTeacherSummariesArrayCopy = JSON.parse(JSON.stringify(schoolTeacherSummariesArray));
      schoolTeacherSummariesArrayCopy.teacherSummaries = objectToArray(schoolTeacherSummariesArrayCopy.teacherSummaries);
      for (var a in schoolTeacherSummariesArrayCopy.teacherSummaries){
        schoolTeacherSummariesArrayCopy.teacherSummaries[a].courses = objectToArray(schoolTeacherSummariesArrayCopy.teacherSummaries[a].courses);
        for (var b in schoolTeacherSummariesArrayCopy.teacherSummaries[a].courses){
          schoolTeacherSummariesArrayCopy.teacherSummaries[a].courses[b].courseModules = objectToArray(schoolTeacherSummariesArrayCopy.teacherSummaries[a].courses[b].courseModules);
        }
        schoolTeacherSummariesArrayCopy.teacherSummaries[a].classrooms = objectToArray(schoolTeacherSummariesArrayCopy.teacherSummaries[a].classrooms);
        schoolTeacherSummariesArrayCopy.teacherSummaries[a].classroomCourses = objectToArray(schoolTeacherSummariesArrayCopy.teacherSummaries[a].classroomCourses);
      }
        return schoolTeacherSummariesArrayCopy;
    }
    else{
      return [];
    }
  }
)