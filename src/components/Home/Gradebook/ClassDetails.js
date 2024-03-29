import React, { Component } from 'react';
import { connect } from 'react-redux';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import handleGradeColor from '../../../helper_functions/handleGradeColor';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import DetailedGrades from './DetailedGrades';

class ClassDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gradesExpanded: null,
      detailsExpanded: null,
      moduleExpanded: null,
      sortType: 'First Name (A-Z)',
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

  // Allows The User To Toggle Between A-Z, Z-A, Progress (High To Low), Progress (Low To High)
  toggleSortType() {
    if (this.state.sortType === 'Last Name (A-Z)') {
      this.setState({ sortType: 'Last Name (Z-A)' });
    } else if (this.state.sortType === 'Last Name (Z-A)') {
      this.setState({ sortType: 'First Name (A-Z)' });
    } else if (this.state.sortType === 'First Name (A-Z)') {
      this.setState({ sortType: 'First Name (Z-A)' });
    } else if (this.state.sortType === 'First Name (Z-A)') {
      this.setState({ sortType: 'Last Name (A-Z)' });
    }
  }

  handleSortedData() {
    if (this.state.sortType === 'Last Name (A-Z)') {
      return this.props.data.studentList.sort((a, b) => a.lastName.localeCompare(b.lastName));
    } else if (this.state.sortType === 'Last Name (Z-A)') {
      return this.props.data.studentList.sort((a, b) => a.lastName.localeCompare(b.lastName)).reverse();
    } else if (this.state.sortType === 'First Name (A-Z)') {
      return this.props.data.studentList.sort((a, b) => a.firstName.localeCompare(b.firstName));
    } else if (this.state.sortType === 'First Name (Z-A)') {
      return this.props.data.studentList.sort((a, b) => a.firstName.localeCompare(b.firstName)).reverse();
    } else {
      return [];
    }
  }

  render() {
    return (
      <div className='gradebook-container' style={{ paddingTop: 18 }}>
        <div onClick={() => this.toggleSortType()} className='gradebook-details-sort-flex'>
          <FilterAltOutlinedIcon className='gradebook-sort-icon' />
          <div className='gradebook-details-sort-text'>
            Sort: <span className='sort-subtext'>{this.state.sortType}</span>
          </div>
        </div>
        {this.handleSortedData().map((student) => {
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
                  {student.moduleAssessmentScores.length !== undefined && this.props.numberOfModules !== 0 && (
                    <div className='student-grades-completed-text' style={{ color: handleGradeColor(100 * student.moduleAssessmentScores.length / this.props.numberOfModules) }}>
                      {student.moduleAssessmentScores.length} of {this.props.numberOfModules} Quizzes Completed
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
                  {this._renderMissingQuizzes(student.moduleAssessmentScores.length, this.props.numberOfModules).length !== 0 && (
                    this._renderMissingQuizzes(student.moduleAssessmentScores.length, this.props.numberOfModules).map((item) => {
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
                  {[1,2].map((item) => {
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
                    {[4,5].map((item) => {
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
                studentUserId={student.userId}
                classroomId={this.props.selectedClassroom}
                isDemo={this.props.isDemo}
              />
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
    selectedClassroom: state.dashboard.selectedClassroom,
  };
};

export default connect(mapStateToProps)(ClassDetails);
