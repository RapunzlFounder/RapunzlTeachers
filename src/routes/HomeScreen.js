import React, { Component } from 'react';
import moment from 'moment';
import { Outlet, Navigate } from "react-router-dom";
import { connect } from 'react-redux';
import { fetchBigQuery, fetchMiniQuery } from '../ActionTypes/userDataActions';
import { resetNotificationErrors } from '../ActionTypes/notificationActions';
import Container from '@mui/material/Container';
import Header from '../components/Admin/Header';
import Footer from '../components/Admin/Footer';
import '../styles/Home/HomeScreen.css';
import LeftHomeMenu from '../components/Home/LeftMenu/LeftHomeMenu';
import Dashboard from '../components/Home/Dashboard/Dashboard';
import MyCourse from '../components/Home/MyCourses/MyCourse';
import ResourceLibrary from '../components/Home/Resources/ResourceLibrary';
import QuickAccess from '../components/Home/RightMenu/QuickAccess';
import MyClassroom from '../components/Home/MyClassroom/MyClassroom';
import GradebookTile from '../components/Home/Gradebook/GradebookTile';
import TrendingCourses from '../components/Home/RightMenu/TrendingCourses';
import Support from '../components/Home/Support';
import Settings from '../components/Home/Settings';
import YourPlan from '../components/Home/YourPlan';
import FAQ from '../components/Home/FAQ';
import TooNarrowIcon from '../assets/images/Admin/TooNarrow.png';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gettingMiniQuery: false,
      alertVisible: false,
      visibleTab: 1,
      previousTab: 1,
      alertTitle: '',
      alertMessage: '',
      alertType: '',
      contactUs: false,
      addingStudents: false,
      courseBuilderVisible: false,
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
  }

  componentDidUpdate(prevProps) {
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
      this.props.fetchBigQuery(this.props.jwtToken).then(response => {
        if (response) {
          this.setState({ gettingMiniQuery: false });
        }
      })
    }
  }

  // update the user details if needed (Mini Query)
  _getUpdatedUserDetails = () => {
    const localTime = new Date();
    const currentTime = moment(localTime); 
    // calculate the time difference in seconds between the current time and the last time that the teacher's classrooms details were retrieved from the server
    const classroomRetrievedTime= moment(this.props.classroomLastRetrievedTime);
    const secondsDiff = currentTime.diff(classroomRetrievedTime, 'seconds');
    // if it has been 30 minutes or more since the last time that the user retrieved the mini query data, retreive it sgsin.  DO NOT CHANGE THIS NUMBER 300!  
    if (secondsDiff >= 1800){      
      this.setState({ gettingMiniQuery: true });
      this.props.FetchMiniQuery(this.props.jwtToken);
    }
  }

  // Toggles Visibility Of Alert Dialog
  toggleAlert = () => {
    this.setState({ alertVisible: !this.state.alertVisible });
  }

  // Updates the currently selected tab and passed through as arrow functions to LeftHomeMenu
  setMenuTab = (int) => {
    if (this.state.visibleTab !== int) {
      if (this.state.visibleTab === 7 || this.state.visibleTab === 8) {
        this.setState({ visibleTab: int, addingStudents: false, courseBuilderVisible: false, creatingClass: false });
      } else {
        this.setState({ previousTab: this.state.visibleTab, visibleTab: int, addingStudents: false, courseBuilderVisible: false, creatingClass: false });
      }
    }
  }

  // Pass Through Arrow Function To Add Students In My Classroom Through Quick Access Component
  quickAccessAddStudents = () => {
    if (this.state.visibleTab === 7 || this.state.visibleTab === 8) {
      this.setState({ courseBuilderVisible: false, addingStudents: true, creatingClass: true, visibleTab: 3 });
    } else {
      this.setState({ previousTab: this.state.visibleTab, addingStudents: true, creatingClass: true, courseBuilderVisible: false, visibleTab: 3 });
    }
  }

  // Pass Through Arrow Function To Go To Course Builder In My Courses Through Quick Access Component
  quickAccessCourseBuilder = () => {
    if (this.state.visibleTab === 7 || this.state.visibleTab === 8) {
      this.setState({ courseBuilderVisible: true, addingStudents: false, creatingClass: false, visibleTab: 2 });
    } else {
      this.setState({ previousTab: this.state.visibleTab, addingStudents: false, creatingClass: false, courseBuilderVisible: true, visibleTab: 2 });
    }
  }

  toggleAddStudents = () => {
    this.setState({ addingStudents: !this.state.addingStudents, creatingClass: false });
  }

  toggleCourseBuilder = () => {
    this.setState({ courseBuilderVisible: !this.state.courseBuilderVisible, creatingFalse: false });
  }

  render() {
    // eslint-disable-next-line
    if (this.props.jwtToken == null || this.props.jwtToken == undefined) {
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
          <Header setMenuTab={this.setMenuTab} />
          <div className='home-container'>
            <div className='not-available-container'>
              <img alt='' className='not-available-image' src={TooNarrowIcon} />
              <div className='not-available-title'>
                Your Browser Is Too Narrow
              </div>
              <div className='not-available-text'>
                At this point in time, Rapunzl's teacher portal is designed for computers and iPads. We do not provide a mobile version of our teacher portal.
              </div>
            </div>
            <LeftHomeMenu
              setMenuTab={this.setMenuTab}
              tab={this.state.visibleTab}
            />
            <div className='middle-section'>
              <Dashboard
                visible={this.state.visibleTab === 1}
                setMenuTab={this.setMenuTab}
                toggleCourseBuilder={this.quickAccessCourseBuilder}
                toggleCreateClassroom={this.quickAccessAddStudents}
              />
              <MyCourse
                visible={this.state.visibleTab === 2}
                courseBuilderVisible={this.state.courseBuilderVisible}
                toggleCourseBuilder={this.toggleCourseBuilder}
                toggleCreateClassroom={this.quickAccessAddStudents}
                setMenuTab={this.setMenuTab}
              />
              <MyClassroom
                visible={this.state.visibleTab === 3}
                toggleAddStudents={this.toggleAddStudents}
                creatingClass={this.state.creatingClass}
                createClass={this.quickAccessAddStudents}
                addingStudents={this.state.addingStudents}
                setMenuTab={this.setMenuTab}
              />
              <ResourceLibrary
                visible={this.state.visibleTab === 4}
              />
              <GradebookTile
                visible={this.state.visibleTab === 5}
                toggleCreateClassroom={this.quickAccessAddStudents}
              />
              <Settings
                visible={this.state.visibleTab === 6}
              />
              <Support
                visible={this.state.visibleTab === 7}
                previousTab={this.state.previousTab}
                setMenuTab={this.setMenuTab}
              />
              <YourPlan
                visible={this.state.visibleTab === 8}
                previousTab={this.state.previousTab}
                setMenuTab={this.setMenuTab}
              />
              <FAQ
                visible={this.state.visibleTab === 9}
                setMenuTab={this.setMenuTab}
              />
            </div>
            <div className='tile right-section'>
              <QuickAccess
                toggleAddStudents={this.quickAccessAddStudents}
                toggleCourseBuilder={this.quickAccessCourseBuilder}
                setMenuTab={this.setMenuTab}
              />
              <TrendingCourses />
            </div>
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
  };
};

// Map Dispatch To Props (Dispatch Actions to Reducers. Reducers then modify the redux store state.
const mapDispatchToProps = (dispatch) => {
  // Action
    return {
      // reset errors related to notifications
      resetNotificationErrors: () => dispatch(resetNotificationErrors()),
      // Get all of the user data
      fetchBigQuery: (token) => dispatch(fetchBigQuery(token)),
      // executes the Mini Query
      FetchMiniQuery: (token) => dispatch(fetchMiniQuery(token)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
