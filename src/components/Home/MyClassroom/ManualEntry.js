import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isUsernameUnique, isEmailUnique } from '../../../ActionTypes/loginActions';
import { addStudentsToClassroom } from '../../../ActionTypes/classroomActions';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import '../../../styles/Home/HomeScreen.css';
import GroupAdd from '@mui/icons-material/GroupAdd';
import Alert from '../../Admin/Alert';

class ManualEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      manualAdd: false,
      // Text Fields For Create Account
      date: '',
      firstName: '',
      lastName: '',
      email: '',
      birthdate: '',
      // Handles Errors Related To Inputs
      onErrorFirstName: false,
      onErrorLastName: false,
      onErrorEmail: false,
      onErrorBirthday: false,
      // Handles Alert Dialog
      alertVisible: false,
      alertTitle: '',
      alertMessage: '',
      // Handles Loading Of validateInputs
      loading: false,
    }
  }

  // Validates User Inputs In Manual Entry Form. If Error, Shows Alert. If Successful, Adds Student And Hides Manual Entry
  validateInputs() {
    this.setState({ loading: true });
    // -------------- FIRST & LAST NAME VALIDATION --------------
      // Handles Checking Length Of Both First & Last Name
      var letters = /^[a-zA-Z '-]+$/;
      // eslint-disable-next-line
      if (this.state.firstName.length == 0 && this.state.lastName.length == 0) {
        this.setState({
          alertVisible: true,
          alertTitle: 'Error With Name',
          alertMessage: 'Please fill in a first and last name for the student you are trying to add.',
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
                loading: false,
              });
            }
    // -------------- BIRTHDAY VALIDATION --------------
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
      var inputDay = this.state.birthdate.slice(8, 10);
      // eslint-disable-next-line
      if (inputMonth == '' && inputYear == '' && inputDay == '') {
        this.setState({ monthError: true, dayError: true, yearError: true });
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
        }
      }
      // -------------- VALIDATION SUCCESS OKAY TO ADD TO ARRAY --------------
      else {
        // Initialize Empty Array To Update userArray state
        let newArray = [];
        // Creates Object To Add To userArray With New Student Inputs
        const newStudent = {
          firstName: this.state.firstName.charAt(0).toUpperCase() + this.state.firstName.slice(1),
          lastName: this.state.lastName.charAt(0).toUpperCase() + this.state.lastName.slice(1),
          email: this.state.email,
          birthdate: this.state.birthdate,
        };
        // Adds New Student To newArray
        newArray.push(newStudent);
        this.setState({ loading: false });
        // Hides Manual Entry On Submit To Show Loading & Success State in Add Students Since Create Classroom Click Is Pass Through Function
        this.props.toggleManualEntry();
        this.props.handleCreateClassroomClick(newArray);
      }
    }
  })}}}}
    
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
      lastName: text.replace(/[^A-Za-z]+-+'/g, ''),
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
  
  // Handles Toggling The Visibility Of Alert Dialog When There Is An Error With User Inputs
  toggleAlert = () => {
    this.setState({ alertVisible: !this.state.alertVisible });
  }

  render() {
    return (
      <div className='tile' style={{ paddingBottom: 55, paddingTop: 25, paddingLeft: 10, paddingRight: 10 }}>
        <Alert
          visible={this.state.alertVisible}
          dismiss={this.toggleAlert}
          title={this.state.alertTitle}
          message={this.state.alertMessage}
        />
        <div className='classroom-header-flex' style={{ paddingLeft: 22 }}>
          <GroupAdd />
          <div className='classroom-title' style={{ paddingLeft: 10 }}>
            Add Students To Class
          </div>
        </div>
        <div className='classroom-upload-instructions'>
          Input information of your students below and click add another student to keep adding students. Once you are ready, click Create Student Accounts and we'll share an email to each of your students with sign-up instructions.
        </div>
        <div className='classroom-upload-flex'>
          <div onClick={() => this.props.toggleManualEntry()} className='manual-back'>
            Go Back
          </div>
        </div>
        <div className='manual-container'>
          <div className='manual-input-container'>
            <TextField
              id="firstName"
              label="First Name"
              placeholder="First Name"
              type="text"
              variant="filled"
              error={this.state.onErrorFirstName}
              value={this.state.firstName}
              onChange={(event) => this.changeFirstName(event.target.value)}
              sx={{ marginBottom: '7px', width: '49%', marginRight: '1%', backgroundColor: '#2e7361', color: 'white', borderRadius: '7px' }}
            />
            <TextField
              id="lastName"
              label="Last Name"
              placeholder="Last Name"
              type="text"
              variant="filled"
              error={this.state.onErrorLastName}
              value={this.state.lastName}
              onChange={(event) => this.changeLastName(event.target.value)}
              sx={{ marginBottom: '7px', width: '49%', marginLeft: '1%', backgroundColor: '#2e7361', color: 'white', borderRadius: '7px' }}
            />
            <TextField
              id="email"
              label="Email"
              placeholder="Email"
              type="text"
              fullWidth
              variant="filled"
              error={this.state.onErrorEmail}
              value={this.state.email}
              onChange={(event) => this.changeEmail(event.target.value)}
              sx={{ marginBottom: '7px', width: '49%', marginRight: '1%', backgroundColor: '#2e7361', color: 'white', borderRadius: '7px' }}
            />
            <TextField
              id="birthday"
              label="Birthday"
              placeholder="Birthday"
              InputLabelProps={{ shrink: true }}
              type="date"
              fullWidth
              variant="filled"
              error={this.state.onErrorBirthday}
              value={this.state.birthdate}
              onChange={(event) => this.changeBirthdate(event.target.value)}
              sx={{ marginBottom: '7px', width: '49%', marginLeft: '1%', backgroundColor: '#2e7361', color: 'white', borderRadius: '7px' }}
            />
          </div>
          {!this.state.loading && (
            <div className='manual-button-flex'>
              <div title="Confirms Student Info & Adds To Your Clasroom" onClick={() => this.validateInputs()} className='manual-add-another'>
                Add Student
              </div>
            </div>
          )}
          <div className='manual-students-container'>
            {this.state.loading && (
              <div className='manual-entry-loading-container'>
                <CircularProgress className='login-loading'/>
                <div className='login-loading-text' style={{ fontSize: 13, paddingTop: 7, textAlign: 'center' }}>
                  Creating Student<br/>Account...
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    // Handles Colors Which Are Updated Throughout When MarketOpen Changes
    colors: state.userDetails.appColors,
    // Token used For Creating Classroom & Adding Students to Classroom
    jwtToken: state.userDetails.jwtToken,
  };
};

// Map Dispatch To Props (Dispatch Actions to Reducers. Reducers then modify the redux store state.
const mapDispatchToProps = (dispatch) => {
  // Action
    return {
      // checks if username which user is requesting is unique  
      isUsernameUnique: (username) => dispatch(isUsernameUnique(username)),
      // checks to see if email and username is unique before allowing user to proceed
      isEmailUnique: (email) => dispatch(isEmailUnique(email)),
      // Adds Students To An Existing Classroom
      // NOTE:  make sure that the input parameter 'studentsList' is an array of one or more of the following object
      // Make sure that double quotes are used for the string and date format input fileds in each object
      // { email: "welshman@me.edu", firstname: "Chris", lastName: "Thomas", birthDate: "2008-06-06" }
      addStudentsToClassroom: (token, classroomId, studentsList) => dispatch(addStudentsToClassroom(token, classroomId, studentsList)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManualEntry);
