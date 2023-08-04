import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTeacherClassroom } from '../../../selectors/classroomSelectors';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ClassSummarySoonGraphic from '../../../assets/images/Home/Competitions.png';
import handleGradeColor from '../../../helper_functions/handleGradeColor';

class ClassSummary extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    if (false) {
      return (
        <div className='gradebook-container' style={{ paddingTop: 18 }}>
          <img alt='' className='gradebook-empty-image' src={ClassSummarySoonGraphic} />
          <div className='gradebook-empty-header'>
            Coming Soon!
          </div>
          <div className='gradebook-empty-text' style={{ width: 400, fontSize: 16 }}>
            We're still building a Class Summary dashboard which will give you insights into the classroom's understanding of learning material and performance both in the app and on module assessments.
            <br/><br/>
            If there's any information you'd like to see, reach out to us through support. We'd love to hear from you.
          </div>
        </div>
      );
    } else {
      return (
        <div className='gradebook-container' style={{ paddingTop: 18 }}>
          <div className='class-summary-title-flex'>
            <div className='class-summary-title-text'>
              Overview
            </div>
          </div>
          <div className='class-summary-header-flex'>
            <div className='class-summary-item'>
              <div className='class-summary-number'>
                -
              </div>
              <div className='class-summary-text'>
                # OF STUDENTS
              </div>
            </div>
            <div className='class-summary-item'>
              <div className='class-summary-number'>
                0%
              </div>
              <div className='class-summary-text'>
                STUDENTS PLACED FIRST TRADE
              </div>
            </div>
            <div className='class-summary-item'>
              <div className='class-summary-number'>
                5.3%
              </div>
              <div className='class-summary-text'>
                AVG PORTFOLIO PERFORMANCE
              </div>
            </div>
            <div className='class-summary-item'>
              <div className='class-summary-number'>
                1.2%
              </div>
              <div className='class-summary-text'>
                STUDENTS BEATING THE S&P 500
              </div>
            </div>
          </div>
          <div className='class-summary-title-flex'>
            <div className='class-summary-title-text'>
              Assessment Scores
            </div>
          </div>
          <div className='class-summary-quiz-container'>
            <div className='summary-quiz-item'>
              <div className='summary-quiz-item-main'>
                <div className='summary-quiz-left'>
                  <div className='summary-quiz-number'>
                    1
                  </div>
                  <div className='summary-quiz-title'>
                    This is the quiz title
                  </div>
                </div>
                <div className='summary-quiz-right'>
                  <div className='summary-quiz-score'>
                    25%
                  </div>
                  <div className='summary-quiz-completed'>
                    23/31
                  </div>
                </div>
              </div>
              <div className='summary-quiz-item-expanded'>

              </div>
            </div>
            <div className='summary-quiz-item'>
              <div className='summary-quiz-item-main'>
                <div className='summary-quiz-left'>
                  <div className='summary-quiz-number'>
                    1
                  </div>
                  <div className='summary-quiz-title'>
                    This is the quiz title
                  </div>
                </div>
                <div className='summary-quiz-right'>
                  <div className='summary-quiz-score'>
                    25%
                  </div>
                  <div className='summary-quiz-completed'>
                    23/31
                  </div>
                </div>
              </div>
              <div className='summary-quiz-item-expanded'>

              </div>
            </div>
            <div className='class-summary-title-flex'>
              <div className='class-summary-title-text'>
                Class Leaderboard
              </div>
            </div>
            <div className='class-summary-title-flex'>
              <div className='class-summary-title-text'>
                Challenging Questions
              </div>
            </div>
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
    // Selector For Selected Classroom Grades
    classroom: getTeacherClassroom(state, ownProps)
  };
};

export default connect(mapStateToProps)(ClassSummary);
