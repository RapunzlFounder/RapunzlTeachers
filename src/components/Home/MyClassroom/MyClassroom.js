import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllTeacherClassrooms } from '../../../selectors/classroomSelectors';
import AddStudents from './AddStudents';
import YourClassroomTile from './YourClassroomTile';
import '../../../styles/Home/HomeScreen.css';
import ClassroomSupport from './ClassroomSupport';

class MyClassroom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      manualAdd: false,
      className: '',
    }
  }

  // When User Selects A Different Menu Tab, We Reset The State To Avoid Strange User Sequences
  componentDidUpdate(prevProps) {
    if (this.props.visible !== prevProps.visible) {
      this.setState({
        manualAdd: false,
        className: '',
      });
    }
    if (this.props.addingStudents !== prevProps.addingStudents && this.props.addingStudents === false) {
      this.setState({
        manualAdd: false,
        className: '',
      });
    }
  }

  // Toggles Visibility Of ManualEntry Component Which Allows Teachers To Enter Information Manually
  toggleManualEntry = () => {
    this.setState({ manualAdd: !this.state.manualAdd });
  }

  changeClassName = (text) => {
    this.setState({ className: text });
  }

  // Handles Selecting A Classroom When The User Has Multiple Classrooms, Which Allows Them To See Students
  selectClassroom = (classID) => {
    this.setState({ className: '' });
  }

  render() {
    if (this.props.visible) {
      return(
        <div className='classroom-container'>
          {!this.props.addingStudents && (
            <YourClassroomTile
              addingStudents={this.props.addingStudents}
              className={this.state.className}
              changeClassName={this.changeClassName}
              visible={this.props.visible}
              classroomId={this.props.selectedClassroom}
            />
          )}
          {this.props.addingStudents && !this.state.viewPortfolio && (
            <AddStudents
              toggleManualEntry={this.toggleManualEntry}
              newClassName={this.state.className}
              changeClassName={this.changeClassName}
              manualAdd={this.state.manualAdd}
            />
          )}
          {this.props.addingStudents && !this.state.viewPortfolio && (
            <ClassroomSupport />
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
    allClassrooms: getAllTeacherClassrooms(state),
    addingStudents: state.dashboard.addingStudents,
    selectedClassroom: state.dashboard.selectedClassroom,
  };
};

export default connect(mapStateToProps)(MyClassroom);
