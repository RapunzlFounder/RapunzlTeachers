import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTeacherCourse } from '../../../selectors/coursemoduleSelectors';
import PublishedWithChanges from '@mui/icons-material/PublishedWithChanges';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import StandardsPopup from '../../Admin/StandardsPopup';
import ProgressBar from './ProgressBar';
import AssignCourseDialog from './AssignCourseDialog';
import PDFViewer from '../../Admin/PDFViewer';

class ViewCourseTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      standardsVisible: false,
      assigningCourse: false,
      currentSection: 1,
      pdfURL: 'images/M1/M1_Presentation.pdf',
      PDFVisible: false,
      pdfOrientation: 'landscape',
    }
  }

  // Toggles The Visibility Of The StandardsPopup Dialog Component Which Shows The Standards That Align With The Course
  toggleStandardsDialog = () => {
    this.setState({ standardsVisible: !this.state.standardsVisible });
  }

  // Increase/Decreases Section Number To Next Section. Will Not Go Below 1 Or Greater Than Length Of Modules In Course
  nextSection = (courseLength) => {
    if (this.state.currentSection < courseLength) { 
      this.setState({ currentSection: this.state.currentSection + 1 });
    }
  }
  backSection = () => {
    if (this.state.currentSection > 1) {
      this.setState({ currentSection: this.state.currentSection - 1 });
    }
  }

  // Select View Module Updates PDF URL, Orientation & Sets To Visible
  viewModule() {
    this.setState({
      PDFVisible: true,
      pdfOrientation: 'landscape',
      pdfURL: this.props.currentCourse.courseModules[this.state.currentSection - 1].presentationUrl,
    });
  }

  // View Teacher Guide Updates PDF URL, Orientation & Sets To Visible
  viewTeacherGuide() {
    this.setState({
      PDFVisible: true,
      pdfOrientation: 'portrait',
      pdfURL: this.props.currentCourse.courseModules[this.state.currentSection - 1].teacherGuides[0].pdfUrl,
    })
  }

  // View Resource Is Called When Clicking An Article Or Activity & Displays The Correct URL Passed As A Parameter
  viewResource(url) {
    this.setState({
      PDFVisible: true,
      pdfOrientation: 'portrait',
      pdfURL: url
    });
  }

  // Pass Through Arrow Function Which Handles Toggling Visibilty Of Alert To Assign A Selected Course To A Classroom
  toggleAssignCourse = () => {
    this.setState({ assigningCourse: !this.state.assigningCourse });
  }

  // Pass Through Arrow Function To Dismiss PDF Viewer
  dismissPDFViewer = () => {
    this.setState({ PDFVisible: false });
  }

  render() {
    return (
      <div className='tile current-course' style={{ paddingBottom: 20 }}>
        <AssignCourseDialog
          course={this.props.currentCourse}
          visible={this.state.assigningCourse}
          dismiss={this.toggleAssignCourse}
          toggleCreateClassroom={this.props.toggleCreateClassroom}
        />
        <StandardsPopup
          visible={this.state.standardsVisible}
          dismiss={this.toggleStandardsDialog}
          standardsArray={[0,1,2,3,4,5,6]}
          type='Section'
          module={2}
        />
        <PDFViewer
          visible={this.state.PDFVisible}
          dismiss={this.dismissPDFViewer}
          pdfURL={this.state.pdfURL}
          orientation={this.state.pdfOrientation}
        />
        <div onClick={() => this.props.selectCourse()} className='back-to-all-courses-button'>
          Back To All Courses
        </div>
        <div className='home-header-flex' style={{ justifyContent: 'center', padding: 0 }}>
          <PublishedWithChanges />
          <div className='home-header'>
            {this.props.currentCourse.courseName}
          </div>
        </div>
        <ProgressBar
          numberOfModules={this.props.currentCourse.courseModules.length}
          currentSection={this.state.currentSection}
          nextSection={this.nextSection}
          backSection={this.backSection}
        />
        <div className='this-week-flex-module' style={{ marginTop: 15 }}>
          <img alt='' src={this.props.currentCourse.courseModules[this.state.currentSection - 1].imageUrl} className='this-week-icon' />
          <div style={{ width: '52%', paddingLeft: 12 }}>
            <div className='this-week-module-title'>
              {this.props.currentCourse.courseModules[this.state.currentSection - 1].name}
            </div>
            <div className='this-week-module-text'>
              {this.props.currentCourse.courseModules[this.state.currentSection - 1].description}
            </div>
            <div>
              <div className='this-week-standards-button'>
                View Assessment
              </div>
              <div onClick={() => this.toggleStandardsDialog()} className='this-week-standards-button'>
                View Standards Covered
              </div>
            </div>
          </div>
        </div>
        <div className='this-week-flex-buttons' style={{ marginTop: 0 }}>
          <div className='this-week-flex-buttons' style={{ marginLeft: 0 }}>
            <div onClick={() => this.viewModule()} className='this-week-button module-button' style={{ marginRight: 10 }}>
              View Module
            </div>
            <div onClick={() => this.viewTeacherGuide()} className='this-week-button teacher-guide-button'>
              Teacher Guide
            </div>
          </div>
        </div>
        <div className='current-course-flex' style={{ justifyContent: 'flex-start' }}>
          <div className='current-course-articles'>
            {this.props.currentCourse.courseModules[this.state.currentSection - 1].articles.length === 0 ? (
              <div className='current-course-empty-articles'>
                <div className='current-course-articles-flex'>
                  <ArticleOutlinedIcon className='current-course-flex-icon' />
                  <div className='current-course-flex-h1'>
                    Articles
                  </div>
                </div>
                <HighlightOffIcon className='current-course-empty-icon' />
                <div className='current-course-empty-h1'>
                  No Articles<br/>To Display
                </div>
              </div>
            ) : (
              <div className='current-course-not-empty'>
                <div className='current-course-articles-flex'>
                  <ArticleOutlinedIcon className='current-course-flex-icon' />
                  <div className='current-course-flex-h1'>
                    Articles
                  </div>
                </div>
                {this.props.currentCourse.courseModules[this.state.currentSection - 1].articles.map((item) => {
                  return (
                    <div onClick={() => this.viewResource(item.pdfUrl)} key={item.id} className='current-course-item'>
                      <div className='current-course-item-title'>
                        {item.articleName}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
          <div className='current-course-activities'>
            {this.props.currentCourse.courseModules[this.state.currentSection - 1].activities.length === 0 ? (
                <div className='current-course-empty-articles'>
                  <div className='current-course-articles-flex'>
                    <ConstructionOutlinedIcon className='current-course-flex-icon' />
                    <div className='current-course-flex-h1'>
                      Activities
                    </div>
                  </div>
                  <HighlightOffIcon className='current-course-empty-icon' />
                  <div className='current-course-empty-h1'>
                    No Activities<br/>To Display
                  </div>
                </div>
              ) : (
                <div className='current-course-not-empty'>
                  <div className='current-course-articles-flex'>
                    <ConstructionOutlinedIcon className='current-course-flex-icon' />
                    <div className='current-course-flex-h1'>
                      Activities
                    </div>
                  </div>
                  {this.props.currentCourse.courseModules[this.state.currentSection - 1].activities.map((item) => {
                    return (
                      <div onClick={() => this.viewResource(item.pdfUrl)} key={item.id} className='current-course-item'>
                        <div className='current-course-item-title'>
                          {item.activityName}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
          </div>
        </div>
        <div className='current-course-assigned-container'>
          <div className='current-course-assigned-flex'>
            <div className='assigned-flex-divider' />
            <div className='assigned-flex-title'>
              Classes Taking This Course
            </div>
            <div className='assigned-flex-divider' />
          </div>
          <div className='assigned-text-empty'>
            This course is not assigned to any classrooms. Assign this course to a class so they can begin accessing course material.
          </div>
          <div onClick={() => this.toggleAssignCourse()} className='assign-class-to-course-button'>
            Assign To Classroom
          </div>
        </div>
        
      </div>
    )
  }
}

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state, ownProps) => {
  // Redux Store --> Component
  return {
    // Handles Colors Which Are Updated Throughout When MarketOpen Changes
    colors: state.userDetails.appColors,
    // Selector Which Handles Currently Selected Teacher Course
    currentCourse: getTeacherCourse(state, ownProps),
  };
};

export default connect(mapStateToProps)(ViewCourseTile);
