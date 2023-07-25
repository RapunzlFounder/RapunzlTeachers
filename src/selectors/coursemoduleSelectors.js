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
export const getAllTeacherCourses = createSelector(
  [teacherCoursesArraySelector],
  (teacherCourseArray) => {
    if (teacherCourseArray && teacherCourseArray.length > 0) {
        let courseArrayCopy = JSON.parse(JSON.stringify(teacherCourseArray));
        let returnArray = [];
        for (var i in courseArrayCopy){
            courseArrayCopy[i].courseModules = objectToArray(courseArrayCopy[i].courseModules);
            const newCourseObject = {id: courseArrayCopy[i].id, courseName: courseArrayCopy[i].courseName, numberModules: courseArrayCopy[i].courseModules.length};
            returnArray.push(newCourseObject);
        }
        // these next 3 lines are for debugging purposes only
        // const strDate = (new Date()).toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " ");
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
        let rapunzlModulesCopy = JSON.parse(JSON.stringify(rapunzlModules));
        let teacherModulesCopy = JSON.parse(JSON.stringify(teacherModules));
          // create a new object for the teacher course that will be returned
          let newCourseObject = {
            id: teacherCourse.id,
            courseName: teacherCourse.courseName,
            createdAt: teacherCourse.createdAt,
            lastModifiedAt: teacherCourse.lastModifiedAt,
            isPrivate: teacherCourse.isPrivate,
            courseModules: []
          };
          for (var id in teacherCourse.courseModules){
            // first check if the module id is a rapunzl public module
            if (id in rapunzlModulesCopy){
              let newModuleObject = populateTeacherModule(rapunzlModulesCopy[id]);
              newCourseObject.courseModules.push(newModuleObject);
            }
            else if (id in teacherModulesCopy){
              let newModuleObject = populateTeacherModule(teacherModulesCopy[id]);
              newCourseObject.courseModules.push(newModuleObject);
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
        let publicModulesArrayCopy = JSON.parse(JSON.stringify(publicModulesArray));
        for (var i in publicModulesArrayCopy){
            publicModulesArrayCopy[i].teacherGuides = objectToArray(publicModulesArrayCopy[i].teacherGuides);
            publicModulesArrayCopy[i].articles = objectToArray(publicModulesArrayCopy[i].articles);
            publicModulesArrayCopy[i].activities = objectToArray(publicModulesArrayCopy[i].activities);
            publicModulesArrayCopy[i].assessments.questions = objectToArray(publicModulesArrayCopy[i].assessments.questions);
            publicModulesArrayCopy[i].videos = objectToArray(publicModulesArrayCopy[i].videos);           
          }
          return publicModulesArrayCopy;
      }
      else{
        return [];
      }
    }
  )

// selector to return a specific Public Module created by Rapunzl
export const getPublicModule = createSelector(
    [rapunzlPublicModuleSelector],
    (publicModule) => {
      if (publicModule && publicModule != null) {
        let publicModuleCopy = JSON.parse(JSON.stringify(publicModule));
        publicModuleCopy.teacherGuides = objectToArray(publicModuleCopy.teacherGuides);
        publicModuleCopy.articles = objectToArray(publicModuleCopy.articles);
        publicModuleCopy.activities = objectToArray(publicModuleCopy.activities);
        publicModuleCopy.assessments.questions = objectToArray(publicModuleCopy.assessments.questions);
        publicModuleCopy.videos = objectToArray(publicModuleCopy.videos);  

        return publicModuleCopy;
      }
      else{
        return [];
      }
    }
  )
  
// selector to return the assessment questions for a specific Public Module created by Rapunzl
export const getPublicModuleAssessments = createSelector(
  [rapunzlPublicModuleSelector],
  (publicModule) => {
    if (publicModule && publicModule != null && publicModule.assessments != undefined && publicModule.assessments.questions != undefined) {
      let publicModuleCopy = JSON.parse(JSON.stringify(publicModule));
      publicModuleCopy.assessments.questions = objectToArray(publicModuleCopy.assessments.questions); 
      
      return publicModuleCopy.assessments.questions;
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
        let teacherModulesArrayCopy = JSON.parse(JSON.stringify(teacherModulesArray));
        for (var i in teacherModulesArrayCopy){
            teacherModulesArrayCopy[i].teacherGuides = objectToArray(teacherModulesArrayCopy[i].teacherGuides);
            teacherModulesArrayCopy[i].articles = objectToArray(teacherModulesArrayCopy[i].articles);
            teacherModulesArrayCopy[i].activities = objectToArray(teacherModulesArrayCopy[i].activities);
            teacherModulesArrayCopy[i].assessments.questions = objectToArray(teacherModulesArrayCopy[i].assessments.questions);
            teacherModulesArrayCopy[i].videos = objectToArray(teacherModulesArrayCopy[i].videos);           
          }
          return teacherModulesArrayCopy;
      }
      else{
        return [];
      }
    }
  )

// selector to return a specific Module created by Teacher 
export const getTeacherCreatedModule = createSelector(
    [teacherCreatedModuleSelector],
    (teacherModule) => {
      if (teacherModule && teacherModule != null) {
        let teacherModuleCopy = JSON.parse(JSON.stringify(teacherModule));
        teacherModuleCopy.teacherGuides = objectToArray(teacherModuleCopy.teacherGuides);
        teacherModuleCopy.articles = objectToArray(teacherModuleCopy.articles);
        teacherModuleCopy.activities = objectToArray(teacherModuleCopy.activities);
        teacherModuleCopy.assessments.questions = objectToArray(teacherModuleCopy.assessments.questions);
        teacherModuleCopy.videos = objectToArray(teacherModuleCopy.videos);           
          
        return teacherModuleCopy;
      }
      else{
        return [];
      }
    }
  )


