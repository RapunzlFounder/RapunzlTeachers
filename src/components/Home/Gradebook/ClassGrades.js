import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTeacherClassroom } from '../../../selectors/classroomSelectors';

class ClassGrades extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div className='gradebook-container'>
        {this.props.classroom.studentList.map((student) => {
          return (
            <div key={student.userId} className='student-grade-item'>
              <div className='student-grade-name-container'>
                <div className='student-grade-name-flex'>
                  <div className='student-grade-name-text'>
                    {student.firstName}
                  </div>
                  <div className='student-grade-name-text'>
                    {student.lastName}
                  </div>
                </div>
                <div className='student-grade-name-text'>
                  @{student.username}
                </div>
              </div>
              {/* Flex Container That Shows Scores Of Quizzes & Teacher Can Click To View Specific Q&A */}
              <div className='student-grades-overview'>
              </div>
              {/* Expandable Section That Is Hidden Initially Because It Is A Lot Of Data */}
              <div className='student-grades-expanded'>
              </div>
            </div>
          )
        })}
      </div>
    );
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
