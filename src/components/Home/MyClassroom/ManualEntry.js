import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isUsernameUnique, isEmailUnique } from '../../../ActionTypes/loginActions';
import { addStudentsToClassroom } from '../../../ActionTypes/classroomActions';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import '../../../styles/Home/HomeScreen.css';
import HighlightOff from '@mui/icons-material/HighlightOff';
import GroupAdd from '@mui/icons-material/GroupAdd';
import Alert from '../../Admin/Alert';
import EmptyIcon from '../../../assets/images/ChecklistTips/AddStudents_Color.png';

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
      username: '',
      birthdate: '',
      // Handles Errors Related To Inputs
      onErrorFirstName: false,
      onErrorLastName: false,
      onErrorUsername: false,
      onErrorEmail: false,
      onErrorBirthday: false,
      // Handles Alert Dialog
      alertVisible: false,
      alertTitle: '',
      alertMessage: '',
      // Handles Users To Add That Current User Inputs
      userArray: [],
      // Handles Loading Of validateInputs
      loading: false,
      creatingClassroom: false,
    }
  }

  // Validates User Inputs In Manual Entry Form. If Error, Shows Alert. If Successful, Adds Object With Information To userArray
  validateInputs() {
    this.setState({ loading: true });
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
        // Checks If Username Is Unique
        this.props.isUsernameUnique(this.state.username).then((res) => {
          if (!res) {
            this.setState({
              alertVisible: true, 
              alertTitle: 'Error With Username',
              alertMessage: 'There is already an account with this username.',
              onErrorUsername: true,
              loading: false,
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
      var inputDay = this.state.birthdate.slice(9, 11);
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
        let newArray = this.state.userArray;
        // Creates Object To Add To userArray With New Student Inputs
        const newStudent = {
          firstName: this.state.firstName.charAt(0).toUpperCase() + this.state.firstName.slice(1),
          lastName: this.state.lastName.charAt(0).toUpperCase() + this.state.lastName.slice(1),
          email: this.state.email,
          birthdate: this.state.birthdate,
          username: this.state.username.toLowerCase(),
          id: this.state.userArray.length,
        };
        // Adds New Student To newArray
        newArray.push(newStudent);
        this.setState({
          userArray: newArray,
          firstName: '',
          lastName: '',
          email: '',
          birthdate: '',
          username: '',
          loading: false,
        });
      }}})}}}}})}
    }
  }

  // Removes Student From Array Of Students To Add In userArray
  removeStudent(id) {
    this.setState({ loading: true });
    const newArray = this.state.userArray.filter(function(value) {
      return value.id !== id;
    });
    this.setState({ loading: false, userArray: newArray });
  }

  // Updates Value of Username From Text Area to State
  changeUsername(text) {
    this.setState({
      username: text.replace(/\s/g, ''),
      onErrorUsername: false,
    });
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
          Input information of your students below and click add another student to keep adding students. Once you are ready, click Create Student Accounts and we'll share an email to each of your students with sign-up instructions. If you cannot think of a username for a student, try various combination of their first name, last name, and school year.
        </div>
        <div className='classroom-upload-flex'>
          <div onClick={() => this.props.toggleManualEntry()} className='manual-back'>
            Go Back
          </div>
        </div>
        {!this.state.creatingClassroom && (
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
              <TextField
                label="Username"
                placeholder="Username"
                type="text"
                fullWidth
                variant="filled"
                error={this.state.onErrorUsername}
                value={this.state.username}
                onChange={(event) => this.changeUsername(event.target.value)}
                sx={{ marginBottom: '7px', width: '49%', backgroundColor: '#2e7361', color: 'white', borderRadius: '7px' }}
              />
            </div>
            <div className='manual-button-flex'>
              <div onClick={() => this.validateInputs()} className='manual-add-another'>
                Add {this.state.userArray.length === 0 ? '' : 'Another'} Student
              </div>
              {this.state.userArray.length !== 0 && (
                <div onClick={() => this.props.handleCreateClassroomClick(this.state.userArray)} className='manual-submit'>
                  Add All To Classroom
                </div>
              )}
            </div>
            <div className='manual-students-container'>
              {this.state.userArray.length !== 0 && (
                <div className='manual-students-flex'>
                  <div className='manual-student-line' />
                  <div className='manual-student-title'>
                    {this.state.userArray.length} Student{this.state.userArray.length === 1 ? '' : 's'} To Add
                  </div>
                  <div className='manual-student-line' />
                </div>
              )}
              <div className='manual-student-columns'>
                <div className='manual-student-header' style={{ width: '140px' }}>
                  Name
                </div>
                <div className='manual-student-header' style={{ width: '175px' }}>
                  Email
                </div>
                <div className='manual-student-header' style={{ width: '130px' }}>
                  Birthday
                </div>
                <div className='manual-student-header'>
                  Username
                </div>
              </div>
              {this.state.userArray.length !==0 && (
                <div className='manual-student-item-container'>
                  {this.state.userArray.map((item) => {
                    return (
                      <div key={item.id} className='manual-student-item'>
                        <div className='manual-student-text' style={{ width: '140px' }}>
                          {item.firstName} {item.lastName}
                        </div>
                        <div className='manual-student-text' style={{ width: '175px' }}>
                          {item.email.length > 17 ? item.email.slice(0,16) + '...' : item.email}
                        </div>
                        <div className='manual-student-text' style={{ width: '130px' }}>
                          {item.birthdate}
                        </div>
                        <div className='manual-student-text manual-student-flex'>
                          <div>
                            @{item.username}
                          </div>
                          <HighlightOff onClick={() => this.removeStudent(item.id)} className='manual-student-delete'/>
                        </div>
                      </div>
                  )})}
                </div>
              )}
              {this.state.userArray.length === 0 && !this.state.loading && (
                <div className='manual-student-empty-container'>
                  <img alt='' className='manual-student-empty-image' src={EmptyIcon} />
                  <div className='manual-student-empty-title'>
                    No Students To Add
                  </div>
                  <div className='manual-student-empty-text'>
                    Create student accounts using the form above and get started adding students to your classroom!
                  </div>
                </div>
              )}
              {this.state.loading && (
                <div className='manual-entry-loading-container'>
                  <CircularProgress className='login-loading'/>
                  <div className='login-loading-text' style={{ fontSize: 13, paddingTop: 7, textAlign: 'center' }}>
                    Validating<br/>Inputs
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {this.state.creatingClassroom && (
          <div className='manual-entry-loading-container' style={{ paddingBottom: '150px' }}>
            <CircularProgress className='login-loading'/>
            {!!this.props.newClassName ? (
              <div className='login-loading-text' style={{ fontSize: 13, paddingTop: 7, textAlign: 'center' }}>
                Creating<br/>Classroom...
              </div>
            )  :  (
              <div className='login-loading-text' style={{ fontSize: 13, paddingTop: 7, textAlign: 'center' }}>
                Adding<br/>Students...
              </div>
            )}
          </div>
        )}
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
      // TODO: Handle Adding Students To A Classroom Which The Teacher Has Created
      addStudentsToClassroom: (token, classroomId, studentsList) => dispatch(addStudentsToClassroom(token, classroomId, studentsList)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManualEntry);
