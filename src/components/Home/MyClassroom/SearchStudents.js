import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getClassmates } from '../../../ActionTypes/educationActions';
import { SearchUsers } from '../../../ActionTypes/searchActions';
import { addStudentsToClassroom } from '../../../ActionTypes/classroomActions';
import CircularProgress from '@mui/material/CircularProgress';
import '../../../styles/Home/HomeScreen.css';
import GroupAdd from '@mui/icons-material/GroupAdd';
import SearchIcon from '@mui/icons-material/Search';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import Alert from '../../Admin/Alert';

class SearchStudents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addingStudentsLoading: false,
      // Handles Alert Dialog
      alertVisible: false,
      alertTitle: '',
      alertMessage: '',
      // Handles Users To Add That Current User Inputs
      userArray: [],
      // Handles Loading Of Search
      searchLoading: false,
      classmatesArray: [],
      searchText: ''
    }
  }

  componentDidMount() {
    // Checks If It Has Been Over 15 Minutes, Then Gets Classmates Again To Ensure This Appears Responsive In The Classroom
  }

  // Handles Toggling The Visibility Of Alert Dialog When There Is An Error With User Inputs
  toggleAlert = () => {
    this.setState({ alertVisible: !this.state.alertVisible });
  }

  // Handles Resetting State For Search When User Clicks X Icon
  clearSearch() {
    this.setState({
      searchLoading: false,
      classmatesArray: [],
      searchText: ''
    });
  }

  // Handles Searching For Students
  search(text) {
    this.setState({ searchText: text });
    // Only Searches If Text Length Is Greater Than 1 To Avoid Unnecessary Hits To The Server
    if (text.length > 1) {
      this.setState({ searchLoading: true, classmatesArray: [] });
      // Handles Dispatch To GraphQL To Search Resources
      this.props.searchUsers(this.props.jwtToken, text).then((res) => {
        // Handles If There Is An Error With The Dispatch By Displaying Alert
        if (!(res && !('errors' in res))) {
          this.setState({
            alertVisible: true,
            alertTitle: 'Unable To Process Search',
            alertMessage: 'Something went wrong trying to process your search. ' + res.errors[0].message + 'Please contact support if the problem continues.',
            searchLoading: false
          });
        }
        // Otherwise Updates Result State To Display To The User
        else {
          this.setState({
            searchLoading: false,
            classmatesArray: res,
          });
        }
      })
    }
    // If Text Length Is 1 We Act As If Search Has Started And Set Loading To True
    else if (text.length === 1) {
      this.setState({ searchLoading: true, classmatesArray: [] });
    }
    // Otherwise, Text Length Is 0 So We Reset State
    else {
      this.setState({ searchText: text, classmatesArray: [], searchLoading: false });
    }
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
        <div className='classroom-header-flex' style={{ paddingLeft: 12 }}>
          <GroupAdd />
          <div className='classroom-title' style={{ paddingLeft: 10 }}>
            Find Students To Add To Your Class
          </div>
        </div>
        <div className='classroom-upload-flex' style={{ paddingLeft: 10, marginBottom: 0 }}>
          <div onClick={() => this.props.toggleSearch()} className='manual-back'>
            Go Back
          </div>
        </div>
        <div className='student-search-bar'>
          <div className='student-search-left'>
            <SearchIcon className='student-search-icon'/>
            <input 
              placeholder="search by student username"
              className='student-search-input'
              autoCapitalize={false}
              autoComplete={false}
              autoFocus={true}
              error={false}
              multiline={false}
              type="text"
              value={this.state.searchText}
              onChange={(event) => this.search(event.target.value)}
            />
          </div>
          <HighlightOffIcon
            className='student-search-close'
            onClick={() => this.clearSearch()}
          />
        </div>
        {this.state.classmatesArray.length !== 0 && !this.state.searchLoading && (
          <div className='classmates-container'>
            <div className='classmates-header-flex'>
              <div className='classmates-header-border' />
              <div className='classmates-header-title'>
                Select Students To Add
              </div>
              <div className='classmates-header-border' />
            </div>
            {this.state.classmatesArray.map((item) => {
              return (
                <div key={item.id} className='classmate-item'>
                  <div className='classmate-item-left'>
                    <div className='classmate-item-name'>
                      {item.firstName && item.firstName.length !== 0 ? item.firstName : 'No Name '} {item.lastName && item.lastName.length !== 0 ? item.lastName : 'Listed'}
                    </div>
                    <div className='classmate-item-username'>
                      @{item.username}
                    </div>
                  </div>
                  <RadioButtonUncheckedIcon />
                </div>
              );
            })}
          </div>
        )}
        {this.state.searchLoading && (
          <div className='classmates-container'>
            <div className='classmates-header-flex'>
              <div className='classmates-header-border' />
              <div className='classmates-header-title'>
                Select Students To Add
              </div>
              <div className='classmates-header-border' />
            </div>
            <div className='search-add-classmates-loading'>
              
            </div>
          </div>
        )}
        {this.state.classmatesArray.length === 0 && !this.state.searchLoading && this.state.searchText.length !== 0 && (
          <div className='classmates-container'>
            <div className='classmates-header-flex'>
              <div className='classmates-header-border' />
              <div className='classmates-header-title'>
                Select Students To Add
              </div>
              <div className='classmates-header-border' />
            </div>
            <div className='search-add-classmates-loading'>
              
            </div>
          </div>
        )}
        {this.state.addingStudentsLoading && (
          <div className='manual-entry-loading-container' style={{ paddingBottom: '150px' }}>
            <CircularProgress className='login-loading'/>
            <div className='login-loading-text' style={{ fontSize: 13, paddingTop: 7, textAlign: 'center' }}>
              Adding<br/>Students...
            </div>
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
    schoolID: state.userDetails.school,
    classmates: state.education.classmates,
    classmatesDateTime: state.education.classmatesDateTime,
  };
};

// Map Dispatch To Props (Dispatch Actions to Reducers. Reducers then modify the redux store state.
const mapDispatchToProps = (dispatch) => {
  // Action
    return {
      // Function to dispatch redux actions to get a response from the graphql query getClassmates
      getClassmates: (token, schoolID, classmatesDateTime) => dispatch(getClassmates(token, schoolID, classmatesDateTime)),
      // function to dispatch redux actions to get response from graphql query searchUsers
      searchUsers: (token, searchText) => dispatch(SearchUsers(token, searchText)),
      // Adds Students To An Existing Classroom
      // NOTE:  make sure that the input parameter 'studentsList' is an array of one or more of the following object
      // Make sure that double quotes are used for the string and date format input fileds in each object
      // { email: "welshman@me.edu", firstname: "Chris", lastName: "Thomas", birthDate: "2008-06-06" }
      addStudentsToClassroom: (token, classroomId, studentsList) => dispatch(addStudentsToClassroom(token, classroomId, studentsList)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchStudents);
