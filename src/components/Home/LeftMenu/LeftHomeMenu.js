import React, { Component } from 'react';
import { connect } from 'react-redux';
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

class LeftHomeMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigateToLogin: false
    }
  }

  // Handles Logout & Navigation When Selected In Menu By Updating State & Calling Navigate Component
  handleLogout = () => {
    // Handles Logging Out User & Routing To AuthLoadingScreen
    this.props.logout();
    this.setState({ navigateToLogin: true });
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

  // Handles The Number Of Trades Placed By All Of The Students In Any Of The Teacher User's Classrooms
  handleNumberOfTrades() {
    if (this.props.allTeacherClassrooms.length === 0) {
      return 0;
    } else {
      let numberOfTrades = 0;
      for (var i in this.props.allTeacherClassrooms) {
        if (this.props.allTeacherClassrooms[i].studentList.length !== 0) {
          for (var j in this.props.allTeacherClassrooms[i].studentList) {
            numberOfTrades = numberOfTrades + this.props.allTeacherClassrooms[i].studentList[j].numberOfStockTrades + this.props.allTeacherClassrooms[i].studentList[j].numberOfCryptoTrades;
          }
        }
      }
      return numberOfTrades;
    }
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
          <img alt='' className='profile-picture' src={ProfileIcon} />
          <div className='profile-name'>
            {this.props.firstName} {this.props.lastName}
          </div>
          <div className='profile-username'>
            @{this.props.username}
          </div>
          <div onClick={() => this.props.setMenuTab(7)} className='profile-contact-button'>
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
                {this.handleNumberOfTrades()}
              </div>
              <div className='profile-flex-subtext'>
                Trades
              </div>
            </div>
          </div>
          <div className='profile-menu'>
            <div onClick={() => this.props.setMenuTab(1)} className={`profile-menu-item ${this.props.tab === 1 ? 'selected-menu-item' : ''}`}>
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
            <div onClick={() => this.props.setMenuTab(2)} className={`profile-menu-item ${this.props.tab === 2 ? 'selected-menu-item' : ''}`}>
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
            <div onClick={() => this.props.setMenuTab(3)} className={`profile-menu-item ${this.props.tab === 3 ? 'selected-menu-item' : ''}`}>
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
            <div onClick={() => this.props.setMenuTab(4)} className={`profile-menu-item ${this.props.tab === 4 ? 'selected-menu-item' : ''}`}>
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
            <div onClick={() => this.props.setMenuTab(5)} className={`profile-menu-item ${this.props.tab === 5 ? 'selected-menu-item' : ''}`}>
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
            <div onClick={() => this.props.setMenuTab(6)} className={`profile-menu-item ${this.props.tab === 6 ? 'selected-menu-item' : ''}`}>
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
            <div onClick={() => this.props.setMenuTab(9)} className={`profile-menu-item ${this.props.tab === 9 ? 'selected-menu-item' : ''}`}>
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
            <div onClick={() => this.handleLogout()} className='profile-menu-item' style={{ borderBottom: 'none' }}>
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
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftHomeMenu);
