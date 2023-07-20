import React, { Component } from 'react';
import { connect } from 'react-redux';
import YourCourses from './YourCourses';
import PreparedCourses from './PreparedCourses';
import '../../../styles/Home/HomeScreen.css';
import CourseBuilder from './CourseBuilder';

class MyCourse extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
    this.state = {
      selectedCourse: null,
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.visible !== this.props.visible && this.props.visible === true) {
      this.setState({ selectedCourse: null });
    }
  }

  // Selects A Course From The Teacher's List Of Courses And Shows That Specific Course
  selectCourse = (newCourse) => {
    // Handles Back Button By Not Passing newCourse Parameter & Resets Standards State
    if (newCourse === null || newCourse === undefined) {
      this.setState({ selectedCourse: null, standardsVisible: false });
    }
    // Handles Selecting A Course From The List Of All Teacher Courses
    else {
      this.setState({ selectedCourse: newCourse, standardsVisible: false });
    }
  }

  render() {
    if (this.props.visible && !this.props.courseBuilderVisible) {
      return(  
        <div className='middle-container'>
          <YourCourses
            selectCourse={this.selectCourse}
            selectedCourse={this.state.selectedCourse}
          />
          {this.state.selectedCourse === null && (
            <PreparedCourses />
          )}
        </div>      
      );
    } else if (this.props.visible && this.props.courseBuilderVisible) {
      return (
        <CourseBuilder />
      )
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
    courseBuilderVisible: state.dashboard.courseBuilderVisible,
  };
};

export default connect(mapStateToProps)(MyCourse);
