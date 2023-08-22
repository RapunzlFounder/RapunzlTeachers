import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTeacherClassroom, getAllTeacherClassroomCourses, getAllDemoClassrooms } from '../../../selectors/classroomSelectors';
import { getAllTeacherCourses, getTeacherCourse } from '../../../selectors/coursemoduleSelectors';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import handleGradeColor from '../../../helper_functions/handleGradeColor';
import ClassSummary from './ClassSummary';
import DetailedGrades from './DetailedGrades';
import NoAssignedCourse from '../../../assets/images/Education/NoAssignedCourse.png';
import ClassDetails from './ClassDetails';

class ClassGrades extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  // This Will Create An Object Of Interesting Data Summarizing The Entire Class And It Will Be Displayed In ClassSummary Component
  _getGradesOverview() {
    let initialObject = {
      numberOfStudents: 0,
      numberVerified: 0,
      numberPlacedFirstTrade: 0,
      numberBeatingSPY: 0,
      averageClassPerformance: 0,
      classStockLeaderboard: [],
      classCryptoLeaderboard: [],
      quizScoreSummary: [],
      challengingQuestions: [],
    }
    // FLEXED INTO TOP ROW
    // Number Of Students In The Classroom
    // Students Who Have Verified Account
    // Percentage Of Students Who Have Placed Their First Trade
    // Average Class Portfolio Performance
    // Percentage Of Students Beating S&P 500

    // CLASSROOM LEADERBOARD SECTION
    // Classroom Leaderboard
    // {
    //   Name,
    //   Username,
    //   NumberOfStockTrades,
    //   NumberOfCryptoTrades,
    //   NumberOfStockPositions,
    //   NumberOfCryptoPositions
    //   StockPortfolioPerf
    //   CryptoPortfolioPerf
    // }

    // QUIZ SUMMARY SECTION
    // Quizzes Completed Percentage With Average Score & Specific Missing Students Array
    // CHALLENGING QUESTIONS SECTION
    // Most Challenging Questions - 10 With Worst Score
    // {
    //   quizID,
    //   quizName,
    //   quizQuestionsNumber,
    //   numberStarted
    //   numberCompleted
    //   completedAverageScore
    // },
    // {
    //   quizID,
    //   quizName,
    //   quizQuestionNumber,
    //   question,
    //   answer,
    //   incorrectStudentsNumber,
    //   completedStudentsNumber,
    // }
  }

  // Matches The Classroom With The Appropriate Classroom Course Record To Find The Course Number, Then Finds The Course To Determine Number Of Modules
  _getNumberOfModules() {
    let courseID = null;
    let numberOfCourses = 0;
    if (this.props.selectedClassroom === true || this.props.isDemo === true) {
      return 6;
    }
    for (var i in this.props.classCourse) {
      if (this.props.classCourse[i].classId === this.props.classroomId) {
        courseID = this.props.classCourse[i].courseId
      }
    }
    if (courseID === null) {
      return 0;
    } else {
      for (var j in this.props.allCourses) {
        if (this.props.allCourses[j].id === courseID) {
          numberOfCourses = this.props.allCourses[j].numberModules;
        }
      }
      return numberOfCourses;
    }
  }

  // Handles Retrieving The Student List Depending Upon If This Is The Demo Or An Actual Classroom
  _getStudentList() {
    if (this.props.selectedClassroom === true || this.props.isDemo === true) {
      return this.props.demoClassrooms[0];
    } else {
      return this.props.classroom;
    }
  }

  render() {
    let numberOfModules = this._getNumberOfModules();
    // Handles If Teacher Has Selected to View A Summary Of The Class Grades. This Is Processed In This Component And Passed Through.
    if (this.props.isSummary) {
      // console.log('all teacher classroom courses', this.props.classCourse);
      // console.log('specific classroom', this.props.classroom);
      // console.log('all courses', this.props.allCourses);
      return (
        <ClassSummary
          gradesData={this._getGradesOverview()}
        />
      );
    }
    // Handles If This Class Does Not Have An Assigned Course, Which Is Represented By Having 0 Modules In The Course, Which Is Not Possible
    else if (parseInt(numberOfModules) === 0) {
      return (
        <div className='gradebook-container' style={{ paddingTop: 18 }}>
          <img
            alt=''
            className='gradebook-no-course-image'
            src={NoAssignedCourse}
          />
          <div className='gradebook-no-course-h1'>
            This Class Is Not Assigned A Course
          </div>
          <div className='gradebook-no-course-p'>
            In order to collect and view classroom grades, you must first assign a course to your students. Go to the Courses Tab, select a course, and assign it to your classroom.
          </div>
        </div>
      );
    }
    else {
      return (
        <ClassDetails
          data={this._getStudentList()}
          numberOfModules={numberOfModules}
        />
      )
    }
  }
}

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state, ownProps) => {
  // Redux Store --> Component
  return {
    // Handles Colors Which Are Updated Throughout When MarketOpen Changes
    colors: state.userDetails.appColors,
    // Selector For Selected Classroom Grades
    classroom: getTeacherClassroom(state, ownProps),
    // Selector For Teacher Courses
    allCourses: getAllTeacherCourses(state),
    // Selector For Demo Classrooms
    demoClassrooms: getAllDemoClassrooms(state),
    // Selector For Demo Courses
    // Selector For Demo Classroom Courses
    // Selector For Classroom Courses
    classCourse: getAllTeacherClassroomCourses(state),
    selectedClassroom: state.dashboard.selectedClassroom,
  };
};

export default connect(mapStateToProps)(ClassGrades);
