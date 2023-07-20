import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { getAllTeacherClassrooms } from '../../../selectors/classroomSelectors';
import { FetchOtherUserDetails } from '../../../ActionTypes/socialActions';
import { removeStudentsFromClassroom } from '../../../ActionTypes/classroomActions';
import { toggleAddStudents, quickAccessAddStudents, selectClassroom } from '../../../ActionTypes/dashboardActions';
import OtherHouses from '@mui/icons-material/OtherHouses';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ClassroomItem from './ClassroomItem';
import ClassroomOverview from '../Dashboard/ClassroomOverview';
import PortfolioPreview from './PortfolioPreview';
import EmptyGrades from '../Gradebook/EmptyGrades';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import Alert from '../../Admin/Alert';

class YourClassroomTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      removeStudents: false,
      manualAdd: false,
      viewPortfolio: false,
      selectedPortfolioUsername: false,
      selectedPortfolioName: false,
      portfolioName: 'Brian Curcio',
      portfolioUsername: 'briancurcio',
      portfolioID: 0,
      portfolioData: [],
      removingArray: [],
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.visible !== prevProps.visible) {
      this.setState({
        removeStudents: false,
        manualAdd: false,
        viewPortfolio: false,
        selectedPortfolioUsername: false,
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
          alertMessage: 'We have successfully removed all of the students from this classroom. To add new students to this classroom, please select the Add Students button and you can either lookup students with existing Rapunzl accounts or add new students.'
        });
      }
    });
  }

  // Handles toggling portfolio visibility when user selects a student's portfolio to view
  togglePortfolio = (username, name) => {
    // If Portfolio Is Not Visible, We Set To Visible And Update SelectedPortfolioID In State
    if (!this.state.viewPortfolio) {
      this.setState({ viewPortfolio: true, selectedPortfolioUsername: username, selectedPortfolioName: name });
    }
    // If Portfolio Is Visible, Then We Want To Hide The Portfolio And Remove SelectedPortfolioID In State
    else {
      this.setState({ viewPortfolio: false, selectedPortfolioUsername: false, selectedPortfolioName: false });
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
      let classroomObject;
      for (var i in this.props.allClassrooms) {
        if (this.props.allClassrooms[i].id === this.props.selectedClassroom) {
          classroomObject = this.props.allClassrooms[i];
        }
      }
      return classroomObject;
    }
    // Handles If Classroom Has Not Been Selected Yet And Returns Empty Array & Title To Avoid Error
    else {
      return { className: '', classID: 0, noStudents: 0, studentList: [] };
    }
  }

  // Pass through arrow function to dismiss Alert Dialog after it is presented to the user
  toggleAlert = () => {
    this.setState({ alertVisible: false });
  }

  render() {
    // Handles If The Teacher User Has Not Created Any Classrooms Yet
    if (this.props.allClassrooms.length === 0 && !this.props.creatingClassroom) {
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
          {this.props.allClassrooms.map((item) => {
            return (
              <div key={item.id} onClick={() => this.props.selectClassroom(item.id)} className='select-classroom-item'>
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
      const classInfo = this._getClassroomInfo();
      return (
        <div>
          <Alert
            title={this.state.alertTitle}
            message={this.state.alertMessage}
            visible={this.state.alertVisible}
            dismiss={this.toggleAlert}
          />
          {/* Handles If Portfolio Preview Is Selected From Classroom Item To View Student Portfolio */}
          <PortfolioPreview
            dismissPortfolio={this.togglePortfolio}
            portfolioName={this.state.selectedPortfolioName}
            portfolioUsername={this.state.selectedPortfolioUsername}
            visible={this.state.viewPortfolio}
          />
          {!this.props.addingStudents && classInfo.studentList.length !== 0 && !this.state.viewPortfolio && (
            <div className='tile classroom-overview'>
              <ClassroomOverview
                classroom={classInfo}
              />
            </div>
          )}
          {classInfo.studentList.length !== 0 && !this.state.viewPortfolio && (
            <div className='tile classroom-all-container'>
              <div className='your-classroom-tile-header'>
                <div className='classroom-header-flex' style={{ paddingLeft: 12, paddingBottom: 5, paddingTop: this.state.removeStudents ? 12 : 0 }}>
                  <OtherHouses />
                  <div className='classroom-title' style={{ paddingLeft: 10 }}>
                    {classInfo.className}
                  </div>
                </div>
                {!this.state.removeStudents && (
                  <div className='classroom-button-flex'>
                    <div onClick={() => this.props.toggleAddStudents()} className='button add-students-button'>
                      Add Students
                    </div>
                    <div onClick={() => this.toggleRemoveStudents()} className='button remove-students-button' style={{ width: '32%' }}>
                      Remove
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
                    <div onClick={() => this.confirmRemoveStudents(classInfo)} className='button remove-button'>
                      Remove Students
                    </div>
                    <div onClick={() => this.selectAllRemoving(classInfo)} className='button remove-all-button'>
                      Select All
                    </div>
                    <div onClick={() => this.toggleRemoveStudents()} className='button remove-students-button'>
                      Cancel
                    </div>
                  </div>
                )}
                {classInfo.studentList.map((item) => {
                  return (
                    <ClassroomItem
                      item={item}
                      viewPortfolio={this.togglePortfolio}
                      removing={this.state.removeStudents}
                      select={this.selectRemoving}
                      selected={this.state.removingArray.includes(parseInt(item.userId))}
                    />
                  )
                })}
              </div>
            </div>
          )}
          {classInfo.studentList.length === 0 && !this.state.viewPortfolio && (
            <div className='tile classroom-all-container' style={{ paddingBottom: 350, paddingTop: 80 }}>
              <div className='create-class-name-subtext'>
                No Students In This Class!
              </div>
              <div className='create-class-name-header'>
                Let's Get Started<br/>Adding Students...
              </div>
              <div onClick={() => this.props.toggleAddStudents()} className='class-name-next-button next-class-true'>
                Add Students
              </div>
              <div onClick={() => this.props.selectClassroom(false)} className='back-to-class-list-button'>
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
const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    // Handles Colors Which Are Updated Throughout When MarketOpen Changes
    colors: state.userDetails.appColors,
    allClassrooms: getAllTeacherClassrooms(state),
    jwtToken: state.userDetails.jwtToken,
    selectedClassroom: state.dashboard.selectedClassroom,
    creatingClassroom: state.dashboard.creatingClassroom,
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
      toggleAddStudents: () => dispatch(toggleAddStudents()),
      quickAccessAddStudents: () => dispatch(quickAccessAddStudents()),
      selectClassroom: (classID) => dispatch(selectClassroom(classID))
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(YourClassroomTile);
