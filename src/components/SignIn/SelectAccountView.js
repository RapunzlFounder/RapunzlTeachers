import React from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../ActionTypes/loginActions';
import { fetchAdministratorBigQuery, fetchBigQuery } from '../../ActionTypes/userDataActions';
import { Navigate } from 'react-router-dom';
import Alert from '../Admin/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import CastForEducationOutlinedIcon from '@mui/icons-material/CastForEducationOutlined';
import DynamicFormOutlinedIcon from '@mui/icons-material/DynamicFormOutlined';
import '../../styles/SignIn/SelectAccountView.css';

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
    this.props.toggleSelectingAccountView();
    this.props.toggleLoginTabs();
    this.setState({ handleLogout: true });
  }

  // Handles Toggling Visibility Of Alert Component
  toggleAlert = () => {
    this.setState({ alertVisible: !this.state.alertVisible });
  }

  // Handles If User Confirms Selection Of Admin
  // TODO: PRODUCTS Calls ' fetchAdministratorBigQuery' in userDataActions and go to Modified Dashboard fetchAdministratorBigQuery
  _handleAdminBigQuery() {
    this.props.fetchAdministratorBigQuery(this.props.jwtToken).then((res) => {
      // Handles Error With Big Query
      if (res !== true && !(res && !('errors' in res))) {
        this.setState({
          loading: false,
          alertVisible: true,
          alertTitle: 'Issue With Login',
          alertMessage: res.errors[0].message !== undefined && res.errors[0].message.length > 0 ? res.errors[0].message : 'We had trouble logging in and retreiving your account information. Please contact support at hello@rapunzl.org so we can help resolve the issue.',
        })
      }
      // Handles Successful Login And Fetching Of The Big Query
      else {
        this.setState({
          success: true,
          handleAdminLogin: true,
          loading: false,
          alertVisible: false,
        });
      }
    })
  }

  _handleTeacherBigQuery() {
    this.props.fetchBigQuery(this.props.jwtToken).then(res => {
      // Handles Error With Big Query
      if (res !== true && !(res && !('errors' in res))) {
        this.setState({
          loading: false,
          alertVisible: true,
          alertTitle: 'Issue With Login',
          alertMessage: res.errors[0].message !== undefined && res.errors[0].message.length > 0 ? res.errors[0].message : 'We had trouble logging in and retreiving your account information. Please contact support at hello@rapunzl.org so we can help resolve the issue.',
        })
      }
      // Handles Successful Login And Fetching Of The Big Query
      else {
        this.setState({
          success: true,
          handleTeacherLogin: true,
          loading: false,
          alertVisible: false,
        });
      }
    });
  }

  _handleSubmitButton = () => {
    if (this.state.selectedLogin !== '') {
      this.setState({ loading: true });
      if (this.state.selectedLogin === 'teacher') {
        this._handleTeacherBigQuery();
      } else if (this.state.selectedLogin === 'principal' || this.state.selectedLogin === 'super') {
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
  }

  _selectLoginOption(value) {
    this.setState({ selectedLogin: value });
  }

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
          {!this.state.loading && (
            <div>
              <div className='select-account-header'>
                Please select which account<br/>you are trying to view.
              </div>
              {this.props.isTeacher && (
                <div onClick={() => this._selectLoginOption('teacher')} className={`select-account-item ${this.state.selectedLogin === 'teacher' ? 'select-account-item-selected' : ''}`}>
                  <SchoolOutlinedIcon className='select-account-icon' />
                  <div className='select-account-text'>
                    Teacher
                  </div>
                </div>
              )}
              {this.props.isPrincipal && (
                <div onClick={() => this._selectLoginOption('principal')} className={`select-account-item ${this.state.selectedLogin === 'principal' ? 'select-account-item-selected' : ''}`}>
                  <CastForEducationOutlinedIcon className='select-account-icon' />
                  <div className='select-account-text'>
                    Principal - Admin
                  </div>
                </div>
              )}
              {this.props.isSuperintendent && (
                <div onClick={() => this._selectLoginOption('super')} className={`select-account-item ${this.state.selectedLogin === 'super' ? 'select-account-item-selected' : ''}`}>
                  <DynamicFormOutlinedIcon className='select-account-icon' />
                  <div className='select-account-text'>
                    Superintendent - Admin
                  </div>
                </div>
              )}
              <div onClick={() => this._handleSubmitButton()} title="Login To Your Account" className={`select-account-login-button ${this.state.selectedLogin === '' ? 'select-account-login-disabled' : 'select-account-login-enabled'}`}>
                Login
              </div>
              <button className='select-account-logout-button' title="Logout & Return To Login Screen" onClick={() => this._handleLogout()}>
                Logout
              </button>
            </div>
          )}
          {this.state.loading && (
            <div className='select-account-loading-container'>
              <CircularProgress />
              <div className='select-account-loading-text'>
                Logging Into<br/>Rapunzl...
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
    fetchAdministratorBigQuery: (token) => dispatch(fetchAdministratorBigQuery(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectAccountView);
