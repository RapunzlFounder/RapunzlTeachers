import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { resetNotificationErrors } from '../../ActionTypes/notificationActions';
import { createUser, loginUser, isUsernameUnique, isEmailUnique } from '../../ActionTypes/loginActions';
import { fetchBigQuery, resetUserDetailsErrors } from '../../ActionTypes/userDataActions';
import axios from 'axios';
import Device from 'react-device'
import '../../styles/SignIn/CreateAccountContainer.css';
import Blocked from '../../constants/Blocked';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Alert from '../Admin/Alert';
import CircularProgress from '@mui/material/CircularProgress';

class CreateAccountContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // Handles If Create Account Is Loading
      loading: false,
      date: '',
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      birthdate: '',
      teacherCode: '',
      platform: '',
      deviceName: '',
      // Handles Ability To View Password & Confirm Password
      showPassword: false,
      // Handles Errors Related To Inputs
      onErrorFirstName: false,
      onErrorLastName: false,
      onErrorUsername: false,
      onErrorEmail: false,
      onErrorPassword: false,
      onErrorBirthday: false,
      onErrorCode: false,
      modalVisible: false,
      // Handles Information Related To Alerts
      alertTitle: '',
      alertMessage: '',
      alertVisible: false,
    };
  }

  // Updates Value of First Name From Text Area to State
  changeFirstName(text) {
    this.setState({
      firstName: text.replace(/\s/g, '').replace(/[^A-Za-z]+-+'/g, ''),
      onErrorFirstName: false,
    });
  }

  // Updates Value of Last Name From Text Area to State
  changeLastName(text) {
    this.setState({
      lastName: text.replace(/\s/g, '').replace(/[^A-Za-z]+-+'/g, ''),
      onErrorLastName: false,
    });
  }

  // Updates Value of Email From Text Area to State
  changeEmail(text) {
    this.setState({
      email: text.replace(/\s/g, ''),
      onErrorEmail: false,
    });
  }

  // Updates Value of Birthday From Text Area to State Using Date Selector
  changeBirthdate(text) {
    this.setState({
      birthdate: text,
      onErrorBirthday: false,
    });
  }

  // Updates Value of Password From Text Area to State - Hidden From User
  changePassword(text) {
    this.setState({
      password: text,
      onErrorPassword: false,
    });
  }

  // Updates Value of Confirm Password From Text Area to State - Hidden From User
  changeConfirm(text) {
    this.setState({
      confirmPassword: text,
      onErrorPassword: false,
    });
  }

  // Updates Value of Username From Text Area to State
  changeUsername(text) {
    this.setState({
      username: text.replace(/\s/g, ''),
      onErrorUsername: false,
    });
  }

  changeTeacherCode(text) {
    // Removes Non-Numeric Input Values To Teacher Code Because It Must Be An Int
    this.setState({
      teacherCode: text.replace(/\D/g,''),
    });
  }

  validateInputs() {
  // -------------- USERNAME VALIDATION --------------
  // Checks If Username Is Too Long
  if (this.state.username.length >= 15) {
    this.setState({
      alertVisible: true,
      alertTitle: 'Error With Username',
      alertMessage: 'Username cannot be longer than 15 characters.',
      onErrorUsername: true,
      loading: false,
    });
  }
  //Check If Username Is Not Too Short
  else if (this.state.username.length < 5) {
    this.setState({
      alertVisible: true, 
      alertTitle: 'Error With Username',
      alertMessage: 'Username must be at least 5 characters.',
      onErrorUsername: true,
      loading: false,
    });
  }
  // Checks if username has characters which are not allowed
  else {
    // eslint-disable-next-line
    var format = /[!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (format.test(this.state.username)) {
      this.setState({
        alertVisible: true,
        alertTitle: 'Error With Username',
        alertMessage: 'Username cannot contain special characters except for dashes and underscores.',
        onErrorUsername: true,
        loading: false,
      });
    }
    // Checks username for profanity or other prohibited terms 
    else {
      Blocked.forEach((item) => {
        if (this.state.username.includes(item)) {
          this.setState({
            alertVisible: true,
            alertTitle: 'Error With Username',
            alertMessage: 'This username may violate our terms of service.', 
            loading: false,
            onErrorUsername: true,
          });
          return;
        }
      });
      // Checks If Username Is Unique
      this.props.isUsernameUnique(this.state.username).then((res) => {
        if (!res) {
          this.setState({
            alertVisible: true, 
            alertTitle: 'Error With Username',
            alertMessage: 'There is already an account with this username.',
            loading: false,
            onErrorUsername: true,
          });
        }
  // -------------- FIRST & LAST NAME VALIDATION --------------
  else {
    // Handles Checking Length Of Both First & Last Name
    var letters = /^[a-zA-Z '-]+$/;
    // eslint-disable-next-line
    if (this.state.firstName.length == 0 && this.state.lastName.length == 0) {
      this.setState({
        alertVisible: true,
        alertTitle: 'Error With Name',
        alertMessage: 'Your first and last name each probably have at least 1 letter... Just type them above!',
        onErrorFirstName: true,
        onErrorLastName: true,
        loading: false,
      });
    }
    // Handles Error With Length of First Name
    // eslint-disable-next-line
    else if (this.state.firstName.length == 0 && this.state.lastName.length >= 1) {
      this.setState({
        alertVisible: true,
        alertTitle: 'Error With Name',
        alertMessage: 'Your first name probably has at least 1 letter... Just type them above!',
        onErrorFirstName: true,
        loading: false,
      });
    } 
    // Handles Error With Length of Last Name
    else if (this.state.firstName.length >= 1 && this.state.lastName.length < 1) {
      this.setState({
        alertVisible: true,
        alertTitle: 'Error With Name',
        alertMessage: 'Your last name probably has at least 1 letter... Just type them above!',
        onErrorLastName: true,
        loading: false,
      });
    }
    // Handles If First Name Has Any Invalid Characters
    else if (!letters.test(this.state.firstName)) {
      this.setState({
        alertVisible: true,
        alertTitle: 'Invalid Character Name',
        alertMessage: 'You may only use letters, dashes and single apostrophes in a name at this time.',
        onErrorFirstName: true,
        loading: false,
      });
    }
    // Handles If Last Name Has Any Invalid Characters
    else if (!letters.test(this.state.lastName)) {
      this.setState({
        alertVisible: true,
        alertTitle: 'Invalid Character Name',
        alertMessage: 'You may only use letters, dashes and single apostrophes in a name at this time.',
        onErrorLastName: true,
        loading: false,
      });
    }
  // ------------------ EMAIL VALIDATION -------------------
  else {
    // Checks If Email Is Too Short
    if (this.state.email.length < 3){
      this.setState({
        alertVisible: true,
        alertTitle: 'Email Invalid',
        alertMessage: 'Please input a valid email address',
        loading: false,
      });
    }
    // Checks That Email Is Of A Valid Format
    else {
      // eslint-disable-next-line
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(this.state.email)) {
        this.setState({
          alertVisible: true,
          alertTitle: 'Email Invalid',
          alertMessage: 'You probably made a typo while inputting your email address. Give it another try!',
          loading: false,
        });
      }
      // Checks If Email Is Unique So That User Can Still Create Account
      else {
        this.props.isEmailUnique(this.state.email.toLowerCase()).then((res) => {
          if (!res) {
            this.setState({
              alertVisible: true,
              alertTitle: 'Email Invalid',
              alertMessage: 'This email is already associated with a Rapunzl Account. You should try logging in with that email address and we can help you recover your password if needed.',
              loading: false
            });
          }
  // -------------- PASSWORD VALIDATION --------------
    else {
      // Check For Valid Password
      const uppercase = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
      const uppercaseTest = uppercase.some(el => this.state.password.includes(el));
      const numbers = ['1','2','3','4','5','6','7','8','9','0'];
      const numbersTest = numbers.some(el => this.state.password.includes(el));
      if (!uppercaseTest) {
        this.setState({
          alertVisible: true,
          alertTitle: 'Error With Your Password',
          alertMessage: 'Password must contain at least one uppercase letter',
          onErrorPassword: true,
          loading: false,
        });
      }
      else if (!numbersTest) {
        this.setState({
          alertVisible: true,
          alertTitle: 'Error With Your Password',
          alertMessage: 'Password must contain at least one number',
          onErrorPassword: true,
          loading: false,
        });
      }
      else if (this.state.password.length < 8) {
        this.setState({
          alertVisible: true,
          alertTitle: 'Error With Your Password',
          alertMessage: 'Password must be at 8 least characters',
          onErrorPassword: true,
          confirmError: true,
          loading: false,
        });
      }
      // eslint-disable-next-line
      else if (this.state.password !== this.state.confirmPassword) {
        this.setState({
          alertVisible: true,
          alertTitle: 'Error With Your Password',
          alertMessage: 'Passwords do not match',
          onErrorPassword: true,
          loading: false,
        });
      }
      else if (this.state.teacherCode.length === 0) {
        this.setState({
          alertVisible: true,
          alertTitle: 'Missing Invitation Code',
          alertMessage: 'You must include an invitation code to create an account with Rapunzl Teachers. Please contact us at teachers@rapunzl.com to receive an invitation code.',
          onErrorCode: true,
          loading: false,
        });
      }
  // -------------- BIRTHDAY VALIDATION  --------------
      else {
        var today = new Date();
        // Age Limit Of 13
        var YYYY = parseInt(today.getFullYear()) - 13;
        //Handles 0 indexed month
        var MM = parseInt(today.getMonth()) + 1;
        var DD = today.getDate();
        // Handles getting user inputs
        var inputYear = this.state.birthdate.slice(0, 4);
        var inputMonth = this.state.birthdate.slice(5, 7);
        var inputDay = this.state.birthdate.slice(9, 11);
        // eslint-disable-next-line
        if ((inputMonth == '' && inputYear == '' && inputDay == '') || this.state.birthdate.length === 0) {
          this.setState({
            onErrorBirthday: true,
            alertVisible: true,
            alertTitle: 'Invalid Birthday',
            alertMessage: 'It appears like you have left the birthday field blank. Please input your birthday so that we are able to create your free account.',
            loading: false,
          });
          return;
        }
        // Checks Birth Year
        if (inputYear < 1900) {
          this.setState({
            onErrorBirthday: true,
            alertVisible: true,
            alertTitle: 'Invalid Year',
            alertMessage: 'The oldest person alive, on record, was born in 1903. Please choose a year after that for your birthday in order to proceed or contact support.',
            loading: false,
          });
          return;
        }
        // Handles User Input A Valid Date
        if (inputMonth > 12 || inputMonth <= 0) {
          this.setState({
            onErrorBirthday: true,
            alertVisible: true,
            alertTitle: 'Invalid Month',
            alertMessage: 'The date you are trying to enter is invalid. There are only 12 months in the year. Please check your birthday for typos & try again.',
            loading: false,
          });
          return;
        }
        // Handles Invalid Date
        if (inputDay > 31 || inputDay <= 0) {
          this.setState({
            onErrorBirthday: true,
            alertVisible: true,
            alertTitle: 'Invalid Day',
            alertMessage: 'The date you are trying to enter is invalid. The day you input is either greater than 31 or less than 1. Please update your birthday & try again.',
            loading: false,
          });
          return;
        }
        // Handles Invalid Date
        // eslint-disable-next-line
        if ((inputMonth == 1 && inputDay > 31) || (inputMonth == 2 && inputDay > 29) ||
          // eslint-disable-next-line
          (inputMonth == 3 && inputDay >= 31) || (inputMonth == 4 && inputDay > 30) ||
          // eslint-disable-next-line
          (inputMonth == 5 && inputDay > 31) || (inputMonth == 6 && inputDay > 30) ||
          // eslint-disable-next-line
          (inputMonth == 7 && inputDay > 31) || (inputMonth == 8 && inputDay > 31) ||
          // eslint-disable-next-line
          (inputMonth == 9 && inputDay > 30) || (inputMonth == 10 && inputDay > 31) ||
          // eslint-disable-next-line
          (inputMonth == 11 && inputDay > 30) || (inputMonth == 12 && inputDay > 31)) {
            this.setState({
              onErrorBirthday: true,
              alertVisible: true,
              alertTitle: 'Invalid Date',
              alertMessage: 'The date you are trying to enter is invalid. The day you entered does not exist. Please update your birthday & try again.',
              loading: false,
            });
            return;
        }
        // Returns False If Not Possible
        if (inputYear > YYYY) {
          this.setState({
            onErrorBirthday: true,
            alertVisible: true,
            alertTitle: 'Invalid Date',
            alertMessage: 'The date you are trying to enter is invalid. You need to be 13 years or older to use this application.',
            loading: false,
          });
          return;
        }
        // Checks Year To Determine If Month & Day Check Are Needed
        // eslint-disable-next-line
        else if (inputYear == YYYY && (inputMonth > MM || (inputMonth == MM && inputDay > DD))) {
          if (inputMonth > MM) {
            this.setState({
              onErrorBirthday: true,
              alertVisible: true,
              alertTitle: 'Invalid Date',
              alertMessage: 'The date you are trying to enter is invalid. You need to be 13 years or older to use this application.',
              loading: false,
            });
          }
          // eslint-disable-next-line
          else if (inputMonth == MM) {
            if (inputDay > DD) {
              this.setState({
                onErrorBirthday: true,
                alertVisible: true,
                alertTitle: 'Invalid Date',
                alertMessage: 'The date you are trying to enter is invalid. You need to be 13 years or older to use this application.',
                loading: false,
              });
            }
          } else {
            this.createAccount();
          }
        }
      }}})}}}}})}
    }
  }

  // Validates Inputs & If There Are No Errors, Calls Create Account Below
  async _handleButtonPress(e) {
    this.setState({ loading: true });
    e.preventDefault();
    this.validateInputs();
  }

  // creating function to load ip address from the API
  async getData() {
    // Fetches IP Address Information
    const res = await axios.get('https://geolocation-db.com/json/')
    // For Testing Purposes:
    // console.log(res.data);
    // Checks For Valid IP Address And Returns The IP If It Is Incorrect
    if (!!res.data.IPv4) {
      return res.data.IPv4;
    }
    // If There Is No Valid IP Address Return Empty String
    else {
      return '';
    }
  }

  createAccount() {
    // User Details
    const userDetails = {
      username: this.state.username.toLowerCase(),
      email: this.state.email.toLowerCase(),
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      password: this.state.password,
      birthDate:  this.state.birthdate
    };
    // userDetails { username: "asd", lastName: "afaf", email: "abc@ert.com", password: "asfaf2525", birthDate: "YYYY-MM-DD"}
    // invitationCode is an integer
    this.props.createUser(userDetails, this.state.teacherCode).then((res) => {
      // if the new user account is created then log the user in to get the jwt token
      // eslint-disable-next-line
      if (res == true){
        const loginCredentials = {
          username: this.state.username.toLowerCase(),
          password: this.state.password,
        };
        this.props.loginUser(loginCredentials).then(jwttoken => {
          if (!(jwttoken && !('errors' in jwttoken))) {
            // set the loading state to false as the login attempt failed and the user needs to be able to retry the login
            this.setState({
              loading: false,
              alertVisible: true,
              alertTitle: 'Invalid Login',
              alertMessage: 'We created your account but were unable to login to that account. We received the following error message from our server: ' + jwttoken.errors[0].message + '  Please try logging in with the account details you used to create this account and contact support if the problem continues.'
            });
          }
          // eslint-disable-next-line
          else if (jwttoken && jwttoken.token && jwttoken.token.slice(0,4) == 'JWT ') {
            this.props.fetchBigQuery(jwttoken.token).then((res) => {
               // Handles If The Big Query Is Successfully Fetched
              if (res === true) {
                this.setState({ success: true, loading: false });
              }
              // Handles If There Is An Error Retrieving The Big Query
              else if (!(res && !('errors' in res))) {
                this.setState({
                  loginLoading: false,
                  alertVisible: true,
                  alertTitle: 'Issue With Login',
                  alertMessage: res.errors[0].message !== undefined && res.errors[0].message.length > 0 ? res.errors[0].message : 'We were unable to retrieve your account information. The login information you provided was correct, however, something went wrong with our servers. Please contact support to resolve the issue.',
                })
              }          
            });
          } else {
            this.setState({
              loading: false,
              alertVisible: true,
              alertTitle: 'Invalid Login',
              alertMessage: 'We created your account but were unable to login to that account. Please try logging in with the account details you used to create this account and contact support if the problem continues.'
            });
          }
        });
      }
      else {
        if (!(res && !('errors' in res))) {
          this.setState({
            alertVisible: true,
            alertTitle: 'Something Went Wrong...',
            alertMessage: res.errors[0].message,
            loading: false,
          });
        }
        else {
          this.setState({
            alertVisible: true,
            alertMessage: 'Please try creating account in a few minutes when there is less server traffic, and thank you for your patience!',
            alertTitle: 'Something Strange Happened...',
            loading: false,
          });
        }
      } 
    });
  }
  
  // Hanldes Fetching Device Info To Update State For Create Account Mutation
  deviceOnChange = (deviceInfo) => {
    this.setState({
      deviceName: deviceInfo.browser.name + '-' + deviceInfo.browser.version,
      platform: 'web-' + deviceInfo.screen.width + 'x' + deviceInfo.screen.height,
    })
  }

  // Toggles Alert To Display To User If There Are Incorrect Inputs
  toggleAlert = () => {
    this.setState({ alertVisible: !this.state.alertVisible });
  }

  render() {
    if (this.state.success) {
      return (
        <Navigate to="/dashboard" replace={true}/>
      )
    }
    else {
      return (
        <Container>
          <Device onChange={this.deviceOnChange} />
          <Alert
            title={this.state.alertTitle}
            message={this.state.alertMessage}
            visible={this.state.alertVisible}
            dismiss={this.toggleAlert}
          />
          
          <Box style={{ width: '90%', maxWidth: '500px', margin: 'auto' }} component="form">
            {!this.state.loading && (
              <FormControl style={{ width: '100%' }} variant="standard">
                <TextField
                  id="firstName"
                  label="First Name"
                  placeholder="First Name"
                  type="text"
                  variant="filled"
                  autoComplete="new-password"
                  error={this.state.onErrorFirstName}
                  value={this.state.firstName}
                  onChange={(event) => this.changeFirstName(event.target.value)}
                  sx={{ marginBottom: '7px' }}
                />
                <TextField
                  id="lastName"
                  label="Last Name"
                  placeholder="Last Name"
                  type="text"
                  variant="filled"
                  autoComplete="new-password"
                  error={this.state.onErrorLastName}
                  value={this.state.lastName}
                  onChange={(event) => this.changeLastName(event.target.value)}
                  sx={{ marginBottom: '7px' }}
                />
                <TextField
                  label="Username"
                  placeholder="Username"
                  type="text"
                  fullWidth
                  variant="filled"
                  autoComplete="new-password"
                  error={this.state.onErrorUsername}
                  value={this.state.username}
                  onChange={(event) => this.changeUsername(event.target.value)}
                  sx={{ marginBottom: '7px' }}
                />
                <TextField
                  id="email"
                  label="Email"
                  placeholder="Email"
                  type="text"
                  variant="filled"
                  autoComplete="new-password"
                  error={this.state.onErrorEmail}
                  value={this.state.email}
                  onChange={(event) => this.changeEmail(event.target.value)}
                  sx={{ marginBottom: '7px' }}
                />
                <TextField
                  id="birthday"
                  label="Birthday"
                  placeholder="Birthday"
                  InputLabelProps={{ shrink: true }}
                  type="date"
                  variant="filled"
                  autoComplete="new-password"
                  error={this.state.onErrorBirthday}
                  value={this.state.birthdate}
                  onChange={(event) => this.changeBirthdate(event.target.value)}
                  sx={{ marginBottom: '7px' }}
                />
                <div style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TextField
                    label="Password"
                    placeholder="Password"
                    type="password"
                    variant="filled"
                    autoComplete="new-password"
                    style={{ width: '49%', marginRight: '2% '}}
                    error={this.state.onErrorPassword}
                    value={this.state.password}
                    onChange={(event) => this.changePassword(event.target.value)}
                    sx={{ marginBottom: '7px' }}
                  />
                  <TextField
                    id="confirm"
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    type="password"
                    variant="filled"
                    autoComplete="new-password"
                    style={{ width: '49%' }}
                    error={this.state.onErrorPassword}
                    value={this.state.confirmPassword}
                    onChange={(event) => this.changeConfirm(event.target.value)}
                    sx={{ marginBottom: '7px' }}
                  />
                </div>
                <TextField
                  id="teacherCode"
                  label="Teacher Code"
                  placeholder="Teacher Code"
                  type="text"
                  variant="filled"
                  autoComplete="new-password"
                  value={this.state.teacherCode}
                  error={this.state.onErrorCode}
                  onChange={(event) => this.changeTeacherCode(event.target.value)}
                  sx={{ marginBottom: '7px' }}
                />
                <button title="Sends Information To Rapunzl To Create Account" className='main-button login-button' style={{ marginTop: '35px' }} onClick={(e) => this._handleButtonPress(e)}>
                  Create Account
                </button>
              </FormControl>
            )}
            {this.state.loading && (
              <div className='login-loading-container'>
                <CircularProgress className='login-loading'/>
                <div className='login-loading-text'>
                  Creating Your<br />Account...
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
  // Redux Store --> Component
  return {
    userID: state.userDetails.id,
    loggedIn: state.userDetails.loggedIn,
    jwtToken: state.userDetails.jwtToken,
    alertMessage: state.userDetails.alertMessage,
    alertTitle: state.userDetails.alertTitle,
    graphqlError: state.userDetails.graphqlError,
    error: state.userDetails.error,
    notificationGraphqlError: state.notification.graphqlError,
    notificationError: state.notification.error,
    notificationErrorTitle: state.notification.errorTitle,
  };
};

// Map Dispatch To Props (Dispatch Actions to Reducers. Reducers then modify the redux store state.
const mapDispatchToProps = (dispatch) => {
  // Action
    return {
      // reset any graphql error messages so the error popup only displays once
      resetUserDetailsErrors: () => dispatch(resetUserDetailsErrors()),
      // reset any graphql error etc. received from trying to save the user's notification token
      resetNotificationErrors: () => dispatch(resetNotificationErrors()),
      // checks if username which user is requesting is unique  
      isUsernameUnique: (username) => dispatch(isUsernameUnique(username)),
      // checks to see if email and username is unique before allowing user to proceed
      isEmailUnique: (email) => dispatch(isEmailUnique(email)),
      // Login user and creates user store
      loginUser: (userLogin) => dispatch(loginUser(userLogin)),
      // Get all of the user data
      fetchBigQuery: (token) => dispatch(fetchBigQuery(token)),
      // Dispatch Which Handles Creating New User
      createUser: (userDetail, invitationCode) => dispatch(createUser(userDetail, invitationCode)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccountContainer);
