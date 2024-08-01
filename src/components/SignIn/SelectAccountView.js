import React from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../ActionTypes/loginActions';
import { fetchBigQuery } from '../../ActionTypes/userDataActions';
import { Navigate } from 'react-router-dom';
import Alert from '../Admin/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import VerificationLetter from '../../assets/images/NotSignedIn/VerificationLetter.png';
import '../../styles/SignIn/VerifyAccountContainer.css';

class SelectAccountView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // Handles If Native Alert Is Visible
      alertVisible: false,
      aletTitle: '',
      alertMessage: '',
      loading: false,
      // If JWTToken becomes null, we navigate the user to the login screen to login again
      handleLogout: false,
      handleTeacherLogin: false,
      handleAdminLogin: false,
      // Handles Which Option User Has Selected
      selectedLogin: '',
    };
  }

  // Handles Dispatch To Clear Redux And Updates State So That User Is Navigated To Home Screen
  _handleLogout() {
    this.props.logout();
    this.setState({ handleLogout: true });
  }

  // Handles Toggling Visibility Of Alert Component
  toggleAlert = () => {
    this.setState({ alertVisible: !this.state.alertVisible });
  }

  // Handles If User Confirms Selection Of Admin
  // TODO: PRODUCTS Calls ' fetchAdministratorBigQuery' in userDataActions and go to Modified Dashboard fetchAdministratorBigQuery
  _handleAdminBigQuery() {
    
  }

  _handleTeacherBigQuery = (token) => {
    this.props.fetchBigQuery(token).then(res => {
      // Handles Error With Big Query
      if (res !== true && !(res && !('errors' in res))) {
        this.setState({
          loginLoading: false,
          alertVisible: true,
          alertTitle: 'Issue With Login',
          alertMessage: res.errors[0].message !== undefined && res.errors[0].message.length > 0 ? res.errors[0].message : 'We had trouble logging in and retreiving your account information. Please contact support at hello@rapunzl.org so we can help resolve the issue.',
        })
      }
      // Handles Successful Login And Fetching Of The Big Query
      else {
        this.setState({
          success: true,
          alertVisible: false,
        });
      }
    });
  }

  _handleSubmitButton = () => {
    this.setState({ loading: true });
    if (this.state.selectedLogin === 'teacher') {
      this._handleTeacherBigQuery(this.props.jwtToken);
    } else if (this.state.selectedLogin === 'principal' || this.state.selectedLogin === 'admin') {
      this._handleAdminBigQuery();
    } else {
      this.setState({
        alertVisible: true,
        alertTitle: 'Select Account Type',
        alertMessage: 'Please select an account. Would you like to view your Rapunzl teacher account, or a summary of teachers at your school/district?',
        loading: false,
      })
    }
  }

  // TODO: PRODUCTS Update this view to allow for the teacher to select between two options and then confirm with a button.
  // Also need to accomodate Logout option for the educator.

  render() {
    if (this.state.handleLogout) {
      return(
        <Navigate to="/login" replace={true} />
      );
    } else if (this.state.handleAdminLogin && this.props.bigQueryLoaded) {
      return (
        <Navigate to="/login" replace={true} />
      );
    } else if (this.state.handleTeacherLogin && this.props.bigQueryLoaded) {
      return (
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
          <button className='verification-logout-button' title="Logout & Return To Login Screen" onClick={() => this._handleLogout()}>
            Logout
          </button>
          {this.state.loading && (
            <div className='verify-loading-container'>
              <CircularProgress />
              <div className='verify-loading-text'>
                Refreshing Verification<br/>Status...
              </div>
            </div>
          )}
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
    // Handles Login Related Errors
    graphqlError: state.userDetails.graphqlError,
    error: state.userDetails.error,
    errorTitle: state.userDetails.errorTitle,
    // Handles If Big Query Has completed Loading
    bigQueryLoaded: state.userDetails.bigQueryLoaded,
  };
};

// Map Dispatch To Props (Dispatch Actions to Reducers. Reducers then modify the redux store state.
const mapDispatchToProps = (dispatch) => {
  return {
    // Get all of the user data
    fetchBigQuery: (token) => dispatch(fetchBigQuery(token)),
    // log the user out of the App
    logout: () => dispatch(logoutUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectAccountView);
