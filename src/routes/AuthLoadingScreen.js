import React, { Component } from 'react';
import { Navigate } from "react-router-dom";
import { connect } from 'react-redux';
import MaintenanceImage from '../assets/images/NotSignedIn/Maintenance.png';
import LeftSignUpImage from '../assets/images/NotSignedIn/LeftSignUpImage.jpeg';
import RightSignUpImage from '../assets/images/NotSignedIn/RightSignUpImage.jpeg';
import { fetchMaintenance } from '../ActionTypes/maintenanceActions';
import Container from '@mui/material/Container';
import '../styles/AuthLoadingScreen.css';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

// For This Specific Screen, Do Not Use A Pure Component
class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      isMaintenance: false,            
    };
  }

  componentDidMount() {
    // this.props.logoutUser();
    // check to see if there is any current system maintenance
    this.props.checkMaintenance();
  }

  componentDidUpdate(prevProps) {
    // eslint-disable-next-line
    if (this.props.appLoading != prevProps.appLoading && this.props.appLoading == false) {
      const appLoading = false;
      let isMaintenance = false;
      this.setState({loading:appLoading });
      // eslint-disable-next-line
      if (this.props.isMaintenance != prevProps.isMaintenance && this.props.isMaintenance == true) {
        isMaintenance = true
        this.setState({isMaintenance:isMaintenance} );
      }
    }
  }

  // Handles Converting End Time Into Readable String
  handleEndTime() {
    let time = parseInt(this.props.endTime.slice(0,2));
    if (time > 12) {
      time = time - 12;
    }
    // eslint-disable-next-line
    if (this.props.endTime.length == 8) {
      return time + this.props.endTime.slice(2,5) + ' CT';
    } else {
      return time + this.props.endTime.slice(1,4) + ' CT';
    } 
  }

  // Handles Converting End Date Into More User-Friendly String
  handleEndDate() {
    let year = this.props.endDate.slice(0, 4);
    let month = parseInt(this.props.endDate.slice(5, 7));
    let day = parseInt(this.props.endDate.slice(8, 10));
    return month + '/' + day + '/' + year;
  }

  render() {
    // Handles Initial Loading State As We Check If App Is In Maintenance
    if (this.state.loading){
      return (
        <div className="background">
          <Container
            disableGutters={true}
            fixed={false}
            maxWidth={'xl'}
          >
            <div className="sign-in-container">
              <img
                alt="create Rapunzl account left side graphic"
                src={LeftSignUpImage}
                className="leftImage"
              />
              <div className="text-container">
                <CircularProgress color="success" />
                <div className="loading-text" style={{ color: 'white' }}>
                  Loading Rapunzl
                </div>
                <div className="loading-subtext" style={{ color: 'white' }}>
                  Please Wait...
                </div>
              </div>
              <img
                alt="create Rapunzl account right side graphic"
                src={RightSignUpImage}
                className="rightImage"
              />
            </div>
          </Container>
        </div>     
      );
    }
    // Renders Maintenance Screen If, After Loading, isMaintenance Is True
    else if (!this.state.loading && this.state.isMaintenance){
      return (
        <div className="background">
          <Container
              disableGutters={true}
              fixed={false}
              maxWidth={'xl'}
          >
            <div className="sign-in-container">
              <img
                alt="create Rapunzl account left side graphic"
                src={LeftSignUpImage}
                className="leftImage"
              />
              <div className="text-container">
                <img src={MaintenanceImage} className="app-logo" alt="logo" />
                <h1 className="header">
                  Rapunzl Maintenance
                </h1>
                <div className="header-bar" />
                <h4 className="text">
                  We expect to be back before:
                </h4>
                <p className="time-text">
                  {this.handleEndTime()} 
                </p>
                <p className="date-text">
                  {this.handleEndDate()}
                </p>
                <h4 className="text">
                  Thanks for your patience!
                </h4>
                <div className="p-subtext">
                  - Rapunzl Developers
                </div>
                <Button
                  style={{ textTransform: 'none', marginTop: 25 }}
                  variant="outlined"
                  color="success"
                  size="medium"
                  href="https://www.rapunzlinvestments.com"
                >
                  View Rapunzl Website
                </Button>
              </div>
              <img
                alt="create Rapunzl account right side graphic"
                src={RightSignUpImage}
                className="rightImage"
              />
            </div>
          </Container>
        </div>
      );
    }
    // Renders Home Screen If User Is Logged In & JWT Token Is Not Null
   else if (!this.state.loading && this.props.loggedIn && this.props.jwtToken != null){
    return <Navigate to="/dashboard" />
   }
    // Renders Login Screen If User Is Not Logged In. Defaults to Create Account State But Easily Adjustable
   else{
      return <Navigate to="/login" />
   }
  }
}

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    isMaintenance: state.maintenance.maintenance,
    loggedIn: state.userDetails.loggedIn,
    jwtToken: state.userDetails.jwtToken,
    didWalk: state.userDetails.didWalk,
    version: state.gamesettings.appVersion,
    appLoading: state.maintenance.loading,
    startDate: state.maintenance.startDate,
    startTime: state.maintenance.startTime,
    endDate: state.maintenance.endDate,
    endTime: state.maintenance.endTime,
  };
};

// Map Dispatch To Props (Dispatch Actions to Reducers. Reducers then modify the redux store state.
const mapDispatchToProps = (dispatch) => {
  // Action
    return {
      // Create User
      checkMaintenance: () => dispatch(fetchMaintenance()),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen);
