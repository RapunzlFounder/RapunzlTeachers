import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setMenuTab, quickAccessAddStudents, quickAccessCourseBuilder } from '../../../ActionTypes/dashboardActions';
import PollIcon from '@mui/icons-material/Poll';
import AddStudentsBW from '../../../assets/images/ChecklistTips/AddStudents_BW.png';
import AddStudentsColor from '../../../assets/images/ChecklistTips/AddStudents_Color.png';
import BuildCourseBW from '../../../assets/images/ChecklistTips/BuildCourse_BW.png';
import BuildCourseColor from '../../../assets/images/ChecklistTips/BuildCourse_Color.png';
import CollectGradesBW from '../../../assets/images/ChecklistTips/CollectGrades_BW.png';
import CollectGradesColor from '../../../assets/images/ChecklistTips/CollectGrades_Color.png';
import CreateClassroomBW from '../../../assets/images/ChecklistTips/CreateClassroom_BW.png';
import CreateClassroomColor from '../../../assets/images/ChecklistTips/CreateClassroom_Color.png';
import ExportCourseBW from '../../../assets/images/ChecklistTips/ExportCourse_BW.png';
import ExportCourseColor from '../../../assets/images/ChecklistTips/ExportCourse_Color.png';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import '../../../styles/Home/Dashboard.css';
import { getAllTeacherClassrooms } from '../../../selectors/classroomSelectors';
import { getAllTeacherCourses } from '../../../selectors/coursemoduleSelectors';

