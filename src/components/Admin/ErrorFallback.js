import React from 'react';
import { Navigate } from 'react-router-dom';
import '../../styles/Admin/Fallback.css';
import { ContactSupport } from '../../ActionTypes/settingsAction';
import { logoutUser } from '../../ActionTypes/loginActions';
import { connect } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import SendIcon from '@mui/icons-material/Send';
import FallbackImage from '../../assets/images/Admin/TooNarrow.png';
import Alert from './Alert';
import CircularProgress from '@mui/material/CircularProgress';

class ErrorFallback extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // Handles If There Is A Dialog Alert To The User
      alertVisible: false,
      alertTitle: '',
      alertMessage: '',
      // Updates When User Is Contacting Support
      loading: false,
      // Switches Between initial and contact depending on user selection
      status: 'initial',
      // Hides Contact Button If User Has Already Contacted Support
      contacted: false,
      // Values & Errors For Contact Form Inputs
      email: '',
      emailError: false,
      name: '',
      nameError: false,
      message: '',
      messageError: false,
      // If JWTToken becomes null, we navigate the user to the login screen to login again
      handleLogout: false
    }
  }

  // Handles Dispatching Message To GraphQL So That We Can Contact Support Letting The Support Team Know That The Application Crashed
  contactSupport() {
    this.setState({ loading: true });
    // eslint-disable-next-line
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // Checks To Make Sure That The Message Is At Least 6 Characters To Provide Information To The Support Team
    if (this.state.message.length <= 5) {
      this.setState({
        alertVisible: true,
        alertMessage: 'Please describe your issue in a little more detail and someone will respond within 24 hours to help resolve your issue. Thanks for your patience.',
        alertTitle: 'Wait A Second...',
        loading: false,
        messageError: true,
      });
      
    }
    // Checks That The Name Has At Least 2 Characters So We Can Respond To The Individual
    else if (this.state.name.length <= 1) {
      this.setState({
        alertVisible: true,
        alertTitle: 'Invalid Name...',
        alertMessage: 'Pleae provide your name so that a customer service representative can contact you to help resolve the issue you are experiencing.',
        loading: false,
        nameError: true
      });
    }
    // Checks To Make Sure That The Email Address If The Correct Format So We Can Get In Touch After A Support Request
    else if (!re.test(this.state.email)) {
      this.setState({
        alertVisible: true,
        alertTitle: 'Invalid Email...',
        alertMessage: 'We cannot recognize the format of the email address which you have provided. Please check your email address for any typos before submitting so that we can respond to your support request.',
        loading: false,
        emailError: true
      });
    }
    // Handles If Support Message Is Less Than 5 Characters
    else {
      let platformDetails = `Developer Info: Web`;
      let handledText = this.state.message + ' // ' + platformDetails + ' // ' + this.props.email + ' // ' + this.props.firstName.toString() + ' ' + this.props.lastName.toString();
      this.props.contactSupport(this.props.jwtToken, handledText).then((res) => {
        // Handles Error With Dispatch & Displays Alert To User
        if (!(res && !('errors' in res))) {
          this.setState({
            alertVisible: true,
            alertMessage: 'We had trouble sending your message to our support team. Please try again or reach out directly to support@rapunzl.org.',
            alertTitle: 'Something Went Wrong',
            status: 'initial',
            loading: false,
          });
        }
        // Handles Success And Displays Alert To User
        else {
          this.setState({
            alertVisible: true,
            alertMessage: 'Your support request has been sent. Someone will get back to you within 24 hours to help resolve your issue. Thanks for your patience.',
            alertTitle: 'Success!',
            status: 'initial',
            contacted: true,
            loading: false,
          });
        }
      });
    }
  }

  // Handles Toggling Between Contact Form & Initial Crash State For User To Share Why The App Crashed
  _toggleContactSupport() {
    if (this.state.status === 'initial') {
      this.setState({ status: 'contact' });
    } else {
      this.setState({ status: 'initial' });
    }
  }

  // Handles Dispatch To Clear Redux And Updates State So That User Is Navigated To Home Screen
  _handleLogout() {
    this.props.logout();
    this.setState({ handleLogout: true });
  }

  // Pass Through Arrow Function Which Toggles Visibility Of Alert Dialog
  toggleAlert = () => {
    this.setState({ alertVisible: !this.state.alertVisible });
  }

  // These three functions update the various inputs in the contact form before user selects to submit
  _handleMessageChange(text) { this.setState({ message: text, messageError: false }); }
  _handleChangeName(text) { this.setState({ name: text, nameError: false }); }
  _handleChangeEmail(text) { this.setState({ email: text, emailError: false }); }

  render() {
    if (this.state.handleLogout) {
      return(
        <Navigate to="/" replace={true} />
      );
    } else {
      return (
        <div>
          <Alert
            title={this.state.alertTitle}
            message={this.state.alertMessage}
            visible={this.state.alertVisible}
            dismiss={this.toggleAlert}
          />
          {this.state.status === 'initial' && (
            <div>
              <img alt='' className='fallback-img' src={FallbackImage} />
              <div className='fallback-error-h1'>
                {this.state.contacted ? 'Unable To Connect To Rapunzl' : 'Rapunzl Encountered An Error...'}
              </div>
              <div className='fallback-error-text'>
                Something went wrong which caused Rapunzl to crash and become disconnected from the server. Please login to Rapunzl again in order to access your account. {this.props.jwtToken !== null && this.props.jwtToken !== undefined && this.props.jwtToken !== false && !this.state.contacted ? 'If the problem continues, please contact support.' : ''}
              </div>
              <div>
                <div onClick={() => this._handleLogout()} className='fallback-button-flex'>
                  <LogoutIcon className='fallback-button-icon' />
                  <div className='fallback-button-text' style={{ fontWeight: '500' }}>
                    Logout
                  </div>
                </div>
                {this.props.jwtToken !== null && this.props.jwtToken !== undefined && this.props.jwtToken !== false && !this.state.contacted && (
                  <div onClick={() => this._toggleContactSupport()} className='fallback-button-flex fallback-support-button'>
                    <CommentOutlinedIcon className='fallback-button-icon' style={{ fill: '#c5c5c5', fontSize: '14px' }} />
                    <div className='fallback-button-text' style={{ color: '#c5c5c5', fontWeight: '300', fontSize: '13px', marginLeft: 3 }}>
                      Contact Support
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {this.state.status === 'contact' && (
            <div className='fallback-contact-container'>
              <div onClick={() => this._toggleContactSupport()} className='fallback-contact-back-button-flex'>
                <ArrowCircleLeftOutlinedIcon className='fallback-back-button-icon'/>
                <div className='fallback-back-button-text'>
                  Go Back
                </div>
              </div>
              <div className='fallback-contact-h1' style={{ color: this.state.emailError ? '#ff4a4a' : '#ffffff' }}>
                Your Email Address
              </div>
              <input
                className='fallback-contact-input'
                value={this.state.email}
                error={this.state.emailError}
                onChange={(event) => this._handleChangeEmail(event.target.value)}
                style={{ backgroundColor: this.state.emailError ? '#bc2e2ea1' : '#0e5845' }}
              />
              <div className='fallback-contact-h1' style={{ color: this.state.nameError ? '#ff4a4a' : '#ffffff' }}>
                Your Name
              </div>
              <input
                className='fallback-contact-input'
                value={this.state.name}
                error={this.state.nameError}
                onChange={(event) => this._handleChangeName(event.target.value)}
                style={{ backgroundColor: this.state.nameError ? '#bc2e2ea1' : '#0e5845' }}
              />
              <div className='fallback-contact-h1' style={{ color: this.state.messageError ? '#ff4a4a' : '#ffffff' }}>
                Your Message  
              </div>
              <textarea
                className='fallback-contact-input fallback-contact-textarea'
                multiline={true}
                value={this.state.message}
                error={this.state.messageError}
                onChange={(event) => this._handleMessageChange(event.target.value)}
                placeholder='Please describe your issue with as much detail as possible'
                style={{ backgroundColor: this.state.messageError ? '#bc2e2ea1' : '#0e5845' }}
              />
              {!this.state.loading && (
                <div onClick={() => this.contactSupport()} className='fallback-contact-button-flex'>
                  <SendIcon className='fallback-contact-button-icon' />
                  <div className='fallback-contact-button-text'>
                    Send Message
                  </div>
                </div>
              )}
              {this.state.loading && (
                <div className='fallback-loading-container'>
                  <CircularProgress />
                  <div className='fallback-contact-loading-text'>
                    Sending Support Message...
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      );
    }
  }
}

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    // Token used For Contacting Support
    jwtToken: state.userDetails.jwtToken,
    // Handles email address linked to current user to prefill response email for support message
    email: state.userDetails.email,
    firstName: state.userDetails.firstName,
    lastName: state.userDetails.lastName,
  };
};

// Map Dispatch To Props (Dispatch Actions to Reducers. Reducers then modify the redux store state.
const mapDispatchToProps = (dispatch) => {
  // Action
    return {
      // Handles sending message to Database to email to support email address
      contactSupport: (token, text) => dispatch(ContactSupport(token, text)),
      // log the user out of the App
      logout: () => dispatch(logoutUser()),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorFallback);
