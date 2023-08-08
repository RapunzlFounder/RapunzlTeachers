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
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.visible !== this.props.visible && this.props.visible === true) {
      this.setState({ selectedCourse: null });
    }
  }

  render() {
    if (this.props.visible && !this.props.courseBuilderVisible) {
      return(  
        <div className='middle-container'>
          <YourCourses />
          {this.props.selectedCourse === false && (
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
    selectedCourse: state.dashboard.selectedCourse,
  };
};

export default connect(mapStateToProps)(MyCourse);
