import axios from 'axios';
import { GRAPHQL_URL } from "../constants";
// import the GraphQL query text needed to retrieve the user big query data
import { GET_DEMO_CONTENT } from '../graphql/queries/GetDemoMaterial';
// import the action to update all of the demo courses and modules
import { updateDemoCourses } from './coursemoduleActions';
// import the action to update all of the classroom students
import { updateAllDemoClassrooms } from './classroomActions';
// import the action to update the notification state
//import the actions to update the available prodcts and coin packages
// import the utility functions to convert arrays in objects
import { arrayToObjectID, arrayToObjectUserID, arrayToObjectModuleID, arrayToObjectQuizQuestionID } from '../helper_functions/utilities';
export const FETCH_DEMO_BEGIN = 'FETCH_DEMO_BEGIN';
export const FETCH_DEMO_ERROR = 'FETCH_DEMO_ERROR';
export const FETCH_DEMO_FAILURE = 'FETCH_DEMO_FAILURE';

export const fetchDemoContentBegin = () => ({
  type: FETCH_DEMO_BEGIN,
});

export const fetchDemoContentError = error => ({
  type: FETCH_DEMO_ERROR,
  payload: { error }
});

export const fetchDemoContentFailure = error => ({
    type: FETCH_DEMO_FAILURE,
    payload: { error }
});

// function to dispatch redux actions to get a response from the graphql query getDemoContent
export function fetchDemoContent(token) {
    return function (dispatch) {
      dispatch(fetchDemoContentBegin());
      return axios.post(GRAPHQL_URL, { query: GET_DEMO_CONTENT }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
          .then((json) => {
            if ("errors" in json.data){
              dispatch(fetchDemoContentError(json.data.errors[0].message));
              return { errors: json.data.errors };
            }
            else{
              // Transform arrays in the getDemoContent object to objects that further contain objects.
              // This ensures that the when state is updated in the Redux store there is no need to iterate over the arrays.
              var mainReturnedObj = json.data.data;
              // convert the courses array of objects into an objects of objects
              const coursesObject = arrayToObjectID(mainReturnedObj.getDemoContent.courses);
              mainReturnedObj.getDemoContent.courses = coursesObject;
              for (var property1 in mainReturnedObj.getDemoContent.courses){
                let courseModules = {};
                // convert the course modules array of objects into an objects of objects
                if (mainReturnedObj.getDemoContent.courses[property1].courseModules.length > 0){
                  courseModules = arrayToObjectID(mainReturnedObj.getDemoContent.courses[property1].courseModules);
                }
                mainReturnedObj.getDemoContent.courses[property1].courseModules = courseModules;
              }
              dispatch(updateDemoCourses(mainReturnedObj.getDemoContent.courses));
              // convert the classrooms array of classrooms into an object of objects
              const classroomsObject = arrayToObjectID(mainReturnedObj.getDemoContent.classrooms);
              mainReturnedObj.getDemoContent.classrooms = classroomsObject; 
              for (var property4 in mainReturnedObj.getDemoContent.classrooms){
                // convert the classroom array of students into an onbject of objects
                const studentsObject = arrayToObjectUserID(mainReturnedObj.getDemoContent.classrooms[property4].studentList);
                mainReturnedObj.getDemoContent.classrooms[property4].studentList = studentsObject; 
                for (var key5 in mainReturnedObj.getDemoContent.classrooms[property4].studentList){
                  // convert the classroom array of student stock competitions entered into an onbject of objects
                  const studentStockCompsEntered = arrayToObjectID(mainReturnedObj.getDemoContent.classrooms[property4].studentList[key5].stockCompetitionsEntered);
                  mainReturnedObj.getDemoContent.classrooms[property4].studentList[key5].stockCompetitionsEntered = studentStockCompsEntered;
                  // convert the classroom array of student crypto competitions entered into an onbject of objects
                  const studentCryptoCompsEntered = arrayToObjectID(mainReturnedObj.getDemoContent.classrooms[property4].studentList[key5].cryptoCompetitionsEntered);
                  mainReturnedObj.getDemoContent.classrooms[property4].studentList[key5].cryptoCompetitionsEntered = studentCryptoCompsEntered;
                  // convert the classroom array of student Module Assessment or Quiz Scores into an onbject of objects
                  const studentModuleAssessmentScores = arrayToObjectModuleID(mainReturnedObj.getDemoContent.classrooms[property4].studentList[key5].moduleAssessmentScores);
                  mainReturnedObj.getDemoContent.classrooms[property4].studentList[key5].moduleAssessmentScores = studentModuleAssessmentScores;
                  // convert the student list module assessment score question results into an object of objects
                  for (var key6 in mainReturnedObj.getDemoContent.classrooms[property4].studentList[key5].moduleAssessmentScores){
                    const studentModuleAssessmentScoreAnswers = arrayToObjectQuizQuestionID(mainReturnedObj.getDemoContent.classrooms[property4].studentList[key5].moduleAssessmentScores[key6].questionResults);
                    mainReturnedObj.getDemoContent.classrooms[property4].studentList[key5].moduleAssessmentScores[key6].questionResults = studentModuleAssessmentScoreAnswers;
                  }
                }
              }
              // convert the classrooms array of classroom Courses into an object of objects
              const classroomCoursesObject = arrayToObjectID(mainReturnedObj.getDemoContent.classroomCourses);
              mainReturnedObj.getDemoContent.classroomCourses = classroomCoursesObject; 
              // add all of the courses and modules to the redux state
              dispatch(updateAllDemoClassrooms(mainReturnedObj.getDemoContent.classrooms, mainReturnedObj.getDemoContent.classroomCourses));
              // return true
              const returnVal = true;
              return returnVal;
            }
          })
          .catch(error => {
            dispatch(fetchDemoContentFailure(error.message));
            return { errors: [{ message: error.message }]};
          });
  };
}

