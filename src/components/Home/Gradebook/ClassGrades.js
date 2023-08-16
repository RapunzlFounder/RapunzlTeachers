import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTeacherClassroom, getAllTeacherClassroomCourses } from '../../../selectors/classroomSelectors';
import { getAllTeacherCourses, getTeacherCourse } from '../../../selectors/coursemoduleSelectors';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import handleGradeColor from '../../../helper_functions/handleGradeColor';
import ClassSummary from './ClassSummary';
import DetailedGrades from './DetailedGrades';
import NoAssignedCourse from '../../../assets/images/Education/NoAssignedCourse.png';

class ClassGrades extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gradesExpanded: null,
      detailsExpanded: null,
      moduleExpanded: null,
    }
  }

  // Function That Updates The Grades Expanded State Variable, Allowing Teachers To View Details On A Students Grades
  _handleExpandGrades(int) {
    if (int === this.state.gradesExpanded) {
      this.setState({ gradesExpanded: null, detailsExpanded: null, moduleExpanded: null });
    } else {
      this.setState({ gradesExpanded: int, detailsExpanded: null, moduleExpanded: null });
    }
  }

  // Function That Updates The Details Expanded State Variable, Allowing Teachers To View Individual Responses To An Assessment
  _handleExpandDetails(studentID, moduleID) {
    if (studentID === this.state.detailsExpanded && moduleID === this.state.moduleExpanded) {
      this.setState({ detailsExpanded: null, moduleExpanded: null });
    } else {
      this.setState({ detailsExpanded: studentID, moduleExpanded: moduleID });
    }
  }

  _getQuestionScores(student) {
    if (!(this.state.detailsExpanded === student.userId && student.moduleAssessmentScores !== undefined && student.moduleAssessmentScores.length !== 0)) {
      return [];
    } else{
      for (var i in student.moduleAssessmentScores) {
        if (student.moduleAssessmentScores[i].moduleId === this.state.moduleExpanded) {
          return student.moduleAssessmentScores[i];
        }
      }
      return [];
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

  // Creates An Array With The Number Of Elements Required To Fill 9 Modules If Necessary
  _renderMissingQuizzes(scoredQuizzes, numberOfModules) {
    const missingModules = numberOfModules - scoredQuizzes;
    if (missingModules === 0) {
      return [];
    } else {
      let missingArray = [];
      for (let i = scoredQuizzes + 1; i <= numberOfModules; i++) {
        missingArray.push(i);
      }
      return missingArray;
    }
  }

  render() {
    let numberOfModules = this._getNumberOfModules();
    // Handles If Teacher Has Selected to View A Summary Of The Class Grades. This Is Processed In This Component And Passed Through.
    if (this.props.isSummary) {
      console.log('all teacher classroom courses', this.props.classCourse);
      console.log('specific classroom', this.props.classroom);
      console.log('all courses', this.props.allCourses);
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
        <div className='gradebook-container' style={{ paddingTop: 18 }}>
          {this.props.classroom.studentList.map((student) => {
            return (
              <div key={student.userId} className='student-grade-item'>
                <div title="View More Info About This Student" onClick={() => this._handleExpandGrades(student.userId)} className='student-grade-name-container'>
                  <div>
                    <div className='student-grade-name-flex'>
                      <div className='student-grade-name-text' style={{ paddingRight: 5 }}>
                        {student.firstName}
                      </div>
                      <div className='student-grade-name-text'>
                        {student.lastName}
                      </div>
                    </div>
                    <div className='student-grade-username'>
                      @{student.username}
                    </div>
                    {student.moduleAssessmentScores.length !== undefined && numberOfModules !== 0 && (
                      <div className='student-grades-completed-text' style={{ color: handleGradeColor(100 * student.moduleAssessmentScores.length / numberOfModules) }}>
                        {student.moduleAssessmentScores.length} of {numberOfModules} Quizzes Completed
                      </div>
                    )}
                    {this.state.gradesExpanded === student.userId && (
                      <div className='student-grade-instructions'>
                        Click on an assessment score in order to see a breakdown of the questions which the student answered correctly and incorrectly.
                      </div>
                    )}
                  </div>
                  {this.state.gradesExpanded === student.userId && (<KeyboardArrowDownIcon className='student-grade-arrow' style={{ marginBottom: 35 }} />)}
                  {this.state.gradesExpanded !== student.userId && (<KeyboardArrowRightIcon className='student-grade-arrow' />)}
                </div>
                {/* Flex Container That Shows Scores Of Quizzes & Teacher Can Click To View Specific Q&A */}
                {this.state.gradesExpanded === student.userId && student.moduleAssessmentScores.length !== 0 && (
                  <div className='student-grades-overview'>
                    {student.moduleAssessmentScores.map((item) => {
                      return (
                        <div key={item.moduleId} title="View Individual Question Scores" onClick={() => this._handleExpandDetails(student.userId, item.moduleId)} className='overview-grade-container'>
                          <div className='overview-grade-circle' style={{ borderColor: handleGradeColor(item.percentCorrect), backgroundColor: item.moduleId === this.state.moduleExpanded ? handleGradeColor(item.percentCorrect) : '' }}>
                            <div className='grade-circle-number' style={{ color: item.moduleId === this.state.moduleExpanded ? '#FFFFFF' : handleGradeColor(item.percentCorrect) }}>
                              {item.percentCorrect.toFixed(0)}
                            </div>
                            <div className='grade-circle-percent' style={{ color: item.moduleId === this.state.moduleExpanded ? '#FFFFFF' : handleGradeColor(item.percentCorrect) }}>
                              %
                            </div>
                          </div>
                          <div className='overview-grade-text'>
                            M{item.moduleId}
                          </div>
                        </div>
                      )
                    })}
                    {this._renderMissingQuizzes(student.moduleAssessmentScores.length, numberOfModules).length !== 0 && (
                      this._renderMissingQuizzes(student.moduleAssessmentScores.length, numberOfModules).map((item) => {
                        return (
                          <div key={item} className='overview-grade-container'>
                            <div className='overview-grade-circle' style={{ borderColor: '#6e6e6e', cursor: 'auto' }}>
                              <div className='grade-circle-number' style={{ color: '#6e6e6e' }}>
                                -
                              </div>
                            </div>
                            <div className='overview-grade-text'>
                              M{item}
                            </div>
                          </div>
                        )
                      })
                    )}
                  </div>
                )}
                {this.state.gradesExpanded === student.userId && student.moduleAssessmentScores.length === 0 && (
                  <div className='student-grades-overview'>
                    {[1,2,3,].map((item) => {
                      return (
                        <div key={item} className='overview-grade-container'>
                          <div className='overview-grade-circle' style={{ borderColor: '#6e6e6e', cursor: 'auto' }}>
                            <div className='grade-circle-number' style={{ color: '#6e6e6e' }}>
                              -
                            </div>
                          </div>
                        </div>
                      )
                    })}
                    <div className='student-grades-empty-description'>
                      No Scores<br/>To Display
                    </div>
                      {[4,5,6,].map((item) => {
                      return (
                        <div key={item} className='overview-grade-container'>
                          <div className='overview-grade-circle' style={{ borderColor: '#6e6e6e', cursor: 'auto' }}>
                            <div className='grade-circle-number' style={{ color: '#6e6e6e' }}>
                              -
                            </div>
                          </div>
                        </div>
                        )
                      })}
                  </div> 
                )}
                {/* Expandable Section That Is Hidden Initially Because It Is A Lot Of Data */}
                <DetailedGrades
                  questionScores={this._getQuestionScores(student)}
                  moduleId={this.state.moduleExpanded}
                  gradesExpanded={this.state.gradesExpanded}
                />
              </div>
            )
          })}
        </div>
      );
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
    // Selector For Classroom Courses
    classCourse: getAllTeacherClassroomCourses(state),
  };
};

export default connect(mapStateToProps)(ClassGrades);
