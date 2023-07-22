import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTeacherClassroom } from '../../../selectors/classroomSelectors';
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
    }
  }

  // TODO: Function that helps find the course which the students are participating in, which will return the number of modules
  // which is used to display the student grades overview by rendering a list with the same number of elements as there are modules
  // in the course
  _retrieveClassroomCourse() {

  }

  // TODO: Function Which Returns An Array Of The Students Overall Module Quiz Grades
  _getGradesOverview() {

  }

  // TODO: Function Which Returns The Detailed Student Grades For A Specific Module Within The Classroom's Current Course
  _getDetailedGrades(studentID, moduleID) {

  }

  // Function That Updates The Grades Expanded State Variable, Allowing Teachers To View Details On A Students Grades
  _handleExpandGrades(int) {
    if (int === this.state.gradesExpanded) {
      this.setState({ gradesExpanded: null });
    } else {
      this.setState({ gradesExpanded: int });
    }
  }

  // Function That Updates The Details Expanded State Variable, Allowing Teachers To View Individual Responses To An Assessment
  _handleExpandDetails(int) {
    if (int === this.state.detailsExpanded) {
      this.setState({ detailsExpanded: null });
    } else {
      this.setState({ detailsExpanded: int });
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
                {this.state.gradesExpanded === student.userId && (
                  <div className='student-grades-overview'>
                    {[1,2,3,4,5,6,7,8].map((item) => {
                      let score = item * 10;
                      return (
                        <div key={item} onClick={() => this._handleExpandDetails(item)} className='overview-grade-container'>
                          <div className='overview-grade-circle' style={{ borderColor: handleGradeColor(score) }}>
                            <div className='grade-circle-number' style={{ color: handleGradeColor(score) }}>
                              {score}
                            </div>
                            <div className='grade-circle-percent' style={{ color: handleGradeColor(score) }}>
                              %
                            </div>
                          </div>
                          <div className='overview-grade-text'>
                            Q{item}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
                {/* Expandable Section That Is Hidden Initially Because It Is A Lot Of Data */}
                {this.state.detailsExpanded === student.userId && (
                  <div className='student-grades-expanded'>
                    <div className='quiz-questions'>
                      {/*this.state.quizScores.map((item) => {
                        return (
                          <div key={item.quizQuestionId} className='question-item'>
                            <div className='question-main' onClick={() => this._selectQuestion(item.quizQuestionId)} style={{ marginBottom: this.state.selectedQuestion === item.quizQuestionId ? 0 : 5 }}>
                              <div className='question-main-flex'>
                                <div className='question-number'>
                                  {item.moduleQuestionNumber}
                                </div>
                                <div className='question-text'>
                                  {this.state.quizQuestions[item.moduleQuestionNumber - 1].question}
                                </div>
                              </div>
                              {item.answerCorrect && (
                                <TaskAltIcon className='question-icon' style={{ fill: '#00e893' }} />
                              )}
                              {!item.answerCorrect && (
                                <HighlightOffIcon className='question-icon' style={{ fill: '#ed3726' }} />
                              )}
                            </div>
                            {this.state.selectedQuestion === item.quizQuestionId && (
                              <div className='question-expanded'>
                                <div className='question-expanded-header' style={{ color: item.answerCorrect ? '#00e893' : '#ed3726' }}>
                                  YOUR ANSWER
                                </div>
                                <div className='question-response'>
                                  {item.studentAnswer}
                                </div>
                                {!item.answerCorrect && (
                                  <div>
                                    <div className='question-expanded-header' style={{ color: '#00e893' }}>
                                      CORRECT ANSWER
                                    </div>
                                    <div className='question-response' style={{ color: '#00e893' }}>
                                      {item.studentAnswer}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )
                      })*/}
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
    classroom: getTeacherClassroom(state, ownProps)
  };
};

export default connect(mapStateToProps)(ClassGrades);
