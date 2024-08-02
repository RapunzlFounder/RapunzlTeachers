import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setMenuTab } from '../../../ActionTypes/dashboardActions';
import { getAllTeacherClassrooms } from '../../../selectors/classroomSelectors';
import { Navigate } from "react-router-dom";
import { logoutUser } from '../../../ActionTypes/loginActions';
import ArrowForward from '@mui/icons-material/KeyboardArrowRight';
import House from '@mui/icons-material/House';
import LibraryBooks from '@mui/icons-material/LibraryBooks';
import Class from '@mui/icons-material/Class';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import MenuBook from '@mui/icons-material/MenuBook';
import Settings from '@mui/icons-material/Settings';
import QuizIcon from '@mui/icons-material/Quiz';
import Logout from '@mui/icons-material/Logout';
import ProfileIcon from '../../../assets/images/Admin/Profile.png';
import '../../../styles/Home/HomeScreen.css';
import Alert from '../../Admin/Alert';

class LeftHomeMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigateToLogin: false,
      alertVisible: false,
    }
  }

  // Handles Logout & Navigation When Selected In Menu By Updating State & Calling Navigate Component
  handleLogout = () => {
    // Handles Logging Out User & Routing To AuthLoadingScreen
    this.props.logout().then(() => {
      // this state change will trigger the Navigate component to redirect to the login screen
      this.setState({ navigateToLogin: true, alertVisible: false });
    });
  };

  // Handles The Number Of Students Assigned To Any Classroom Of The Current Teacher User
  handleNumberOfStudents() {
    if (this.props.allTeacherClassrooms.length === 0) {
      return 0;
    } else {
      let numberOfStudents = 0;
      for (var i in this.props.allTeacherClassrooms) {
        numberOfStudents = numberOfStudents + this.props.allTeacherClassrooms[i].noStudents;
      }
      return numberOfStudents;
    }
  }

  // Pass Through Arrow Function Which Toggles Visibility Of Alert Dialog
  toggleAlert = () => {
    this.setState({ alertVisible: !this.state.alertVisible });
  }

  render() {
    // Handles Navigation After User Decides To Logout
    if (this.state.navigateToLogin) {
      return (
        <Navigate to="/login" replace={true} />
      );
    } else {
      return (
        <div className='tile profile-tile left-home-menu'>
          <Alert
            visible={this.state.alertVisible}
            dismiss={this.toggleAlert}
            title={'Are You Sure?'}
            message={'You will need to login again in order to view information about your classroom, courses, and grades that we have collected.'}
            option={this.handleLogout}
            optionText={'Logout'}
            option2Text={'Nevermind'}
          />
          <img alt='' className='profile-picture' src={ProfileIcon} />
          <div className='profile-name'>
            {this.props.firstName} {this.props.lastName}
          </div>
          <div className='profile-username'>
            @{this.props.username}
          </div>
          <div title="Get In Touch With Us If You Have Issues" onClick={() => this.props.setMenuTab(7)} className='profile-contact-button'>
            Get Support
          </div>
          <div className='profile-flex'>
            <div className='profile-flex-item'>
              <div className='profile-flex-text'>
                {this.handleNumberOfStudents()}
              </div>
              <div className='profile-flex-subtext'>
                Students
              </div>
            </div>
            <div className='profile-flex-item'>
              <div className='profile-flex-text'>
                {this.props.allTeacherClassrooms.length}
              </div>
              <div className='profile-flex-subtext'>
                Class{this.props.allTeacherClassrooms.length === 1 ? '' : 'es'}
              </div>
            </div>
          </div>
          <div className='profile-menu'>
            <div title="Return To Dashboard" onClick={() => this.props.setMenuTab(1)} className={`profile-menu-item ${this.props.tab === 1 ? 'selected-menu-item' : ''}`}>
              <div className='menu-flex'>
                <div className='menu-left'>
                  <House fontSize="small" />
                  <div className='menu-text'>
                    Dashboard
                  </div>
                </div>
                <ArrowForward fontSize="small" />
              </div>
            </div>
            <div title="View All Your Courses" onClick={() => this.props.setMenuTab(2)} className={`profile-menu-item ${this.props.tab === 2 ? 'selected-menu-item' : ''}`}>
              <div className='menu-flex'>
                <div className='menu-left'>
                  <LibraryBooks fontSize="small" />
                  <div className='menu-text'>
                    My Courses
                  </div>
                </div>
                <ArrowForward fontSize="small" />
              </div>
            </div>
            <div title="View All Your Classrooms" onClick={() => this.props.setMenuTab(3)} className={`profile-menu-item ${this.props.tab === 3 ? 'selected-menu-item' : ''}`}>
              <div className='menu-flex'>
                <div className='menu-left'>
                  <Class fontSize="small" />
                  <div className='menu-text'>
                    My Classroom
                  </div>
                </div>
                <ArrowForward fontSize="small" />
              </div>
            </div>
            <div title="Discover Financial Literacy Resources" onClick={() => this.props.setMenuTab(4)} className={`profile-menu-item ${this.props.tab === 4 ? 'selected-menu-item' : ''}`}>
              <div className='menu-flex'>
                <div className='menu-left'>
                  <MenuBook fontSize="small" />
                  <div className='menu-text'>
                    Resources
                  </div>
                </div>
                <ArrowForward fontSize="small" />
              </div>
            </div>
            <div title="View Your Classroom Grades" onClick={() => this.props.setMenuTab(5)} className={`profile-menu-item ${this.props.tab === 5 ? 'selected-menu-item' : ''}`}>
              <div className='menu-flex'>
                <div className='menu-left'>
                  <AutoGraphIcon fontSize="small" />
                  <div className='menu-text'>
                    Gradebook
                  </div>
                </div>
                <ArrowForward fontSize="small" />
              </div>
            </div>
            <div title="Adjust Your Account Settings" onClick={() => this.props.setMenuTab(6)} className={`profile-menu-item ${this.props.tab === 6 ? 'selected-menu-item' : ''}`}>
              <div className='menu-flex'>
                <div className='menu-left'>
                  <Settings fontSize="small" />
                  <div className='menu-text'>
                    Settings
                  </div>
                </div>
                <ArrowForward fontSize="small" />
              </div>
            </div>
            <div title="View Frequently Asked Questions" onClick={() => this.props.setMenuTab(9)} className={`profile-menu-item ${this.props.tab === 9 ? 'selected-menu-item' : ''}`}>
              <div className='menu-flex'>
                <div className='menu-left'>
                  <QuizIcon fontSize="small" />
                  <div className='menu-text'>
                    FAQ
                  </div>
                </div>
                <ArrowForward fontSize="small" />
              </div>
            </div>
            <div title="Logout & Return To Login Screen" onClick={() => this.toggleAlert()} className='profile-menu-item' style={{ borderBottom: 'none' }}>
              <div className='menu-left'>
                <Logout fontSize="small" style={{ fill: this.props.colors.perfDown }} />
                <div className='menu-text' style={{ color: this.props.colors.perfDown }}>
                  Logout
                </div>
              </div>
            </div>
          </div>
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
    firstName: state.userDetails.firstName,
    lastName: state.userDetails.lastName,
    username: state.userDetails.username,
    allTeacherClassrooms: getAllTeacherClassrooms(state),
  };
};

// Map Dispatch To Props (Dispatch Actions to Reducers. Reducers then modify the redux store state.
const mapDispatchToProps = (dispatch) => {
  // Action
    return {
      // log the user out of the App
      logout: () => dispatch(logoutUser()),
      // Handles sending message to Database to email to support email address
      setMenuTab: (tab) => dispatch(setMenuTab(tab)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftHomeMenu);
