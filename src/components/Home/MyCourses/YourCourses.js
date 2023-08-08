import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectCourse, toggleCourseBuilder } from '../../../ActionTypes/dashboardActions';
import { getAllTeacherClassroomCourses, getAllTeacherClassrooms, getAllDemoClassroomCourses } from '../../../selectors/classroomSelectors';
import { getAllTeacherCourses } from '../../../selectors/coursemoduleSelectors';
import Bookmarks from '@mui/icons-material/Bookmarks';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import EmptyCoursesIcon from '../../../assets/images/Courses/EmptyCourses.png';
import ViewCourseTile from './ViewCourseTile';
import '../../../styles/Home/HomeScreen.css';

class YourCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDemo: false,
    }
  }

  // Returns An Array Of Classrooms That Are Either Assigned To The Current Course, Other Course, No Course
  _getAssignedClasses(courseID) {
    let assignedCourses = 0;
    // We Loop Through All Teacher Classrooms First With The Goal Of Determing Which Type
    for (var i in this.props.allClassrooms) {
      for (var j in this.props.classroomCourses) {
        // Handles If This Classroom Is Already In A Teacher Class Course
        // This Handles If It Is The Current Course
        if (this.props.classroomCourses[j].courseId == courseID && this.props.allClassrooms[i].id == this.props.classroomCourses[j].classId) {
          assignedCourses = assignedCourses + 1
        }
      }
    }
    return assignedCourses;
  }

  selectDemoCourse(course) {
    console.log('course', course);
    this.setState({ isDemo: true });
    this.props.selectCourse(course.id);
  }

  selectCourse(course) {
    console.log('ocourse', course);
    this.setState({ isDemo: false });
    this.props.selectCourse(course.id);
  }

  render() {
    if (this.props.selectedCourse === false) {
      return (  
        <div className='tile your-courses'>
          <div className='home-header-flex'>
            <Bookmarks />
            <div className='home-header'>
              Your Courses
            </div>
          </div>
          {/* <div className='empty-your-courses-container'>
            <img src={EmptyCoursesIcon} alt='' className='empty-your-courses-icon' />
            <div className='empty-your-courses-title'>
              You Don't Have Any Courses!
            </div>
            <div className='empty-your-course-text'>
              Create a course using our course builder or pick from one of our prepared courses below.
            </div>
            <div onClick={() => this.props.toggleCourseBuilder()} className='empty-course-button'>
              Create Course
            </div>
          </div> */}
          <div>
            <div className='prepared-courses-flex'>
              {this.props.teacherCourses && this.props.teacherCourses.length !== 0 && this.props.teacherCourses.map((course) => {
                return (
                  <div key={course.id} onClick={() => this.selectCourse(course)} className='prepared-course'>
                    <div className='prepared-course-time'>
                      {course.numberModules === 1 ? '1 Module' : `${course.numberModules} Modules`}
                    </div>
                    <div className='prepared-course-title'>
                      {course.courseName}
                    </div>
                    <div className='your-courses-text-flex'>
                      <PeopleAltOutlinedIcon className='your-courses-flex-icon' />
                      <div className='your-courses-text'>
                        Assigned To {this._getAssignedClasses(course.id) === 1 ? '1 Class' : this._getAssignedClasses(course.id) + ' Classes'}
                      </div>
                    </div>
                    <div className='your-courses-text-flex' style={{ marginTop: 8 }}>
                      <ClassOutlinedIcon className='your-courses-flex-icon' />
                      <div className='your-courses-text'>
                        0 Classes Completed
                      </div>
                    </div>
                    <div className='your-courses-view-course'>
                      View Course
                    </div>
                  </div>
                );
              })}
              {this.props.demoCourses && this.props.demoCourses.length !== 0 && this.props.demoCourses.map((course) => {
                return (
                  <div key={course.id} onClick={() => this.selectDemoCourse(course)} className='prepared-course'>
                    <div className='prepared-course-time'>
                      DEMO
                    </div>
                    <div className='prepared-course-title'>
                      {course.courseName}
                    </div>
                    <div className='your-courses-text-flex'>
                      <PeopleAltOutlinedIcon className='your-courses-flex-icon' />
                      <div className='your-courses-text'>
                        Assigned To {this._getAssignedClasses(course.id) === 1 ? '1 Class' : this._getAssignedClasses(course.id) + ' Classes'}
                      </div>
                    </div>
                    <div className='your-courses-text-flex' style={{ marginTop: 8 }}>
                      <ClassOutlinedIcon className='your-courses-flex-icon' />
                      <div className='your-courses-text'>
                        Demo Course
                      </div>
                    </div>
                    <div className='your-courses-view-course'>
                      View Course
                    </div>
                  </div>
                );
              })}
            </div>
            <div onClick={() => this.props.toggleCourseBuilder()} className='create-new-course-flex'>
              <AddCircleOutlineOutlinedIcon className='create-new-course-icon' />
              <div className='create-new-course-text'>
                Create New Course
              </div>
            </div>
          </div>
        </div>    
      );
    } else {
      return (
        <ViewCourseTile
          courseId={this.props.selectedCourse}
          isDemo={this.state.isDemo}
        />
      );
    }
  }
}

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    // Selector Which Handles All Teacher Courses
    teacherCourses: getAllTeacherCourses(state),
    // Selector Which Handles All Teacher Classroom Courses To Determine Which Classrooms Are Assigned
    classroomCourses: getAllTeacherClassroomCourses(state),
    allClassrooms: getAllTeacherClassrooms(state),
    selectedCourse: state.dashboard.selectedCourse,
    demoCourses: getAllDemoClassroomCourses(state),
  };
};

// Map Dispatch To Props (Dispatch Actions to Reducers. Reducers then modify the redux store state.
const mapDispatchToProps = (dispatch) => {
  // Action
    return {
      toggleCourseBuilder: () => dispatch(toggleCourseBuilder()),
      selectCourse: (courseID) => dispatch(selectCourse(courseID)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(YourCourses);
