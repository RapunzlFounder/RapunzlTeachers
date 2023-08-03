import React from 'react';
import { connect } from 'react-redux';
import { createTeacherClassroomCourse } from '../../../ActionTypes/classroomActions';
import { quickAccessAddStudents } from '../../../ActionTypes/dashboardActions';
import { getAllTeacherClassrooms, getAllTeacherClassroomCourses } from '../../../selectors/classroomSelectors';
import Dialog from '@mui/material/Dialog';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CircularProgress from '@mui/material/CircularProgress';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import CheckBoxOutlineBlank from '@mui/icons-material/CheckBoxOutlineBlank';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import CheckBox from '@mui/icons-material/CheckBox';
import ErrorImage from '../../../assets/images/AddStudents/ErrorAddStudents.png';
import SuccessImage from '../../../assets/images/Courses/EmptyCourses.png';
import EmptyClassroomsImage from '../../../assets/images/ChecklistTips/CreateClassroom_BW.png';
import '../../../styles/Admin/Admin.css';

class AssignCourseDialog extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedClassroom: false,
      progress: 'select',
      loading: false,
      errorMessage: '',
    }
  }

  componentDidUpdate(prevProps) {
    // Resets Component State When Dialog Is Dismissed & Becomes Visible Again To Avoid Showing Error/Success Message After Assigning
    if (prevProps.visible !== this.props.visible && this.props.visible === true) {
      this.setState({
        selectedClassroom: false,
        progress: 'select',
        loading: false,
        errorMessage: '',
      });
    }
  }

  // Selects A Classroom To Assign The Course To From The List Rendered 
  selectClass(classID) {
    // Handles Toggling Off Of A Class When User Clicks For The Second Time
    if (classID === this.state.selectedClassroom) {
      this.setState({ selectedClassroom: false });
    } else {
      this.setState({ selectedClassroom: classID });
    }
  }

  // Handles Assigning The Selected Course With The Selected Classroom - Button Appears Unresponsive If User Has Not Selected Course To Assign
  _handleAssignCourse() {
    if (this.state.selectedClassroom) {
      this.setState({ loading: true });
      this.props.assignCourse(this.props.jwtToken, this.state.selectedClassroom, this.props.course.id).then((res) => {
        // Handles If There Is An Error When Assigning A Course To A Classroom & Displays Error
        if (!(res && !('errors' in res))) {
          this.setState({
            loading: false,
            errorMessage: res.errors[0].message,
            progress: 'error',
          });
        }
        // Handles If Dispatch Is Successful By Updating State Accordingly
        else {
          this.setState({
            loading: false,
            progress: 'success'
          });
        }
      });
    }
  }

  render() {
    if (this.props.allClassrooms.length === 0) {
      return (
        <Dialog
          open={this.props.visible}
          onClose={this.props.dismiss}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div className='container' style={{ width: 500 }}>
            <img alt='' className='assign-course-no-classroom-icon' src={EmptyClassroomsImage} />
            <div className='assign-course-no-classroom-title'>
              No Classrooms To Assign!
            </div>
            <div className='assign-course-no-classroom-text'>
              You must create a classroom in order to assign this course and ensure that students can access learning materials. Create a classroom using the button below and then you'll be able to assign this course.
            </div>
            <div onClick={() => this.props.quickAccessAddStudents()} className='assign-course-no-classroom-button'>
              Create Classroom
            </div>
            <div onClick={this.props.dismiss} className='assign-course-no-classroom-back'>
              Go Back
            </div>
          </div>
        </Dialog>
      )
    }
    // Otherwise, We Display Classrooms And If They Are Currently Assigned To A Course Or Not
    else {
      return (
        <Dialog
          open={this.props.visible}
          onClose={this.props.dismiss}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div className='container' style={{ width: 500, overflowY: 'scroll', maxHeight: 750 }}>
            <div className='standards-header-flex'>
              {this.state.progress === 'select' ? (
                <div className='alert-title' style={{ fontWeight: '800' }}>
                  Assign {this.props.course.courseName}
                </div>
              ) : (
                <div />
              )}
              <HighlightOffIcon
                onClick={() => this.props.dismiss()}
                className='standard-close-x'
                style={{ paddingRight: 24, paddingTop: 20, cursor: 'pointer' }}
              />
            </div>
            {!this.state.loading && this.state.progress === 'select' && (
              <div>
                <div className='assign-course-subheader'>
                  <HowToRegIcon className='assign-course-icon' />
                  <div className='assign-course-h1'>
                    Currently Assigned
                  </div>
                </div>
                {this.props.classArrays[1].length === 0 && (
                  <div className='assign-course-content' style={{ paddingTop: 35 }}>
                    <ErrorOutlineIcon className='assign-course-empty-icon'/>
                    <div className='assign-course-existing-empty'>
                      No Classrooms<br/>Assigned...
                    </div>
                  </div>
                )}
                {this.props.classArrays[1].length !== 0 && (
                  <div className='assign-course-content' style={{ paddingBottom: 25 }}>
                    {this.props.classArrays[1].map((item, index) => {
                      return (
                        <div key={item.classroom.id} className='assign-course-class-item' style={{ borderBottomWidth: index === this.props.classArrays[1].length - 1 ? 0 : 1}}>
                          <div>
                            <div className='assign-course-class-title'>
                              {item.classroom.className}
                            </div>
                            <div className='assign-course-class-subtext'>
                              {item.classroom.noStudents} {item.classroom.noStudents === 1 ? 'Student' : 'Students'}
                            </div>
                          </div>
                          <VerifiedOutlinedIcon className='assign-course-class-checkbox' style={{ cursor: 'auto' }} />
                        </div>
                      );
                    })}
                  </div>
                )}
                <div className='assign-course-subheader'>
                  <AppRegistrationIcon className='assign-course-icon' />
                  <div className='assign-course-h1'>
                    Your Classes
                  </div>
                </div>
                {this.props.classArrays[2].length !== 0 && (
                  <div className='assign-course-content'>
                    {this.props.classArrays[2].map((item, index) => {
                      return (
                        <div onClick={() => this.selectClass(item.classroom.id)} key={item.classroom.id} className='assign-course-class-item' style={{ borderBottomWidth: (index === this.props.classArrays[2].length - 1 && this.props.classArrays[0].length === 0) ? 0 : 1 }}>
                          <div>
                            <div className='assign-course-class-title'>
                              {item.classroom.className}
                            </div>
                            <div className='assign-course-class-subtext'>
                              {item.classroom.noStudents} {item.classroom.noStudents === 1 ? 'Student' : 'Students'}
                            </div>
                          </div>
                          {this.state.selectedClassroom === item.classroom.id && (<CheckBox className='assign-course-class-checkbox' />)}
                          {this.state.selectedClassroom !== item.classroom.id && (<CheckBoxOutlineBlank className='assign-course-class-checkbox' />)}
                        </div>
                      );
                    })}
                  </div>
                )}
                {this.props.classArrays[0].length !== 0 && (
                  <div className='assign-course-content'>
                    {this.props.classArrays[0].map((item, index) => {
                      return (
                        <div key={item.classroom.id} className='assign-course-class-item' style={{ borderBottomWidth: index === this.props.classArrays[0].length - 1 ? 0 : 1 }}>
                          <div>
                            <div className='assign-course-class-title'>
                              {item.classroom.className}
                            </div>
                            <div className='assign-course-class-subtext' style={{ color: '#ff5c00', fontSize: 12.5 }}>
                              Already Assigned A Course
                            </div>
                          </div>
                          <PublishedWithChangesIcon className='change-assigned-course-button'/>
                        </div>
                      );
                    })}
                  </div>
                )}
                {this.props.classArrays[2].length === 0 && this.props.classArrays[0].length === 0 && (
                  <div className='assign-course-content' style={{ paddingTop: 35 }}>
                    <ErrorOutlineIcon className='assign-course-empty-icon'/>
                    <div className='assign-course-existing-empty' style={{ paddingBottom: 10 }}>
                      No Classrooms Remaining
                    </div>
                    <div className='assign-course-empty-text'>
                      All of your classrooms have been assigned to this course already. Create a new classroom to assign this course again.
                    </div>
                  </div>
                )}
                {this.props.classArrays[2].length !== 0 && this.props.classArrays[0].length !== 0 && (
                  <div onClick={() => this._handleAssignCourse()} className={`assign-course-save-changes ${this.state.selectedClassroom ? '' : 'assign-course-save-changes-disabled'}`}>
                    Assign Course
                  </div>
                )}
              </div>
            )}
            {this.state.loading && (
              <div className='assign-course-loading'>
                <CircularProgress className='assign-course-loading-icon' />
                <div className='assign-course-loading-text'>
                  Assigning<br/>Course...
                </div>
              </div>
            )}
            {!this.state.loading && this.state.progress === 'success' && (
              <div className='assign-course-result-container'>
                <img alt='' className='assign-course-result-image' src={SuccessImage} />
                <div className='assign-course-result-title'>
                  Mission Accomplished!
                </div>
                <div className='assign-course-result-text'>
                  We have successfully assigned your course, {this.props.course.courseName}, to your classroom. Now you can track student progress with our integrated assessments and share learning materials to students.
                </div>
              </div>
            )}
            {!this.state.loading && this.state.progress === 'error' && (
              <div className='assign-course-result-container'>
                <img alt='' className='assign-course-result-image' src={ErrorImage} />
                <div className='assign-course-result-title'>
                  Something Went Wrong...
                </div>
                <div className='assign-course-result-text'>
                  We encountered an unexpected issue and could not assign this course to the selected classroom. {this.state.errorMessage}<br/><br/>Please contact support so that we can help resolve the issue.
                </div>
              </div>
            )}
          </div>
        </Dialog>
      );
    }
  }
}

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    // Handles Colors Which Are Updated Throughout When MarketOpen Changes
    colors: state.userDetails.appColors,
    // Required For Dispatch Below To Assign Course & Authenticate With GraphQL
    jwtToken: state.userDetails.jwtToken,
    // Retrieves All Teacher Classrooms
    allClassrooms: getAllTeacherClassrooms(state),
    classroomCourses: getAllTeacherClassroomCourses(state),
  };
};

// Map Dispatch To Props (Dispatch Actions to Reducers. Reducers then modify the redux store state.
const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    // This adds an existing Teacher Course to a Teacher's exisiting classroom.  The required inputs are 'classroomId', which is the database Id of the classroom
    // that the teacher wishes to add the course to, and 'courseId', which is the database Id of the Teacher course that the Teacher is adding 
    // to the classroom.
    assignCourse: (token, classroomId, courseId) => dispatch(createTeacherClassroomCourse(token, classroomId, courseId)),
    quickAccessAddStudents: () => dispatch(quickAccessAddStudents()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AssignCourseDialog);
