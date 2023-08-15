import React from 'react';
import { connect } from 'react-redux';
import { isEmailUnique, logoutUser } from '../../ActionTypes/loginActions';
import { updateUser } from '../../ActionTypes/updateUserDataActions';
import { FetchVerificationStatus, ResendVerification } from '../../ActionTypes/verificationActions';
import { Navigate } from 'react-router-dom';
import Alert from '../Admin/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import VerificationLetter from '../../assets/images/NotSignedIn/VerificationLetter.png';
import '../../styles/SignIn/VerifyAccountContainer.css';

class VerifyAccountContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // Handles If User Selects To Change Email With changeEmail For Visibility & email for input
      changeEmail: false,
      email: '',
      // Handles If Native Alert Is Visible
      alertVisible: false,
      aletTitle: '',
      alertMessage: '',
      loading: false,
      // If JWTToken becomes null, we navigate the user to the login screen to login again
      handleLogout: false
    };
  }

  // Resets VerifyAccountContainer To Original State When User Toggles Back To Login
  componentDidUpdate(prevProps) {

  }

  // Handles Resending Verification Email If User Needs An Additional Email
  resendVerification() {
    this.props.resendVerification(this.props.jwtToken).then((res) => {
      // Handles Error With Dispatch & Displays Alert To User
      if (!(res && !('errors' in res))) {
        this.setState({
          alertTitle: 'Internal Error',
          alertMessage: 'Our servers had a problem resending the verification email. Try again in a few minutes or contact help@rapunzl.org to manually verify your account.',
          alertVisible: true,
        });
      }
    })
    .catch(() => {
      this.setState({
        alertTitle: 'Success!',
        alertMessage: 'We have sent you a new verification email. Check your spam for an email from hello@rapunzlinvestments.com. Remember that the old verification email will no longer be valid.',
        alertVisible: true,
      });
    })
  }

  // Handles Updating User Email Address Associated With The Account To Receive Verification Email
  async updateUserEmail() {
    this.props.updateUser(this.props.jwtToken, ["email"], [this.state.email], ["email"]).then((res) => {
      // Handles Error With Dispatch & Displays Alert To User
      if (!(res && !('errors' in res))) {
        this.setState({
          alertTitle: "This is embarrassing...",
          alertMessage: "We had an error changing your email address. Try again in a few minutes or email us at help@rapunzl.org with the corresponding email address and we can help sort the problem!",
          alertVisible: true,
          loading: false
        });
      }
    })
    return true;
  }

  // Handles If User Selects To Update Their Email And Submits. Checks For Erros Then Calls updateUserEmail
  submitEmail() {
    this.setState({ loading: true });
    let alert = false;
    if (this.state.email.length > 0) {
      // Checks if Email is Of Valid Format
      // eslint-disable-next-line
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(this.state.email)) {
        // Checks If Email Is Unique And Not Associated With Another Account
        this.props.isEmailUnique(this.state.email).then((res) => {
          if (!res) {
            alert = true;
            this.setState({
              alertTitle: 'Email Taken!',
              alertMessage: `It appears like an account has already been created with this email address. Try logging out and requesting a new password if you think it's yours!`,
              alertVisible: true,
              loading: false
            });
          }
        })
      }
      // Handles if Email Is Not Valid
      else {
        alert = true;
        this.setState({
          alertTitle: 'Format Invalid...',
          alertMessage: 'You probably made a typo while inputting your email address. Give it another try!',
          alertVisible: true,
          loading: false
        });
      }
    } else {
      alert = true;
      this.setState({
        alertTitle: 'Email Invalid',
        alertMessage: `You must have an email address associated with your account so we can verify it's you!`,
        alertVisible: true,
        loading: false
      });
    }
    // Checks if there has not been an alert/error before sending dispatch
    if (!alert) {
      this.updateUserEmail().then((res) => {
        if (res) {
          this.props.resendVerification(this.props.jwtToken).then((res) => {
            if ('errors' in res) {
              this.setState({
                alertTitle: "Good & Bad News",
                alertMessage: "We updated your email address, but could not resend a verification email. Please try again with the link below in a few minutes or contact help@rapunzl.org directly with this email.",
                alertVisible: true,
                changeEmail: false,
                loading: false,
              });
            }
          })
          .catch(() => {
            this.setState({
              alertTitle: "Success!",
              alertMessage: "We have updated your email address and just send a verification email to the new address. Make sure to check your junk in case you can't find the email or contact help@rapunzl.org directly with this email.",
              alertVisible: true,
              changeEmail: false,
              loading: false,
            });
          })
        }
      })
    }
  }

  // Handles Dispatch To Clear Redux And Updates State So That User Is Navigated To Home Screen
  _handleLogout() {
    this.props.logout();
    this.setState({ handleLogout: true });
  }

  // Toggles Between Main Verification Screen & Option For User To Change Email Address
  toggleChangeEmail() {
    this.setState({ changeEmail: !this.state.changeEmail });
  }

  // Handles Toggling Visibility Of Alert Component
  toggleAlert = () => {
    this.setState({ alertVisible: !this.state.alertVisible });
  }

  // Handles Fetching If User Is Verified Or Not To Refresh The Page
  updateVerificationStatus() {
    this.props.updateVerification(this.props.jwtToken);
  }

  render() {
    if (this.state.handleLogout) {
      return(
        <Navigate to="/login" replace={true} />
      );
    } else {
      return (
        <Container
          disableGutters={true}
          fixed={false}
          maxWidth={'md'}
          style={{ padding: '20px', marginTop: '20px', borderRadius: '5px' }}
        >
          <Alert
            title={this.state.alertTitle}
            message={this.state.alertMessage}
            visible={this.state.alertVisible}
            dismiss={this.toggleAlert}
          />
          <img
            alt="Verify Account Header"
            className='verification-image'
            src={VerificationLetter}
          />
          <div className='verification-header'>
            We emailed you a link to verify your account. If you can't find the email, check your spam and junk folders before resending the link.
          </div>
          <Box style={{ width: '90%', maxWidth: '500px', margin: 'auto' }} component="form">
            {!this.state.changeEmail && (
              <div className='verification-email-container'>
                <div className="verification-email">
                  {this.props.email}
                </div>
                <div className="verification-email-subtext">
                  Your Email Address
                </div>
                {/* <button className='verification-edit-email' onClick={() => this.toggleChangeEmail()}>
                  Edit Email Address
                </button> */}
              </div>
            )}
            {this.state.changeEmail && (
              <div className='verification-email-container'>
                <div className="verification-email">
                  {this.props.email}
                </div>
                <div className="verification-email-subtext">
                  Your Email Address
                </div>
                <button className='change-email-button' title="Change The Email Associated With Your Account" onClick={() => this.submitEmail()}>
                  Change Email
                </button>
                <button className='go-back-button' onClick={() => this.toggleChangeEmail()}>
                  Cancel
                </button>
              </div>
            )}
            {!this.state.changeEmail && !this.state.loading && !this.props.loading && (
              <div className='verification-buttons-container'>
                <div className='verification-buttons-flex'>
                  <button className='verification-button resend-email-button' title="Request A New Verification Link" onClick={() => this.resendVerification()}>
                    Resend Email
                  </button>
                  <button className='verification-button refresh-status-button' title="Refresh Verification Status & Confirming" onClick={() => this.updateVerificationStatus()}>
                    Refresh Status
                  </button>
                </div>
                <button className='verification-logout-button' title="Logout & Return To Login Screen" onClick={() => this.handleLogout()}>
                  Logout
                </button>
              </div>
            )}
            {(this.state.loading || this.props.loading) && (
              <div className='verify-loading-container'>
                <CircularProgress />
                <div className='verify-loading-text'>
                  Refreshing Verification<br/>Status...
                </div>
              </div>
              
            )}
          </Box>
        </Container>
      );
    }
  }
}

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  return {
    loading: state.userDetails.loading,
    email: state.userDetails.email,
    jwtToken: state.userDetails.jwtToken,
  };
};

// Map Dispatch To Props (Dispatch Actions to Reducers. Reducers then modify the redux store state.
const mapDispatchToProps = (dispatch) => {
  return {
    // Checks If New Email Is Unique
    isEmailUnique: (email) => dispatch(isEmailUnique(email)),
    // Update Email For Unverified User
    updateUser: (token, updateName, updateValue, returnName) => dispatch(updateUser(token, updateName, updateValue, returnName)),
    // Checks Verification Status
    updateVerification: (token) => dispatch(FetchVerificationStatus(token)),
    // Resends Verification To New Email Address
    resendVerification: (token) => dispatch(ResendVerification(token)),
    // log the user out of the App
    logout: () => dispatch(logoutUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyAccountContainer);
