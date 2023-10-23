import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { getAllTeacherClassrooms, getDemoClassroom, getTeacherClassroom } from '../../../selectors/classroomSelectors';
import { FetchOtherUserDetails } from '../../../ActionTypes/socialActions';
import { removeStudentsFromClassroom } from '../../../ActionTypes/classroomActions';
import { toggleAddStudents, quickAccessAddStudents, selectClassroom } from '../../../ActionTypes/dashboardActions';
import { getAllDemoClassrooms } from '../../../selectors/classroomSelectors';
import OtherHouses from '@mui/icons-material/OtherHouses';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ClassroomItem from './ClassroomItem';
import ClassroomOverview from '../Dashboard/ClassroomOverview';
import PortfolioPreview from './PortfolioPreview';
import EmptyGrades from '../Gradebook/EmptyGrades';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Alert from '../../Admin/Alert';
import SortByButton from './SortByButton';
import UpdateTeacherInfoModal from './UpdateTeacherInfoModal';

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
      sortType: 0,
      editingClassroom: false,
      alertVisible: false,
      alertTitle: '',
      alertMessage: ''
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
      })
    }
  }

  // Toggles Visibility Of Remove Students, Which Updates Checkboxes To Allow User To Remove Students
  // From Their Classroom
  toggleRemoveStudents() {
    this.setState({ removeStudents: !this.state.removeStudents, removingArray: [] });
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
    if (studentList !== undefined) {
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
    // Handles Error Cases Or Code Issue
    else {
      return [];
    }
  }

  // Handles when a user selects to edit their classroom by displaying a modal with inputs for the
  // class name and the class year for the teacher to select
  handleEditClassroom = () => {
    this.setState({ editingClassroom: !this.state.editingClassroom });
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
    // Handles If User Has Multiple Classrooms By Prompting Them To Selected One
    else if (!this.props.selectedClassroom) {
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
        <div>
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
          />
          {false && !this.props.addingStudents && classList.length !== 0 && !this.state.viewPortfolio && (
            <div className='tile classroom-overview'>
              <ClassroomOverview
                classroom={classInfo}
              />
            </div>
          )}
          {classList.length !== 0 && !this.state.viewPortfolio && (
            <div className='tile classroom-all-container'>
              <div className='your-classroom-tile-header'>
                <div className='classroom-header-flex' style={{ paddingLeft: 12, paddingBottom: 5, paddingTop: (this.state.removeStudents || isDemo) ? 12 : 0 }}>
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
                {!this.state.removeStudents && !isDemo && (
                  <div className='classroom-button-flex'>
                    <div title="Add Students Manually Or By Uploading" onClick={() => this.props.toggleAddStudents()} className='button add-students-button'>
                      Add<br/>Students
                    </div>
                    <div title="Remove Students From Classroom" onClick={() => this.toggleRemoveStudents()} className='button remove-students-button' style={{ width: '32%' }}>
                      Remove<br/>Students
                    </div>
                  </div>
                )}
              </div>
              <div onClick={() => this.props.selectClassroom(false)} className='view-all-classrooms-button' style={{ fontSize: 12 }}>
                Back To List of Classrooms
              </div>
              <div className='classroom-all-students'>
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
                {!this.state.removeStudents && (
                  <SortByButton 
                    selectSearchOption={this.selectSort}
                    sortType={this.state.sortType}
                  />
                )}
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
            </div>
          )}
          {classList.length === 0 && !this.state.viewPortfolio && (
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
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(YourClassroomTile);
