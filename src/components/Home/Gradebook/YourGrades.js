import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllTeacherClassrooms } from '../../../selectors/classroomSelectors';
import { selectClassroom } from '../../../ActionTypes/dashboardActions';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import InsertChartOutlinedRoundedIcon from '@mui/icons-material/InsertChartOutlinedRounded';
import EmptyGradebook from '../../../assets/images/Education/EmptyGradebook.png';
import ClassGrades from './ClassGrades';
import ExportGradesDialog from './ExportGradesDialog';

class YourGrades extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
      exportVisible: false,
      viewType: 'Details'
    }
  }

  selectClass(text) {
    this.props.selectClassroom(text);
    this.setState({ selected: text });
  }

  // Pass Through Arrow Function Which Toggles The Visibility Of The ExportDialog Which Allows User To Select Export Options
  _toggleExportDialog = () => {
    this.setState({ exportVisible: !this.state.exportVisible });
  }

  // Function To Toggle View Between Details and Summary
  _handleChangeViewType(text) {
    if (text === 'Details') {
      this.setState({ viewType: 'Details' });
    } else {
      this.setState({ viewType: 'Summary' });
    }
  }

  render() {
    return (
      <div>
        <ExportGradesDialog
          visible={this.state.exportVisible}
          classroomId={this.props.selectedClassroom}
          dismiss={this._toggleExportDialog}
        />
        <div className='card-flex-header' style={{ paddingBottom: 5 }}>
          <h2 className='card-header' style={{ marginLeft: 0 }}>
            Your Gradebook
          </h2>
        </div>
        <div className='gradebook-description-text'>
          Follow your students’ performance in quiz assessments. To sort your class, click on any of the headers. To view more about a student’s scores, click on the score and we will show a breakdown of their question answers.
        </div>
        <div className='gradebook-header-flex'>
          {this.props.allClassrooms.length !== 0 && (
            <select
              id="currentClass"
              name="Current Class"
              className='gradebook-class-dropdown'
              placeholder='Select Classroom'
              value={this.props.selectedClassroom}
              onChange={(e) => this.selectClass(e.target.value)}
            >
              <option className='gradebook-class-option' value={''}>Select Classroom</option>
              {this.props.allClassrooms.map((item) => {
                return (
                  <option
                    className='gradebook-class-option'
                    value={item.id}
                    key={item.id}
                  >
                    {item.className}
                  </option>
                )
              })}
            </select>
          )}
          {!!this.props.selectedClassroom && (
            <div className='gradebook-class-option-flex'>
              <div
                onClick={() => this._handleChangeViewType('Summary')}
                className={`gradebook-class-option-button ${this.state.viewType === 'Summary' ? 'gradebook-class-option-selected' : 'gradebook-class-option-unselected'}`}
                style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
              >
                <InsertChartOutlinedRoundedIcon className='gradebook-export-icon' style={{ fill: this.state.viewType === 'Summary' ? '#ffffff' : '#41d0ac' }} />
                <div style={{ color: this.state.viewType === 'Summary' ? '#ffffff' : '#41d0ac' }}>
                  Class Summary
                </div>
              </div>
              <div
                onClick={() => this._handleChangeViewType('Details')}
                className={`gradebook-class-option-button ${this.state.viewType === 'Details' ? 'gradebook-class-option-selected' : 'gradebook-class-option-unselected'}`}
                style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
              >
                <FileDownloadIcon className='gradebook-export-icon' style={{ fill: this.state.viewType === 'Details' ? '#ffffff' : '#41d0ac' }} />
                <div style={{ color: this.state.viewType === 'Details' ? '#ffffff' : '#41d0ac' }}>
                  Grade Details
                </div>
              </div>
            </div>
          )}
          {this.props.selectedClassroom !== '' && (
            <div onClick={this._toggleExportDialog} className='gradebook-class-dropdown gradebook-export-button'>
              <FileDownloadIcon className='gradebook-export-icon' />
              <div className='export-button-text'>
                Export Grades
              </div>
            </div>
          )}
        </div>
        {!!this.props.selectedClassroom && (
          <ClassGrades
            classroomId={this.props.selectedClassroom}
            isSummary={this.state.viewType === 'Summary'}
          />
        )}
        {(this.props.allClassrooms.length === 0 || this.state.selected === '') && !this.props.selectedClassroom && (
          <div className='gradebook-container'>
            <img alt='' className='gradebook-empty-image' src={EmptyGradebook} />
            <div className='gradebook-empty-header'>
              No Grades To Display
            </div>
            <div className='gradebook-empty-text'>
              {this.props.selectedClassroom === '' ?
                'Please select a classroom in order to see the grades of your students.'
                :
                'There are no grades collected from your students. Please assign a course and assessment to students to start collecting grades.'
              }
            </div>
          </div>
        )}
      </div>
    );
  }
}

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    // Handles Colors Which Are Updated Throughout When MarketOpen Changes
    colors: state.userDetails.appColors,
    allClassrooms: getAllTeacherClassrooms(state),
    selectedClassroom: state.dashboard.selectedClassroom,
  };
};

// Map Dispatch To Props (Dispatch Actions to Reducers. Reducers then modify the redux store state.
const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    selectClassroom: (classID) => dispatch(selectClassroom(classID))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(YourGrades);
