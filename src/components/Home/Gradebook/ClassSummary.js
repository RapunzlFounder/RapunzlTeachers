import React, { Component } from 'react';
import { connect } from 'react-redux';
import ClassSummarySoonGraphic from '../../../assets/images/Home/Competitions.png';
import handleGradeColor from '../../../helper_functions/handleGradeColor';
import { getDemoCourse, getTeacherCourse } from '../../../selectors/coursemoduleSelectors';
import intHandler from '../../../helper_functions/intHelper';

class ClassSummary extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
    this.state = {
      quizSummary: false,
    }
  }

  // Handle Quiz Questions
  getQuizInfo(moduleID) {
    let quizAverage = 0;
    let quizNotStartedArray = [];
    let quizFinishedArray = [];
    let quizIncompleteArray = [];
    let studentStarted;
    for (var i in this.props.classroom.studentList) {
      studentStarted = false;
      for (var j in this.props.classroom.studentList[i].moduleAssessmentScores) {
        // eslint-disable-next-line
        if (this.props.classroom.studentList[i].moduleAssessmentScores[j].moduleId == moduleID) { 
          studentStarted = true; 
          // Only Students Who Have Finished Are Included In The Average
          // eslint-disable-next-line
          if (this.props.classroom.studentList[i].moduleAssessmentScores[j].percentComplete == 100) {
            quizAverage = quizAverage + this.props.classroom.studentList[i].moduleAssessmentScores[j].percentCorrect;
            let finishedObject = {
              firstName: this.props.classroom.studentList[i].firstName,
              lastName: this.props.classroom.studentList[i].lastName,
              percentCorrect: this.props.classroom.studentList[i].moduleAssessmentScores[j].percentCorrect,
            }
            quizFinishedArray.push(finishedObject);
          }        
          // Handles Tracking Number Of Students Who Have At Least Started
          // eslint-disable-next-line
          else if (this.props.classroom.studentList[i].moduleAssessmentScores[j].percentComplete != 0) {
            let incompleteObject = {
              firstName: this.props.classroom.studentList[i].firstName,
              lastName: this.props.classroom.studentList[i].lastName,
              percentCorrect: this.props.classroom.studentList[i].moduleAssessmentScores[j].percentCorrect,
              percentComplete: this.props.classroom.studentList[i].moduleAssessmentScores[j].percentComplete,
            }
            quizIncompleteArray.push(incompleteObject);
          }
        }
      }
      if (!studentStarted) {
        let notStartedObject = {
          firstName: this.props.classroom.studentList[i].firstName,
          lastName: this.props.classroom.studentList[i].lastName
        };
        quizNotStartedArray.push(notStartedObject);
      }
    }
    if (quizAverage > 0) {
      quizAverage = quizAverage / quizFinishedArray.length;
    }
    return {
      quizAverage,
      quizFinishedArray,
      quizIncompleteArray,
      quizNotStartedArray,
    }      
  }

  // CHALLENGING QUESTIONS SECTION
  // Most Challenging Questions - 10 With Worst Score

  _getCourseData() {
    if (this.props.isDemo) {
      return (this.props.demoCourse.courseModules);
    } else {
      return (this.props.teacherCourse.courseModules);
    }
  }

  toggleQuizSummary(int) {
    if (this.state.quizSummary === int) {
      this.setState({ quizSummary: false });
    } else {
      this.setState({ quizSummary: int });
    }
  }

  render() {
    if (!this.props.isDemo) {
      return (
        <div className='gradebook-container' style={{ paddingTop: 0 }}>
          <img alt='' className='gradebook-empty-image' style={{ width: 200 }} src={ClassSummarySoonGraphic} />
          <div className='gradebook-empty-header'>
            Coming Soon!
          </div>
          <div className='gradebook-empty-text' style={{ width: 400, fontSize: 16, paddingBottom: 170 }}>
            We're still building a Class Summary dashboard which will give you insights into the classroom's understanding of learning material and performance both in the app and on module assessments.
            <br/><br/>
            If there's any information you'd like to see, reach out to us through support. We'd love to hear from you.
          </div>
        </div>
      );
    } else {
      const courseData = this._getCourseData();
      return (
        <div className='gradebook-container' style={{ paddingTop: 18, paddingBottom: 40 }}>
          <div className='class-summary-title-flex'>
            <div className='class-summary-title-text'>
              Overview
            </div>
          </div>
          <div className='class-summary-header-flex'>
            <div className='class-summary-item'>
              <div className='class-summary-number'>
                {intHandler(this.props.gradesData.numberOfStudents, 'number', 0, false)}
              </div>
              <div className='class-summary-text'>
                # OF<br/>STUDENTS
              </div>
            </div>
            <div className='class-summary-item'>
              <div className='class-summary-number'>
                {intHandler(this.props.gradesData.numberVerified / this.props.gradesData.numberOfStudents, 'percent', 0, false)}
              </div>
              <div className='class-summary-text'>
                VERIFIED<br/>EMAIL
              </div>
            </div>
            <div className='class-summary-item'>
              <div className='class-summary-number' style={{ color: handleGradeColor(this.props.gradesData.numberPlacedFirstTrade / this.props.gradesData.numberOfStudents * 100) }}>
                {intHandler(this.props.gradesData.numberPlacedFirstTrade / this.props.gradesData.numberOfStudents * 100 , 'percent', 0, false)}
              </div>
              <div className='class-summary-text'>
                FIRST<br />TRADE
              </div>
            </div>
            <div className='class-summary-item'>
              <div className='class-summary-number' style={{ color: this.props.gradesData.averageClassStockPerformance >= 0 ? '#00ff88' : '#ff3b29' }}>
                {intHandler(this.props.gradesData.averageClassStockPerformance, 'percent', 2, true)}
              </div>
              <div className='class-summary-text'>
                AVG STOCK<br/>RETURNS
              </div>
            </div>
            <div className='class-summary-item'>
              <div className='class-summary-number' style={{ color: this.props.gradesData.averageClassCryptoPerformance >= 0 ? '#00ff88' : '#ff3b29' }}>
                {intHandler(this.props.gradesData.averageClassCryptoPerformance, 'percent', 2, true)}
              </div>
              <div className='class-summary-text'>
                AVG CRYPTO<br/>RETURNS
              </div>
            </div>
            <div className='class-summary-item'>
              <div className='class-summary-number'>
                {intHandler(this.props.gradesData.numberBeatingSPY / this.props.gradesData.numberOfStudents, 'percent', 0, false)}
              </div>
              <div className='class-summary-text'>
                % BEATING<br/>S&P500
              </div>
            </div>
          </div>
          <div className='class-summary-title-flex' style={{ paddingBottom: 10, paddingTop: 18 }}>
            <div className='class-summary-title-text'>
              Assessment Scores
            </div>
          </div>
          <div className='class-summary-quiz-container'>
            {courseData && courseData.length && courseData.length !== 0 && courseData.map((item, index) => {
              const quizInfo = this.getQuizInfo(item.id);
              return (
                <div key={index} className='summary-quiz-item' style={{ backgroundColor: index === this.state.quizSummary ? '#ffffff17' : '' }}>
                  <div onClick={() => this.toggleQuizSummary(index)} className='summary-quiz-item-main' style={{ borderBottomWidth: index === this.state.quizSummary ? 0 : 1 }}>
                    <div className='summary-quiz-left'>
                      <div className='summary-left-flex'>
                        <div className='summary-quiz-number'>
                          {index + 1}
                        </div>
                        <div className='summary-quiz-title'>
                          {item.name}
                        </div>
                      </div>
                      <div className='summary-quiz-subtext'>
                        Class Quiz Scores
                      </div>
                    </div>
                    <div className='summary-quiz-right'>
                      <div className='summary-quiz-right-item'>
                        <div className='summary-quiz-score'>
                          {intHandler(quizInfo.quizAverage, 'percent', 1, false)}
                        </div>
                        <div className='summary-quiz-right-subtitle' style={{ fontSize: 8 }}>
                          AVG CLASS<br/>SCORE
                        </div>
                      </div>
                      <div className='summary-quiz-right-item'>
                        <div className='summary-quiz-completed'>
                          {quizInfo.quizFinishedArray.length}/{this.props.gradesData.numberOfStudents}
                        </div>
                        <div className='summary-quiz-right-subtitle' style={{ fontSize: 8 }}>
                          STUDENTS<br/>COMPLETE
                        </div>
                      </div>
                    </div>
                  </div>
                  {index === this.state.quizSummary && (
                    <div className='summary-quiz-item-expanded'>
                      <div className='summary-item-column'>
                        <div className='summary-column-title'>
                          Complete
                        </div>
                        {quizInfo.quizFinishedArray.length > 0 && quizInfo.quizFinishedArray.map((item) => {
                          return (
                            <div className='summary-column-item'>
                              <div className='column-name'>
                                {item.firstName} {item.lastName}
                              </div>
                              <div className='column-score' style={{ color: handleGradeColor(item.percentCorrect) }}>
                                {item.percentCorrect}%
                              </div>
                            </div>
                          )
                        })}
                      </div>
                      <div className='summary-item-column'>
                        <div className='summary-column-title'>
                          In Progress
                        </div>
                        {quizInfo.quizIncompleteArray.length > 0 && quizInfo.quizIncompleteArray.map((item) => {
                          return (
                            <div className='summary-column-item'>
                              <div className='column-name'>
                                {item.firstName} {item.lastName}
                              </div>
                              <div className='column-score' style={{ color: handleGradeColor(item.percentComplete) }}>
                                {item.percentComplete}%
                              </div>
                            </div>
                          )
                        })}
                      </div>
                      <div className='summary-item-column' style={{ width: '26%' }}>
                        <div className='summary-column-title'>
                          Not Started
                        </div>
                        {quizInfo.quizNotStartedArray.length > 0 && quizInfo.quizNotStartedArray.map((item) => {
                          return (
                            <div className='summary-column-item'>
                              <div className='column-name'>
                                {item.firstName} {item.lastName}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
            
            {/* 
            TODO: Sort Class Data By Stock/Crypto Portfolio Performance & Create A Toggle For The State
            <div className='class-summary-title-flex'>
              <div className='class-summary-title-text'>
                Class Leaderboard
              </div>
            </div> 
            */}
            {/*
            TODO: Loop through wrong answers and find questions that were incorrect the most 
            <div className='class-summary-title-flex'>
              <div className='class-summary-title-text'>
                Challenging Questions
              </div>
            </div> */}
          </div>
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
    demoCourse: getDemoCourse(state, ownProps),
    teacherCourse: getTeacherCourse(state, ownProps)
  };
};

export default connect(mapStateToProps)(ClassSummary);
