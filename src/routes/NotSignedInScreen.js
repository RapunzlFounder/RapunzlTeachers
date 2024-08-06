import React, { Component } from 'react';
import LeftSignUpImage from '../assets/images/NotSignedIn/LeftSignUpImage.jpeg';
import RightSignUpImage from '../assets/images/NotSignedIn/RightSignUpImage.jpeg';
import Container from '@mui/material/Container';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import LoginContainer from '../components/SignIn/LoginContainer';
import CreateAccountContainer from '../components/SignIn/CreateAccountContainer';
import Footer from '../components/Admin/Footer';
import Logo from '../assets/images/Admin/Logo.png';


import '../styles/AuthLoadingScreen.css';
import '../styles/NotSignedInScreen.css';
import { connect } from 'react-redux';


class NotSignedInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
	    tab: 1,
      loginTabsVisible: true,
    };
  }

  handleChange(event, newValue) {
    if (!this.props.loading) {
      // eslint-disable-next-line
      if (this.state.tab == 0) {
        this.setState({ tab: 1 });
      } else {
        this.setState({ tab: 0 });
      }
    }
  };

  toggleLoginTabs = () => {
    this.setState({ loginTabsVisible: !this.state.loginTabsVisible });
  }

  render() {
     return(
      <div className="background" style={{ backgroundColor: '#00120a', height: '160vh' }}>
        <Container
          disableGutters={true}
          fixed={false}
          maxWidth={false}
        >
          <div className="sign-container">
            <div className="sign-in-container">
              <img
                alt="create Rapunzl account left side graphic"
                src={LeftSignUpImage}
                className="leftImage"
              />
              <div className="text-container login-contanier">
                <div className='signup-logo-flex'>
                  <img
                    alt="rapunzl logo"
                    src={Logo}
                    className="sign-up-graphic"
                  />
                  <div className='sign-up-title'>
                    Rapunzl
                  </div>
                </div>
                <div className="sign-up-subtext">
                  Educator Portal
                </div>
                {this.state.loginTabsVisible && (
                  <Tabs value={this.state.tab} onChange={() => this.handleChange()} aria-label="toggles create account and login" centered>
                    <Tab label="Login" />
                    <Tab label="Join" />
                  </Tabs>
                )}
                <div className="sign-in-container" style={{ justifyContent: 'column', paddingTop: 25 }}>
                  {// eslint-disable-next-line
                  this.state.tab == 1 && (
                    <CreateAccountContainer />
                  )}
                  {// eslint-disable-next-line
                  this.state.tab == 0 && (
                    <LoginContainer
                      toggleLoginTabs={this.toggleLoginTabs}
                    />
                  )}
                </div>
              </div>
              <img
                alt="create Rapunzl account right side graphic"
                src={RightSignUpImage}
                className="rightImage"
              />
            </div>
          </div>
        </Container>
        <Footer />
      </div>
     );
   }
}

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    // Redux State For Loading To Disable Login/Join Toggle While Loading
    loading: state.userDetails.loading,
  };
};

export default connect(mapStateToProps)(NotSignedInScreen);
