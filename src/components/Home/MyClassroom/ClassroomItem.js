import React, { Component } from 'react';
import { connect } from 'react-redux';
import CheckBoxOutlineBlank from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBox from '@mui/icons-material/CheckBox';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Alert from '../../Admin/Alert';
//import NotificationAddOutlinedIcon from '@mui/icons-material/NotificationAddOutlined';
import '../../../styles/Home/HomeScreen.css';
import NotifyStudentAlert from './NotifyStudentAlert';
import intHandler from '../../../helper_functions/intHelper';

class ClassroomItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertVisible: false,
      alertTitle: 'Are You Sure?',
      alertMessage: '',
      alertOption: null,
      alertOptionText: '',
      alertOptionText2: '',
      notifyAlertVisible: false,
    }
  }

  // Collapses All Classroom Items and Unchecks Any That Were Checked To Remove If User Toggles Between Removing Students And Viewing Classroom
  componentDidUpdate(prevProps) {
    if (this.props.removing !== prevProps.removing) {
      this.setState({ selected: false, expanded: false });
    }
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

  // Handles Performance Formatting And Only Displays Stock Performance
  handlePerformance() {
    return intHandler(this.props.item.stockPortfolioPerformance - 100, 'percent', 2, true);
  }

  // Handles Color Of Performance Thumbnail Background Between Green & Red
  handlePerformanceColor() {
    if (parseFloat(this.props.item.stockPortfolioPerformance - 100) < 0) {
      return '#ed3232';
    } else {
      return '#007154';
    }
  }

  formatName() {
    const firstName = this.props.item.firstName.charAt(0).toUpperCase() + this.props.item.firstName.slice(1);
    const lastName = this.props.item.lastName.charAt(0).toUpperCase() + this.props.item.lastName.slice(1);
    return firstName + ' ' + lastName;
  }

  render() {
    return (
      <div key={this.props.item.userId} className='classroom-student-item'>
        <Alert
          title={this.state.alertTitle}
          message={this.state.alertMessage}
          visible={this.state.alertVisible}
          dismiss={this.dismissAlert}
          option={this.state.alertOption}
          optionText={this.state.alertOptionText}
          option2Text={this.state.alertOptionText2}
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
              {this.formatName()}
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
              <ChevronRightIcon className='button' onClick={() => this.props.viewPortfolio(this.props.item)} />
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
    // Token used For Resetting Student Password and Resetting Account
    jwtToken: state.userDetails.jwtToken,
  };
};

export default connect(mapStateToProps)(ClassroomItem);
