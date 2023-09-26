import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPublicModuleAssessments } from '../../../selectors/coursemoduleSelectors';
import { removeStudentModuleQuizScores } from '../../../ActionTypes/classroomActions';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import handleGradeColor from '../../../helper_functions/handleGradeColor';
import Alert from '../../Admin/Alert';

class DetailedGrades extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionExpanded: null,
      alertOptionText: null,
      alertOptionText2: null,
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

  // Handles The Actual Dispatch to Remove Scores
  resetScores = () => {
    this.setState({
      loading: true,
      alertVisible: false,
    });
    this.props.removeScores(this.props.jwtToken, this.props.studentUserId, this.props.questionScores.moduleId, this.props.classroomId).then((res) => {
      // Handles If There Was An Error Trying To Remove Scores
      if (!(res && !('errors' in res))) {
        this.setState({
          alertVisible: true,
          alertTitle: 'Something Went Wrong...',
          alertMessage: 'We were unable to successfully connect to the server and process your request. Please contact support if the problem continues and share the following error message: ' + res.errors[0].message,
          alertOption: null,
          alertOptionText2: null,
          alertOptionText: null,
        });
      } else {
        this.setState({
          loading: false,
          alertVisible: true,
          alertTitle: 'Reset Successful',
          alertMessage: 'We have reset the scores for this quiz. You may continue resetting quizzes by selecting the student scores for each quiz.',
          alertOption: null,
          alertOptionText2: null,
          alertOptionText: null,
        });
      }
    });
  }

  // Handles Checking If The User Is Sure They Want To Reset Quiz Scores
  _handleResetQuizScores() {
    this.setState({
      alertVisible: true,
      alertTitle: 'Are You Sure?',
      alertMessage: 'This action is irreversible. Once you reset the quiz score for this student, you will not be able to recover the previous scores of the student.',
      alertOption: this.resetScores,
      alertOptionText2: 'Reset Scores',
      alertOptionText: 'Nevermind',
    })
  }

  // Toggles The Visibility Of The Alert
  toggleAlert = () => {
    this.setState({ alertVisible: false });
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
          <Alert
            visible={this.state.alertVisible}
            dismiss={this.toggleAlert}
            title={this.state.alertTitle}
            message={this.state.alertMessage}
            option={this.toggleAlert}
            option2={this.resetScores}
            optionText={this.state.alertOptionText}
            option2Text={this.state.alertOptionText2}
          />
          <div className='detailed-grades-flex' style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
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
            </div>
            <div className='detailed-grades-reset-scores' onClick={() => this._handleResetQuizScores()}>
              Reset Quiz Scores
            </div>
          </div>
          <div className='quiz-questions' style={{ marginBottom: 20 }}>
            {this.props.questionScores.questionResults.map((item) => {
              let questionObject = this._getQuestionFromRedux(item.moduleQuestionNumber);
              return (  
                <div key={item.quizQuestionId} className='question-item'>
                  <div className='question-main' title="View Studnet Answer & Correct Answer" onClick={() => this._handleExpandQuestion(item.quizQuestionId)} style={{ marginBottom: this.state.questionExpanded === item.quizQuestionId ? 0 : 5 }}>
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
    // Used In removeStudentModuleQuizScores Action
    jwtToken: state.userDetails.jwtToken
  };
};

// Map Dispatch To Props (Dispatch Actions to Reducers. Reducers then modify the redux store state.
const mapDispatchToProps = (dispatch) => {
  // Action
    return {
      removeScores: (token, studentUserId, moduleId, classroomId) => dispatch(removeStudentModuleQuizScores(token, studentUserId, moduleId, classroomId))
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailedGrades);
