import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTeacherClassroom, getAllTeacherClassroomCourses } from '../../../selectors/classroomSelectors';
import { getAllTeacherCourses } from '../../../selectors/coursemoduleSelectors';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ClassSummarySoonGraphic from '../../../assets/images/Home/Competitions.png';
import handleGradeColor from '../../../helper_functions/handleGradeColor';
import ClassSummary from './ClassSummary';

class ClassGrades extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gradesExpanded: null,
      detailsExpanded: null,
      moduleExpanded: null,
      questionExpanded: null
    }
  }

  // TODO: Function that helps find the course which the students are participating in, which will return the number of modules
  // which is used to display the student grades overview by rendering a list with the same number of elements as there are modules
  // in the course
  _retrieveClassroomCourse() {

  }

  // Function That Updates The Grades Expanded State Variable, Allowing Teachers To View Details On A Students Grades
  _handleExpandGrades(int) {
    if (int === this.state.gradesExpanded) {
      this.setState({ gradesExpanded: null, detailsExpanded: null, moduleExpanded: null, questionExpanded: null });
    } else {
      this.setState({ gradesExpanded: int });
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
    if (this.state.detailsExpanded !== student.userId) {
      return [];
    } else if (student.moduleAssessmentScores === undefined) {
      return [];
    } else if (student.moduleAssessmentScores[this.state.moduleExpanded] === undefined) {
      return [];
    } else if (student.moduleAssessmentScores[this.state.moduleExpanded].questionResults === undefined) {
      return [];
    } else if (student.moduleAssessmentScores[this.state.moduleExpanded].questionResults.length === 0) {
      return [];
    } else {
      return student.moduleAssessmentScores[this.state.moduleExpanded].questionResults;
    }
  }

  // Function That Updates The State Of The Expanded Question And Toggles It To View Student Answer
  _handleExpandQuestion(questionID) {
    if (questionID === this.state.questionExpanded) {
      this.setState({ questionExpanded: null });
    } else {
      this.setState({ questionExpanded: questionID });
    }
  }

  // This Will Create An Object Of Interesting Data Summarizing The Entire Class And It Will Be Displayed In ClassSummary Component
  _getGradesOverview() {
    
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
  _renderMissingQuizzes(scoredQuizzes) {
    const numberOfModules = this._getNumberOfModules();
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
    if (this.props.isSummary) {
      return (
        <ClassSummary
          gradesData={this._getGradesOverview()}
        />
      );
    } else {
      return (
        <div className='gradebook-container' style={{ paddingTop: 18 }}>
          {this.props.classroom.studentList.map((student) => {
            return (
              <div key={student.userId} className='student-grade-item'>
                <div onClick={() => this._handleExpandGrades(student.userId)} className='student-grade-name-container'>
                  <div>
                    <div className='student-grade-name-flex'>
                      <div className='student-grade-name-text'>
                        {student.firstName}
                      </div>
                      <div className='student-grade-name-text'>
                        {student.lastName}
                      </div>
                    </div>
                    <div className='student-grade-username'>
                      @{student.username}
                    </div>
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
                        <div key={item.moduleId} onClick={() => this._handleExpandDetails(student.userId, item.moduleId)} className='overview-grade-container'>
                          <div className='overview-grade-circle' style={{ borderColor: handleGradeColor(item.percentCorrect) }}>
                            <div className='grade-circle-number' style={{ color: handleGradeColor(item.percentCorrect) }}>
                              {item.percentCorrect}
                            </div>
                            <div className='grade-circle-percent' style={{ color: handleGradeColor(item.percentCorrect) }}>
                              %
                            </div>
                          </div>
                          <div className='overview-grade-text'>
                            Q{item.moduleId}
                          </div>
                        </div>
                      )
                    })}
                    {this._renderMissingQuizzes(student.moduleAssessmentScores.length).length !== 0 && (
                      this._renderMissingQuizzes(student.moduleAssessmentScores.length).map((item) => {
                        return (
                          <div key={item} className='overview-grade-container'>
                            <div className='overview-grade-circle' style={{ borderColor: '#6e6e6e', cursor: 'auto' }}>
                              <div className='grade-circle-number' style={{ color: '#6e6e6e' }}>
                                -
                              </div>
                            </div>
                            <div className='overview-grade-text'>
                              Q{item}
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
                {this._getQuestionScores(student).length !== 0 && (
                  <div className='student-grades-expanded'>
                    <div className='quiz-questions'>
                      {this._getQuestionScores(student).map((item) => {
                        return (
                          <div key={item.quizQuestionId} className='question-item'>
                            <div className='question-main' onClick={() => this._handleExpandQuestion(item.quizQuestionId)} style={{ marginBottom: this.state.questionExpanded === item.quizQuestionId ? 0 : 5 }}>
                              <div className='question-main-flex'>
                                <div className='question-number'>
                                  {item.moduleQuestionNumber}
                                </div>
                                <div className='question-text'>
                                  Question
                                </div>
                              </div>
                              {item.answerCorrect && (
                                <TaskAltIcon className='question-icon' style={{ fill: '#00e893' }} />
                              )}
                              {!item.answerCorrect && (
                                <HighlightOffIcon className='question-icon' style={{ fill: '#ed3726' }} />
                              )}
                            </div>
                            {this.state.questionExpanded === item.quizQuestionId && (
                              <div className='question-expanded'>
                                <div className='question-expanded-header' style={{ color: item.answerCorrect ? '#00e893' : '#ed3726' }}>
                                  YOUR ANSWER
                                </div>
                                <div className='question-response'>
                                  Student Answer
                                </div>
                                {!item.answerCorrect && (
                                  <div>
                                    <div className='question-expanded-header' style={{ color: '#00e893' }}>
                                      CORRECT ANSWER
                                    </div>
                                    <div className='question-response' style={{ color: '#00e893' }}>
                                      Correct Answer
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
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
