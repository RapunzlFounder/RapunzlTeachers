import React, { Component } from 'react';
import Dialog from '@mui/material/Dialog';
import { connect } from 'react-redux';
import { updateTeacherClassroom } from '../../../ActionTypes/classroomActions';
import { updateTeacherCourse } from '../../../ActionTypes/coursemoduleActions';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Alert from '../../Admin/Alert';
import '../../../styles/Home/UpdateTeacherInfoModal.css';
import CircularProgress from '@mui/material/CircularProgress';

class UpdateTeacherInfoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classroomName: '',
      classroomNameError: false,
      classroomYear: '',
      classroomYearError: false,
      courseName: '',
      courseNameError: false,
      loading: false,
      success: false,
      isPrivate: props.courseData ? props.courseData.isPrivate : null,
      alertVisible: false,
      alertTitle: '',
      alertMessage: ''
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.visible !== prevProps.visible) {
      this.setState({
        classroomName: '',
        classroomNameError: false,
        classroomYear: '',
        classroomYearError: false,
        courseName: '',
        courseNameError: false,
        loading: false,
        success: false,
        isPrivate: this.props.courseData ? this.props.courseData.isPrivate : null,
        alertVisible: false,
        alertTitle: '',
        alertMessage: ''
      })
    }
  }

  changeCourseName(text) {
    this.setState({ courseName: text });
  }

  changePrivacy(value) {
    this.setState({ isPrivate: value });
  }

  changeClassYear(year) {
    this.setState({ classroomYear: year });
  }

  changeClassName(text) {
    this.setState({ classroomName: text });
  }

  // Handles Saving A Teachers Changes To A Particular Classroom
  saveClassroomChanges() {
    // Checks If Values Have Actually Changed Before Handling Dispatch
    if (this.state.classroomName !== this.props.className || this.state.classroomYear !== this.props.classYear) {
      this.setState({ loading: true });
      let className = this.state.classroomName === '' ? null : this.state.classroomName;
      let classYear = this.state.classYear === '' ? null : this.state.classYear;
      this.props.updateClassroom(this.props.jwtToken, this.props.classData.id, className, classYear).then((res) => {
        // Handles If There Is An Error 
        if (!(res && !('errors' in res))) {
          this.setState({
            alertVisible: true,
            alertTitle: 'Failed To Update Classroom',
            alertMessage: 'We had trouble connecting with our servers and processing these changes with your classroom. Please try again or contact support if the problem continues and share the following error message: ' + res.errors[0].message,
            loading: false,
            success: false,
          })
        }
        // Handles On Success
        else {
          this.setState({
            loading: false,
            success: true,
          });
        }
      })
    }
  }

  // Handles Saving A Teachers Changes To A Particular Course
  saveCourseChanges() {
    // Checks If Values Have Actually Changed Before Handling Dispatch
    // Does Not Support Changing the Actual Course Modules At This Time
    // Does Not Support Making The Course Private At This Time
    if (this.state.courseName !== this.props.courseName || this.state.isPrivate !== this.props.isPrivate) {
      this.setState({ loading: true });
      let courseName = this.state.courseName === '' ? null : this.state.courseName;
      let coursePrivate = this.state.isPrivate === this.props.isPrivate ? null : this.state.isPrivate;
      this.props.updateCourse(this.props.jwtToken, this.props.courseData.id, courseName, coursePrivate, null).then((res) => {
        // Handles If There Is An Error 
        if (!(res && !('errors' in res))) {
          this.setState({
            alertVisible: true,
            alertTitle: 'Failed To Update Course',
            alertMessage: 'We had trouble connecting with our servers and processing these changes with your course. Please try again or contact support if the problem continues and share the following error message: ' + res.errors[0].message,
            loading: false,
            success: false,
          })
        }
        // Handles On Success
        else {
          this.setState({
            loading: false,
            success: true,
          });
        }
      })
    }
  }

  // Pass through arrow function to handle visibility of the Alert Modal
  toggleAlert = () => {
    this.setState({ alertVisible: !this.state.alertVisible });
  }

  render() {
    // Handles If Teacher Wants To Edit Classroom
    if (this.props.type === 'classroom') {
      // Currently Allowed To Edit Class Name, Class Year
      return (
        <Dialog
          open={this.props.visible}
          onClose={this.props.dismiss}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <Alert
            visible={this.state.alertVisible}
            title={this.state.alertTitle}
            message={this.state.alertMessage}
            dismiss={this.toggleAlert}
          />
          {!this.state.success && (
            <div className='update-info-container'>
              <EditOutlinedIcon className='update-info-header-icon'/>
              <div className='update-info-h1'>
                Update Classroom<br/>Name
              </div>
              <div className='update-info-subtitle'>
                Classroom Name
              </div>
              <input
                className='update-info-input'
                placeholder={this.props.classData.className}
                value={this.state.classroomName}
                onChange={(event) => this.changeClassName(event.target.value)}
              />
              {/* <div className='update-info-subtitle'>
                Class Year
              </div>
              <input 
                placeholder={this.props.classYear}
                value={this.state.classroomYear}
                onChange={(event) => this.changeClassYear(event.target.value)}
                className='update-info-input' 
              /> */}
              {this.state.loading && (
                <div className='update-info-loading-container'>
                  <CircularProgress className='update-info-loading-icon'/>
                  <div className='update-info-loading-text'>
                    Saving Changes...
                  </div>
                </div>
              )}
              {!this.state.loading && (
                <div>
                  <div onClick={() => this.saveClassroomChanges()} className='update-info-main-button'>
                    Save Changes
                  </div>
                  <div onClick={this.props.dismiss} className='update-info-second-button'>
                    Dismiss
                  </div>
                </div>
              )}
            </div>
          )}
          {this.state.success && (
            <div className='update-info-container'>
              <EditOutlinedIcon className='update-info-header-icon'/>
              <div className='update-info-h1'>
                Update Successful!
              </div>
              <div className='update-info-success-text'>
                We have successfully saved the changes to your classroom. Please check back to make any additional changes.
              </div>
              <div onClick={this.props.dismiss} className='update-info-main-button' style={{ marginBottom: 35 }}>
                Dismiss
              </div>
            </div>
          )}
        </Dialog>
      );
    }
    // Handles If Teacher Wants To Edit Course Information
    else if (this.props.type === 'course') {
      // Currently Allowed To Edit Course Name, Is Private
      // Eventually should also support removing and changing modules
      return (
        <Dialog
          open={this.props.visible}
          onClose={this.props.dismiss}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <Alert
            visible={this.state.alertVisible}
            title={this.state.alertTitle}
            message={this.state.alertMessage}
            dismiss={this.toggleAlert}
          />
          {!this.state.success && (
            <div className='update-info-container'>
              <EditOutlinedIcon className='update-info-header-icon'/>
              <div className='update-info-h1'>
                Update Course Details
              </div>
              <div className='update-info-subtitle'>
                Course Name
              </div>
              <input
                className='update-info-input'
                placeholder={this.props.courseData.courseName}
                value={this.state.courseName}
                onChange={(event) => this.changeCourseName(event.target.value)}
              />
              <div className='update-info-subtitle'>
                Course Privacy
              </div>
              <div className='update-info-explanation'>
                A private course can only be viewed by the educator who created the course. A public course can be viewed by any educator on the Rapunzl platform to use with their students.
              </div>
              <div className='update-info-flex'>
                <div onClick={() => this.changePrivacy(false)} className='update-info-item left-update-item' style={{ backgroundColor: this.state.isPrivate ? '#1c8e7100' : '#1c8e71' }}>
                  Public
                </div>
                <div onClick={() => this.changePrivacy(true)} className='update-info-item right-update-item' style={{ backgroundColor: !this.state.isPrivate ? '#1c8e7100' : '#1c8e71' }}>
                  Private
                </div>
              </div>
              {this.state.loading && (
                <div className='update-info-loading-container'>
                  <CircularProgress className='update-info-loading-icon'/>
                  <div className='update-info-loading-text'>
                    Saving Changes...
                  </div>
                </div>
              )}
              {!this.state.loading && (
                <div>
                  <div onClick={() => this.saveCourseChanges()} className='update-info-main-button'>
                    Save Changes
                  </div>
                  <div onClick={this.props.dismiss} className='update-info-second-button'>
                    Dismiss
                  </div>
                </div>
              )}
            </div>
          )}
          {this.state.success && (
            <div className='update-info-container'>
              <EditOutlinedIcon className='update-info-header-icon'/>
              <div className='update-info-h1'>
                Update Successful!
              </div>
              <div className='update-info-success-text'>
                We have successfully saved the changes to your course. Please check back to make any additional changes.
              </div>
              <div onClick={this.props.dismiss} className='update-info-main-button' style={{ marginBottom: 35 }}>
                Dismiss
              </div>
            </div>
          )}
        </Dialog>
      );
    } else {
      return (
        <div />
      );
    }
  }
}

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    // Used for authentication with various dispatches inlcuded below
    jwtToken: state.userDetails.jwtToken,
  };
};

// Map Dispatch To Props (Dispatch Actions to Reducers. Reducers then modify the redux store state.
const mapDispatchToProps = (dispatch) => {
  // Action
    return {
      // Handles Dispatch When User Decides To Edit Their Classroom
      updateClassroom: (token, classroomID, classroomName, classYear) => dispatch(updateTeacherClassroom(token, classroomID, classroomName, classYear)),
      // Handles Dispatch When User Decides To Edit A Course
      updateCourse: (token, courseID, courseName, isPrivate, courseModulesArray) => dispatch(updateTeacherCourse(token, courseID, courseName, isPrivate, courseModulesArray)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateTeacherInfoModal);