class GettingStartedTips extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  // Handles Text For Progress Title & Color For Progress Bar
  getProgressArray(progress) {
    if (progress === 1) {
      return ['Getting Started', '#1d9678'];
    } else if (progress === 2) {
      return ['On Your Way', '#19af89'];
    } else if (progress === 3) {
      return ['Ready To Go', '#12c698'];
    } else if (progress === 4) {
      return ['Almost There', '#15e4af'];
    } else if (progress === 5) {
      return ['Invested', '#13f8bd'];
    } else if (progress === 6) {
      return ['Expert', '#00ffbd'];
    } else {
      return ['Complete', '#00ffbd'];
    }
  }

  // Handles Getting Progress For Progress Bar, Title & Text By Checking Different Parts Of Redux
  getProgress() {
    // First Progress Check Is If Teacher User Has Created A Classroom
    if (!!this.props.allClassrooms && this.props.allClassrooms.length === 0) {
      return 1;
    } 
    // Second Progress Check Is If Teacher Has Added Students - So We Check Classrooms
    else {
      let addedStudents = false;
      for (var i in this.props.allClassrooms) {
        if (this.props.allClassrooms[i].noStudents !== 0) {
          addedStudents = true;
        }
      }
      if (!addedStudents) {
        return 2;
      }
      // Third Progress Check Is If Teacher Has Created A Course For Their Classroom
      else if (this.props.allCourses.length === 0) {
        return 3;
      }
      // Fourth Progress Check Is If There Is A Grade From Any Students And Teacher Has Collected Grade
      else {
        return 4;
      }
      // Final Progress Check Is If Teacher User Has Exported The Gradebook - Which We Have A Flag For In Details
    }
  }

  render() {
    let progress = this.getProgress();
    let progressArray = this.getProgressArray(progress);
    return (
      <div className='tile classroom-overview' style={{ paddingBottom: 25 }}>
        <div className='home-header-flex'>
          <PollIcon />
          <div className='home-header'>
            Profile Checklist
          </div>
        </div>
        <div className='checklist-progress-bar-title'>
          Your Progress: <div style={{ fontWeight: '700', color: progressArray[1], marginLeft: 7 }}>{progressArray[0]}</div>
        </div>
        <div className='checklist-progress-bar'>
          <div className='checklist-progress-ball' style={{ marginRight: '-15px', backgroundColor: '#0a5340' }} />
          <div className='checklist-progress-item' style={{ backgroundColor: progress > 0 ? '#1d9678' : '#354541' }} />
          {progress === 1 && (<div className='checklist-progress-ball' style={{ marginRight: '-15px', marginLeft: '-15px', backgroundColor: '#1d9678' }} />)}
          <div className='checklist-progress-item' style={{ backgroundColor: progress > 1 ? '#19af89' : '#354541' }} />
          {progress === 2 && (<div className='checklist-progress-ball' style={{ marginRight: '-15px', marginLeft: '-15px', backgroundColor: '#19af89' }} />)}
          <div className='checklist-progress-item' style={{ backgroundColor: progress > 2 ? '#12c698' : '#354541' }} />
          {progress === 3 && (<div className='checklist-progress-ball' style={{ marginRight: '-15px', marginLeft: '-15px', backgroundColor: '#12c698' }} />)}
          <div className='checklist-progress-item' style={{ backgroundColor: progress > 3 ? '#15e4af' : '#354541' }} />
          {progress === 4 && (<div className='checklist-progress-ball' style={{ marginRight: '-15px', marginLeft: '-15px', backgroundColor: '#15e4af' }} />)}
          <div className='checklist-progress-item' style={{ backgroundColor: progress > 4 ? '#13f8bd' : '#354541' }} />
          {progress === 5 && (<div className='checklist-progress-ball' style={{ marginRight: '-15px', marginLeft: '-15px', backgroundColor: '#13f8bd' }} />)}
          <div className='checklist-progress-item' style={{ backgroundColor: progress > 5 ? '#00ffbd' : '#354541' }} />
          {progress === 6 && (<div className='checklist-progress-ball' style={{ marginRight: '-15px', marginLeft: '-15px', backgroundColor: '#00ffbd' }} />)}
          <div className='checklist-progress-ball' style={{ marginLeft: '-15px', backgroundColor: '#ff9700' }} />
        </div>
        <div onClick={() => this.props.quickAccessAddStudents()} className={`checklist-item ${progress === 1 ? '' : 'checklist-item-not-selected'}`}>
          {progress >= 2 && (
            <div className='checklist-item-complete-flex'>
              <img alt='' className='checklist-item-image' src={progress === 1 ? CreateClassroomColor : CreateClassroomBW} />
              <CheckCircleIcon className='checklist-item-complete-icon' />
            </div>
          )}
          {progress < 2 && (
            <img alt='' className='checklist-item-image' src={progress === 1 ? CreateClassroomColor : CreateClassroomBW} />
          )}
          <div className='checklist-text-container'>
            <div className='checklist-item-header' style={{ color: progress === 1 ? '#ffc300' : '#4a9c80' }}>
              Create A Classroom
            </div>
            <div className='checklist-item-text' style={{ color: progress === 1 ? 'white' : '#4a9c80' }}>
              Get started by to upload students, assign courses, and bring financial literacy into your class.
            </div>
          </div>
        </div>
        <div onClick={() => this.props.setMenuTab(3)} className={`checklist-item ${progress === 2 ? '' : 'checklist-item-not-selected'}`}>
          {progress >= 3 && (
            <div className='checklist-item-complete-flex'>
              <img alt='' className='checklist-item-image' src={progress === 2 ? AddStudentsColor : AddStudentsBW} />
              <CheckCircleIcon className='checklist-item-complete-icon' />
            </div>
          )}
          {progress < 3 && (
            <img alt='' className='checklist-item-image' src={progress === 2 ? AddStudentsColor : AddStudentsBW} />
          )}
          <div className='checklist-text-container'>
            <div className='checklist-item-header' style={{ color: progress === 2 ? '#ffc300' : '#4a9c80' }}>
              Add Students
            </div>
            <div className='checklist-item-text' style={{ color: progress === 2 ? 'white' : '#4a9c80' }}>
              Begin adding students to your classroom so that they can download Rapunzl and you can track their progress.
            </div>
          </div>
        </div>
        <div onClick={() => this.props.quickAccessCourseBuilder()} className={`checklist-item ${progress === 3 ? '' : 'checklist-item-not-selected'}`}>
          {progress >= 4 && (
            <div className='checklist-item-complete-flex'>
              <img alt='' className='checklist-item-image' src={progress === 3 ? BuildCourseColor : BuildCourseBW} />
              <CheckCircleIcon className='checklist-item-complete-icon' />
            </div>
          )}
          {progress < 4 && (
            <img alt='' className='checklist-item-image' src={progress === 3 ? BuildCourseColor : BuildCourseBW} />
          )}
          <div className='checklist-text-container'>
            <div className='checklist-item-header' style={{ color: progress === 3 ? '#ffc300' : '#4a9c80' }}>
              Build A Course
            </div>
            <div className='checklist-item-text' style={{ color: progress === 3 ? 'white' : '#4a9c80' }}>
              Access our financial literacy resources to create a customized course and assign it to your classroom.
            </div>
          </div>
        </div>
        <div onClick={() => this.setMenuTab(5)} className={`checklist-item ${progress === 4 ? '' : 'checklist-item-not-selected'}`}>
          {progress >= 5 && (
            <div className='checklist-item-complete-flex'>
              <img alt='' className='checklist-item-image' src={progress === 4 ? CollectGradesColor : CollectGradesBW} />
              <CheckCircleIcon className='checklist-item-complete-icon' />
            </div>
          )}
          {progress < 5 && (
            <img alt='' className='checklist-item-image' src={progress === 4 ? CollectGradesColor : CollectGradesBW} />
          )}
          <div className='checklist-text-container'>
            <div className='checklist-item-header' style={{ color: progress === 4 ? '#ffc300' : '#4a9c80' }}>
              Collect Student Grades
            </div>
            <div className='checklist-item-text' style={{ color: progress === 4 ? 'white' : '#4a9c80' }}>
              Finish the first module in your course, assign a quiz to your class & collect grades through Rapunzl's in-app assessments.
            </div>
          </div>
        </div>
        <div onClick={() => this.setMenuTab(5)} className={`checklist-item ${progress === 5 ? '' : 'checklist-item-not-selected'}`}>
          {progress >= 6 && (
            <div className='checklist-item-complete-flex'>
              <img alt='' className='checklist-item-image' src={progress === 5 ? ExportCourseColor : ExportCourseBW} />
              <CheckCircleIcon className='checklist-item-complete-icon' />
            </div>
          )}
          {progress < 6 && (
            <img alt='' className='checklist-item-image' src={progress === 5 ? ExportCourseColor : ExportCourseBW} />
          )}
          <div className='checklist-text-container'>
            <div className='checklist-item-header' style={{ color: progress === 5 ? '#ffc300' : '#4a9c80' }}>
              Export Course & Grades
            </div>
            <div className='checklist-item-text' style={{ color: progress === 5 ? 'white' : '#4a9c80' }}>
              At any point during the course, export your classrrom and course with grades, standards alignment, and topics covered.
            </div>
          </div>
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
    // Selector To Get All Teacher Classrooms To Check if They Have Created A Class Yet
    allClassrooms: getAllTeacherClassrooms(state),
    allCourses: getAllTeacherCourses(state),
  };
};

// Map Dispatch To Props (Dispatch Actions to Reducers. Reducers then modify the redux store state.
const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    // Handles sending message to Database to email to support email address
    setMenuTab: (tab) => dispatch(setMenuTab(tab)),
    quickAccessAddStudents: () => dispatch(quickAccessAddStudents()),
    quickAccessCourseBuilder: () => dispatch(quickAccessCourseBuilder()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GettingStartedTips);
