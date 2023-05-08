import React from 'react';
import '../../styles/Admin/Fallback.css';
import { ContactSupport } from '../../ActionTypes/settingsAction';
import { logoutUser } from '../../ActionTypes/loginActions';
import { connect } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import FallbackImage from '../../assets/images/Admin/TooNarrow.png';

class ErrorFallback extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      alertVisible: false,
      alertTitle: '',
      alertMessage: '',
      loading: false
    }
  }

  contactSupport() {
    let handledText = this.state.message;
    if (handledText.length > 5) {
      let platformDetails = `Developer Info: Web`;
      handledText = handledText + ' // ' + platformDetails + ' // ' + this.props.email + ' // ' + this.props.firstName.toString() + ' ' + this.props.lastName.toString();
      this.props.contactSupport(this.props.jwtToken, handledText).then((res) => {
        // Handles Error With Dispatch & Displays Alert To User
        if (!(res && !('errors' in res))) {
          this.setState({
            alertVisible: true,
            alertMessage: 'We had trouble sending your message to our support team. Please try again or reach out directly to support@rapunzl.org.',
            alertTitle: 'Something Went Wrong',
          });
        }
        // Handles Success And Displays Alert To User
        else {
          this.setState({
            alertVisible: true,
            alertMessage: 'Your support request has been sent. Someone will get back to you within 24 hours to help resolve your issue. Thanks for your patience.',
            alertTitle: 'Success!',
          });
        }
      })
    }
    // Handles If Support Message Is Less Than 5 Characters
    else {
      this.setState({
        alertVisible: true,
        alertMessage: 'Please describe your issue in a little more detail and someone will respond within 24 hours to help resolve your issue. Thanks for your patience.',
        alertTitle: 'Wait A Second...',
      });
    }
  }

  _handleContactSupport() {

  }

  _handleLogout() {

  }

  render() {
    return (
      <div>
        <img alt='' className='fallback-img' src={FallbackImage} />
        <div className='fallback-error-h1'>
          Rapunzl Encountered An Error...
        </div>
        <div className='fallback-error-text'>
          Something went wrong which caused Rapunzl to crash and become disconnected from the server. Please login to Rapunzl again in order to access your account. {this.props.jwtToken !== null && this.props.jwtToken !== undefined && this.props.jwtToken !== false ? 'If the problem continues, please contact support.' : ''}
        </div>
        <div>
          <div onClick={() => this._handleLogout()} className='fallback-button-flex'>
            <LogoutIcon className='fallback-button-icon' />
            <div className='fallback-button-text' style={{ fontWeight: '500' }}>
              Logout
            </div>
          </div>
          {this.props.jwtToken !== null && this.props.jwtToken !== undefined && this.props.jwtToken !== false && (
            <div onClick={() => this._handleContactSupport()} className='fallback-button-flex fallback-support-button'>
              <CommentOutlinedIcon className='fallback-button-icon' style={{ fill: '#c5c5c5', fontSize: '14px' }} />
              <div className='fallback-button-text' style={{ color: '#c5c5c5', fontWeight: '300', fontSize: '13px', marginLeft: 3 }}>
                Contact Support
              </div>
            </div>
          )}
        </div>
      </div>
    );
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
