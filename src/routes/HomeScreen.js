
import React, { Component } from 'react';
import moment from 'moment';
import { Outlet, Navigate } from "react-router-dom";
import { connect } from 'react-redux';
import { fetchBigQuery, fetchMiniQuery, fetchAdministratorBigQuery, isLogoutRequired } from '../ActionTypes/userDataActions';
import { resetNotificationErrors } from '../ActionTypes/notificationActions';
import { getFinancialLiteracyStandards } from '../ActionTypes/coursemoduleActions';
import { fetchDemoContent } from '../ActionTypes/demoDataActions';
import { logoutUser } from '../ActionTypes/loginActions';
import {
  setMenuTab,
  quickAccessAddStudents,
  quickAccessCourseBuilder,
  toggleAddStudents,
  toggleCourseBuilder,
} from '../ActionTypes/dashboardActions';
import { objectToArray } from '../helper_functions/utilities';
import Container from '@mui/material/Container';
import Header from '../components/Admin/Header';
import Footer from '../components/Admin/Footer';
import LeftHomeMenu from '../components/Home/LeftMenu/LeftHomeMenu';
import Dashboard from '../components/Home/Dashboard/Dashboard';
import MyCourse from '../components/Home/MyCourses/MyCourse';
import ResourceLibrary from '../components/Home/Resources/ResourceLibrary';
import QuickAccess from '../components/Home/RightMenu/QuickAccess';
import MyClassroom from '../components/Home/MyClassroom/MyClassroom';
import TrendingCourses from '../components/Home/RightMenu/TrendingCourses';
import Support from '../components/Home/Support';
import Settings from '../components/Home/Settings';
import YourPlan from '../components/Home/YourPlan';
import FAQ from '../components/Home/FAQ';
import TooNarrowIcon from '../assets/images/Admin/TooNarrow.png';
import '../styles/Home/HomeScreen.css';
import YourGrades from '../components/Home/Gradebook/YourGrades';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gettingMiniQuery: false,
      gettingAdminBigQuery: false,
      alertVisible: false,
      visibleTab: 1,
      previousTab: 1,
      alertTitle: '',
      alertMessage: '',
      alertType: '',
      contactUs: false,
      addingStudents: false,
      handleLogout: false,
    };
  }

  

  async componentDidMount() {
    // eslint-disable-next-line
    if (!this.props.didWalk) {
      this.setState({ welcomeBackVisible: true });
    }
    // if the data from the big query has previously been loaded then retrieve the following mini updates
    if (this.props.bigQueryLoaded) {
      // call the mini query
      this._getUpdatedUserDetails();
    }
    // Checks if current redux store is in alignment with latest release, otherwise calls the big query
    this._handleUpdate();
    this._handleCheckForStandards();
    this._handleCheckForDemo();
  }

  componentDidUpdate(prevProps) {
    // checks if the user needs to logout
    if (this.props.logoutRequired !== prevProps.logoutRequired && this.props.logoutRequired === true){
      this._handleLogout();

    }
    // Handle Errors Related to Saving Notification Token & Update Notification Types
    // This Error Does Not Impede UI So We Just Send Message to Analytics for debugging
    // eslint-disable-next-line
    const resetNotificationErrors = (prevProps.notificationGraphqlError == null || prevProps.notificationError == null) && prevProps.notificationErrorTitle == null;
    // eslint-disable-next-line
    const receiveNotificationErrors = (this.props.notificationGraphqlError !== null || this.props.notificationError !== null) && this.props.notificationErrorTitle !== null;
    if (resetNotificationErrors && receiveNotificationErrors) {
      this.props.resetNotificationErrors();
    }
    // Checks if the WebApp visibility has changed
    if (this.props.appVisible && prevProps.appVisible !== this.props.appVisible){
      // call the mini query
      this._getUpdatedUserDetails();
    }
  }

  componentWillUnmount() {
    // Handles notifications for Android & taken from Expo guides
    if (this._notificationSubscription && this._notificationSubscription.remove) {
      this._notificationSubscription.remove();
    }
  }

  // Handles Logout & Navigation When Selected In Menu By Updating State & Calling Navigate Component
  _handleLogout = () => {
    // Handles Logging Out User & Routing To AuthLoadingScreen
    this.props.logout();
    this.setState({ handleLogout: true});
  };

  getUsedLocalStorageSpace(){
    var allStrings = '';
    for(var key in window.localStorage){
        if(window.localStorage.hasOwnProperty(key)){
            allStrings += window.localStorage[key];
        }
    }
    return allStrings ? 3 + ((allStrings.length*16)/(8*1024)) + ' KB' : 'Empty (0 KB)';
  };

  // Handles When There Is An Update With Information In The Big Query But Only Accesses It Once
  _handleUpdate = () => {
    // eslint-disable-next-line
    if (this.props.logoutRequired == undefined || this.props.logoutRequired == true) {
      this.setState({ gettingMiniQuery: true });
      this.props.fetchBigQuery(this.props.jwtToken).then(res => {
        // Handles If There's An Error With The Big Query
        if (!(res && !('errors' in res))) {
          this.setState({
            handleLogout: true,
            gettingMiniQuery: false
          });
        }
        // Handles If The Big Query Is Successful
        else {
          this.setState({ 
            alertVisible: false,
            gettingMiniQuery: false
          });
        }
      })
    }
  }

  // update the user details if needed (Mini Query)
  _getUpdatedUserDetails = () => {
    // check if the user needs to logout for a server upgrade etc.
    this.props.isLogoutRequired(this.props.jwtToken);
    const localTime = new Date();
    const currentTime = moment(localTime); 
    
    // for an admin user (Principal or Supervisor) there is no mini query, we just retreive the administrator big query.  DO NOT CHANGE THIS NUMBER 180!  
    if (this.props.useAdminGUI){
      const adminRetrievedTime= moment(this.props.lastRetrievedTime);
      const adminSecondsDiff = currentTime.diff(adminRetrievedTime, 'seconds');
      // check if has been greater than 3 minutes since the last time the administrator big query was retrieved
      if (adminSecondsDiff >= 180){      
        this.setState({ gettingAdminBigQuery: true });
        this.props.fetchAdministratorBigQuery(this.props.jwtToken).then((res) => {
          // Handles If There's An Error With the Administraor Big Query
          if (!(res && !('errors' in res))) {
            this.setState({
              gettingAdminBigQuery: false,
              handleLogout: true,
            });
          }
          // Handles If The Administrator Big Query Is Successful
          else {
            this.setState({
              gettingAdminBigQuery: false,
              alertVisible: false
            });
          }
        });
      }
    }
    else {
      // calculate the time difference in seconds between the current time and the last time that the teacher's classrooms details were retrieved from the server
      const classroomRetrievedTime= moment(this.props.classroomLastRetrievedTime);
      const secondsDiff = currentTime.diff(classroomRetrievedTime, 'seconds');
      if (secondsDiff >= 60){      
        this.setState({ gettingMiniQuery: true });
        // Get the regular Mini Query for a Teacher 
        this.props.FetchMiniQuery(this.props.jwtToken, this.props.lastPublicModuleId).then((res) => {
          // Handles If There's An Error With the Mini Query
          if (!(res && !('errors' in res))) {
            this.setState({
              gettingMiniQuery: false,
              handleLogout: true,
            });
          }
          // Handles If The Mini Query Is Successful
          else {
            this.setState({
              gettingMiniQuery: false,
              alertVisible: false
            });
          }
        });
      }
    }
  }

  // Toggles Visibility Of Alert Dialog
  toggleAlert = () => {
    this.setState({ alertVisible: !this.state.alertVisible });
  }

  // Updates the currently selected tab and passed through as arrow functions to LeftHomeMenu
  setMenuTab = (int) => {
    if (this.props.visibleTab !== int) {
      this.props.setMenuTab(int);
    }
  }

  // Handles checking if we should retrieve standards so that we can map them to the correct resources
  _handleCheckForStandards() {
    if (objectToArray(this.props.standards).length === 0) {
      this._getStandards();
    }
    // Used To Check Time Difference Between Current Time And Time Standards Were Retrieved
    else {
      const localTime = new Date();
      const currentTime = moment(localTime);
      const standardsRetrievedTime = moment(this.props.standardsLastRetrieved);
      const secondsDiff = currentTime.diff(standardsRetrievedTime, 'seconds');
      // If It Has Been Over 14 Days, Refresh Standards
      if (secondsDiff > 1209600) {
        this._getStandards();
      }
    }    
  }

  // Handles actual dispatch to get standards and save to redux. Also handles alert if there's an error.
  _getStandards() {
    this.props.getStandards(this.props.jwtToken).then((res) => {
      if (!(res && !('errors' in res))) {
        this.setState({
          alertVisible: true,
          alertTitle: 'Something Went Wrong...',
          alertMessage: 'We had trouble retrieving financial literacy standards to align with these resources. This should not impact your ability to use the platform, but please contact support at your convenience so that we can help resolve this issue.'
        });
      }
    })
  }

  _handleCheckForDemo(){
    this.props.fetchDemoContent(this.props.jwtToken).then((res) => {
      if (res === true) {

      } else {

      }
    })
  }

  // Pass Through Arrow Function To Add Students In My Classroom Through Quick Access Component
  quickAccessAddStudents = () => {
    this.props.quickAccessAddStudents();
  }

  // Pass Through Arrow Function To Go To Course Builder In My Courses Through Quick Access Component
  quickAccessCourseBuilder = () => {
    this.props.quickAccessCourseBuilder();
  }

  toggleAddStudents = () => {
    this.props.toggleAddStudents();
  }

  toggleCourseBuilder = () => {
    this.props.toggleCourseBuilder();    
  }

  render() {
    // eslint-disable-next-line
    if (this.props.jwtToken == null || this.props.jwtToken == undefined || this.state.handleLogout) {
      return(
        <Navigate to="/login" replace={true} />
      );
    } else {
      return(
        <Container
          disableGutters={true}
          fixed={false}
          maxWidth={false}
          className='route-container'
          style={{
            paddingTop: 60
          }}
        >

          <Header />
          <div className='home-container'>
            <div className='not-available-container'>
              <img alt='' className='not-available-image' src={TooNarrowIcon} />
              <div className='not-available-title'>
                Your Browser Is Too Narrow
              </div>
              <div className='not-available-text'>
                At this point in time, Rapunzl's teacher portal is designed for PC's, Laptops, and Tablets. We do not provide a mobile version of our teacher portal.
              </div>
            </div>
            {!this.props.expandedLibrary && ( 
              <LeftHomeMenu tab={this.props.visibleTab} />
            )}
            <div className={`middle-section ${this.props.expandedLibrary ? 'middle-section-expanded' : ''}`}>
              <Dashboard
                visible={this.props.visibleTab === 1}
              />
              <MyCourse
                visible={this.props.visibleTab === 2}
              />
              <MyClassroom
                visible={this.props.visibleTab === 3}
                addingStudents={this.state.addingStudents}
              />
              <ResourceLibrary
                visible={this.props.visibleTab === 4}
              />
              <YourGrades
                visible={this.props.visibleTab === 5}
              />
              <Settings
                visible={this.props.visibleTab === 6}
              />
              <Support
                visible={this.props.visibleTab === 7}
              />
              <YourPlan
                visible={this.props.visibleTab === 8}
              />
              <FAQ
                visible={this.props.visibleTab === 9}
              />
            </div>
            {!this.props.expandedLibrary && (
              <div className='tile right-section'>
                <QuickAccess />
                <TrendingCourses />
              </div>
            )}
          </div>
          <Outlet />
          <Footer />
        </Container>
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
    // UserID used in dipatches below
    userID: state.userDetails.id,
    // Handles if User should be redirected to WelcomeScreen
    loggedIn: state.userDetails.loggedIn,
    // Necessary for nearly all dispatches
    jwtToken: state.userDetails.jwtToken,
    // Handles If Big Query Has completed Loading
    bigQueryLoaded: state.userDetails.bigQueryLoaded,
    // Notification token which maps on expo servers to user's OS specific notification certificates
    notificationToken: state.notification.notificationToken,
    // Handles if this is the first time user logged in
    newLogin: state.userDetails.newLogin,
    // Handles if user has seen Walkthrough, else, redirects them to WalkthroughScreen
    didWalk: state.userDetails.didWalk,
    // Handles if user has verified their email
    emailVerified: state.userDetails.emailVerified,
    // Handles payment expiration date
    expirationDate: state.userDetails.expirationDate,
    // Handles current user product purchased
    productCode: state.userDetails.productCode,
    // Notification Errors
    notificationError: state.notification.error,
    notificationGraphqlError: state.notification.graphqlError,
    notificationErrorTitle: state.notification.errorTitle,
    // Handles Which Asset Class User Currently Has Selected (Equities or Crypto)
    asset: state.gamesettings.asset,
    // determines if the WebApp is visible or not
    appVisible: state.gamesettings.appVisible,
    // Handles if we should call big query because there has been a breaking change to the data structure
    logoutRequired: state.userDetails.logoutRequired,
    // gets the timestamp for when the teacher's classrooms were last retrieved from the server, ie mini query
    classroomLastRetrievedTime: state.classroom.classroomLastRetrievedTime,
    // Last Time Standards Were Retrieved To Avoid Hitting Server 
    standardsLastRetrieved: state.coursesmodules.standardsLastRetrieved,
    standards: state.coursesmodules.financialLiteracyStandards,
    // the id of the last public teacher module that was retrieved from the server
    lastPublicModuleId: state.coursesmodules.lastPublicModuleId,    
    // These Elements In Redux Handle Navigation Throughout The Dashboard To Avoid Unnecessary Passing Of Props
    visibleTab: state.dashboard.visibleTab,
    previousTab: state.dashboard.previousTab,
    addingStudents: state.dashboard.addingStudents,
    creatingClassroom: state.dashboard.creatingClassroom,
    selectedClassroom: state.dashboard.selectedClassroom,
    expandedLibrary: state.dashboard.expandedLibrary,
    // redux state for if the AdminGUI is to be used or not
    useAdminGUI: state.gamesettings.useAdminGUI,
    // redux state for the last time that the school teacher summaries were retrieved 
    lastRetrievedTime: state.principalSuperintendent.lastRetrievedTime,
    // indictes if the user needs to logout or not
    logoutRequired: state.userDetails.logoutRequired,
  };
};

// Map Dispatch To Props (Dispatch Actions to Reducers. Reducers then modify the redux store state.
const mapDispatchToProps = (dispatch) => {
  // Action
    return {
      // reset errors related to notifications
      resetNotificationErrors: () => dispatch(resetNotificationErrors()),
      // Get all of the user data for a regular Teacher user
      fetchBigQuery: (token) => dispatch(fetchBigQuery(token)),
      // Get all of the user data for a Principal or Superintendent user
      fetchAdministratorBigQuery: (token) => dispatch(fetchAdministratorBigQuery(token)),
      // executes the Mini Query
      FetchMiniQuery: (token, lastPublicModuleId) => dispatch(fetchMiniQuery(token, lastPublicModuleId)),
      // Handles Retrieving Financial Literacy Standards Which Are Mapped To Various Resource
      getStandards: (token) => dispatch(getFinancialLiteracyStandards(token)),
      // Handles sending message to Database to email to support email address
      setMenuTab: (tab) => dispatch(setMenuTab(tab)),
      quickAccessAddStudents: () => dispatch(quickAccessAddStudents()),
      quickAccessCourseBuilder: () => dispatch(quickAccessCourseBuilder()),
      toggleAddStudents: () => dispatch(toggleAddStudents()),
      toggleCourseBuilder: () => dispatch(toggleCourseBuilder()),
      fetchDemoContent: (token) => dispatch(fetchDemoContent(token)),
      // log the user out of the App by resetting the Redux store to its default values
      logout: () => dispatch(logoutUser()),
      // check if the user needs to logout for a server upgrade etc.
      isLogoutRequired: (token) => dispatch(isLogoutRequired(token)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
