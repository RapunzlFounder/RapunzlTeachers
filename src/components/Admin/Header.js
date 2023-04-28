import React from 'react';
import { Navigate } from "react-router-dom";
import { connect } from 'react-redux';
import { logoutUser } from '../../ActionTypes/loginActions';
import Logo from '../../assets/images/Admin/Logo.png';
import '../../styles/Admin/Header.css';
import HeaderMenu from './HeaderMenu';

class Header extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visbile: true,
      anchorEl: null,
      open: false,
      navigateToLogin: false,
      searchDrawerVisible: false,
    }
  }

  // Opens Menu When User Clicks Profile Icon In Top Right Corner Of Header
  handleMenuClick = (event) => {
    this.setState({ anchorEl: event.currentTarget, open: !this.state.open });
  };

  // Handles Closing Menu After User Has Clicked To Open The Menu
  handleClose = () => {
    this.setState({ anchorEl: null, open: false });
  };

  // Handles Logout & Navigation When Selected In Menu By Updating State & Calling Navigate Component
  handleLogout = () => {
    // Handles Logging Out User & Routing To AuthLoadingScreen
    this.props.logout();
    this.handleClose();
    this.setState({ navigateToLogin: true });
  };

  // Toggles Visibility Of Search Drawer When User Focuses On Search Bar Or Dismisses Search Bar Drawer
  // Must be arrow function because it is passed to child component to manipulate parent component state.
  toggleDrawer = () => {
    this.setState({ searchDrawerVisible: !this.state.searchDrawerVisible });
  }

  // Sets Search Bar Drawer Visibility To True
  // Must be arrow function because it is passed to child component to manipulate parent component state.
  showDrawer = () => {
    this.setState({ searchDrawerVisible: true });
  }
  
  render() {
    // Handles Navigation After User Decides To Logout
    if (this.state.navigateToLogin) {
      return (
        <Navigate to="/login" replace={true} />
      );
    }
    // Handles Rendering Search Bar In All Other Cases
    else {
      return (
        <div className='header-container'>
            <div className='header-flex'>
              <div className='company-logo-container'>
                <img alt="Rapunzl Company Logo" src={Logo} className="company-logo" />
              </div>
              <HeaderMenu setMenuTab={this.props.setMenuTab} />
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
    // Used To Disable Menu On Home Until Data Is Ready
    userdetailsLoading: state.userDetails.loading,
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
