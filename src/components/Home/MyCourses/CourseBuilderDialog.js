import React from 'react';
import Dialog from '@mui/material/Dialog';
import '../../../styles/Admin/Admin.css';
import Pie from '../../Admin/Pie';
import PrebuiltCourses from '../../../constants/PrebuiltCourses';
import { connect } from 'react-redux';
import { updateDashboard } from '../../../ActionTypes/dashboardActions';
import { getAllPublicModules } from '../../../selectors/coursemoduleSelectors';
import PDFViewer from '../../Admin/PDFViewer';
import { objectToArray } from '../../../helper_functions/utilities';
import StandardsPopup from '../../Admin/StandardsPopup';

class CourseBuilderDialog extends React.PureComponent {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
    this.state = {
      googleURL: false,
      pdfURL: 'images/M1/M1_Presentation.pdf',
      pdfName: '',
      PDFVisible: false,
      pdfOrientation: 'landscape',
      standardsVisible: false
    }
  }

  // Resets State If Visibility Of CourseBuilderDialog Changes To True To Avoid Relics Of Previous Sessions
  componentDidUpdate(prevProps) {
    if (this.props.visible !== prevProps.visible && this.props.visible) {
      this.setState({
        googleURL: false,
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
      for (var i in PrebuiltCourses[this.props.selectedCourse].moduleIDList) {
        modulesString = modulesString + PrebuiltCourses[this.props.selectedCourse].moduleIDList[i] + ', ';
        // Loop Through Articles For Each Module And Add To Array
        for (var j in this.props.publicModules[PrebuiltCourses[this.props.selectedCourse].moduleIDList[i] - 1].articles) {
          courseArticles.push(this.props.publicModules[PrebuiltCourses[this.props.selectedCourse].moduleIDList[i] - 1].articles[j]);
        }
        // Loop Through Activities For Each Module And Add To Array
        for (var k in this.props.publicModules[PrebuiltCourses[this.props.selectedCourse].moduleIDList[i] - 1].activities) {
          courseActivities.push(this.props.publicModules[PrebuiltCourses[this.props.selectedCourse].moduleIDList[i] - 1].activities[k]);
        }
      }
    }
    return [modulesString, courseArticles, courseActivities];
  }

  // Takes Array of Module IDs & Returns An Object With 6 Arrays For Standards That Map To Each Standard Type
  // Standard Types Are: Saving, Spending, Investing, Credit, Risk, Earned Income
  // Each Array Of Standards That Is Returned Is An Array Of Objects With Each Object Corresponding To A Main Standard, Including A Main Standard, Text Description & Substandard array of objects
  // Within The Substandard Array Of Objects, Each Object Includes the Substandard And A Text Description
  // If you search for this function, it is also implented in SectionBuilderDialog, however, that function only handles 1 module, whereas this handles an array of modules
  // to show the standards that are coverd by the entire course, so that an educator can make sure that a course covers the required standards for their state.
  _getModuleStandards(moduleList) {
    let modulesArray = moduleList.split(',');
    let allStandardStrings = [];
    let spendingArray = [];
    let savingArray = [];
    let investingArray = [];
    let incomeArray = [];
    let riskArray = [];
    let creditArray = [];
    // Converts Financial Literacy Standards To An Array - This Could Be Done In A Selector
    let standardsTableArray = objectToArray(this.props.financialLiteracyStandards);
    // Loop Through The Array Of Module IDs
    for (var i in modulesArray) {
      // When We Split The Modules Array, There Is An Empty String As The Final Element, So We Check To Ensure That Module ID Is An Int
      if (parseInt(modulesArray[i]) > 0) {
        // Loop Through All Of The Presentation Standards For A Specific Module
        for (var j in this.props.publicModules[modulesArray[i] - 1].presentationStandards) {
          // Uses The Standard ID From Presentation Standards In PublicModules To Find Information About The Standard In StandardsTableArray
          // We Then Check what type the standard is to determine which array the standard should be considered for.
          // This Handles If The Standard Type Is Spending
          if (standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].topic === 'Spending') {
            // This Is The Index Of The Main Standard Inside Of Spending Array, Which We Use To Determine If the Main Standard Has Already Been Added (Lines 110 - 123)
            // eslint-disable-next-line
            let searchSpendingIndex = spendingArray.findIndex(item => item.mainStandard === standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].mainStandard);
            // Checks To See If Main Standard Is Already In The Array. This Handles If The Main Standard Is Already Present
            // eslint-disable-next-line
            if (searchSpendingIndex !== -1 && spendingArray[searchSpendingIndex].subStandards.findIndex(item => item === standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].subStandard) !== 1) {
              // Multiple Modules Satisfy The Same Standards So We Need To Check That The Substandard Is Not Already Included In the Resulting Array
              let duplicateSpendingSubstandard = false;
              // Loop Through The Substandards That Have Been Added. If The Substandard is Present, Set The Flag to True and we will not add a duplicate substandard
              for (var k in spendingArray[searchSpendingIndex].subStandards) {
                if (spendingArray[searchSpendingIndex].subStandards[k].standard === standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].subStandard) {
                  duplicateSpendingSubstandard = true;
                }
              }
              // If the substandard is unique and has not been added to the array, we push the substandard object into the array, which allows us to map one main standard to multiple substandards
              if (!duplicateSpendingSubstandard) {
                spendingArray[searchSpendingIndex].subStandards.push({
                  standard: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].subStandard,
                  description: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].description,
                });
              }
            }
            // If The Main Standard Is Not In The Spending Array, We Add It With All Of The Relevant Info & Take The Associated Substandard And Add That As The First Object In The Substandards Array
            else {
              spendingArray.push(
                {
                  title: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].topic,
                  mainStandard: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].mainStandard,
                  subject: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].subject,
                  subStandards: [{
                    standard: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].subStandard,
                    description: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].description,
                  }], 
                }
              );
            }
            allStandardStrings.push('2.' + standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].subStandard + ', ');
          }
          // This Handles If The Standard Type Is Saving - Logic is similar to Lines 89-124.
          else if (standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].topic === 'Saving') {
            // eslint-disable-next-line
            let searchSavingIndex = savingArray.findIndex(item => item.mainStandard === standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].mainStandard);
            // Main Standard Is Already In Saving Array
            // eslint-disable-next-line
            if (searchSavingIndex !== -1 && savingArray[searchSavingIndex].subStandards.findIndex(item => item === standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].subStandard) !== 1) {
              let duplicateSavingSubstandard = false;
              // eslint-disable-next-line
              for (var k in savingArray[searchSavingIndex].subStandards) {
                if (savingArray[searchSavingIndex].subStandards[k].standard === standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].subStandard) {
                  duplicateSavingSubstandard = true;
                }
              }
              if (!duplicateSavingSubstandard) {
                savingArray[searchSavingIndex].subStandards.push({
                  standard: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].subStandard,
                  description: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].description,
                });
              }
            }
            // Main Standard Is Not In The Saving Array So We Add It
            else {
              savingArray.push(
                {
                  title: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].topic,
                  mainStandard: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].mainStandard,
                  subject: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].subject,
                  subStandards: [{
                    standard: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].subStandard,
                    description: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].description,
                  }], 
                }
              );
            }
            allStandardStrings.push('3.' + standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].subStandard + ', ');
          }
          // This Handles If The Standard Type Is Investing - Logic is similar to Lines 89-124.
          else if (standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].topic === 'Investing') {
            // eslint-disable-next-line
            let searchInvestingIndex = investingArray.findIndex(item => item.mainStandard === standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].mainStandard);
            // Main Standard Is Already In Investing Array
            // eslint-disable-next-line
            if (searchInvestingIndex !== -1 && investingArray[searchInvestingIndex].subStandards.findIndex(item => item === standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].subStandard) !== 1) {
              let duplicateInvestingStandard = false;
              // eslint-disable-next-line
              for (var k in investingArray[searchInvestingIndex].subStandards) {
                if (investingArray[searchInvestingIndex].subStandards[k].standard === standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].subStandard) {
                  duplicateInvestingStandard = true;
                }
              }
              if (!duplicateInvestingStandard) {
                investingArray[searchInvestingIndex].subStandards.push({
                  standard: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].subStandard,
                  description: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].description,
                });
              }
            }
            // Main Standard Is Not In The Investing Array So We Add It
            else {
              investingArray.push(
                {
                  title: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].topic,
                  mainStandard: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].mainStandard,
                  subject: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].subject,
                  subStandards: [{
                    standard: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].subStandard,
                    description: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].description,
                  }], 
                }
              );
            }
            allStandardStrings.push('4.' + standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].subStandard + ', ');
          }
          // This Handles If The Standard Type Is Earned Income - Logic is similar to Lines 89-124.
          else if (standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].topic === 'Earning Income') {
            // eslint-disable-next-line
            let searchIncomeIndex = incomeArray.findIndex(item => item.mainStandard === standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].mainStandard);
            // Main Standard Is Already In Spending Array
            // eslint-disable-next-line
            if (searchIncomeIndex !== -1 && incomeArray[searchIncomeIndex].subStandards.findIndex(item => item === standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].subStandard) !== 1) {
              let duplicateIncomeStandard = false;
              // eslint-disable-next-line
              for (var k in incomeArray[searchIncomeIndex].subStandards) {
                if (incomeArray[searchIncomeIndex].subStandards[k].standard === standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].subStandard) {
                  duplicateIncomeStandard = true;
                }
              }
              if (!duplicateIncomeStandard) {
                incomeArray[searchIncomeIndex].subStandards.push({
                  standard: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].subStandard,
                  description: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].description,
                });
              }
            }
            // Main Standard Is Not In The Spending Array So We Add It
            else {
              incomeArray.push(
                {
                  title: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].topic,
                  mainStandard: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].mainStandard,
                  subject: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].subject,
                  subStandards: [{
                    standard: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].subStandard,
                    description: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].description,
                  }], 
                }
              );
            }
            allStandardStrings.push('1.' + standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].subStandard + ', ');
          }
          // This Handles If The Standard Type Is Risk - Logic is similar to Lines 89-124.
          else if (standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].topic === 'Risk') {
            // eslint-disable-next-line
            let searchRiskIndex = riskArray.findIndex(item => item.mainStandard === standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].mainStandard);
            // Main Standard Is Already In Spending Array
            // eslint-disable-next-line
            if (searchRiskIndex !== -1 && riskArray[searchRiskIndex].subStandards.findIndex(item => item === standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].subStandard) !== 1) {
              let duplicateRiskStandard = false;
              // eslint-disable-next-line
              for (var k in riskArray[searchRiskIndex].subStandards) {
                if (riskArray[searchRiskIndex].subStandards[k].standard === standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].subStandard) {
                  duplicateRiskStandard = true;
                }
              }
              if (!duplicateRiskStandard) {
                riskArray[searchRiskIndex].subStandards.push({
                  standard: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].subStandard,
                  description: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].description,
                });
              }
            }
            // Main Standard Is Not In The Spending Array So We Add It
            else {
              riskArray.push(
                {
                  title: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].topic,
                  mainStandard: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].mainStandard,
                  subject: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].subject,
                  subStandards: [{
                    standard: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].subStandard,
                    description: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].description,
                  }], 
                }
              );
            }
            allStandardStrings.push('6.' + standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].subStandard + ', ');
          }
          // This Handles If The Standard Type Is Credit - Logic is similar to Lines 89-124.
          else if (standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].topic === 'Credit') {
            // eslint-disable-next-line
            let searchCreditIndex = creditArray.findIndex(item => item.mainStandard === standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].mainStandard);
            // Main Standard Is Already In Spending Array
            // eslint-disable-next-line
            if (searchCreditIndex !== -1 && creditArray[searchCreditIndex].subStandards.findIndex(item => item === standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].subStandard) !== 1) {
              let duplicateCreditStandard = false;
              // eslint-disable-next-line
              for (var k in creditArray[searchCreditIndex].subStandards) {
                if (creditArray[searchCreditIndex].subStandards[k].standard === standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].subStandard) {
                  duplicateCreditStandard = true;
                }
              }
              if (!duplicateCreditStandard) {
                creditArray[searchCreditIndex].subStandards.push({
                  standard: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].subStandard,
                  description: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].description,
                });
              }
            }
            // Main Standard Is Not In The Spending Array So We Add It
            else {
              creditArray.push(
                {
                  title: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].topic,
                  mainStandard: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].mainStandard,
                  subject: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].subject,
                  subStandards: [{
                    standard: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].subStandard,
                    description: standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].description,
                  }], 
                }
              );
            }
            allStandardStrings.push('5.' + standardsTableArray[this.props.publicModules[modulesArray[i] - 1].presentationStandards[j]].subStandard + ', ');
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
  viewResource(item, type) {
    this.props.updateDashboard('pdfVisible', true);
    if (type === 'activity') {
      this.setState({
        PDFVisible: true,
        googleURL: item.googleURL,
        pdfURL: item.pdfUrl,
        pdfName: item.activityName,
        pdfOrientation: 'portrait'
      });
    } else {
      this.setState({
        PDFVisible: true,
        googleURL: item.googleURL,
        pdfURL: item.pdfUrl,
        pdfName: item.articleName,
        pdfOrientation: 'portrait'
      });
    }
  }

  // Pass Through Arrow Function To Dismiss PDF Viewer
  dismissPDFViewer = () => {
    this.props.updateDashboard('pdfVisible', false);
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
            googleURL={this.state.googleURL}
            pdfURL={this.state.pdfURL}
            pdfName={this.state.pdfName}
            orientation={this.state.pdfOrientation}
          />
          {/* 
          TODO: Figure out standards presentation
          <StandardsPopup
            visible={this.state.standardsVisible}
            dismiss={this.toggleStandards}
            type='Course'
            data={this._getModuleStandards(modulesArray[0])}
          /> */}
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
                  {/* <div onClick={this.toggleStandards} className='selected-education-confirm-text' style={{ marginTop: -10, paddingBottom: 25, cursor: 'pointer' }}>
                    View Standards Covered
                  </div> */}
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
                    if (index < 3) {
                      return (
                        <div title="View Article PDF" onClick={() => this.viewResource(item, 'article')} className='selected-education-confirm-text course-builder-text'>
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
                    if (index < 3) {
                      return (
                        <div title="View Activity PDF" onClick={() => this.viewResource(item, 'activity')} className='selected-education-confirm-text course-builder-text'>
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
                    pct={75 + parseInt(this.props.selectedCourse) * 8}
                    inverted
                  />
                  <div className='confirm-section-title'>
                    Coverage Of Core Personal Finance
                  </div>
                  <Pie
                    color={'#007154'}
                    pct={61 + parseInt(this.props.selectedCourse) * 12}
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
              <div title="Add This Module To Your Course" onClick={() => this.next()} className={`builder-next-button ${this.state.selectedModule !== 0 ? '' : 'builder-next-disabled'}`}>
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

// Map Dispatch To Props (Dispatch Actions to Reducers. Reducers then modify the redux store state.
const mapDispatchToProps = (dispatch) => {
  // Action
    return {
      updateDashboard: (name, status) => dispatch(updateDashboard(name, status)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseBuilderDialog);
