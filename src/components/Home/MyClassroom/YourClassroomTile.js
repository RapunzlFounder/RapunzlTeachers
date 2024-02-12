import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { getAllTeacherClassrooms, getDemoClassroom, getTeacherClassroom } from '../../../selectors/classroomSelectors';
import { FetchOtherUserDetails } from '../../../ActionTypes/socialActions';
import { removeStudentsFromClassroom, changeClassroomActiveStatus, getTeacherClassrooms } from '../../../ActionTypes/classroomActions';
import { toggleAddStudents, quickAccessAddStudents, selectClassroom } from '../../../ActionTypes/dashboardActions';
import { getAllDemoClassrooms } from '../../../selectors/classroomSelectors';
import OtherHouses from '@mui/icons-material/OtherHouses';
import CircularProgress from '@mui/material/CircularProgress';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ClassroomItem from './ClassroomItem';
import PortfolioPreview from './PortfolioPreview';
import EmptyGrades from '../Gradebook/EmptyGrades';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Alert from '../../Admin/Alert';
import SortByButton from './SortByButton';
import UpdateTeacherInfoModal from './UpdateTeacherInfoModal';
import PersonRemoveRoundedIcon from '@mui/icons-material/PersonRemoveRounded';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import LockResetRoundedIcon from '@mui/icons-material/LockResetRounded';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ResetPasswordModal from './ResetPasswordModal';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import CircleIcon from '@mui/icons-material/Circle';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchOffIcon from '@mui/icons-material/SearchOff';

class YourClassroomTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      removeStudents: false,
      manualAdd: false,
      viewPortfolio: false,
      selectedUser: false,
      portfolioName: 'Brian Curcio',
      portfolioUsername: 'briancurcio',
      portfolioID: 0,
      portfolioData: [],
      removingArray: [],
      removingClassroomsArray: [],
      sortType: 0,
      editingClassroom: false,
      editClassrooms: false,
      alertVisible: false,
      alertTitle: '',
      alertMessage: '',
      resetPasswordModal: false,
      searchingStudents: false,
      searchValue: '',
      viewingArchived: false,
      archivedClassrooms: [],
      restoreArchivedClassrooms: []
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.visible !== prevProps.visible) {
      this.setState({
        removeStudents: false,
        manualAdd: false,
        viewPortfolio: false,
        selectedUser: false,
        portfolioID: 0,
        portfolioData: [],
        removingArray: [],
        removingClassroomsArray: [],
        sortType: 0,
        editingClassroom: false,
        alertVisible: false,
        alertTitle: '',
        alertMessage: '',
        resetPasswordModal: false,
        searchingStudents: false,
        searchValue: ''
      })
    }
  }

  // Toggles Visibility Of Remove Students, Which Updates Checkboxes To Allow User To Remove Students
  // From Their Classroom
  toggleRemoveStudents() {
    this.setState({ removeStudents: !this.state.removeStudents, removingArray: [] });
  }

  // Handles resetting all student passwords in a classroom
  toggleResetPasswords = () => {
    this.setState({ resetPasswordModal: !this.state.resetPasswordModal });
  }

  toggleSearchStudents = () => {
    this.setState({ searchingStudents: !this.state.searchingStudents, searchValue: '' });
  }

  // Handles GrapqhQL Dispatch To Remove Students From User Classroom
  confirmRemoveStudents(classInfo) {
    // Uses The Array Of Student IDs to Remove All Students From The Classroom By Providing Class ID
    this.props.removeStudents(this.props.jwtToken, classInfo.id, this.state.removingArray).then((res) => {
      // Handles If There Is An Error With The Remove Students Dispatch
      if (!(res && !('errors' in res))) {
        this.setState({
          loading: false,
          alertVisible: true,
          alertTitle: 'Error Removing Students',
          alertMessage: res.errors[0].message,
        });
      }
      // Handles If Dispatch Is Successful & We Have Removed The Students
      else {
        this.setState({
          loading: false,
          alertVisible: true,
          alertTitle: 'You Are All Set!',
          alertMessage: 'We have successfully removed the students you selected from this classroom. To add new students to this classroom, please select the Add Students button and you can either lookup students with existing Rapunzl accounts or add new students.'
        });
      }
    });
  }

  // Handles toggling portfolio visibility when user selects a student's portfolio to view
  togglePortfolio = (user) => {
    // If Portfolio Is Not Visible, We Set To Visible And Update SelectedPortfolioID In State
    if (!this.state.viewPortfolio) {
      this.setState({ viewPortfolio: true, selectedUser: user });
    }
    // If Portfolio Is Visible, Then We Want To Hide The Portfolio And Remove SelectedPortfolioID In State
    else {
      this.setState({ viewPortfolio: false, selectedUser: false });
    }
  }

  // Creates An Array Of All User IDs In The Class To Remove Students From Classroom
  selectAllRemoving(classInfo) {
    // Sets Loading To True While We Attempt To Delete The Users & Intializes Push To Add Student IDs Into
    let removeStudentArray = [];
    this.setState({ loading: true });
    // Loops Through Selected Classroom Students And Creates Array Of IDs
    for (var i in classInfo.studentList) {
      removeStudentArray.push(parseInt(classInfo.studentList[i].userId));
    }
    // Update State To Select All Students To Be Removed. This Will Leave All Students Selected If Dispatch Fails
    this.setState({ removingArray: removeStudentArray });
  }

  // Handles Building An Array of userIDs For Students To Remove From The User's Classroom
  selectRemoving = (int) => {
    // Handles If The User Is Already In The Array To Remove
    if (this.state.removingArray.includes(parseInt(int))) {
      const filteredArray = this.state.removingArray.filter(function(value) {
        return value !== int;
      });
      this.setState({ removingArray: filteredArray });
    }
    // Handles If The User Is Not In The Array To Remove
    else {
      const newArray = this.state.removingArray;
      newArray.push(parseInt(int));
      this.setState({ removingArray: newArray });
    }
  }

  // Handles Building An Array of userIDs For Students To Remove From The User's Classroom
  selectRemovingClassrooms = (int) => {
    // Handles If The User Is Already In The Array To Remove
    if (this.state.removingClassroomsArray.includes(parseInt(int))) {
      const filteredArray = this.state.removingClassroomsArray.filter(function(value) {
        // eslint-disable-next-line
        return value != int;
      });
      this.setState({ removingClassroomsArray: filteredArray });
    }
    // Handles If The User Is Not In The Array To Remove
    else {
      const newArray = this.state.removingClassroomsArray;
      newArray.push(parseInt(int));
      this.setState({ removingClassroomsArray: newArray });
    }
  }

  // Handles Building An Array of userIDs For Students To Remove From The User's Classroom
  selectArchivedClassrooms = (int) => {
    // Handles If The User Is Already In The Array To Remove
    if (this.state.restoreArchivedClassrooms.includes(parseInt(int))) {
      const filteredArray = this.state.restoreArchivedClassrooms.filter(function(value) {
        // eslint-disable-next-line
        return value != int;
      });
      this.setState({ restoreArchivedClassrooms: filteredArray });
    }
    // Handles If The User Is Not In The Array To Remove
    else {
      const newArray = this.state.restoreArchivedClassrooms;
      newArray.push(parseInt(int));
      this.setState({ restoreArchivedClassrooms: newArray });
    }
  }

  // Once A User Selects A Classroom, We Are Able To Find That Class Using ID In State And Return To Map Students Into List
  _getClassroomInfo() {
    if (this.props.selectedClassroom !== false) {
      let isDemo = true;
      let classroomObject;
      for (var i in this.props.allClassrooms) {
        if (this.props.allClassrooms[i].id === this.props.selectedClassroom) {
          classroomObject = this.props.allClassrooms[i];
          isDemo = false;
        }
      }
      if (isDemo) {
        return [this.props.getDemoClassroom, true];
      } else {
        return [classroomObject, false];
      }
    }
    // Handles If Classroom Has Not Been Selected Yet And Returns Empty Array & Title To Avoid Error
    else {
      return [{ className: '', classID: 0, noStudents: 0, studentList: [] }, false];
    }
  }

  // Pass through arrow function to dismiss Alert Dialog after it is presented to the user
  toggleAlert = () => {
    this.setState({ alertVisible: false });
  }

  selectSort = (int) => {
    if (this.state.sortType !== int) {
      this.setState({ sortType: int });
    }
  }

  sortStudentList(studentList) {
    let returnArray = [];
    if (studentList !== undefined && !this.state.searchingStudents) {
      for (var i in studentList) {
        returnArray.push(studentList[i]);
      }
      // Handles If sortType is equal to 1 which is sorting by last name a-z
      if (this.state.sortType === 1) {
        return returnArray.sort((a, b) => {
          return a.lastName.localeCompare(b.lastName);
        })
      }
      // Handles if sortType is equal to 2 which is sorting by first name a-z
      else if (this.state.sortType === 2) {
        return returnArray.sort((a, b) => {
          return a.firstName.localeCompare(b.firstName);
        })
      }
      // Handles if sortType is equal to 3 which is sorting by stock portfolio %
      else if (this.state.sortType === 3) {
        return returnArray.sort((a, b) => {
          return b.stockPortfolioPerformance - a.stockPortfolioPerformance;
        })
      }
      // Handles if sortType is equal to 4 which is sorting by crypto portfolio %
      else if (this.state.sortType === 4) {
        return returnArray.sort((a, b) => {
          return b.cryptoPortfolioPerformance - a.cryptoPortfolioPerformance;
        })
      }
      // Handles Error Cases Or Code Issue
      else {
        return returnArray;
      }
    }
    // Handles If User Is Searching For A Student
    else if (studentList !== undefined && this.state.searchingStudents) {
      for (var j in studentList) {
        let combinedName = studentList[j].firstName + ' ' + studentList[j].lastName;
        combinedName = combinedName.toLowerCase();
        if (combinedName.includes(this.state.searchValue.toLowerCase())) {
          returnArray.push(studentList[j]);
        }
      }
      return returnArray;
    }
    // Handles Error Cases Or Code Issue
    else {
      return [];
    }
  }

  fetchArchivedClassrooms() {
    this.setState({ loading: true });
    this.props.getTeacherClassrooms(this.props.jwtToken, false).then((res) => {
      if (!(res && !('errors' in res))) {
        this.setState({
          loading: false,
          alertVisible: true,
          alertTitle: 'We Had A Problem Retreiving Your Classrooms',
          alertMessage: res.errors[0].message,
          viewingArchived: false,
          archivedClassrooms: []
        });
      }
      else {
        this.setState({
          loading: false,
          viewingArchived: true,
          archivedClassrooms: res.data.getTeacherClassrooms,
        });
      }
    })
  }

  setClassroomsStatus(status, array) {
    this.setState({ loading: true });
    this.props.changeClassroomActiveStatus(this.props.jwtToken, array, status).then((res) => {
      if (!(res && !('errors' in res))) {
        this.setState({
          loading: false,
          alertVisible: true,
          alertTitle: 'We Had A Problem Archiving Your Classrooms',
          alertMessage: res.errors[0].message,
        });
      }
      else {
        this.setState({
          loading: false,
          alertVisible: true,
          alertTitle: 'You Are All Set!',
          alertMessage: 'We have successfully archived the classrooms you selected. You can recover these classrooms by viewing your archived classrooms.'
        });
      }
    });
  }

  // Handles when a user selects to edit their classroom by displaying a modal with inputs for the
  // class name and the class year for the teacher to select
  handleEditClassroom = () => {
    this.setState({ editingClassroom: !this.state.editingClassroom });
  }

  toggleEditClassrooms() {
    this.setState({ editClassrooms: !this.state.editClassrooms });
  }

  toggleArchivedClassrooms() {
    this.setState({ viewingArchived: !this.state.viewingArchived });
  }

  render() {
    // Handles If The Teacher User Has Not Created Any Classrooms Yet
    if (this.props.allClassrooms.length === 0 && this.props.demoClassrooms.length === 0 && !this.props.creatingClassroom) {
      return (
        <div className='tile classroom-overview'>
          <EmptyGrades />
        </div>
      );
    }
    // Handles If User Is Viewing Archived Classrooms
    else if (!this.props.selectedClassroom && this.state.viewingArchived) {
      return (
        <div className='tile create-class-name-container' style={{ paddingBottom: 260 }}>
          {this.state.archivedClassrooms.length !== 0 && (
            <div>
              <div className='create-class-name-subtext'>
                Archived Classrooms
              </div>
              <div className='create-class-name-header'>
              Select Classrooms To<br/>Make Active
              </div>
            </div>
          )}
          {this.state.archivedClassrooms.length === 0 && (
            <div>
              <SchoolOutlinedIcon className='no-archived-classes-icon'/>
              <div className='create-class-name-subtext' style={{ paddingTop: 20 }}>
                No Classrooms To Display
              </div>
              <div className='create-class-name-header' style={{ color: '#ffb200' }}>
              No Archived<br/>Classrooms
              </div>
            </div>
          )}
          {this.state.archivedClassrooms.length !== 0 && this.state.archivedClassrooms.map((item, index) => {
            return (
              <div title="View Classroom & Students" key={index} onClick={() => this.selectArchivedClassrooms(item.id)} className='select-classroom-item'>
                <div>
                  <div className='select-classroom-title'>
                    {item.className}
                  </div>
                  <div className='select-classroom-students-text'>
                    {item.noStudents} {parseInt(item.noStudents) === 1 ? 'student' : 'students'}
                  </div>
                  <div className='select-classroom-created-text'>
                    Last Modified: {moment(item.lastModifiedAt).format("l")}
                  </div>
                </div>
                {this.state.restoreArchivedClassrooms.includes(parseInt(item.id)) ? (
                  <CircleIcon className='select-classroom-arrow-icon-2' style={{ fill: '#ffb300' }} />
                ) : (
                  <CircleOutlinedIcon className='select-classroom-arrow-icon-3' style={{ fill: '#ffb300' }} />
                )}
              </div>
            )
          })}
          {!this.state.loading && (
            <div>
              {this.state.archivedClassrooms.length !== 0 && this.state.restoreArchivedClassrooms.length !== 0 && (
                <div onClick={() => this.setClassroomsStatus(true, this.state.restoreArchivedClassrooms)} className='archive-classrooms-button fetch-archive-button' style={{ borderColor: '#00b082' }}>
                  <ArchiveOutlinedIcon className='fetch-archive-icon' />
                  <div className='fetch-archive-text'>
                    Restore Classrooms
                  </div>
                </div>
              )}
              <div onClick={() => this.toggleArchivedClassrooms()} className='edit-classroom-button'>
                <div className='edit-classroom-button-text'>
                  Go Back
                </div>
              </div>
            </div>
          )}
          {this.state.loading && (
            <div className='manual-entry-loading-container'>
              <CircularProgress className='login-loading'/>
              <div className='login-loading-text' style={{ fontSize: 13, paddingTop: 7, textAlign: 'center' }}>
                Loading...
              </div>
            </div>
          )}
        </div>
      );
    }
    // Handles If User Is Editing Their List Of Classrooms
    else if (!this.props.selectedClassroom && this.state.editClassrooms && !this.state.viewingArchived) {
      return (
        <div className='tile create-class-name-container' style={{ paddingBottom: this.props.allClassrooms.length > 3 ? 110 : 260 }}>
          <div className='create-class-name-subtext'>
            Edit Class List
          </div>
          <div className='create-class-name-header'>
          Select Classrooms To<br/>Archive
          </div>
          {this.props.allClassrooms.length !== 0 && this.props.allClassrooms.map((item, index) => {
            return (
              <div title="View Classroom & Students" key={index} onClick={() => this.selectRemovingClassrooms(item.id)} className='select-classroom-item'>
                <div>
                  <div className='select-classroom-title'>
                    {item.className}
                  </div>
                  <div className='select-classroom-students-text'>
                    {item.noStudents} {parseInt(item.noStudents) === 1 ? 'student' : 'students'}
                  </div>
                </div>
                {this.state.removingClassroomsArray.includes(parseInt(item.id)) ? (
                  <CircleIcon className='select-classroom-arrow-icon-2'/>
                ) : (
                  <CircleOutlinedIcon className='select-classroom-arrow-icon-3' />
                )}
              </div>
            )
          })}
          {!this.state.loading && this.state.removingClassroomsArray.length === 0 && (
            <div>
              <div onClick={() => this.fetchArchivedClassrooms()} className='create-new-classroom-button fetch-archive-button' style={{ borderColor: '#00b082' }}>
                <ArchiveOutlinedIcon className='fetch-archive-icon' />
                <div className='fetch-archive-text'>
                  View Archived Classrooms
                </div>
              </div>
              <div onClick={() => this.toggleEditClassrooms()} className='edit-classroom-button'>
                <div className='edit-classroom-button-text'>
                  Go Back
                </div>
              </div>
            </div>
          )}
          {!this.state.loading && this.state.removingClassroomsArray.length !== 0 && (
            <div>
              <div onClick={() => this.setClassroomsStatus(false, this.state.removingClassroomsArray)} className='archive-classrooms-button archive-classrooms-button'>
                <ArchiveOutlinedIcon className='archive-icon' />
                <div className='archive-text'>
                  Archive Classrooms
                </div>
              </div>
              <div onClick={() => this.toggleEditClassrooms()} className='edit-classroom-button'>
                <div className='edit-classroom-button-text'>
                  Go Back
                </div>
              </div>
            </div>
          )}
          {this.state.loading && (
            <div className='manual-entry-loading-container'>
              <CircularProgress className='login-loading'/>
              <div className='login-loading-text' style={{ fontSize: 13, paddingTop: 7, textAlign: 'center' }}>
                Loading...
              </div>
            </div>
          )}
        </div>
      );
    }
    // Handles If User Has Multiple Classrooms By Prompting Them To Selected One
    else if (!this.props.selectedClassroom && !this.state.editClassrooms) {
      return (
        <div className='tile create-class-name-container' style={{ paddingBottom: this.props.allClassrooms.length > 3 ? 110 : 260 }}>
          <div className='create-class-name-subtext'>
            Select Your Classroom
          </div>
          <div className='create-class-name-header'>
            Which Class Would You<br/>Like To View?
          </div>
          {this.props.allClassrooms.length !== 0 && this.props.allClassrooms.map((item, index) => {
            return (
              <div title="View Classroom & Students" key={index} onClick={() => this.props.selectClassroom(item.id)} className='select-classroom-item'>
                <div>
                  <div className='select-classroom-title'>
                    {item.className}
                  </div>
                  <div className='select-classroom-students-text'>
                    {item.noStudents} {parseInt(item.noStudents) === 1 ? 'student' : 'students'}
                  </div>
                  <div className='select-classroom-created-text'>
                    Created: {moment(item.createdAt).format("l")}
                  </div>
                </div>
                <ArrowCircleRightOutlinedIcon className='select-classroom-arrow-icon'/>
              </div>
            )
          })}
          {this.props.allClassrooms.length === 0 && this.props.demoClassrooms.length !== 0 && this.props.demoClassrooms.map((item, index) => {
            return (
              <div title="View Classroom & Students" key={index} onClick={() => this.props.selectClassroom(item.id)} className='select-classroom-item'>
                <div>
                  <div className='select-classroom-title'>
                    {item.className}
                  </div>
                  <div className='select-classroom-students-text'>
                    {item.noStudents} {parseInt(item.noStudents) === 1 ? 'student' : 'students'}
                  </div>
                  <div className='select-classroom-created-text'>
                    Created: {moment(item.createdAt).format("l")}
                  </div>
                </div>
                <ArrowCircleRightOutlinedIcon className='select-classroom-arrow-icon'/>
              </div>
            )
          })}
          <div onClick={() => this.props.quickAccessAddStudents()} className='create-new-classroom-button'>
            <AddCircleOutlineOutlinedIcon className='create-new-classroom-plus-icon' />
            <div className='create-new-classroom-button-text'>
              Create New Classroom
            </div>
          </div>
          {this.props.allClassrooms.length !== 0 && (
            <div onClick={() => this.toggleEditClassrooms()} className='edit-classroom-button'>
              <div className='edit-classroom-button-text'>
                Edit & Recover Classrooms
              </div>
            </div>
          )}
        </div>
      );
    }
    // Handles If User Only Has One Classroom Or User Has Selected The Classroom To View
    else {
      const classInformation = this._getClassroomInfo();
      const classInfo = classInformation[0];
      const isDemo = classInformation[1];
      const classList = this.sortStudentList(classInfo.studentList);
      return (
        <div style={{ backgroundColor: '#002b21' }}>
          <Alert
            title={this.state.alertTitle}
            message={this.state.alertMessage}
            visible={this.state.alertVisible}
            dismiss={this.toggleAlert}
          />
          <UpdateTeacherInfoModal
            type={'classroom'}
            visible={this.state.editingClassroom}
            dismiss={this.handleEditClassroom}
            classData={classInfo}
          />
          {/* Handles If Portfolio Preview Is Selected From Classroom Item To View Student Portfolio */}
          <PortfolioPreview
            dismissPortfolio={this.togglePortfolio}
            user={this.state.selectedUser}
            portfolioUsername={''}
            portfolioName={''}
            visible={this.state.viewPortfolio}
            isDemo={isDemo}
          />
          <ResetPasswordModal
            dismiss={this.toggleResetPasswords}
            visible={this.state.resetPasswordModal}
            classList={classList}
          />
          {((classList.length !== 0 && !this.state.viewPortfolio) || (this.state.searchingStudents)) && (
            <div className='tile classroom-all-container your-classroom-tile-header'>
              <div>
                <div className='classroom-header-flex' style={{ paddingLeft: 12, paddingBottom: 5 }}>
                  <OtherHouses />
                  <div className='classroom-title' style={{ paddingLeft: 10 }}>
                    {classInfo.className}
                  </div>
                  {!isDemo && (
                    <div onClick={() => this.handleEditClassroom()} className='general-edit-button'>
                      <EditOutlinedIcon className='general-edit-mui-icon' />
                      <div className='general-edit-button-text'>
                        Edit
                      </div>
                    </div>
                  )}
                </div>
                <div onClick={() => this.props.selectClassroom(false)} className='view-all-classrooms-button' style={{ fontSize: 12 }}>
                  Back To List of Classrooms
                </div>
                {!this.state.removeStudents && !this.state.searchingStudents && (
                  <SortByButton 
                    selectSearchOption={this.selectSort}
                    sortType={this.state.sortType}
                  />
                )}
              </div>
              {!this.state.removeStudents && !this.state.searchingStudents && !isDemo && (
                <div className='classroom-button-flex'>
                  <div className='classroom-option-button' onClick={() => this.toggleSearchStudents()}>
                    <PersonSearchIcon className='search-students-button-icon' />
                    <div title="Add Students Manually Or By Uploading" className='search-students-text'>
                      Search<br/>Students
                    </div>
                  </div>
                  <div className='classroom-option-button' onClick={() => this.props.toggleAddStudents()}>
                    <PersonAddAlt1RoundedIcon className='add-students-button-icon' />
                    <div title="Add Students Manually Or By Uploading" className='add-students-text'>
                      Add<br/>Students
                    </div>
                  </div>
                  <div className='classroom-option-button' onClick={() => this.toggleRemoveStudents()}>
                    <PersonRemoveRoundedIcon className='remove-students-button-icon' />
                    <div title="Remove Students From Classroom" className='remove-students-text'>
                      Remove<br/>Students
                    </div>
                  </div>
                  <div className='classroom-option-button' onClick={() => this.toggleResetPasswords()}>
                    <LockResetRoundedIcon className='reset-passwords-button-icon' />
                    <div title='Reset Student Passwords' className='reset-passwords-text'>
                      Reset<br/>Passwords
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          {this.state.removeStudents && (
            <div className='classroom-button-flex'>
              <div title="Removes Selected Students From Class" onClick={() => this.confirmRemoveStudents(classInfo)} className='button remove-button'>
                Confirm Remove
              </div>
              <div title="Select All Studnets To Remove" onClick={() => this.selectAllRemoving(classInfo)} className='button remove-all-button'>
                Select All
              </div>
              <div onClick={() => this.toggleRemoveStudents()} className='button remove-students-button'>
                Cancel
              </div>
            </div>
          )}
          {this.state.searchingStudents && (
            <div className='tile classroom-button-flex'>
              <div title="Search Students In Class" className='search-classroom-bar'>
                <div className='search-classroom-bar-left'>
                  <SearchIcon className='search-classroom-bar-icon' />
                  <input 
                    className='search-classroom-bar-text'
                    placeholder={'Search By Name'}
                    value={this.state.searchValue}
                    onChange={(event) => this.setState({ searchValue: event.target.value })}
                  />
                </div>
                <CancelIcon onClick={() => this.toggleSearchStudents()} className='search-classroom-cancel-icon' />
              </div>
            </div>
          )}
          {((this.state.searchingStudents && classList.length !== 0) || (classList.length !== 0)) && !this.state.viewPortfolio && (
            <div className='tile' style={{ minHeight: 600, maxHeight: 900, overflowY: 'scroll' }}>
              {classList.length !== 0 && classList.map((item, index) => {
                return (
                  <ClassroomItem
                    key={index}
                    item={item}
                    viewPortfolio={this.togglePortfolio}
                    removing={this.state.removeStudents}
                    select={this.selectRemoving}
                    selected={this.state.removingArray.includes(parseInt(item.userId))}
                    sortType={this.state.sortType}
                  />
                )
              })}
            </div>
          )}
          {classList.length === 0 && !this.state.viewPortfolio && !this.state.searchingStudents && (
            <div className='tile classroom-all-container' style={{ paddingBottom: 350, paddingTop: 80 }}>
              <div className='create-class-name-subtext'>
                No Students In This Class!
              </div>
              <div className='create-class-name-header'>
                Let's Get Started<br/>Adding Students...
              </div>
              <div title="Add Students Manually Or By Uploading" onClick={() => this.props.toggleAddStudents()} className='class-name-next-button next-class-true'>
                Add Students
              </div>
              <div title="Return To List Of Classrooms" onClick={() => this.props.selectClassroom(false)} className='back-to-class-list-button'>
                Back To Class List
              </div>
            </div>
          )}
          {classList.length === 0 && !this.state.viewPortfolio && this.state.searchingStudents && (
            <div className='tile classroom-all-container' style={{ paddingBottom: 350, paddingTop: 30 }}>
              <SearchOffIcon className='empty-search-result-icon' />
              <div className='create-class-name-header'>
                No Search Results Found 
              </div>
              <div className='create-class-name-subtext'>
                We were unable to find any students with the name you searched for. Please try again. If you cannot find a student, they may be in a different classroom.
              </div>
            </div>
          )}
        </div>
      );
    }
  }
}

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state, ownProps) => {
  // Redux Store --> Component
  return {
    // Handles Colors Which Are Updated Throughout When MarketOpen Changes
    colors: state.userDetails.appColors,
    // Selector that includes shallow level of all teacher classrooms
    allClassrooms: getAllTeacherClassrooms(state),
    // Used for authentication with various dispatches inlcuded below
    jwtToken: state.userDetails.jwtToken,
    // Redux navigation state to show if a teacher has selected a classroom, and if so, which classroom has been selected
    // This is represented either with false or the classroomID
    selectedClassroom: state.dashboard.selectedClassroom,
    // Redux navigation state to show when a user is creating a classroom
    creatingClassroom: state.dashboard.creatingClassroom,
    // Selector which provides infomration for all demo classrooms stored in redux
    demoClassrooms: getAllDemoClassrooms(state),
    // One of the selectors below will be undefined because a course is either demo or not
    // Selector which provides informaiton for a specific teacher demo classroomID, provided in parent as prop
    getDemoClassroom: getDemoClassroom(state, ownProps),
    // Selector which provies information for a specific teacher classroomID
    getTeacherClassroom: getTeacherClassroom(state, ownProps),
  };
};

// Map Dispatch To Props (Dispatch Actions to Reducers. Reducers then modify the redux store state.
const mapDispatchToProps = (dispatch) => {
  // Action
    return {
      // Dispatch To Fetch Portfolio Information For A Student, Which Is Called In ClassroomItem Through Pass Through Arrow Function
      fetchOtherUserDetails: (token, userName) => dispatch(FetchOtherUserDetails(token, userName)),
      // Dispatch To Remove Students From Classroom Which Takes An Array Of Student IDs In Student List And The Classroom ID
      removeStudents: (token, classroomId, studentsList) => dispatch(removeStudentsFromClassroom(token, classroomId, studentsList)),
      // Toggles between adding students and view classrooms through redux to aid in navigation continuity
      toggleAddStudents: () => dispatch(toggleAddStudents()),
      // Redux dispatch to handle navigation state and allow user to quickly go to add students
      quickAccessAddStudents: () => dispatch(quickAccessAddStudents()),
      // Updates Redux With The Selected Classroom Which Is Used In Render Conditionals & Dispatches
      selectClassroom: (classID) => dispatch(selectClassroom(classID)),
      // Handles Redux Dispatch To Change Classroom Active Status From True Or False
      changeClassroomActiveStatus: (token, classroomIDArray, isActive) => dispatch(changeClassroomActiveStatus(token, classroomIDArray, isActive)),
      // Handles Redux Dispatch To Get Teacher Classrooms Based on Active Status - True Or False
      getTeacherClassrooms: (token, isActive) => dispatch(getTeacherClassrooms(token, isActive)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(YourClassroomTile);
