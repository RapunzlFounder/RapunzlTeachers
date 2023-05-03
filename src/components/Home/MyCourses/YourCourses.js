import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllTeacherCourses } from '../../../selectors/coursemoduleSelectors';
import Bookmarks from '@mui/icons-material/Bookmarks';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import EmptyCoursesIcon from '../../../assets/images/Courses/EmptyCourses.png';
import ViewCourseTile from './ViewCourseTile';
import '../../../styles/Home/HomeScreen.css';

class YourCourses extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    if (this.props.selectedCourse === null) {
      return (  
        <div className='tile your-courses'>
          <div className='home-header-flex'>
            <Bookmarks />
            <div className='home-header'>
              Your Courses
            </div>
          </div>
          {this.props.teacherCourses.length === 0 ? (
            <div className='empty-your-courses-container'>
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
            </div>
          ) : (
            <div>
              <div className='prepared-courses-flex'>
                {this.props.teacherCourses.map((course) => {
                  return (
                    <div key={course.id} onClick={() => this.props.selectCourse(course.id)} className='prepared-course'>
                      <div className='prepared-course-time'>
                        {course.numberModules === 1 ? '1 Section' : `${course.numberModules} Sections`}
                      </div>
                      <div className='prepared-course-title'>
                        {course.courseName}
                      </div>
                      <div className='your-courses-text-flex'>
                        <PeopleAltOutlinedIcon className='your-courses-flex-icon' />
                        <div className='your-courses-text'>
                          Assigned To 0 Classes
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
              </div>
              <div onClick={() => this.props.toggleCourseBuilder()} className='create-new-course-flex'>
                <AddCircleOutlineOutlinedIcon className='create-new-course-icon' />
                <div className='create-new-course-text'>
                  Create New Course
                </div>
              </div>
            </div>
          )}
        </div>    
      );
    } else {
      return (
        <ViewCourseTile
          courseId={this.props.selectedCourse}
          selectCourse={this.props.selectCourse}
          toggleCreateClassroom={this.props.toggleCreateClassroom}
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
  };
};

export default connect(mapStateToProps)(YourCourses);
