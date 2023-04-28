import React from 'react';
import Dialog from '@mui/material/Dialog';
import '../../../styles/Admin/Admin.css';
import Pie from '../../Admin/Pie';
import PrebuiltCourses from '../../../constants/PrebuiltCourses';
import { connect } from 'react-redux';

class CourseBuilderDialog extends React.PureComponent {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  // Handles Next Button To Allow User To Select Module, Articles & Activity, And Confirm With Assessments True or Fale
  next() {
    this.props.saveCourse();
  }

  getCoveredModules() {
    let modulesString = '';
    for (var i = 0; i < PrebuiltCourses[this.props.selectedCourse].moduleIDList.length; i++) {
      modulesString = modulesString + PrebuiltCourses[this.props.selectedCourse].moduleIDList[i] + ', ';
    }
    return modulesString;
  }

  render() {
    if (this.props.selectedCourse !== undefined && this.props.selectedCourse !== null && this.props.selectedCourse !== false) {
      return (
        <Dialog
          open={this.props.visible}
          onClose={this.props.dismiss}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth={true}
          maxWidth={'sm'}
        >
          <div className='container'>
            <div className='alert-title' style={{ fontWeight: '800' }}>
              {PrebuiltCourses[this.props.selectedCourse].title}
            </div>
            <div className='upload-template-instructions' style={{ width: 'auto', fontSize: '16px', paddingBottom: '15px' }}>
              {PrebuiltCourses[this.props.selectedCourse].description}
            </div>
            <div className='section-builder-container'>
              <div className='confirm-section-container'>
                <div className='confirm-section-left'>
                  <div className='selected-education-title'>
                    Modules Included
                  </div>
                  <div className='selected-education-confirm-title'>
                    {this.getCoveredModules()}
                  </div>
                  <div className='selected-education-title'>
                    Esimated Class Time
                  </div>
                  <div className='selected-education-confirm-text'>
                    {PrebuiltCourses[this.props.selectedCourse].timeEstimate}
                  </div>
                  <div className='selected-education-title' style={{ paddingTop: 16 }}>
                    Articles In Course
                  </div>
                  <div className='selected-education-confirm-text'>
                    Article 1
                  </div>
                  <div className='selected-education-title' style={{ paddingTop: 16 }}>
                    Activities In Course
                  </div>
                  <div className='selected-education-confirm-text'>
                    Activity 1
                  </div>
                </div>
                <div className='confirm-section-right2'>
                  <Pie
                    color={'#007154'}
                    pct={85}
                    inverted
                  />
                  <div className='confirm-section-title'>
                    Coverage Of Core Investing Modules
                  </div>
                  <Pie
                    color={'#007154'}
                    pct={45}
                    inverted
                  />
                  <div className='confirm-section-title'>
                    Coverage Of National Financial Literacy Standards
                  </div>
                </div>
              </div>
            </div>
            <div className='module-builder-flex'>
              <div onClick={() => this.props.dismiss()} className='builder-dismiss-button'>
                Close
              </div>
              <div onClick={() => this.next()} className={`builder-next-button ${this.state.selectedModule !== 0 ? '' : 'builder-next-disabled'}`}>
                Add To Your Courses
              </div>
            </div>
          </div>
        </Dialog>
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
  };
};

export default connect(mapStateToProps)(CourseBuilderDialog);
