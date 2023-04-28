import { createSelector } from 'reselect';
import {  objectToArray } from '../helper_functions/utilities';

const teacherCoursesArraySelector = (state) => objectToArray(state.coursesmodules.teacherCourses);
const rapunzlPublicModulesObjectSelector = (state) => state.coursesmodules.availablePublicModules;
const teacherCreatedModulesObjectSelector = (state) => state.coursesmodules.teacherCreatedModules;
const rapunzlPublicModulesArraySelector = (state) => objectToArray(state.coursesmodules.availablePublicModules);
const teacherCreatedModulesArraySelector = (state) => objectToArray(state.coursesmodules.teacherCreatedModules);
// selector for retrieving a specific teacher course
const teacherCourseSelector = (state, props) => (props.courseId in state.coursesmodules.teacherCourses) ? state.coursesmodules.teacherCourses[props.courseId] : {};
// selector for retrieving a specific Rapunzl publically available Module
const rapunzlPublicModuleSelector = (state, props) => (props.moduleId in state.coursesmodules.availablePublicModules) ? state.coursesmodules.availablePublicModules[props.moduleId] : {};
// selector for retrieving a specific Teacher Created Module that may be private
const teacherCreatedModuleSelector = (state, props) => (props.moduleId in state.coursesmodules.teacherCreatedModules) ? state.coursesmodules.teacherCreatedModules[props.moduleId] : {};

// selector to return a summary of all the Teacher Created Courses.  The id, name and number of modules is returned for each course
export const getAllTeacherCoursesSummary = createSelector(
  [teacherCoursesArraySelector],
  (teacherCourseArray) => {
    if (teacherCourseArray && teacherCourseArray.length > 0) {
        let returnArray = [];
        for (var i in teacherCourseArray){
            teacherCourseArray[i].modules = objectToArray(teacherCourseArray[i].modules);
            let newCourseObject = {id: teacherCourseArray[i].id, courseName: teacherCourseArray[i].courseName, numberModules: teacherCourseArray[i].modules.length};
            returnArray.push(newCourseObject);
        }
        return returnArray;
    }
    else{
      return [];
    }
  }
)

// selector to return a specific Teacher Created Courses
export const getTeacherCourse = createSelector(
    [teacherCourseSelector, rapunzlPublicModulesObjectSelector, teacherCreatedModulesObjectSelector],
    (teacherCourse, rapunzlModules, teacherModules) => {
      if (teacherCourse && teacherCourse != null) {
          // create a new object for the teacher course that will be returned
          let newCourseObject = {
            id: teacherCourse.id,
            courseName: teacherCourse.courseName,
            createdAt: teacherCourse.createdAt,
            lastModifiedAt: teacherCourse.lastModifiedAt,
            isPrivate: teacherCourse.isPrivate,
            modules: []
          };
          for (var id in teacherCourse.modules){
            // first check if the module id is a rapunzl public module
            if (id in rapunzlModules){
              let newModuleObject = populateTeacherModule(rapunzlModules[id]);
              newCourseObject['modules'].push(newModuleObject);
            }
            else if (id in teacherModules){
              let newModuleObject = populateTeacherModule(teacherModules[id]);
              newCourseObject['modules'].push(newModuleObject);
            }
          }
          return newCourseObject;
      }
      else{
        return {};
      }
    }
  )

function populateTeacherModule(module){
  let newModuleObject = {
    id: module.id,
    name: module.name,
	  description: module.description,
	  imageUrl: module.imageUrl, 
	  presentationUrl: module.presentationUrl, 
	  moduleLevel: module.moduleLevel, 
	  vocabUrl: module.vocabUrl, 
	  isPrivate: module.isPrivate, 
	  isRapunzlModule: module.isRapunzlModule, 
	  teacherId: module.teacherId, 
    teacherGuides: objectToArray(module.teacherGuides),
    articles: objectToArray(module.articles),
    activities: objectToArray(module.activities),
    assessments: module.assessments,
    videos: objectToArray(module.videos)
  };
  newModuleObject.assessments.questions = objectToArray(module.assessments.questions);

  return newModuleObject
}  
// selector to return all the available Public Modules created by Rapunzl
export const getAllPublicModules = createSelector(
    [rapunzlPublicModulesArraySelector],
    (publicModulesArray) => {
      if (publicModulesArray && publicModulesArray.length > 0) {
        for (var i in publicModulesArray){
            publicModulesArray[i].teacherGuides = objectToArray(publicModulesArray[i].teacherGuides);
            publicModulesArray[i].articles = objectToArray(publicModulesArray[i].articles);
            publicModulesArray[i].activities = objectToArray(publicModulesArray[i].activities);
            publicModulesArray[i].assessments.questions = objectToArray(publicModulesArray[i].assessments.questions);
            publicModulesArray[i].videos = objectToArray(publicModulesArray[i].videos);           
          }
          return publicModulesArray;
      }
      else{
        return [];
      }
    }
  )

// selector to return a specific Public Module created by Rapunzl
export const getPublicModule = createSelector(
    [rapunzlPublicModuleSelector],
    (publicModuleArray) => {
      if (publicModuleArray && publicModuleArray != null) {
            publicModuleArray.teacherGuides = objectToArray(publicModuleArray.teacherGuides);
            publicModuleArray.articles = objectToArray(publicModuleArray.articles);
            publicModuleArray.activities = objectToArray(publicModuleArray.activities);
            publicModuleArray.assessments.questions = objectToArray(publicModuleArray.assessments.questions);
            publicModuleArray.videos = objectToArray(publicModuleArray.videos);  

            return publicModuleArray;
      }
      else{
        return [];
      }
    }
  )
  
// selector to return all the Modules created by Teacher 
export const getAllTeacherCreatedModules = createSelector(
    [teacherCreatedModulesArraySelector],
    (teacherModulesArray) => {
      if (teacherModulesArray && teacherModulesArray.length > 0) {
        for (var i in teacherModulesArray){
            teacherModulesArray[i].teacherGuides = objectToArray(teacherModulesArray[i].teacherGuides);
            teacherModulesArray[i].articles = objectToArray(teacherModulesArray[i].articles);
            teacherModulesArray[i].activities = objectToArray(teacherModulesArray[i].activities);
            teacherModulesArray[i].assessments.questions = objectToArray(teacherModulesArray[i].assessments.questions);
            teacherModulesArray[i].videos = objectToArray(teacherModulesArray[i].videos);           
          }
          return teacherModulesArray;
      }
      else{
        return [];
      }
    }
  )

// selector to return a specific Module created by Teacher 
export const getTeacherCreatedModule = createSelector(
    [teacherCreatedModuleSelector],
    (teacherModuleArray) => {
      if (teacherModuleArray && teacherModuleArray.length > 0) {
            teacherModuleArray.teacherGuides = objectToArray(teacherModuleArray.teacherGuides);
            teacherModuleArray.articles = objectToArray(teacherModuleArray.articles);
            teacherModuleArray.activities = objectToArray(teacherModuleArray.activities);
            teacherModuleArray.assessments.questions = objectToArray(teacherModuleArray.assessments.questions);
            teacherModuleArray.videos = objectToArray(teacherModuleArray.videos);           
          
            return teacherModuleArray;
      }
      else{
        return [];
      }
    }
  )


