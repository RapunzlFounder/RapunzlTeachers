import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPublicModuleAssessments } from '../../../selectors/coursemoduleSelectors';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import handleGradeColor from '../../../helper_functions/handleGradeColor';

class DetailedGrades extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionExpanded: null
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.gradesExpanded !== this.props.gradesExpanded) {
      this.setState({ questionExpanded: null });
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

  // Function That Returns The Correct Question Object From Props To Associate With Each Question
  _getQuestionFromRedux(questionNumber) {
    for (var i in this.props.moduleAssessments) {
      if (this.props.moduleAssessments[i].questionNumber === questionNumber) {
        return this.props.moduleAssessments[i];
      }
    }
    return false;
  }

  render() {
    if (this.props.moduleId === null) {
      return (
        <div />
      );
    } else if (this.props.questionScores.length === 0) {
      return (
        <div />
      );
    } else {
      return (
        <div className='student-grades-expanded'>
          <div className='detailed-grades-flex'>
            <div className='detailed-grades-title'>
              M{this.props.questionScores.moduleId} Quiz Score:
            </div>
            <div className='detailed-grades-score' style={{ color: handleGradeColor(this.props.questionScores.percentCorrect) }}>
              {this.props.questionScores.percentCorrect.toFixed(0)}%
            </div>
          </div>
          <div className='detailed-grades-percent-complete' style={{ color: handleGradeColor(this.props.questionScores.percentComplete) }}>
            {this.props.questionScores.percentComplete.toFixed(0)}% Complete
          </div>
          <div className='quiz-questions' style={{ marginBottom: 20 }}>
            {this.props.questionScores.questionResults.map((item) => {
              let questionObject = this._getQuestionFromRedux(item.moduleQuestionNumber);
              return (  
                <div key={item.quizQuestionId} className='question-item'>
                  <div className='question-main' onClick={() => this._handleExpandQuestion(item.quizQuestionId)} style={{ marginBottom: this.state.questionExpanded === item.quizQuestionId ? 0 : 5 }}>
                    <div className='question-main-flex'>
                      <div className='question-number'>
                        {item.moduleQuestionNumber}
                      </div>
                      <div className='question-text'>
                        {questionObject.question}
                      </div>
                    </div>
                    {item.answerCorrect && (
                      <div className='question-main-flex'>
                        <TaskAltIcon className='question-icon' style={{ fill: '#00e893' }} />
                        {this.state.questionExpanded !== item.quizQuestionId && (<KeyboardArrowRightIcon className='student-grade-arrow' />)}
                        {this.state.questionExpanded === item.quizQuestionId && (<KeyboardArrowDownIcon className='student-grade-arrow' />)}
                      </div>
                    )}
                    {!item.answerCorrect && (
                      <div className='question-main-flex'>
                        <HighlightOffIcon className='question-icon' style={{ fill: '#ed3726' }} />
                        {this.state.questionExpanded !== item.quizQuestionId && (<KeyboardArrowRightIcon className='student-grade-arrow' />)}
                        {this.state.questionExpanded === item.quizQuestionId && (<KeyboardArrowDownIcon className='student-grade-arrow' />)}
                      </div>
                    )}
                  </div>
                  {this.state.questionExpanded === item.quizQuestionId && (
                    <div className='question-expanded'>
                      <div className='question-expanded-header' style={{ color: item.answerCorrect ? '#00e893' : '#ed3726' }}>
                        {item.answerCorrect ? 'CORRECT' : 'STUDENT'} ANSWER
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
                            {questionObject.answer}
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
      )
    }
  }
}

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state, ownProps) => {
  // Redux Store --> Component
  return {
    // Handles Retrieving Module Questions & Correct Answers
    moduleAssessments: getPublicModuleAssessments(state, ownProps),
  };
};

export default connect(mapStateToProps)(DetailedGrades);
