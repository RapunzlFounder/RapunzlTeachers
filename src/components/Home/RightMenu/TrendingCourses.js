import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createTeacherClassroomCourse } from '../../../ActionTypes/classroomActions';
import { createTeacherCourse } from '../../../ActionTypes/coursemoduleActions';
import Bolt from '@mui/icons-material/Bolt';
import Alert from '../../Admin/Alert';
import CourseBuilderDialog from '../MyCourses/CourseBuilderDialog';
import PrebuiltCourses from '../../../constants/PrebuiltCourses';
import '../../../styles/Home/HomeScreen.css';

class TrendingCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseBuilderVisible: false,
      selectedCourse: false,
      alertVisible: false,
      alertTitle: '',
      alertMessage: ''
    }
  }

  // Pass through function to toggle visibility of SectionBuilderDialog
  dismissSectionBuilder = () => {
    this.setState({ courseBuilderVisible: !this.state.courseBuilderVisible, selectedCourse: false });
  }

  // Pass through function to toggle visibility of Native Alert Dialog
  toggleAlert = () => {
    this.setState({ alertVisible: !this.state.alertVisible });
  }

  // Pass through function that handles saving the course to the account
  saveCourse = () => {
    this.setState({ loading: true });
    this.props.createTeacherCourse(this.props.jwtToken, PrebuiltCourses[this.state.selectedCourse].title, false, PrebuiltCourses[this.state.selectedCourse].moduleIDList).then((res) => {
      // Handles If There Was An Error When Trying To Save Teacher Course
      if (!(res && !('errors' in res))) {
        this.setState({
          loading: false,
          alertTitle: 'Problem Saving Course',
          alertMessage: res.errors[0].message,
          alertVisible: true,
          courseBuilderVisible: false
        });
      }
      // Handles Successful Dispatch & Explains To Teacher How To Assign Course To Class
      else {
        this.setState({
          loading: false,
          courseBuilderVisible: false
        });
      }
    });
  }

  // Handles Selecting A Prebuilt Course And Updating State For SectionBuilderDialog
  selectCourse(int) {
    this.setState({ selectedCourse: int, courseBuilderVisible: true });
  }

  render() {
    return (
      <div className='quick-access-container' style={{ borderBottom: 'none' }}>
        <Alert
          visible={this.state.alertVisible}
          title={this.state.alertTitle}
          message={this.state.alertMessage}
          dismiss={this.toggleAlert}
        />
        <CourseBuilderDialog
          visible={this.state.courseBuilderVisible}
          dismiss={this.dismissSectionBuilder}
          saveCourse={this.saveCourse}
          selectedCourse={this.state.selectedCourse}
        />
        <div className='classroom-header-flex'>
          <Bolt fontSize="small" />
          <div className='classroom-header'>
            Trending Courses
          </div>
        </div>
        {PrebuiltCourses.map((item) => {
          return (
            <div key={item.courseID} onClick={() => this.selectCourse(item.courseID)} className='trend-course-item'>
              <div className='trend-course-time-text'>
                {item.duration}
              </div>
              <div className='trend-course-title'>
                {item.title}
              </div>
            </div>
          );
        })}
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
    // Required for Dispatches Below
    jwtToken: state.userDetails.jwtToken,
  }
};

// Map Dispatch To Props (Dispatch Actions to Reducers. Reducers then modify the redux store state.
const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    // This adds an existing Teacher Course to a Teacher's exisiting classroom.  The required inputs are 'classroomId', which is the database Id of the classroom
    // that the teacher wishes to add the course to, and 'courseId', which is the database Id of the Teacher course that the Teacher is adding 
    // to the classroom.
    assignCourse: (token, classroomId, courseId) => dispatch(createTeacherClassroomCourse(token, classroomId, courseId)),
    // Creates A Course For The Teacher With List Of Modules Associated With It
    createTeacherCourse: (token, courseName, isPrivate, modulesList) => dispatch(createTeacherCourse(token, courseName, isPrivate, modulesList)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrendingCourses);
