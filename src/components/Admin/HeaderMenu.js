import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { connect } from 'react-redux';
import { logoutUser } from '../../ActionTypes/loginActions';
import { setMenuTab } from "../../ActionTypes/dashboardActions";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import House from '@mui/icons-material/House';
import LibraryBooks from '@mui/icons-material/LibraryBooks';
import Class from '@mui/icons-material/Class';
import MenuBook from '@mui/icons-material/MenuBook';
import Settings from '@mui/icons-material/Settings';
import QuizIcon from '@mui/icons-material/Quiz';
import Logout from '@mui/icons-material/Logout';

class HeaderMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      anchor: null,
      // If JWTToken becomes null, we navigate the user to the login screen to login again
      handleLogout: false
    }
  }

  handleMenuButtonClick = (e) => {
    if (this.state.open) {
      this.setState({ anchor: null, open: false });
    } else {
      this.setState({ anchor: e.currentTarget, open: true });
    }
  }

  // Handles Logout & Navigation When Selected In Menu By Updating State & Calling Navigate Component
  handleLogout = () => {
    // Handles Logging Out User & Routing To AuthLoadingScreen
    this.props.logout();
    this.setState({ open: false, navigateToLogin: true });
  };

  handleClose = () => {
    this.setState({ anchor: null, open: false });
  }

  // TODO: PRODUCTS - Update These Options To Reflect Admin Options In Left Menu

  render() {
    // Handles Navigation After User Decides To Logout
    if (this.state.navigateToLogin) {
      return (
        <Navigate to="/login" replace={true} />
      );
    } else {
      return (
        <div className="mobile-menu-container">
          <Button
            id="basic-button"
            aria-controls={this.state.open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={this.state.open ? 'true' : undefined}
            onClick={this.handleMenuButtonClick}
            title="View Menu"
            style={{ marginTop: 15, marginRight: 9 }}
          >
            <MenuIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={this.state.anchor}
            open={this.state.open}
            onClose={this.handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <div onClick={() => this.props.setMenuTab(1)} className="menu-item-flex">
              <House fontSize="small" style={{ fill: '#cefff4 '}} />
              <div className="menu-item-text">
                Dashboard
              </div>
            </div>
            {/* TODO: PRODUCTS - Check if user is allowed to view classroom feature viewCourses */}
            <div onClick={() => this.props.setMenuTab(2)} className="menu-item-flex">
              <LibraryBooks fontSize="small" style={{ fill: '#cefff4 '}} />
              <div className="menu-item-text">
                My Courses
              </div>
            </div>
            {/* TODO: PRODUCTS - Check if user is allowed to view classroom feature viewClassrooms */}
            <div onClick={() => this.props.setMenuTab(3)} className="menu-item-flex">
              <Class fontSize="small" style={{ fill: '#cefff4 '}} />
              <div className="menu-item-text">
                My Classroom
              </div>
            </div>
            <div onClick={() => this.props.setMenuTab(4)} className="menu-item-flex">
              <MenuBook fontSize="small" style={{ fill: '#cefff4 '}} />
              <div className="menu-item-text">
                Resources
              </div>
            </div>
            <div onClick={() => this.props.setMenuTab(6)} className="menu-item-flex">
              <Settings fontSize="small" style={{ fill: '#cefff4 '}} />
              <div className="menu-item-text">
                Settings
              </div>
            </div>
            <div onClick={() => this.props.setMenuTab(9)} className="menu-item-flex">
              <QuizIcon fontSize="small" style={{ fill: '#cefff4 '}} />
              <div className="menu-item-text">
                FAQ
              </div>
            </div>
            <div onClick={() => this.handleLogout()} className="menu-item-flex">
              <Logout fontSize="small" style={{ fill: this.props.colors.perfDown }} />
              <div className="menu-item-text" style={{ color: this.props.colors.perfDown }}>
                Logout
              </div>
            </div>
          </Menu>
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

export default connect(mapStateToProps, mapDispatchToProps)(HeaderMenu);
