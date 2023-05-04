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
      selectedClass: false,
    }
  }

  // When User Selects A Different Menu Tab, We Reset The State To Avoid Strange User Sequences
  componentDidUpdate(prevProps) {
    if (this.props.visible !== prevProps.visible) {
      this.setState({
        manualAdd: false,
        selectedClass: false,
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
    this.setState({ selectedClass: classID, className: '' });
  }

  render() {
    if (this.props.visible) {
      return(
        <div className='classroom-container'>
          {!this.props.addingStudents && (
            <YourClassroomTile
              addingStudents={this.props.addingStudents}
              toggleAddStudents={this.props.toggleAddStudents}
              className={this.state.className}
              changeClassName={this.changeClassName}
              createClass={this.props.createClass}
              visible={this.props.visible}
              selectedClass={this.state.selectedClass}
              selectClassroom={this.selectClassroom}
            />
          )}
          {this.props.addingStudents && !this.state.viewPortfolio && (
            <AddStudents
              toggleManualEntry={this.toggleManualEntry}
              toggleAddStudents={this.props.toggleAddStudents}
              newClassName={this.state.className}
              creatingClass={this.props.creatingClass}
              changeClassName={this.changeClassName}
              manualAdd={this.state.manualAdd}
              selectedClass={this.state.selectedClass}
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
  };
};

export default connect(mapStateToProps)(MyClassroom);
