import React from 'react';
// import moment from 'moment';
import { connect } from 'react-redux';
import { forgotUsername, forgotPassword } from '../../ActionTypes/loginActions';
import Alert from '../Admin/Alert';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import VerificationLetter from '../../assets/images/NotSignedIn/VerificationLetter.png';
import '../../styles/SignIn/RecoverAccountContainer.css';

class RecoverAccountContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // Handles Input For Email
      email: '',
      // Handles Inputs For Phone Number
      phoneNumber: '',
      // Handles If User Has Selected To Recover Username Or Password
      getUsername: false,
      resetPassword: false,
      // Handles If User Has Selected Email Or Phone Number
      phoneNumberSelected: false,
      emailAddressSelected: true,
      // Handles If There Is An Error With The User Inputs
      phoneNumberError: false,
      emailAddressError: false,
      // Handles If Native Alert Is Visible
      alertVisible: false,
      alertTitle: 'Invalid Inputs',
      alertMessage: '',
      // Determines If Recovery Is Processing With Server
      loading: false,
      // Determines If Recovery Message Is Successfully Sent
      success: false,
    };
  }

  // Handles Setting Screen To Recover Username
  goToGetUsername() {
    this.setState({ getUsername: true });
  }

  // Handles Setting Screen To Reset Password
  goToResetPassword() {
    this.setState({ resetPassword: true });
  }

  // Toggles Alert To Display To User If There Are Incorrect Inputs
  toggleAlert = () => {
    this.setState({ alertVisible: !this.state.alertVisible });
  }

  // Determines Text To Display Based On What User Selects After Opening RecoverAccountContainer
  getValues() {
    if (this.state.success) {
      return [
        'Message Sent!',
        'We just sent you a message with your account information. Please use your username and password to login and contact support (support@rapunzl.org) if you have any issues.',
      ]
    }
    if (this.state.getUsername) {
      return [
        'Find Username',
        `Please provide us with the email address or phone number linked with your account. We'll either send you an email or text with your username.`,
      ];
    } else if (this.state.resetPassword) {
      return [
        'Reset Password',
        `We can reset your password really easily. We just need the email address or phone number linked with your Rapunzl account &'ll send a temporary password to login.`,
      ];
    } else {
      return [
        'How Can We Help?',
        `We're here to help! Let us know how we can help recover your account details or reset your password.`,
      ]
    }
  }

  // Handles Updating TextField & State When User Inputs Text
  _onChange(value) {
    if (this.state.phoneNumberSelected) {
      this._updatePhoneNumber(value);
    } else {
      this.setState({ email: value.replace(/\s/g, '') });
    }
  }

  _updatePhoneNumber(value) {
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
      returnValue = `(${areaCode}) ${middle} - ${last}`;
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

  // Handles Submitting Information. Includes Timers To Ensure User Cannot Repeatedly Request Email
  send() {
    this.setState({ loading: true });
    // const localTime = new Date();
    // const currentTime = Moment(localTime); 
    // const lastResetPasswordTime = Moment(this.props.lastResetPassword);
    // const lastGetUsernameTime = Moment(this.props.lastGetUsername);
    // const canResetPasswordDiff = currentTime.diff(lastResetPasswordTime, 'seconds');
    // const canResetUsernameDiff = currentTime.diff(lastGetUsernameTime, 'seconds');
    // Provides A 3 Minute Block
    // if (canResetPasswordDiff < 300 && this.state.resetPassword){
    //   this.setTimeoutAlert();
    // }
    // else if (canResetUsernameDiff < 300 && this.state.getUsername) {
    //   this.setTimeoutAlert();
    // }
    if (this.state.resetPassword) {
      if (this.state.emailAddressSelected) {
        this.props.forgotPassword(this.state.email, 'email').then((res) => {
          this.setState({ loading: false });
        });
      } else {
        this.props.forgotPassword('+1' + this.state.phoneNumber.replace(/\D/g,''), 'phoneNumber').then((res) => {
          this.setState({ loading: false });
        });
      }
    }
    else if (this.state.getUsername) {
      if (this.state.emailAddressSelected) {
        this.props.forgotUsername(this.state.email, 'email').then((res) => {
          this.setState({ loading: false });
        });
      } else {
        this.props.forgotUsername('+1' + this.state.phoneNumber.replace(/\D/g,''), 'phoneNumber').then((res) => {
          this.setState({ loading: false });
        });
      }
    }
    this.setState({
      loading: false,
      success: true
    });
  }

  // Handle Go Back Button To Reset Component State
  handleGoBack() {
    this.setState({
      getUsername: false,
      resetPassword: false,
      phoneNumberSelected: false,
      emailAddressSelected: true,

    });
  }

  // Returns User To Login Screen & Resets Component State
  dismissRecover() {
    this.handleGoBack();
    this.props.dismiss();
  }

  // Handles If User Attempts To Request Password/Username Before 5 Minutes Have Passed
  setTimeoutAlert = () => {
    this.setState({
      alertTitle: 'Message Already Sent',
      alertMessage: 'We just sent you a message. Check your email or phone and please request another message in a couple of minutes.',
      alertVisible: true,
      recoverAccountVisible: false,
    });
  }

  render() {
    let values = this.getValues();
    return (
      <Container>
        <Alert
          title={this.state.alertTitle}
          message={this.state.alertMessage}
          visible={this.state.alertVisible}
          dismiss={this.toggleAlert}
        />
        {this.state.success && (
          <img
            alt="Recover Account Header"
            className='recover-image'
            src={VerificationLetter}
          />
        )}
        <div className="recover-account-title" style={this.state.success ? { paddingTop: '0px' } : { paddingTop: '30px' }}>
          {values[0]}
        </div>
        <div className="recover-account-text" style={this.state.success ? { marginBottom: '65px' } : {}}>
          {values[1]}
        </div>
        <div className='recover-container'>
          {!this.state.success && !this.state.getUsername && !this.state.resetPassword && (
            <div className='recover-options-container'>
              <button className='recover-option-button' onClick={() => this.goToGetUsername()}>
                Find Username
              </button>
              <button className='recover-option-button' onClick={() => this.goToResetPassword()}>
                Reset Password
              </button>
            </div>
          )}
          {(this.state.getUsername || this.state.resetPassword) && !this.state.success && (
            <div className='recover-input-container'>
              <TextField
                id={this.state.phoneNumberSelected ? "Phone Number" : "Email Address"}
                label={this.state.phoneNumberSelected ? "Phone Number" : "Email Address"}
                placeholder={this.state.phoneNumberSelected ? "Phone Number" : "Email Address"}
                type="text"
                variant="filled"
                fullWidth
                error={this.state.phoneNumberSelected ? this.state.phoneNumberError : this.state.emailAddressError}
                value={this.state.phoneNumberSelected ? this.state.phoneNumber : this.state.email}
                onChange={(event) => this._onChange(event.target.value)}
                sx={{ width: '260px'}}
              />
            </div>
          )}
          {(this.state.getUsername || this.state.resetPassword) && !this.state.success && (
            <div className='recover-flex-buttons'>
              <button
                className='recover-button recover-email-button'
                style={this.state.phoneNumberSelected ? { backgroundColor: '#91c1b4' } : { backgroundColor: '#007154', cursor: 'auto', fontWeight: '500' }}
                onClick={() => this.setState({ phoneNumberSelected: false, emailAddressSelected: true, email: '', phoneNumber: '' })}
                disabled={this.state.emailAddressSelected}
              >
                Email
              </button>
              <button
                className='recover-button recover-phone-button'
                style={this.state.emailAddressSelected ? { backgroundColor: '#91c1b4' } : { backgroundColor: '#007154', cursor: 'auto', fontWeight: '500' }}
                onClick={() => this.setState({ phoneNumberSelected: true, emailAddressSelected: false, email: '', phoneNumber: '' })}
                disabled={this.state.phoneNumberSelected}
              >
                Phone
              </button>
            </div>
          )}
          {(this.state.getUsername || this.state.resetPassword) && !this.state.loading && !this.state.success && (
            <div className='recover-buttons-container'>
              <button className='recover-account-button' onClick={() => this.send()}>
                Submit
              </button>
              <button className='dismiss-recover-button' onClick={() => this.handleGoBack()}>
                Go Back
              </button>
            </div>
          )}
          {this.state.loading && (
            <CircularProgress />
          )}
          {(this.state.success || (!this.state.getUsername && !this.state.resetPassword)) && (
            <button className='recover-account-button' onClick={() => this.dismissRecover()}>
              Back To Login
            </button>
          )}
        </div>
      </Container>
    );
  }
}

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  return {
    lastGetUsername: state.userDetails.lastGetUsername,
    lastResetPassword: state.userDetails.lastResetPassword,
  };
};

// Map Dispatch To Props (Dispatch Actions to Reducers. Reducers then modify the redux store state.
const mapDispatchToProps = (dispatch) => {
  return {
    // forgotUsername: (email) => dispatch(forgotUsername(email)),
    forgotUsername: (email, type) => dispatch(forgotUsername(email, type)),
    // forgotPassword: (email) => dispatch(forgotPassword(email)),
    forgotPassword: (email, type) => dispatch(forgotPassword(email, type)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecoverAccountContainer);
