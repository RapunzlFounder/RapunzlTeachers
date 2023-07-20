import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTeacherClassroom } from '../../../selectors/classroomSelectors';

class ClassGrades extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gradesExpanded: null,
    }
  }

  // TODO: Function that helps find the course which the students are participating in, which will return the number of modules
  // which is used to display the student grades overview by rendering a list with the same number of elements as there are modules
  // in the course
  _retrieveClassroomCourse() {

  }

  // TODO: Function Which Returns An Array Of The Students Overall Module Quiz Grades
  _getGradesOverview(studentID) {

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

  render() {
    return (
      <div className='gradebook-container' style={{ paddingTop: 18 }}>
        {this.props.classroom.studentList.map((student) => {
          return (
            <div key={student.userId} className='student-grade-item'>
              <div onClick={() => this._handleExpandGrades(student.userId)} className='student-grade-name-container'>
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
              </div>
              {/* Flex Container That Shows Scores Of Quizzes & Teacher Can Click To View Specific Q&A */}
              {false && this.state.gradesExpanded !== student.userId && (
                <div className='student-grades-overview'>
                  {[1,2,3,4,5,6].map((item) => {
                    return (
                      <div key={item} className='overview-grade-container'>
                        <div className='overview-grade-circle'>
                          90%
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
              {this.state.gradesExpanded === student.userId && (
                <div className='student-grades-expanded'>
                </div>
              )}
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
