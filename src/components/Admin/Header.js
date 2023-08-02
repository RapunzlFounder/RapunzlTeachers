import React from 'react';
import { connect } from 'react-redux';
import Logo from '../../assets/images/Admin/Logo.png';
import '../../styles/Admin/Header.css';
import HeaderMenu from './HeaderMenu';
import ToggleExpandButton from './ToggleExpandButton';

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
    if (!this.props.pdfVisible) {
      return (
        <div className='header-container'>
            <div className='header-flex'>
              <div className='company-logo-container'>
                <img alt="Rapunzl Company Logo" src={Logo} className="company-logo" />
              </div>
              <div className='header-right-flex'>
                <ToggleExpandButton />
                <HeaderMenu />
              </div>
            </div>
          </div>
      );
    } else {
      return (
        <div />
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
    // When we show the PDFViewer Component, We Hide The Header & Use Redux To Store The Current State
    pdfVisible: state.dashboard.pdfVisible,
  };
};

export default connect(mapStateToProps)(Header);
