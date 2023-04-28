import React, { Component } from 'react';
import { APP_VERSION } from "../../constants";
import { connect } from 'react-redux';
import { updateUser } from '../../ActionTypes/updateUserDataActions';
import { isEmailUnique, changePassword } from '../../ActionTypes/loginActions';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';
import '../../styles/SettingsScreen.css';
import '../../styles/NotSignedInScreen.css';
import Alert from '../Admin/Alert';


class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Handles If Native Alert Is Visible
      alertVisible: false,
      alertTitle: '',
      alertMessage: '',
      firstName: this.props.firstName || '',
      lastName: this.props.lastName || '',
      email: this.props.email || '',
      school: this.props.school || '',
      phoneNumber: this.props.phoneNumber || '',
      oldPassword: '',
      password: '',
      confirmPassword: '',
      birthdate: this.props.birthDate || '',
      onErrorFirstName: false,
      onErrorLastName: false,
      onErrorEmail: false,
      onPhoneNumberError: false,
      onErrorPassword: false,
      onErrorBirthday: false,
      changingPassword: false,
      handleLogout: false,
    };
  }

  componentDidUpdate(prevProps) {
    // Handles Ensuring That When User Selects Logout That User Is Navigated Out of The App
    if (prevProps.jwtToken !== this.props.jwtToken && (this.props.jwtToken === null || this.props.jwtToken === undefined)) {
      this.setState({ handleLogout: true });
    }
  }

  selectSchool = () => {
    this.setState({
      alertTitle: `Hey ${this.props.firstName}!`,
      alertMessage: `If you're trying to update your school or become verified as a student, please contact our support staff to handle the issue right away!`,
      alertVisible: true,
    });
  }

  selectUsername = () => {
    this.setState({
      alertTitle: 'Action Blocked',
      alertMessage: 'Usernames cannot be changed at this time. Stay tuned for the release of Rapunzl Gold to unlock the ability to change your username & select from limited-edition Avatars!',
      alertVisible: true,
    });
  }

  saveProfile = () => {
    let updateName = [];
    let updateValue = [];
    let alert = false;
    // eslint-disable-next-line
    if (this.state.firstName != this.props.firstName) {
      // Handles If User Attempts To Delete Last Name
      if (this.state.firstName.length < 1) {
        alert = true;
        this.setState({
          alertTitle: 'Invalid Input For First Name',
          alertMessage: 'Try a first name with at least one letter... Be adventurous!',
          alertVisible: true,
          onErrorFirstName: true,
        });
      }
      else {
        updateName.push('firstName');
        updateValue.push(this.state.firstName);
      }    
    }
    // eslint-disable-next-line
    if (this.state.lastName != this.props.lastName) {
      // Handles If User Attempts To Delete Last Name
      if (this.state.lastName.length < 1) {
        alert = true;
        this.setState({
          alertTitle: 'Invalid Input For Last Name',
          alertMessage: 'Your last name must be at least one letter.',
          alertVisible: true,
          onErrorLastName: true,
        });
      }
      else {
        updateName.push('lastName');
        updateValue.push(this.state.lastName);
      }
    }
    // eslint-disable-next-line
    if (this.state.birthdate != this.props.birthDate) {
      // Handles If New Birthdate Is Less Than 13
      var today = new Date();
      // Age Limit Of 13
      var YYYY = parseInt(today.getFullYear()) - 13;
      //Handles 0 indexed month
      var MM = parseInt(today.getMonth()) + 1;
      var DD = today.getDate();
      // Handles getting user inputs
      var inputYear = parseInt(this.state.birthdate.slice(0,4));
      var inputMonth = parseInt(this.state.birthdate.slice(5,7));
      var inputDay = parseInt(this.state.birthdate.slice(8,10));
      // Returns False If Not Possible
      // eslint-disable-next-line
      if (inputYear > YYYY || (inputYear == YYYY && inputMonth > MM) || (inputYear == YYYY && inputMonth == MM && inputDay > DD)) {
        alert = true;
        this.setState({
          alertTitle: 'Invalid Birth Date',
          alertMessage: 'You must be at least 13 years old to use Rapunzl. Please try again.',
          alertVisible: true,
          onErrorBirthday: true,
        });
      }
      else {
        updateName.push('birthDate');
        updateValue.push(this.state.birthdate);
      }      
    }
    // eslint-disable-next-line
    if (this.state.email != this.props.email) {
      // Checks if Email is Of Valid Format
      // eslint-disable-next-line
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(this.state.email)) {
        // Checks If Email Is Unique And Not Associated With Another Account
        this.props.isEmailUnique(this.state.email).then((res) => {
          if (res) {
            updateName.push('email');
            updateValue.push(this.state.email);
            this.updateUser(updateName, updateValue);
          }
          // Handles If Email Is Associated With Another Account & Sets alert to true to block dispatch
          else {
            alert = true;
            this.setState({
              alertTitle: 'Email Taken!',
              alertMessage: 'It appears like an account has already been created with this email address. Try logging out and recovering your password if you think that you may already have an account.',
              alertVisible: true,
              onErrorEmail: true,
            });
          }
        })
      } else {
        alert = true;
        this.setState({
          alertTitle: 'Email Invalid...',
          alertMessage: 'You probably made a typo while inputting your email address. Give it another try!',
          alertVisible: true,
          onErrorEmail: true,
        });
      }
    } else if (!alert && updateName.length > 0) {
      this.updateUser(updateName, updateValue);
    }
    // eslint-disable-next-line 
    else if (updateName.length != 0) {
      this.setState({
        alertVisible: true,
        alertMessage: 'We are not quite sure and your information may have saved. Please contact support if the problem continues.',
        alertTitle: 'Something Went Wrong',
      });
    } else {
      this.setState({
        alertVisible: true,
        alertMessage: 'All of your account information is currently up to date. Just tap on a section to edit your preferences. Unfortunately you cannot edit your username at this time.',
        alertTitle: 'No Changes To Save!',
      });
    }
  }

  updateUser(updateName, updateValue) {
    const returnName = updateName;
    this.props.updateUser(this.props.jwtToken, updateName, updateValue, returnName).then((res) => {
      // Handles Error With Dispatch & Displays Alert To User
      if (!(res && !('errors' in res))) {
        this.setState({
          alertVisible: true,
          alertMessage: 'Something went wrong with our servers. Please try again in a couple minutes.',
          alertTitle: 'Unable To Save',
        });
      }
      // Handles Successful Update Of User Settings & Displays Alert To User
      else {
        this.setState({
          alertVisible: true,
          alertMessage: 'We have updated your account information and you are all set!',
          alertTitle: 'Save Successful!',
        });
      }
    });
  }

  changePhoneNumber(value) {
    let returnValue;
    // First ten digits of input only, Preventing Too Long Of Phone Numbers
    const input = value.replace(/\D/g,'').substring(0,10); 
    // Area Code For Phone Number
    const areaCode = input.substring(0,3);
    // Middle 3 Digits For Phone Number
    const middle = input.substring(3,6);
    // Last 4 Digits For Phone Number
    const last = input.substring(6,10);
    // Handles Showing Full Phone Number
    if (input.length > 6) {
      returnValue = `(${areaCode}) ${middle}-${last}`;
    }
    // Handles Showing Phone Number Without Last 4 Digits
    else if (input.length > 3) {
      returnValue = `(${areaCode}) ${middle}`;
    }
    // Handles Showing Phone Number Area Code
    else if (input.length > 0) {
      returnValue = `(${areaCode}`;
    }
    // Handles If Input Is Empty To Avoid Console Error
    else {
      returnValue = '';
    }
    this.setState({ phoneNumber: returnValue });
  }

  changeFirstName(text) {
    this.setState({ firstName: text.replace(/\s/g, '').replace(/[^A-Za-z]+-+'/g, ''), onErrorFirstName: false });
  }

  changeLastName(text) {
    this.setState({ lastName: text.replace(/\s/g, '').replace(/[^A-Za-z]+-+'/g, ''), onErrorLastName: false });
  }

  changeEmail(text) {
    this.setState({ email: text.replace(/\s/g, ''), onErrorEmail: false });
  }

  changeBirthdate(text) {
    this.setState({ birthdate: text, onErrorBirthday: false });
  }
  
  changePassword(text) {
    this.setState({ password: text, onErrorPassword: false });
  }

  changeOldPassword(text) {
    this.setState({ oldPassword: text });
  }

  changeConfirm(text) {
    this.setState({ confirmPassword: text, onErrorPassword: false });
  }

  handleSaveButton(e) {
    e.preventDefault();
    if (this.state.changingPassword) {
      this.updatePassword();
    } else {
      this.saveProfile();
    }    
  }

  // Update Password For User With Error Validation
  updatePassword() {
    // eslint-disable-next-line
    if (this.state.password != this.state.confirmPassword) {
      this.setState({
        alertTitle: 'Uh Oh...',
        alertMessage: 'Your new password and the confirmation password do not seem to match. Please try again.',
        alertVisible: true,
        onErrorPassword: true,
      });
    } else if (this.state.password < 8) {
      this.setState({
        alertTitle: 'Whoops!',
        alertMessage: 'Your new password must be 8 characters or longer. Please try again.',
        alertVisible: true,
        onErrorPassword: true,
      });
    } else {
      this.props.changePassword(this.props.jwtToken, this.state.oldPassword, this.state.password, this.state.confirmPassword).then((res) => {
        this.setState({
          alertTitle: 'Success!',
          alertMessage: 'Your new password has been securely updated.',
          alertVisible: true,
          changingPassword: false,
        });
      });
    }
  }

  // Toggles Visibility Of Alert Dialog
  toggleAlert = () => {
    this.setState({ alertVisible: !this.state.alertVisible });
  }

  toggleChangePassword = (e) => {
    e.preventDefault();
    this.setState({ changingPassword: !this.state.changingPassword });
  }

  render() {
    if (this.props.visible) {
      return (
        <div className='tile' style={{ paddingTop: 40 }}>
          <Alert
            title={this.state.alertTitle}
            message={this.state.alertMessage}
            visible={this.state.alertVisible}
            dismiss={this.toggleAlert}
          />
          <div className='settings-header'>
            <div className='card-flex-header' style={{ paddingBottom: 5 }}>
              <SettingsSuggestOutlinedIcon />
              <h2 className='card-header'>
                Settings
              </h2>
            </div>
          </div>
          <div className='settings-instructions'>
            Update settings related to your account and notification preferences by changing the values below. If you have any isssues, don't hesitate to contact support.
          </div>
          <div className='settings-container'>
            <Box style={{ width: '90%', maxWidth: '500px', margin: 'auto', marginTop: '35px' }} component="form">
              <FormControl style={{ width: '100%' }} variant="standard">
                {!this.state.changingPassword && (<TextField
                  id="Username"
                  label="Username"
                  placeholder="Username"
                  type="text"
                  disabled
                  variant="filled"
                  error={false}
                  value={this.props.username}
                  onChange={(event) => this.changeFirstName(event.target.value)}
                  sx={{ backgroundColor: '#2e7361', marginBottom: '4px', marginTop: '4px', borderRadius: '7px' }}
                />)}
                {!this.state.changingPassword && (<TextField
                  id="School"
                  label="School"
                  type="text"
                  disabled
                  variant="filled"
                  // eslint-disable-next-line
                  value={this.state.school == null ? "Not A Student" : this.state.school}
                  onChange={(event) => this.changeBirthdate(event.target.value)}
                  sx={{ backgroundColor: '#2e7361', marginBottom: '4px', marginTop: '4px', borderRadius: '7px' }}
                />)}
                {!this.state.changingPassword && (
                  <div>
                    <div className='settings-flex'>
                      <TextField
                        id="firstName"
                        label="First Name"
                        placeholder="First Name"
                        type="text"
                        variant="filled"
                        style={{ width: '49%', marginRight: '2%'}}
                        error={this.state.onErrorFirstName}
                        value={this.state.firstName}
                        onChange={(event) => this.changeFirstName(event.target.value)}
                        sx={{ backgroundColor: '#2e7361', marginBottom: '4px', marginTop: '4px', borderRadius: '7px' }}
                      />
                      <TextField
                        id="lastName"
                        label="Last Name"
                        placeholder="Last Name"
                        type="text"
                        variant="filled"
                        style={{ width: '49%' }}
                        error={this.state.onErrorLastName}
                        value={this.state.lastName}
                        onChange={(event) => this.changeLastName(event.target.value)}
                        sx={{ backgroundColor: '#2e7361', marginBottom: '4px', marginTop: '4px', borderRadius: '7px' }}
                      />
                    </div>
                    <div>
                      <TextField
                        id="email"
                        label="Email"
                        placeholder="Email"
                        type="text"
                        variant="filled"
                        error={this.state.onErrorEmail}
                        value={this.state.email}
                        onChange={(event) => this.changeEmail(event.target.value)}
                        sx={{ backgroundColor: '#2e7361', marginBottom: '4px', marginTop: '4px', borderRadius: '7px', width: '49%', marginRight: '2%' }}
                      />
                      <TextField
                        id="phoneNumber"
                        label="Phone Number"
                        placeholder="(xxx) xxx-xxxx"
                        type="text"
                        variant="filled"
                        error={this.state.onPhoneNumberError}
                        value={this.state.phoneNumber}
                        onChange={(event) => this.changePhoneNumber(event.target.value)}
                        sx={{ backgroundColor: '#2e7361', marginBottom: '4px', marginTop: '4px', borderRadius: '7px', width: '49%' }}
                      />
                    </div>
                    <TextField
                      id="birthday"
                      label="Birthday"
                      placeholder="Birthday"
                      type="date"
                      variant="filled"
                      fullWidth
                      error={this.state.onErrorBirthday}
                      value={this.state.birthdate}
                      onChange={(event) => this.changeBirthdate(event.target.value)}
                      sx={{ backgroundColor: '#2e7361', marginBottom: '4px', marginTop: '4px', borderRadius: '7px' }}
                    />
                  </div>
                )}
                {this.state.changingPassword && (
                  <div>
                    <TextField
                      label="Old Password"
                      placeholder="••••••••"
                      type="password"
                      variant="filled"
                      style={{ width: '100%'}}
                      value={this.state.oldPassword}
                      onChange={(event) => this.changeOldPassword(event.target.value)}
                      sx={{ backgroundColor: '#2e7361', marginBottom: '4px', marginTop: '4px', borderRadius: '7px' }}
                    />
                    <div style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <TextField
                        label="New Password"
                        placeholder="••••••••"
                        type="password"
                        variant="filled"
                        style={{ width: '49%', marginRight: '2%'}}
                        error={this.state.onErrorPassword}
                        value={this.state.password}
                        onChange={(event) => this.changePassword(event.target.value)}
                        sx={{ backgroundColor: '#2e7361', marginBottom: '4px', marginTop: '4px', borderRadius: '7px' }}
                      />
                      <TextField
                        id="confirm"
                        label="Confirm New"
                        placeholder="••••••••"
                        type="password"
                        variant="filled"
                        style={{ width: '49%' }}
                        error={this.state.onErrorPassword}
                        value={this.state.confirmPassword}
                        onChange={(event) => this.changeConfirm(event.target.value)}
                        sx={{ backgroundColor: '#2e7361', marginBottom: '4px', marginTop: '4px', borderRadius: '7px' }}
                      />
                    </div>
                  </div>
                )}
                <button onClick={(e) => this.toggleChangePassword(e)}className="change-password-button">
                  {this.state.changingPassword ? 'Go Back' : 'Change Password'}
                </button>
                <button className='main-button login-button' style={{ marginTop: '40px', marginBottom: '25px', width: '260px' }} onClick={(e) => this.handleSaveButton(e)}>
                  {this.state.changingPassword ? 'Update Password' : 'Save Changes'}
                </button>
                <div className='settings-version-text'>
                  Version {APP_VERSION}
                </div>
              </FormControl>
            </Box>
          </div>
        </div>
      );
    } else {
      return (
        <div />
      )
    }
  }
}

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    // Handles Colors Which Are Updated Throughout When MarketOpen Changes
    userID: state.userDetails.id,
    jwtToken: state.userDetails.jwtToken,
    //Handles user details & change password
    loading: state.userDetails.loading,
    // Handles notification mutation, alerts, errors
    notificationLoading: state.notification.loading,
    // Existing items in the store to check against new placeholder values
    username: state.userDetails.username,
    firstName: state.userDetails.firstName,
    lastName: state.userDetails.lastName,
    email: state.userDetails.email,
    phoneNumber: state.userDetails.phoneNumber,
    isTeacher: state.userDetails.isTeacher,
    school: state.userDetails.school,
    birthDate: state.userDetails.birthDate,
  };
};

// Map Dispatch To Props (Dispatch Actions to Reducers. Reducers then modify the redux store state.
const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    // Dynamically saves updated user details. Privacy & Notification settings handled in components.
    updateUser: (token, updateName, updateValue, returnName) => dispatch(updateUser(token, updateName, updateValue, returnName)),
    // checks to see if email and username is unique before allowing user to proceed
    isEmailUnique: (email) => dispatch(isEmailUnique(email)),
    changePassword: (jwtToken, oldPass, newPass, confirmPass) => dispatch(changePassword(jwtToken, oldPass, newPass, confirmPass)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
