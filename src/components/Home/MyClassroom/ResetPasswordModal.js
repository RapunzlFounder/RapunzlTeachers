import React, { Component } from 'react';
import Dialog from '@mui/material/Dialog';
import { connect } from 'react-redux';
import { resetStudentPassword } from '../../../ActionTypes/classroomActions';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import LockResetRoundedIcon from '@mui/icons-material/LockResetRounded';
import TextField from '@mui/material/TextField';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import Alert from '../../Admin/Alert';
import '../../../styles/Home/UpdateTeacherInfoModal.css';
import CircularProgress from '@mui/material/CircularProgress';

class ResetPasswordModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password1: '',
      password2: '',
      onErrorPassword: false,
      passwordVisible: false,
      loading: false,
      success: false,
      alertVisible: false,
      alertTitle: '',
      alertMessage: ''
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.visible !== prevProps.visible) {
      this.setState({
        password1: '',
        password2: '',
        onErrorPassword: false,
        passwordVisible: false,
        loading: false,
        success: false,
        alertVisible: false,
        alertTitle: '',
        alertMessage: ''
      })
    }
  }

  // Handles Changing Initial Password Value In TextField and Setting Error To False
  changePassword1(value) {
    this.setState({ password1: value, onErrorPassword: false });
  }

  // Handles Changing Password Confirm Value In TextField and Setting Error To False
  changePassword2(value) {
    this.setState({ password2: value, onErrorPassword: false });
  }

  resetClassroomPasswords() {
    this.setState({ loading: true });
    // Checks To Make Sure The 2 Passwords Match Before Submitting
    if (this.state.password1 !== this.state.password2) {
      this.setState({
        onErrorPassword: true,
        alertTitle: 'Passwords Do Not Match',
        alertMessage: 'The passwords you entered do not match, so we are unable to reset the student account. Please try again.',
        alertVisible: true,
      })
    }
    // Checks To Ensure The Password Is At Least 8 Characters Long
    else if (this.state.password1.length < 6) {
      this.setState({
        onErrorPassword: true,
        alertTitle: 'New Password Is Too Short',
        alertMessage: 'All Rapunzl passwords must be at least 7 characters. Please ensure the password is at least 8 characters long and try again.',
        alertVisible: true,
      });
    }
    else {
      // Gets Usernames Of All Students In The Classroom Selected By The Teacher
      let usernameArray = [];
      for (var i = 0; i < this.props.classList.length; i++) {
        usernameArray.push(this.props.classList[i].username)
      }
      // Checks If Username Array Is Empty And Throws An Error
      if (usernameArray.length === 0) {
        this.setState({
          onErrorPassword: true,
          alertTitle: 'No Students Selected',
          alertMessage: 'You must select at least 1 student to reset their password. This could be an internal Rapunzl error or an issue with your account. Please try again and contact support if the problem continues.',
          alertVisible: true,
        });
      }
      // If Password Matches & Username Array Is Not Empty, Dispatches To GraphQL
      else {
        this.props.resetStudentPasswords(this.props.jwtToken, JSON.stringify(usernameArray), this.state.password1).then((res) => {
          if (!(res && !('errors' in res))) {
            this.setState({
              // This part of state handles the native alert which is displayed to the teacher if the graphql dispatch fails
              alertTitle: 'Failed To Reset Password',
              alertMessage: 'Something went wrong trying to connect to the server and reset the student account passwords. More info on the error message can be found here: ' + res.errors[0].message,
              alertVisible: true,
              // This part of state is used for the password reset functionality which is hidden on the event of an error
              loading: false,
              success: false,
              password1: '',
              password2: '',
              onErrorPassword: false,
              passwordVisible: false,
            });
          } else {
            this.setState({
              // This part of state handles displaying a native alert to the teacher with the new password
              alertTitle: 'Reset Password Successful',
              alertMessage: 'The new password for the classroom is: ' + res.studentlogin[0].password + `  Please note that the password is case-sensitive. If you continue experiencing issues, don't hestiate to contact support`,
              alertVisible: true,
              // This hides the functionality for changing a user password since it is complete
              loading: false,
              success: true,
              password1: '',
              password2: '',
              onErrorPassword: false,
              passwordVisible: false,
            });
          }
        })
      }
    }
  }

  toggleAlert = () => {
    this.setState({ alertVisible: !this.state.alertVisible });
  }

  // Handles Toggling Password Visibility When User Selects The Eye Icon
  toggleVisibility() {
    this.setState({ passwordVisible: !this.state.passwordVisible });
  }

  render() {
    return (
      <Dialog
        open={this.props.visible}
        onClose={this.props.dismiss}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Alert
          visible={this.state.alertVisible}
          dismiss={() => this.setState({ alertVisible: false })}
          title={this.state.alertTitle}
          message={this.state.alertMessage}
        />
        {!this.state.success && (
          <div className='reset-password-modal'>
            <LockResetRoundedIcon className='update-info-header-icon' style={{ backgroundColor: '#452205' }} />
            <div className='update-info-h1'>
              Reset Class Password
            </div>
            <TextField
              id="password"
              label="New Password"
              placeholder="New Password"
              type={this.state.passwordVisible ? "text" : "password"}
              variant="filled"
              style={{ width: '49%', marginRight: '2%'}}
              error={this.state.onErrorPassword}
              value={this.state.password1}
              onChange={(event) => this.changePassword1(event.target.value)}
              sx={{ backgroundColor: '#73472e', marginBottom: '4px', marginTop: '4px', borderRadius: '7px' }}
            />
            <TextField
              id="passwordConfirm"
              label="Confirm Password"
              placeholder="Confirm Password"
              type={this.state.passwordVisible ? "text" : "password"}
              variant="filled"
              style={{ width: '49%' }}
              error={this.state.onErrorPassword}
              value={this.state.password2}
              onChange={(event) => this.changePassword2(event.target.value)}
              sx={{ backgroundColor: '#73472e', marginBottom: '4px', marginTop: '4px', borderRadius: '7px' }}
            />
            {this.state.passwordVisible ? (
              <div className='show-password-container' onClick={() => this.toggleVisibility()}>
                <VisibilityOutlinedIcon className='show-password-icon' />
                <div className='show-password-text'>
                  Password Visible
                </div>
              </div>
            ) : (
              <div className='show-password-container' onClick={() => this.toggleVisibility()}>
                <VisibilityOffOutlinedIcon className='show-password-icon'  />
                <div className='show-password-text'>
                  Password Hidden
                </div>
              </div>
            )}
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
                <div onClick={() => this.resetClassroomPasswords()} className='reset-password-button'>
                  Reset Passwords
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
              Passwords Updated!
            </div>
            <div className='update-info-success-text'>
              We have successfully reset the passwords of the selected students. Students are not able to change their own passwords. Please check back to make any additional changes.
            </div>
            <div onClick={this.props.dismiss} className='update-info-main-button' style={{ marginBottom: 35 }}>
              Dismiss
            </div>
          </div>
        )}
      </Dialog>
    );
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
      // Handles resetting a student's password by dispatching to GraphQL
      resetStudentPasswords: (token, usernameArray, password) => dispatch(resetStudentPassword(token, usernameArray, password)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordModal);
