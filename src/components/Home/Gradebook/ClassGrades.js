import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTeacherClassroom, getAllTeacherClassroomCourses, getAllDemoClassrooms, getAllDemoClassroomCourses } from '../../../selectors/classroomSelectors';
import { getAllDemoCourses, getAllTeacherCourses } from '../../../selectors/coursemoduleSelectors';
import ClassSummary from './ClassSummary';
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
      averageClassStockPerformance: 0,
      averageClassCryptoPerformance: 0,
    }
    // Handles Creating Object If We Are Displaying Example Grades
    if (this.props.selectedClassroom === true || this.props.isDemo === true) {
      // ------- FLEXED INTO TOP ROW -----------

      // Number Of Students In The Classroom
      initialObject.numberOfStudents = this.props.demoClassrooms[0].studentList.length;
      // Students Who Have Verified Account

      // Average Class Stock & Crypto Portfolio Performance
      let allClassStockPerformance = 0;
      let allClassCryptoPerformance = 0;
      // Percentage Of Students Who Have Placed Their First Trade
      let firstTrade = 0;
      // Percentage Of Students Beating Historical S&P 500 (10%)
      let beatingSPY = 0;

      for (var i2 in this.props.demoClassrooms[0].studentList) {
        // Increments Stock & Crypto Performance While Looping Through Students, Then Divides By Number Of Students After Looping
        allClassStockPerformance = allClassStockPerformance + (this.props.demoClassrooms[0].studentList[i2].stockPortfolioPerformance - 100);
        allClassCryptoPerformance = allClassCryptoPerformance + (this.props.demoClassrooms[0].studentList[i2].cryptoPortfolioPerformance - 100);
        // Checks For Each Student If They Have Placed Either A Stock Or Crypto Trade
        if (this.props.demoClassrooms[0].studentList[i2].numberOfStockTrades + this.props.demoClassrooms[0].studentList[i2].numberOfCryptoTrades !== 0) {
          firstTrade = firstTrade + 1;
        }
        // Checks For Each Student If Their Stock Portfolio Is Beating S&P Historical Performance of 10%
        // TODO: Use Actual S&P For The Duration As Students Have Accounts
        if (this.props.demoClassrooms[0].studentList[i2].stockPortfolioPerformance > 110) {
          beatingSPY = beatingSPY + 1;
        }
      }

      // Updates Object That Is Returned And Passed To Class Summary Component
      initialObject.averageClassStockPerformance = allClassStockPerformance / initialObject.numberOfStudents;
      initialObject.averageClassCryptoPerformance = allClassCryptoPerformance / initialObject.numberOfStudents;
      initialObject.numberPlacedFirstTrade = firstTrade;
      initialObject.numberBeatingSPY = beatingSPY;
    }
    // Handles If These Are Real Grades For A Classroom
    // TODO: Update using live grades data
    else {

    }
    return initialObject;
  }

  // Matches The Classroom With The Appropriate Classroom Course Record To Find The Course Number, Then Finds The Course To Determine Number Of Modules
  _getNumberOfModules() {
    let courseID = null;
    let numberOfCourses = 0;
    if (this.props.selectedClassroom === true || this.props.isDemo === true) {
      return this.props.demoCourses[0].numberModules;
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

  _getCourseID() {
    if (this.props.selectedClassroom === true || this.props.isDemo === true) {
      return this.props.demoClassroomCourses[0].courseId;
    } else {
      // TODO: This needs to find the correct course ID for Class Summary to work
      return this.props.classroom;
    }
  }

  _getClassroom() {
    return this.props.demoClassrooms[0];
  }

  render() {
    let numberOfModules = this._getNumberOfModules();
    // Handles If Teacher Has Selected to View A Summary Of The Class Grades. This Is Processed In This Component And Passed Through.
    if (this.props.isSummary) {
      return (
        <ClassSummary
          gradesData={this._getGradesOverview()}
          courseId={this._getCourseID()}
          classroom={this._getClassroom()}
          isDemo={this.props.selectedClassroom === true || this.props.isDemo === true}
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
    demoCourses: getAllDemoCourses(state),
    // Selector For Demo Classroom Courses
    demoClassroomCourses: getAllDemoClassroomCourses(state),
    // Selector For Classroom Courses
    classCourse: getAllTeacherClassroomCourses(state),
    selectedClassroom: state.dashboard.selectedClassroom,
  };
};

export default connect(mapStateToProps)(ClassGrades);
