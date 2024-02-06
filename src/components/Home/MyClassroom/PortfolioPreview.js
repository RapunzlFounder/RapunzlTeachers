import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { FetchOtherUserDetails } from '../../../ActionTypes/socialActions';
import { resetStudentPassword, resetStudentPortfolio } from '../../../ActionTypes/classroomActions';
import ProfileIcon from '../../../assets/images/School/BlankProfile.png';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import TextField from '@mui/material/TextField';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { objectToArray } from '../../../helper_functions/utilities';
import EmptyPositions from '../../../assets/images/Search/SearchEmpty.png';
import RuleIcon from '@mui/icons-material/Rule';
import CircularProgress from '@mui/material/CircularProgress';
import intHandler from '../../../helper_functions/intHelper';
import Alert from '../../Admin/Alert';
import SymbolTypes from '../../../graphql/enums/SymbolTypes';
import '../../../styles/Home/HomeScreen.css';

class PortfolioPreview extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
    this.state = {
      portfolioSelected: 'stock',
      resetPassword: false,
      password1: '',
      password2: '',
      onErrorPassword: false,
      passwordVisible: false,
      resetSuccess: false,
      newPassword: '',
      alertVisible: false,
      alertTitle: '',
      alertMessage: '',
      alertOption: null,
      alertOptionText: '',
      alertOptionText2: '',
      loading: true,
      error: false,
      userData: {
        stocks: [],
        crypto: [],
        closedStocks: [],
        closedCrypto: [],
        stockTrades: 0,
        cryptoTrades: 0
      },
    }
  }

  componentDidMount() {
    // Only fetches user details if there are no positions present in state and the component is visible
    if (this.state.userData.stocks.length === 0 && this.state.userData.crypto.length === 0 && this.props.visible === true) {
      this._fetchUserDetails();
    }
  }

  componentDidUpdate(prevProps) {
    // Fetches User Details When Component Becomes Visible
    if (prevProps.visible !== this.props.visible && this.props.visible === true) {
      this._fetchUserDetails();
    }
    // Handles Resetting State When Component Is No Longer Visible
    if (prevProps.visible !== this.props.visible && this.props.visible === false) {
      this.setState({
        portfolioSelected: 'stock',
        alertVisible: false,
        alertTitle: '',
        alertMessage: '',
        alertOption: null,
        alertOptionText: '',
        alertOptionText2: '',
        loading: true,
        error: false,
        userData: {
          stocks: [],
          crypto: [],
          stockTrades: 0,
          cryptoTrades: 0,
          stocksID: '',
          cryptoID: '',
        },
        resetPassword: false,
        password1: '',
        password2: '',
        onErrorPassword: false,
        passwordVisible: false,
        resetSuccess: false,
        newPassword: '',
      })
    }
  }

  // Handles Dispatch To Fetch Other User Details & Stores Result In State
  _fetchUserDetails() {
    this.setState({ loading: true, error: false });
    this.props.fetchOtherUserDetails(this.props.jwtToken, this.props.user.username).then((res) => {
      // Handles If There Is An Error With The Dispatch By Displaying Alert Modal & Setting Loading To False
      if (!(res && !('errors' in res))) {
        this.setState({
          alertVisible: true,
          alertTitle: 'Something Went Wrong...',
          alertMessage: 'We had an issue retrieving the portfolio information from our servers. ' + res.errors[0].message + ' Please try again in a few minutes or contact support.',
          alertOption: null,
          alertOptionText: '',
          alertOptionText2: '',
          loading: false,
          error: true,
        })
      }
      // Handles Successful Fetch By Updating State Values & Setting Loading To False
      else { 
        let stockPositions = [];
        let cryptoPositions = [];
        let closedStockPositions = [];
        let closedCryptoPositions = [];
        let stockPortfolioID = '';
        let cryptoPortfolioID = '';
        // Handles Mapping Positions To Array And Saving Arrays To State
        // Error Checks That Stock Portfolio Exists
        if (res.stockPortfolios !== undefined && res.stockPortfolios[Object.keys(res.stockPortfolios)] !== undefined) {
          // Handles Stock Portfolio ID
          stockPortfolioID = res.stockPortfolios[Object.keys(res.stockPortfolios)].id;
          // Handles Error Checking For Stock Positions
          if (res.stockPortfolios[Object.keys(res.stockPortfolios)].positions !== undefined) {
            stockPositions = objectToArray(res.stockPortfolios[Object.keys(res.stockPortfolios)].positions);
          }
          // Handles Error Checking For Closed Stock Positions
          if (res.stockPortfolios[Object.keys(res.stockPortfolios)].closedPositions !== undefined) {
            closedStockPositions = Object.keys(res.stockPortfolios[Object.keys(res.stockPortfolios)].closedPositions);
          }
        }
        // Error Checks That Crypto Portfolio Exists
        if (res.cryptoPortfolios !== undefined && res.cryptoPortfolios[Object.keys(res.cryptoPortfolios)] !== undefined) {
          // Handles Crypto Portfolio ID
          cryptoPortfolioID = res.cryptoPortfolios[Object.keys(res.cryptoPortfolios)].id;
          // Handles Error Checking For Crypto Positions
          if (res.cryptoPortfolios[Object.keys(res.cryptoPortfolios)].positions !== undefined) {
            cryptoPositions = objectToArray(res.cryptoPortfolios[Object.keys(res.cryptoPortfolios)].positions);
          }
          // Handles Error Checking For Closed Crypto Positions
          if (res.cryptoPortfolios[Object.keys(res.cryptoPortfolios)].closedPositions !== undefined) {
            closedCryptoPositions = Object.keys(res.cryptoPortfolios[Object.keys(res.cryptoPortfolios)].closedPositions);
          }
        }
        this.setState({
          loading: false,
          error: false,
          userData: {
            stocks: stockPositions,
            crypto: cryptoPositions,
            closedStocks: closedStockPositions,
            closedCrypto: closedCryptoPositions,
            stockTrades: stockPositions.length + closedStockPositions.length,
            cryptoTrades: cryptoPositions.length + closedCryptoPositions.length,
            stocksID: stockPortfolioID,
            cryptoID: cryptoPortfolioID
          },
        });
      }
    })
  }

  // Allows User To Toggle Between Stock & Crypto When Viewing Another Users Portfolios
  selectPortfolioType(type) {
    this.setState({ portfolioSelected: type });
  }

  // Pass Through Arrow Function That Handles Dismissing The Alert Modal After An Error
  toggleAlert = () => {
    this.setState({ alertVisible: !this.state.alertVisible });
  }

  // Get Portfolio Data Depending Upon Tab Selected
  _getPortfolioData() {
    if (this.state.portfolioSelected === 'stock') {
      return this.state.userData.stocks;
    } else {
      return this.state.userData.crypto;
    }
  }

  // Handles determining color based on if value is less than 0 or not
  handleBackgroundColor(float) {
    if (float < 0) {
      return '#ed3232';
    } else {
      return '#007154';
    }
  }

  // Handles Finding The Time Difference From When The User Opened A Position Up Until Present
  // Start is Passed Through From item in map. End is a new moment instance created when function is called.
  getDiff(start, end) {
    try {
      const diffDuration = moment.duration(end.diff(start));
      const str = [];
      let plural = 's';
      if (diffDuration.years() > 0) {
        // eslint-disable-next-line
        if ((diffDuration.years() * 12) + diffDuration.months() == 1) {
          plural = '';
        }
        str.push(`${(diffDuration.years() * 12) + diffDuration.months()} month${plural}`);
      }
      if (diffDuration.months() > 0) {
        // eslint-disable-next-line
        if (diffDuration.months() == 1) {
          plural = '';
        }
        str.push(`${diffDuration.months()} month${plural}`);
      }

      if (diffDuration.days() > 0) {
        // eslint-disable-next-line
        if (diffDuration.days() == 1) {
          plural = '';
        }
        str.push(`${diffDuration.days()} day${plural}`);
      }
      if (diffDuration.hours() > 0) {
        // eslint-disable-next-line
        if (diffDuration.hours() == 1) {
          plural = '';
        }
        str.push(`${diffDuration.hours()} hour${plural}`);
      }
      if (diffDuration.minutes() > 0) {
        // eslint-disable-next-line
        if (diffDuration.minutes() == 1) {
          plural = '';
        }
        str.push(`${diffDuration.minutes()} minute${plural}`);
      }
      // eslint-disable-next-line
      if (str.length == 0) {
        return 'Less Than 1 Minute';
      }
      return str[0];
    } catch {
      return 'Less Than 1 Minute';
    }
  }

  // This updates the Alert State To Display A Native Alert When User Selects To Reset A Students Password
  handleResetPassword() {
    this.setState({ resetPassword: true });
  }

  // Handles Cancelling Reset Password If A User Decides They Do Not Want To Change A Student Password
  cancelResetPassword() {
    this.setState({
      resetPassword: false,
      password1: '',
      password2: '',
      onErrorPassword: false,
    });
  }

  // Handles Changing Initial Password Value In TextField and Setting Error To False
  changePassword1(value) {
    this.setState({ password1: value, onErrorPassword: false });
  }

  // Handles Changing Password Confirm Value In TextField and Setting Error To False
  changePassword2(value) {
    this.setState({ password2: value, onErrorPassword: false });
  }

  // Handles Dispatch To GraphQL To Reset Student Password
  resetPassword() {
    this.setState({ loadingResetPassword: true })
    // Checks To Make Sure The 2 Passwords Match Before Submitting
    if (this.state.password1 !== this.state.password2) {
      this.setState({
        onErrorPassword: true,
        alertTitle: 'Passwords Do Not Match',
        alertMessage: 'The passwords you entered do not match, so we are unable to reset the student account. Please try again.',
        alertVisible: true,
        alertOption: false,
        alertOptionText: '',
        alertOptionText2: false,
        loadingResetPassword: false
      })
    }
    // Checks To Ensure The Password Is At Least 8 Characters Long
    else if (this.state.password1.length <8) {
      this.setState({
        onErrorPassword: true,
        alertTitle: 'New Password Is Too Short',
        alertMessage: 'All Rapunzl passwords must be at least 8 characters. Please ensure the password is at least 8 characters long and try again.',
        alertVisible: true,
        alertOption: false,
        alertOptionText: '',
        alertOptionText2: false,
        loadingResetPassword: false
      });
    }
    // Handles If Passwords Match By Dispatching To GraphQL
    else {
      this.props.resetStudentPassword(this.props.jwtToken, JSON.stringify([this.props.user.username.toString()]), this.state.password1).then((res) => {
        if (!(res && !('errors' in res))) {
          this.setState({
            // This part of state handles the native alert which is displayed to the teacher if the graphql dispatch fails
            alertOption: false,
            alertOptionText: '',
            alertTitle: 'Failed To Reset Password',
            alertMessage: 'Something went wrong trying to connect to the server and reset the student account. ' + res.errors[0].message,
            alertVisible: true,
            alertOptionText2: false,
            // This part of state is used for the password reset functionality which is hidden on the event of an error
            loadingResetPassword: false,
            resetSuccess: false,
            resetPassword: false,
            password1: '',
            password2: '',
            onErrorPassword: false,
            passwordVisible: false,
            newPassword: '',
          });
        } else {
          this.setState({
            // This part of state handles displaying a native alert to the teacher with the new password
            alertOption: false,
            alertOptionText: '',
            alertTitle: 'Reset Password Successful',
            alertMessage: 'The new password for the student is: ' + res.studentlogin[0].password + `  Please note that the password is case-sensitive. If you continue experiencing issues, don't hestiate to contact support`,
            alertVisible: true,
            alertOptionText2: false,
            // This hides the functionality for changing a user password since it is complete
            loadingResetPassword: false,
            resetPassword: false,
            password1: '',
            password2: '',
            onErrorPassword: false,
            passwordVisible: false,
            // This part of state is updated to display the new password to the teacher
            resetSuccess: true,
            newPassword: this.state.password1,
          });
        }
      });
    }
  }

  // Handles Toggling Password Visibility When User Selects The Eye Icon
  toggleVisibility() {
    this.setState({ passwordVisible: !this.state.passwordVisible });
  }

  // Sets Visibility of Native Alert To True When User Selects To Reset A Students Account
  pressResetAccount() {
    this.setState({
      alertTitle: 'Are You Sure?',
      alertMessage: 'Resetting an account is permanent. Once you reset a student account, it cannot be undone. The student will be removed from all competitions and their portfolio will go to zero.',
      alertOptionText: 'Reset Account',
      alertVisible: true,
      alertOption: this.resetAccount,
      alertOptionText2: 'Nevermind'
    });
  }

  // Handles Dispatch To GraphQL To Reset Student Account. This Will Set Account As If It Was Just Created And Student Will Receive Email
  resetAccount = () => {
    let portfolioID = this.state.portfolioSelected === 'stock' ? this.state.userData.stocksID : this.state.userData.cryptoID;
    let portfolioType = this.state.portfolioSelected === 'stock' ? SymbolTypes.US_Stock : SymbolTypes.Crypto;
    this.props.resetPortfolio(this.props.jwtToken, portfolioID, portfolioType).then((res) => {
      // Handles If There Is An Error With The Dispatch By Displaying Alert Modal & Setting Loading To False
      if (!(res && !('errors' in res))) {
        this.setState({
          alertVisible: true,
          alertTitle: 'Cannot Complete Request',
          alertMessage: 'You are unable to reset a student account through Rapunzl For Teachers at this time. Please contact support for assistance in resetting a student portfolio. Please note this will make the student ineligible for any competitions they are currently in.',
          alertOption: null,
          alertOptionText: '',
          alertOptionText2: '',
          loading: false,
          error: false,
        });
      } 
      // Handles Successful Fetch By Updating State Values & Setting Loading To False
      else {
        // Handles Notifying The User That We Have Successfully Reset The Student Account
        this.setState({
          alertVisible: true,
          alertTitle: 'Reset Complete!',
          alertMessage: 'You have successfully reset the student account. The student will need to logout and log back in on their device for the change to take affect.',
          alertOption: null,
          alertOptionText: '',
          alertOptionText2: '',
          loading: false,
          error: false,
        });
        // Updates State To Reflect Reset Account
        if (this.state.portfolioSelected === 'stock') {
          this.setState({ userData: { ...this.state.userData, stockTrades: 0, stocks: [], stocksID: '' } });
        } else {
          this.setState({ userData: { ...this.state.userData, cryptoTrades: 0, crypto: [], cryptoID: '' } });
        }
      }
    })
    
  }

  // Hides Native Alert Which Is Used To Display Message Regarding Resetting Account
  dismissAlert = () => {
    this.setState({ alertVisible: false });
  }

  // Handles Performance Formatting, Depending Upon Which Tab Is Selected
  handlePerformance() {
    // Handles If Stocks Are Selected By The User - Default
    if (this.state.portfolioSelected === 'stock') {
      if (this.props.user.stockPortfolioPerformance === null || this.props.user.stockPortfolioPerformance === undefined || parseInt(this.props.user.stockPortfolioPerformance) === 0) {
        return '0.00%';
      } else {
        return intHandler(this.props.user.stockPortfolioPerformance - 100, 'percent', 2, true);
      }
    }
    // Handles If Crypto Is Selected By The User
    else {
      if (this.props.user.cryptoPortfolioPerformance === null || this.props.user.cryptoPortfolioPerformance === undefined || parseInt(this.props.user.cryptoPortfolioPerformance) === 0) {
        return '0.00%';
      } else {
        return intHandler(this.props.user.cryptoPortfolioPerformance - 100, 'percent', 2, true);
      }
    }
  }

  // Handles Color Of Performance Thumbnail Background Between Green & Red
  handlePerformanceColor() {
    if (this.state.portfolioSelected === 'stock') {
      if (parseFloat(this.props.user.stockPortfolioPerformance - 100) <= 0) {
        return '#ed3232';
      } else {
        return '#00ffbe';
      }
    } else {
      if (parseFloat(this.props.user.cryptoPortfolioPerformance - 100) <= 0) {
        return '#ed3232';
      } else {
        return '#00ffbe';
      }
    }
  }

  render() {
    if (this.props.visible) {
      return (
        <div className='tile classroom-overview' style={{ minHeight: 700 }}>
          <Alert
            title={this.state.alertTitle}
            message={this.state.alertMessage}
            visible={this.state.alertVisible}
            dismiss={this.dismissAlert}
            option={this.state.alertOption}
            optionText={this.state.alertOptionText}
            option2Text={this.state.alertOptionText2}
          />
          <div className='classroom-header-flex' style={{ paddingTop: 25, paddingLeft: 12, paddingBottom: 15 }}>
            <QueryStatsIcon />
            <div className='classroom-title' style={{ paddingLeft: 10 }}>
              View Portfolio
            </div>
          </div>
          <div onClick={() => this.props.dismissPortfolio()} className='manual-back' style={{ paddingLeft: 12, marginTop: -15, fontSize: 13, fontWeight: '500', width: 'fit-content' }}>
            Go Back
          </div>
          <div className='view-portfolio-header-flex'>
            <img alt='' className='view-portfolio-profile-image' src={ProfileIcon} />
            <div className='view-portfolio-text-container'>
              <div className='view-portfolio-name'>
                {this.props.user.firstName.charAt(0).toUpperCase() + this.props.user.firstName.slice(1)} {this.props.user.lastName.charAt(0).toUpperCase() + this.props.user.lastName.slice(1)}
              </div>
              <div className='view-portfolio-username'>
                @{this.props.user.username}
              </div>
            </div>
          </div>
          <div className='expanded-student-flex'>
            <div className='expanded-student-item'>
              <div className='expanded-student-stat'>
                {this.state.portfolioSelected === 'stock' ? this.state.userData.stockTrades : this.state.userData.cryptoTrades}
              </div>
              <div className='expanded-student-title'>
                # Of Trades
              </div>
            </div>
            <div className='expanded-student-item'>
              <div className='expanded-student-stat'>
                {this.state.portfolioSelected === 'stock' ? this.state.userData.stocks.length : this.state.userData.crypto.length}
              </div>
              <div className='expanded-student-title'>
                # Of Positions
              </div>
            </div>
            <div className='expanded-student-item'>
              <div className='expanded-student-stat' style={{ color: this.handlePerformanceColor() }}>
                {this.handlePerformance()}
              </div>
              <div className='expanded-student-title'>
                Performance
              </div>
            </div>
          </div>
          {!this.state.resetPassword && !this.props.isDemo && (
            <div className='view-portfolio-options-flex'>
              {!this.state.resetSuccess && (
                <div title="Resets Student Password" onClick={() => this.handleResetPassword()} className='classroom-item-button reset-account-button'>
                  Reset Password
                </div>
              )}
              <div
                title="Resets Student Account To $10,000"
                onClick={() => this.pressResetAccount()}
                className='classroom-item-button reset-account-button'
                style={{ color: '#ff3434', backgroundColor: '#012b22' }}
              >
                Reset Account
              </div>
            </div>
          )}
          {this.state.resetSuccess && !this.props.isDemo && (
            <div className='student-updated-password'>
              You have successfully reset the student's password to: <span style={{ color: 'white', fontWeight: '300' }}>{this.state.newPassword}</span>
            </div>
          )}
          {this.state.resetPassword && !this.props.isDemo && (
            <div>
              <div className='view-portfolio-options-flex' style={{width: '70%', margin: 'auto', marginTop: 15 }}>
                <TextField
                  id="password"
                  label="New Password"
                  placeholder="New Password"
                  type={this.state.passwordVisible ? "text" : "password"}
                  variant="filled"
                  style={{ width: '49%', marginRight: '2%'}}
                  error={this.state.onErrorPassword}
                  value={this.state.password1}
                  onChange={(event) => this.changePassword1(event.target.value)}
                  sx={{ backgroundColor: '#2e7361', marginBottom: '4px', marginTop: '4px', borderRadius: '7px' }}
                />
                <TextField
                  id="passwordConfirm"
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  type={this.state.passwordVisible ? "text" : "password"}
                  variant="filled"
                  style={{ width: '49%' }}
                  error={this.state.onErrorPassword}
                  value={this.state.password2}
                  onChange={(event) => this.changePassword2(event.target.value)}
                  sx={{ backgroundColor: '#2e7361', marginBottom: '4px', marginTop: '4px', borderRadius: '7px' }}
                />
                {this.state.passwordVisible ? (
                  <VisibilityOutlinedIcon onClick={() => this.toggleVisibility()} style={{ marginLeft: 10, cursor: 'pointer', fill: '#00ff78' }} />
                ) : (
                  <VisibilityOffOutlinedIcon onClick={() => this.toggleVisibility()} style={{ marginLeft: 10, cursor: 'pointer', fill: '#71b591' }} />
                )}
              </div>
              {!this.state.loadingResetPassword && (
                <div className='view-portfolio-options-flex' style={{ marginTop: 12 }}>
                  <div onClick={() => this.cancelResetPassword()} className='classroom-item-button cancel-reset-password-button'>
                    Cancel
                  </div>
                  <div onClick={() => this.resetPassword()} className='classroom-item-button reset-account-button'>
                    Change Password
                  </div>
                </div>
              )}
              {this.state.loadingResetPassword && (
                <div className='view-portfolio-options-flex' style={{ marginTop: 12 }}>
                  <CircularProgress />
                </div>
              )}
            </div>
          )}
          <div className='view-portfolio-header'>
            <div className='view-portfolio-line' />
            <div className='view-portfolio-toggle-container'>
              <div title="View Student Stock Portfolio" onClick={() => this.selectPortfolioType('stock')} className={`view-portfolio-toggle-button toggle-button-left ${this.state.portfolioSelected === 'stock' ? 'toggle-button-selected' : ''}`}>
                Stock Portfolio
              </div>
              <div title="View Student Crypto Portfolio" onClick={() => this.selectPortfolioType('crypto')} className={`view-portfolio-toggle-button toggle-button-right ${this.state.portfolioSelected !== 'stock' ? 'toggle-button-selected' : ''}`}>
                Crypto Portfolio
              </div>
            </div>
            <div className='view-portfolio-line' />
          </div>
          {// Loading State
          this.state.loading && !this.state.error && (
            <div className='view-portfolio-positions-container'>
              <CircularProgress />
              <div className='portfolio-positions-loading-text'>
                Fetching Portfolio<br/>Positions...
              </div>
            </div>
          )}
          {// Error State
          !this.state.loading && this.state.error && (
            <div className='view-portfolio-positions-container' style={{ paddingTop: '45px', paddingBottom: '210px' }}>
              <img alt='' className='view-portfolio-positions-image' src={EmptyPositions} />
              <div className='portfolio-positions-h1'>
                We Experienced An Error...
              </div>
              <div className='portfolio-positions-text'>
                Something went wrong trying to retrieve your student's portfolio positions. Please try again and if the problem continues, please contact support.
              </div>
            </div>
          )}
          {// Empty Positions For Selected Portfolio
          ((this.state.userData.stocks.length === 0 && this.state.portfolioSelected === 'stock') || (this.state.userData.crypto.length === 0 && this.state.portfolioSelected === 'crypto')) && !this.state.loading && !this.state.error && (
            <div className='view-portfolio-positions-container' style={{ paddingTop: '45px', paddingBottom: '210px' }}>
              <img alt='' className='view-portfolio-positions-image' src={EmptyPositions} />
              <div className='portfolio-positions-h1'>
                No Positions To Display
              </div>
              <div className='portfolio-positions-text'>
                It does not seem like {this.props.user.username} has any current positions. They need to place a trade in order to add a position to their portfolio.
              </div>
            </div>
          )}
          {// When There Are Positions Present For Selected Portfolio
          ((this.state.userData.stocks.length !== 0 && this.state.portfolioSelected === 'stock') || (this.state.userData.crypto.length !== 0 && this.state.portfolioSelected === 'crypto')) && !this.state.loading && !this.state.error && (
            <div>
              <div className='view-portfolio-position-type-text'>
                Current Open Positions
              </div>
              <div className='view-portfolio-position-flex'>
                {this._getPortfolioData().map((item) => {
                  console.log(item);
                  return (
                    <div key={item.id} className='view-portfolio-position' style={{ backgroundColor: this.handleBackgroundColor(item.profitLoss)}}>
                      <div className='portfolio-position-symbol'>
                        {item.symbol}
                      </div>
                      <div className='portfolio-position-name'>
                        {item.symbolName}
                      </div>
                      <div className='portfolio-position-performance'>
                        {intHandler(100 * item.profitLoss / item.costBasis, 'percent', 2, true)}
                      </div>
                      <div className='portfolio-position-time'>
                        Purchased<br/>{this.getDiff(moment(item.openedAt), moment(new Date()))} Ago
                      </div>
                      <div className='portfolio-position-side'>
                        {item.side}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
          {// When There Are Closed Positions Present For Selected Portfolio
          ((this.state.userData && this.state.userData.closedStocks && this.state.userData.closedStocks.length !== 0 && this.state.portfolioSelected === 'stock') || (this.state.userData && this.state.userData.closedCrypto && this.state.userData.closedCrypto.length !== 0 && this.state.portfolioSelected === 'crypto')) && !this.state.loading && !this.state.error && (
            <div>
              <div className='view-portfolio-position-type-text'>
                Closed Positions
              </div>
              <div className='view-portfolio-position-flex'>
                {this._getPortfolioData().map((item) => {
                  return (
                    <div key={item.id} className='view-portfolio-position' style={{ backgroundColor: this.handleBackgroundColor(item.profitLoss)}}>
                      <div className='portfolio-position-symbol'>
                        {item.symbol}
                      </div>
                      <div className='portfolio-position-name'>
                        {item.symbolName}
                      </div>
                      <div className='portfolio-position-performance'>
                        {intHandler(100 * item.profitLoss / item.costBasis, 'percent', 2, true)}
                      </div>
                      <div className='portfolio-position-time'>
                        Purchased<br/>{this.getDiff(moment(item.openedAt), moment(new Date()))} Ago
                      </div>
                      <div className='portfolio-position-side'>
                        {item.side}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
          {// When There Are Closed Positions Present For Selected Portfolio
          ((this.state.userData && this.state.userData.closedStocks && this.state.userData.closedStocks.length === 0 && this.state.portfolioSelected === 'stock') || (this.state.userData && this.state.userData.closedCrypto && this.state.userData.closedCrypto.length === 0 && this.state.portfolioSelected === 'crypto')) && !this.state.loading && !this.state.error && (
            <div className='empty-closed-positions-container'>
              <RuleIcon className='empty-closed-positions-icon' />
              <div className='portfolio-positions-h1' style={{ color: '#e68a1a'}}>
                No Closed Positions
              </div>
              <div className='portfolio-positions-text'>
                {this.props.user.firstName} {this.props.user.lastName} ({this.props.user.username}) does not have any closed positions to display at this time. Closed positions will continue to update as the student places trades.
              </div>
            </div>
          )}
        </div>
      );
    } else {
      return <div />
    }
  }
}

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    // Handles Colors Which Are Updated Throughout When MarketOpen Changes
    colors: state.userDetails.appColors,
    // Token Required To Submit FetchOtherUserDetails Dispatch
    jwtToken: state.userDetails.jwtToken,
  };
};

// Map Dispatch To Props (Dispatch Actions to Reducers. Reducers then modify the redux store state.
const mapDispatchToProps = (dispatch) => {
  // Action
    return {
      // Dispatch To Fetch Portfolio Information For The Selected User. Result Is Not Stored In Redux.
      fetchOtherUserDetails: (token, userName) => dispatch(FetchOtherUserDetails(token, userName)),
      // Handles resetting a student's password by dispatching to GraphQL
      resetStudentPassword: (token, usernameArray, password) => dispatch(resetStudentPassword(token, usernameArray, password)),
      resetPortfolio: (token, portfolioID, portfolioType) => dispatch(resetStudentPortfolio(token, portfolioID, portfolioType)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioPreview);
