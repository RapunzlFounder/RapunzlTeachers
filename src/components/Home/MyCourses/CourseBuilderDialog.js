import React from 'react';
import Dialog from '@mui/material/Dialog';
import '../../../styles/Admin/Admin.css';
import Pie from '../../Admin/Pie';
import PrebuiltCourses from '../../../constants/PrebuiltCourses';
import { connect } from 'react-redux';
import { getAllPublicModules } from '../../../selectors/coursemoduleSelectors';
import PDFViewer from '../../Admin/PDFViewer';
import { objectToArray } from '../../../helper_functions/utilities';
import StandardsPopup from '../../Admin/StandardsPopup';

class CourseBuilderDialog extends React.PureComponent {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
    this.state = {
      pdfURL: 'images/M1/M1_Presentation.pdf',
      PDFVisible: false,
      pdfOrientation: 'landscape',
      standardsVisible: false
    }
  }

  // Resets State If Visibility Of CourseBuilderDialog Changes To True To Avoid Relics Of Previous Sessions
  componentDidUpdate(prevProps) {
    if (this.props.visible !== prevProps.visible && this.props.visible) {
      this.setState({
        pdfURL: 'images/M1/M1_Presentation.pdf',
        PDFVisible: false,
        pdfOrientation: 'landscape',
      });
    }
  }

  // Handles Next Button To Allow User To Select Module, Articles & Activity, And Confirm With Assessments True or Fale
  next() {
    this.props.saveCourse();
  }

  // Returns Array Including Module Numbers (String), Investing Standards Covered (%), All Standards Covered (%), Articles (Array), Activities (Array)
  getCoveredModules() {
    let modulesString = '';
    // Retrieves A List Of Articles Associated With The Modules In This Course So We Can Display 5 And The Total Article Count
    let courseArticles = [];
    // Retrieves A List Of Activities Associated With The Modules In This Course So We Can Display 5 And The Total Activity Count
    let courseActivities = [];
    if (this.props.selectedCourse !== null && this.props.selectedCourse !== undefined && PrebuiltCourses[this.props.selectedCourse] !== undefined) {
      for (var i = 0; i < PrebuiltCourses[this.props.selectedCourse].moduleIDList.length; i++) {
        modulesString = modulesString + PrebuiltCourses[this.props.selectedCourse].moduleIDList[i] + ', ';
        // Loop Through Articles For Each Module And Add To Array
        for (var j = 0; j < this.props.publicModules[PrebuiltCourses[this.props.selectedCourse].moduleIDList[i] - 1].articles.length; j++) {
          courseArticles.push(this.props.publicModules[PrebuiltCourses[this.props.selectedCourse].moduleIDList[i] - 1].articles[j]);
        }
        // Loop Through Activities For Each Module And Add To Array
        for (var k = 0; k < this.props.publicModules[PrebuiltCourses[this.props.selectedCourse].moduleIDList[i] - 1].activities.length; k++) {
          courseActivities.push(this.props.publicModules[PrebuiltCourses[this.props.selectedCourse].moduleIDList[i] - 1].activities[k]);
        }
      }
    }
    return [modulesString, courseArticles, courseActivities];
  }

  // Takes Array of Module IDs & Returns An Object With 6 Arrays For Standards That Map To Each Standard Type, Removing Initial Int Because
  // Standards Are Of The Format x.y.z. If you search for this function, it is used in several places, but it is not a helper function because we want access to redux
  _getModuleStandards(moduleList) {
    let modulesArray = moduleList.split(',');
    let allStandardStrings = [];
    let spendingArray = [];
    let savingArray = [];
    let investingArray = [];
    let incomeArray = [];
    let riskArray = [];
    let creditArray = [];
    let standardsTableArray = objectToArray(this.props.financialLiteracyStandards);
    for (var i = 0; i < modulesArray.length; i++) {
      if (parseInt(modulesArray[i]) > 0) {
        for (var j = 0; j < this.props.publicModules[modulesArray[i] - 1].presentationStandards.length; j++) {
          if (standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j] - 1].topic === 'Spending') {
            spendingArray.push(
              {
                title: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j] - 1].topic + ' ' + standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j] - 1].mainStandard,
                subject: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j] - 1].subject,
                standard: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j] - 1].subStandard,
                description: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j] - 1].description,
              }
            );
            allStandardStrings.push('2.' + standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j] - 1].subStandard + ', ');
          } else if (standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j] - 1].topic === 'Saving') {
            savingArray.push(
              {
                title: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j] - 1].topic + ' ' + standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j] - 1].mainStandard,
                subject: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j] - 1].subject,
                standard: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j] - 1].subStandard,
                description: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j] - 1].description,
              }
            );
            allStandardStrings.push('3.' + standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j] - 1].subStandard + ', ');
          } else if (standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j] - 1].topic === 'Investing') {
            investingArray.push(
              {
                title: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j] - 1].topic + ' ' + standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j] - 1].mainStandard,
                subject: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j] - 1].subject,
                standard: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j] - 1].subStandard,
                description: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j] - 1].description,
              }
            );
            allStandardStrings.push('4.' + standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j] - 1].subStandard + ', ');
          } else if (standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j] - 1].topic === 'Earning Income') {
            incomeArray.push(
              {
                title: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j] - 1].topic + ' ' + standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j] - 1].mainStandard,
                subject: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j] - 1].subject,
                standard: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j] - 1].subStandard,
                description: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j] - 1].description,
              }
            );
            allStandardStrings.push('1.' + standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j] - 1].subStandard + ', ');
          } else if (standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j] - 1].topic === 'Risk') {
            riskArray.push(
              {
                title: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j] - 1].topic + ' ' + standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j] - 1].mainStandard,
                subject: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j] - 1].subject,
                standard: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j] - 1].subStandard,
                description: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j] - 1].description,
              }
            );
            allStandardStrings.push('6.' + standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j] - 1].subStandard + ', ');
          } else if (standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j] - 1].topic === 'Credit') {
            creditArray.push(
              {
                title: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j] - 1].topic + ' ' + standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j] - 1].mainStandard,
                subject: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j] - 1].subject,
                standard: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j] - 1].subStandard,
                description: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j] - 1].description,
              }
            );
            allStandardStrings.push('5.' + standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j] - 1].subStandard + ', ');
          }
        }
      }
    }
    return {
      spendingArray,
      savingArray,
      investingArray,
      incomeArray,
      riskArray,
      creditArray,
      allStandardStrings
    };
  }

  // Updates State To Display PDF Of Selected Educational Resource
  viewResource(item) {
    this.setState({ PDFVisible: true, pdfURL: item.pdfUrl, pdfOrientation: 'portrait' });
  }

  // Pass Through Arrow Function To Dismiss PDF Viewer
  dismissPDFViewer = () => {
    this.setState({ PDFVisible: false });
  }

  // Pass Through Arrow Function To Toggle Visibility Of StandardsPopup
  toggleStandards = () => {
    this.setState({ standardsVisible: !this.state.standardsVisible });
  }

  render() {
    let modulesArray = this.getCoveredModules();
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
          <PDFViewer
            visible={this.state.PDFVisible}
            dismiss={this.dismissPDFViewer}
            pdfURL={this.state.pdfURL}
            orientation={this.state.pdfOrientation}
          />
          <StandardsPopup
            visible={this.state.standardsVisible}
            dismiss={this.toggleStandards}
            type='Course'
            data={this._getModuleStandards(modulesArray[0])}
          />
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
                    {modulesArray[0]}
                  </div>
                  <div onClick={this.toggleStandards} className='selected-education-confirm-text' style={{ marginTop: -10, paddingBottom: 25, cursor: 'pointer' }}>
                    View Standards Covered
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
                  {modulesArray[1].map((item, index) => {
                    console.log('article', item);
                    if (index < 3) {
                      return (
                        <div onClick={() => this.viewResource(item)} className='selected-education-confirm-text course-builder-text'>
                          {item.articleName}
                        </div>
                      );
                    } else if (index === 3) {
                      return (
                        <div className='selected-education-total-count'>
                          And {modulesArray[1].length - 3} More...
                        </div>
                      );
                    } else {
                      return <div/>
                    }
                  })}
                  
                  <div className='selected-education-title' style={{ paddingTop: 16 }}>
                    Activities In Course
                  </div>
                  {modulesArray[2].map((item, index) => {
                    console.log('activities', item);
                    if (index < 3) {
                      return (
                        <div onClick={() => this.viewResource(item)} className='selected-education-confirm-text course-builder-text'>
                          {item.activityName}
                        </div>
                      );
                    } else if (index === 3) {
                      return (
                        <div className='selected-education-total-count'>
                          And {modulesArray[2].length - 3} More...
                        </div>
                      );
                    } else {
                      return <div />
                    }
                  })}
                  
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
    publicModules: getAllPublicModules(state),
    financialLiteracyStandards: state.coursesmodules.financialLiteracyStandards,
  };
};

export default connect(mapStateToProps)(CourseBuilderDialog);
