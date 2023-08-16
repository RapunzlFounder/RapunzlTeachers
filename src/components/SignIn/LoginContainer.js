import React from 'react';
import { connect } from 'react-redux';
import { updateLoginState, loginUser } from '../../ActionTypes/loginActions';
import { fetchBigQuery, resetUserDetailsErrors } from '../../ActionTypes/userDataActions';
import { updateFirstVisitState } from '../../ActionTypes/firstVisitActions';
import { Navigate } from "react-router-dom";
import '../../styles/SignIn/LoginContainer.css';
import LoginGraphic from '../../assets/images/NotSignedIn/MoneyHeaderGraphic.png';
import Alert from '../Admin/Alert';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import RecoverAccountContainer from './RecoverAccountContainer';
import { CircularProgress } from '@mui/material';

class LoginContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      usernameError: null,
      passwordError: null,
      recoverAccountVisible: false,
      activeInput: 0,
      loginLoading: false,
      // Handles If Native Alert Is Visible
      alertVisible: false,
      alertTitle: 'Invalid Login',
      alertMessage: '',
      success: false,
    };
  }

  componentDidUpdate(prevProps) {
    // eslint-disable-next-line
    if ((prevProps.graphqlError == null || prevProps.error == null) && prevProps.errorTitle == null &&
      (this.props.graphqlError !== null || this.props.error !== null) && this.props.errorTitle !== null){
        if (this.props.graphqlError !== null){
          this.setState({
            alertTitle: this.props.errorTitle,
            alertMessage: this.props.graphqlError,
            alertVisible: true,
            loginLoading: false,
          });
        }
        // eslint-disable-next-line
        else if (this.props.error !== null){
          this.setState({
            alertTitle: this.props.errorTitle,
            alertMessage: this.props.error,
            alertVisible: true,
            loginLoading: false,
          });
        }
        this.props.resetUserDetailsErrors();
    }
  }

  
  changeUsernameText(username) {
    this.setState({
      username,
      usernameError: !this.validate('username', username),
    });
  }
  
  changePasswordText(password) {
    this.setState({
      password,
      passwordError: !this.validate('password', password),
    });
  }
  
  validate = (name, value) => {
    // eslint-disable-next-line
    if (name == 'username') { return value.length > 0; }
    // eslint-disable-next-line
    if (name == 'password') { return value.length > 6; }
    return null;
  }

  _handleLogin = () => {
    // set the state & nav state for login button to loading
    this.setState({ loginLoading: true, alertVisible: false });
    // create an object with the entered username and password for logging in and getting a JWT token
    const loginCredentials = {
      username: this.state.username.toLowerCase(),
      password: this.state.password,
    };
  
    // dispatch the userlogin action creator to the relevant reducer.  This returns a promise,
    // which on return with no error calls the loginCompleted function.
    // eslint-disable-next-line
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(this.state.username.toLowerCase())) {
      this.props.loginUser(loginCredentials).then(res2 => {
        if (!(res2 && !('errors' in res2))) {
          // set the loading state to false as the login attempt failed and the user needs to be able to retry the login
          this.setState({
            loginLoading: false,
            alertVisible: true,
            alertTitle: 'Invalid Login',
            alertMessage: 'We were unable to login to your account. We received the following error message from our server: ' + res2.token.errors[0].message
          });
        }
        // execute the big query with the response as the jwt token input parameter if the token is a valid token
        // eslint-disable-next-line
        else if (res2 && res2.token && res2.token.substring(0,4) == 'JWT ') {
          this.props.fetchBigQuery(res2.token).then(res => {
            console.log('here', res, res2.token);
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
                loginLoading: false,
                alertVisible: false,
              });
            }
          });
        }
        else {
          // set the loading state to false as the login attempt failed and the user needs to be able to retry the login
          this.setState({
            loginLoading: false,
            alertVisible: true,
            alertTitle: 'Invalid Login',
            alertMessage: 'We were unable to login to your account with the credentials you have provided. Please update the information and try again.'
          });
        }
      });
    } else {
      // set the loading state to false as the login attempt failed and the user needs to be able to retry the login
      this.setState({
        loginLoading: false,
        alertVisible: true,
        alertTitle: 'Invalid Username',
        alertMessage: 'Please use your username when attempting to login, instead of your email address, and try again.',
      });
    }
  }

  _toggleRecoverAccount = () => {
    this.setState({ recoverAccountVisible: !this.state.recoverAccountVisible });
  }

  dismissModal = () => {
    this.setState({ recoverAccountVisible: false });
  }

  // Toggles Visibility Of Alert Dialog
  toggleAlert = () => {
    this.setState({ alertVisible: !this.state.alertVisible });
  }

  render() {
    if (this.state.success) {
      return (
        <Navigate to="/dashboard" replace={true}/>
      )
    } else if (this.state.recoverAccountVisible) {
      return (
        <RecoverAccountContainer
          dismiss={this._toggleRecoverAccount}
        />
      );
    } else {
      // Renders Container For Login User
      return (
        <Container>
          <Alert
            title={this.state.alertTitle}
            message={this.state.alertMessage}
            visible={this.state.alertVisible}
            dismiss={this.toggleAlert}
          />
          <Box style={{ width: '90%', maxWidth: '500px', margin: 'auto' }} component="form">
            {!this.state.loginLoading && (
              <FormControl style={{ width: '100%' }} variant="standard">
                <TextField
                  id="username"
                  label="username"
                  placeholder="username"
                  type="text"
                  variant="filled"
                  fullWidth
                  error={this.state.usernameError}
                  value={this.state.username}
                  onChange={(event) => this.changeUsernameText(event.target.value)}
                  sx={{ marginBottom: '7px' }}
                />
                <TextField
                  id="password"
                  label="password"
                  placeholder="password"
                  type="password"
                  variant="filled"
                  fullWidth
                  error={this.state.passwordError}
                  value={this.state.password}
                  onChange={(event) => this.changePasswordText(event.target.value)}
                  sx={{ marginBottom: '35px' }}
                />
                  <button title="Login To Access Your Account" className='main-button login-button' onClick={(e) => {e.preventDefault();this._handleLogin();}}>
                    Login
                  </button>
                  <button title="Get Help Logging Into Your Account" className='main-button help-button' onClick={() => this._toggleRecoverAccount()}>
                    Need Help?
                  </button>
              </FormControl>
            )}
            {this.state.loginLoading && (
              <div className='login-loading-container'>
                <CircularProgress className='login-loading-icon' />
                <div className='login-loading-text'>
                  Verifying<br />Account...
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
    email: state.userDetails.email,
    username: state.userDetails.username,
    password: state.userDetails.password,
    // Handles Login Related Errors
    graphqlError: state.userDetails.graphqlError,
    error: state.userDetails.error,
    errorTitle: state.userDetails.errorTitle,
    userId: state.userDetails.id,
  };
};

// Map Dispatch To Props (Dispatch Actions to Reducers. Reducers then modify the redux store state.
const mapDispatchToProps = (dispatch) => {
  return {
    // Login user and creates user store
    loginUser: (userLogin) => dispatch(loginUser(userLogin)),
    updatedLoginState: (name, status) => dispatch(updateLoginState(name, status)),
    // updates firstvisit in store from default of true, to false. This should be used upon successful login, to change WelcomeScreen
    resetFirstTime: (type, value) => dispatch(updateFirstVisitState(type, value)),
    // Get all of the user data
    fetchBigQuery: (token) => dispatch(fetchBigQuery(token)),
    // reset any graphql error messages so the error popup only displays once
    resetUserDetailsErrors: () => dispatch(resetUserDetailsErrors()), 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
