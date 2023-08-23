import React, { Component } from 'react';
import { connect } from 'react-redux';
import CheckBoxOutlineBlank from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBox from '@mui/icons-material/CheckBox';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Alert from '../../Admin/Alert';
//import NotificationAddOutlinedIcon from '@mui/icons-material/NotificationAddOutlined';
import '../../../styles/Home/HomeScreen.css';
import NotifyStudentAlert from './NotifyStudentAlert';
import intHandler from '../../../helper_functions/intHelper';
import moment from 'moment';

class ClassroomItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      alertVisible: false,
      alertTitle: 'Are You Sure?',
      alertMessage: 'Resetting an account is permanent. Once you reset a student account, it cannot be undone. The student will be removed from all competitions and their portfolio will go to zero.',
      tab: 'stocks',
      notifyAlertVisible: false,
    }
  }

  // Collapses All Classroom Items and Unchecks Any That Were Checked To Remove If User Toggles Between Removing Students And Viewing Classroom
  componentDidUpdate(prevProps) {
    if (this.props.removing !== prevProps.removing) {
      this.setState({ selected: false, expanded: false });
    }
  }

  // Toggles The Visibility Of Additional Student Information, Including Portfolio Performance & App Activity
  toggleExpanded() {
    this.setState({ expanded: !this.state.expanded });
  }

  // Handles Dispatch To GraphQL To Reset Student Account. This Will Set Account As If It Was Just Created And Student Will Receive Email
  resetAccount = () => {

  }

  // Sets Visibility of Native Alert To True When User Selects To Reset A Students Account
  pressResetAccount() {
    this.setState({ alertVisible: true });
  }

  // Hides Native Alert Which Is Used To Display Message Regarding Resetting Account
  dismissAlert = () => {
    this.setState({ alertVisible: false });
  }

  // Toggles Student Portfolio To Stocks From Crypto. Stocks Is The Default.
  selectStocks() {
    this.setState({ tab: 'stocks' });
  }

  // Toggles Student Portfolio To Crypto From Stocks
  selectCrypto() {
    this.setState({ tab: 'crypto' });
  }

  // Shows Alert To Notify A Student, Which Presents Teacher With Text Input To Draft Message To Student
  selectNotify() {
    this.setState({ notifyAlertVisible: true });
  }

  // Hides The Alert To Notify A Student, Which Allows The Teacher To Send A Message Which Will Be Emailed To Student
  // Arrow Function Because It Is Passed Through To NotifyStudentAlert Component
  dismissNotifyAlert = () => {
    this.setState({ notifyAlertVisible: false });
  }

  // Handles Performance Formatting, Depending Upon Which Tab Is Selected
  handlePerformance() {
    // Handles If Stocks Are Selected By The User - Default
    if (this.state.tab === 'stocks' && this.props.sortType !== 4) {
      return intHandler(this.props.item.stockPortfolioPerformance - 100, 'percent', 2, true);
    }
    // Handles If Crypto Is Selected By The User
    else {
      return intHandler(this.props.item.cryptoPortfolioPerformance - 100, 'percent', 2, true);
    }
  }

  // Handles Color Of Performance Thumbnail Background Between Green & Red
  handlePerformanceColor() {
    if (this.state.tab === 'stocks' && this.props.sortType !== 4) {
      if (parseFloat(this.props.item.stockPortfolioPerformance - 100) < 0) {
        return '#ed3232';
      } else {
        return '#007154';
      }
    } else {
      if (parseFloat(this.props.item.cryptoPortfolioPerformance - 100) < 0) {
        return '#ed3232';
      } else {
        return '#007154';
      }
    }
  }

  render() {
    return (
      <div key={this.props.item.userId} className='classroom-student-item'>
        <Alert
          title={this.state.alertTitle}
          message={this.state.alertMessage}
          visible={this.state.alertVisible}
          dismiss={this.dismissAlert}
          option={this.resetAccount}
          optionText={'Reset Account'}
          option2Text={'Nevermind'}
        />
        <NotifyStudentAlert
          visible={this.state.notifyAlertVisible}
          dismiss={this.dismissNotifyAlert}
          firstName={this.props.item.firstName}
          lastName={this.props.item.lastName}
          username={this.props.item.username}
        />
        <div className='student-item-collapsed'>
          <div className='student-item-left'>
            <div className='student-item-name'>
              {this.props.item.firstName} {this.props.item.lastName}
            </div>
            <div className='student-item-username'>
              @{this.props.item.username}
            </div>
          </div>
          {!this.props.removing && !this.state.expanded && (
            <div className='student-item-right'>
              <div className='student-item-performance' style={{ backgroundColor: this.handlePerformanceColor() }}>
                {this.handlePerformance()}
              </div>
              <ChevronRightIcon className='button' onClick={() => this.toggleExpanded()} />
            </div>
          )}
          {!this.props.removing && this.state.expanded && (
            <div className='student-item-right'>
              <ExpandMoreIcon className='button' onClick={() => this.toggleExpanded()}/>
            </div>
          )}
          {this.props.removing && this.props.selected && (
            <div title="Click To No Longer Remove Student" onClick={() => this.props.select(this.props.item.userId)} className='student-item-right'>
              <CheckBox className='button' style={{ fill: this.props.colors.perfDown }} />
            </div>
          )}
          {this.props.removing && !this.props.selected && (
            <div title="Click To Remove Student" onClick={() => this.props.select(this.props.item.userId)} className='student-item-right'>
              <CheckBoxOutlineBlank className='button'style={{ fill: this.props.colors.perfDown }} />
            </div>
          )}
        </div>
        {this.state.expanded && (
          <div className='student-item-expanded'>
            <div className='student-item-expanded-flex-header'>
            <div className='expanded-student-toggle'>
              <div title="View Student Stock Portfolio" onClick={() => this.selectStocks()} className={`expanded-student-toggle-button ${this.state.tab === 'stocks' ? 'expanded-student-toggle-selected' : ''}`} style={{ marginRight: 10 }}>
                Stocks
              </div>
              <div title="View Student Crypto Portfolio" onClick={() => this.selectCrypto()} className={`expanded-student-toggle-button ${this.state.tab === 'crypto' ? 'expanded-student-toggle-selected' : ''}`}>
                Crypto
              </div>
            </div>
            {/*
            NotifyStudentAlert 
            <div onClick={() => this.selectNotify()} className='message-student-button'>
              <NotificationAddOutlinedIcon className='message-student-icon' />
              <div className='message-student-text'>
                Notify
              </div>
            </div> */}
            </div>
            <div className='expanded-student-flex'>
              <div className='expanded-student-item'>
                <div className='expanded-student-stat'>
                  {this.state.tab === 'stocks' ? this.props.item.numberOfStockTrades : this.props.item.numberOfCryptoTrades}
                </div>
                <div className='expanded-student-title'>
                  # Of Trades
                </div>
                <div className='expanded-student-stat'>
                  {moment(this.props.item.lastUpdated).format("l")}
                </div>
                <div className='expanded-student-title'>
                  Last Active
                </div>
              </div>
              <div className='expanded-student-item'>
                <div className='expanded-student-stat'>
                  {this.state.tab === 'stocks' ? this.props.item.numberOfStockPositions : this.props.item.numberOfCryptoPositions}
                </div>
                <div className='expanded-student-title'>
                  # Of Positions
                </div>
                <div className='expanded-student-stat'>
                  {this.props.item.numberOfFriends}
                </div>
                <div className='expanded-student-title'>
                  # Of Friends
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
            <div className='flex-button'>
              <div title="View Selected Student Portfolio" onClick={() => this.props.viewPortfolio(this.props.item.username, this.props.item.firstName + ' ' + this.props.item.lastName)} className='classroom-item-button view-portfolio-button'>
                View Portfolio
              </div>
              <div title="Resets Student Account To $10,000" onClick={() => this.pressResetAccount()} className='classroom-item-button reset-account-button'>
                Reset Account
              </div>
            </div>
          </div>
        )}
      </div>
    );
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

export default connect(mapStateToProps)(ClassroomItem);
