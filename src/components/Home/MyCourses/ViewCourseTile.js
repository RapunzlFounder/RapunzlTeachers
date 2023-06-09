import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTeacherCourse } from '../../../selectors/coursemoduleSelectors';
import { getAllPublicModules } from '../../../selectors/coursemoduleSelectors';
import { getAllTeacherClassrooms, getAllTeacherClassroomCourses } from '../../../selectors/classroomSelectors';
import StandardsPopup from '../../Admin/StandardsPopup';
import { objectToArray } from '../../../helper_functions/utilities';
import ProgressBar from './ProgressBar';
import AssignCourseDialog from './AssignCourseDialog';
import PDFViewer from '../../Admin/PDFViewer';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PublishedWithChanges from '@mui/icons-material/PublishedWithChanges';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import '../../../styles/Home/Courses.css'

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

  // Returns An Object With 6 Arrays For Standards That Map To Each Standard Type
  // Standard Types Are: Saving, Spending, Investing, Credit, Risk, Earned Income
  // Each Array Of Standards That Is Returned Is An Array Of Objects With Each Object Corresponding To A Main Standard, Including A Main Standard, Text Description & Substandard array of objects
  // Within The Substandard Array Of Objects, Each Object Includes the Substandard And A Text Description
  // If you search for this function, it is also implented in SectionBuilderDialog, however, that function handles an array of modules.
  _getModuleStandards() {
    let allStandardStrings = [];
    let spendingArray = [];
    let savingArray = [];
    let investingArray = [];
    let incomeArray = [];
    let riskArray = [];
    let creditArray = [];
    let moduleNumber = this.props.currentCourse.courseModules[this.state.currentSection - 1].id;
    // Converts Financial Literacy Standards To An Array - This Could Be Done In A Selector
    let standardsTableArray = objectToArray(this.props.financialLiteracyStandards);
    // Loop Through All Of The Presentation Standards For A Specific Module
    for (var j = 0; j < this.props.publicModules[moduleNumber - 1].presentationStandards.length; j++) {
      // Uses The Standard ID From Presentation Standards In PublicModules To Find Information About The Standard In StandardsTableArray
      // We Then Check what type the standard is to determine which array the standard should be considered for.
      // This Handles If The Standard Type Is Spending
      if (standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].topic === 'Spending') {
        // This Is The Index Of The Main Standard Inside Of Spending Array, Which We Use To Determine If the Main Standard Has Already Been Added (Lines 110 - 123)
        // eslint-disable-next-line
        let searchSpendingIndex = spendingArray.findIndex(item => item.mainStandard === standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].mainStandard);
        // Checks To See If Main Standard Is Already In The Array. This Handles If The Main Standard Is Already Present
        // eslint-disable-next-line
        if (searchSpendingIndex !== -1 && spendingArray[searchSpendingIndex].subStandards.findIndex(item => item === standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].subStandard) !== 1) {
          // Multiple Modules Satisfy The Same Standards So We Need To Check That The Substandard Is Not Already Included In the Resulting Array
          let duplicateSpendingSubstandard = false;
          // Loop Through The Substandards That Have Been Added. If The Substandard is Present, Set The Flag to True and we will not add a duplicate substandard
          // eslint-disable-next-line
          for (var k = 0; k < spendingArray[searchSpendingIndex].subStandards.length; k++) {
            if (spendingArray[searchSpendingIndex].subStandards[k].standard === standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].subStandard) {
              duplicateSpendingSubstandard = true;
            }
          }
          // If the substandard is unique and has not been added to the array, we push the substandard object into the array, which allows us to map one main standard to multiple substandards
          if (!duplicateSpendingSubstandard) {
            spendingArray[searchSpendingIndex].subStandards.push({
              standard: standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].subStandard,
              description: standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].description,
            });
          }
        }
        // If The Main Standard Is Not In The Spending Array, We Add It With All Of The Relevant Info & Take The Associated Substandard And Add That As The First Object In The Substandards Array
        else {
          spendingArray.push(
            {
              title: standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].topic,
              mainStandard: standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].mainStandard,
              subject: standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].subject,
              subStandards: [{
                standard: standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].subStandard,
                description: standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].description,
              }], 
            }
          );
        }
        allStandardStrings.push('2.' + standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].subStandard + ', ');
      }
      // This Handles If The Standard Type Is Saving - Logic is similar to Lines 89-124.
      else if (standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].topic === 'Saving') {
        // eslint-disable-next-line
        let searchSavingIndex = savingArray.findIndex(item => item.mainStandard === standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].mainStandard);
        // Main Standard Is Already In Saving Array
        // eslint-disable-next-line
        if (searchSavingIndex !== -1 && savingArray[searchSavingIndex].subStandards.findIndex(item => item === standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].subStandard) !== 1) {
          let duplicateSavingSubstandard = false;
          // eslint-disable-next-line
          for (var k = 0; k < savingArray[searchSavingIndex].subStandards.length; k++) {
            if (savingArray[searchSavingIndex].subStandards[k].standard === standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].subStandard) {
              duplicateSavingSubstandard = true;
            }
          }
          if (!duplicateSavingSubstandard) {
            savingArray[searchSavingIndex].subStandards.push({
              standard: standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].subStandard,
              description: standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].description,
            });
          }
        }
        // Main Standard Is Not In The Saving Array So We Add It
        else {
          savingArray.push(
            {
              title: standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].topic,
              mainStandard: standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].mainStandard,
              subject: standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].subject,
              subStandards: [{
                standard: standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].subStandard,
                description: standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].description,
              }], 
            }
          );
        }
        allStandardStrings.push('3.' + standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].subStandard + ', ');
      }
      // This Handles If The Standard Type Is Investing - Logic is similar to Lines 89-124.
      else if (standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].topic === 'Investing') {
        // eslint-disable-next-line
        let searchInvestingIndex = investingArray.findIndex(item => item.mainStandard === standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].mainStandard);
        // Main Standard Is Already In Investing Array
        // eslint-disable-next-line
        if (searchInvestingIndex !== -1 && investingArray[searchInvestingIndex].subStandards.findIndex(item => item === standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].subStandard) !== 1) {
          let duplicateInvestingStandard = false;
          // eslint-disable-next-line
          for (var k = 0; k < investingArray[searchInvestingIndex].subStandards.length; k++) {
            if (investingArray[searchInvestingIndex].subStandards[k].standard === standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].subStandard) {
              duplicateInvestingStandard = true;
            }
          }
          if (!duplicateInvestingStandard) {
            investingArray[searchInvestingIndex].subStandards.push({
              standard: standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].subStandard,
              description: standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].description,
            });
          }
        }
        // Main Standard Is Not In The Investing Array So We Add It
        else {
          investingArray.push(
            {
              title: standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].topic,
              mainStandard: standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].mainStandard,
              subject: standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].subject,
              subStandards: [{
                standard: standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].subStandard,
                description: standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].description,
              }], 
            }
          );
        }
        allStandardStrings.push('4.' + standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].subStandard + ', ');
      }
      // This Handles If The Standard Type Is Earned Income - Logic is similar to Lines 89-124.
      else if (standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].topic === 'Earning Income') {
        // eslint-disable-next-line
        let searchIncomeIndex = incomeArray.findIndex(item => item.mainStandard === standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].mainStandard);
        // Main Standard Is Already In Spending Array
        // eslint-disable-next-line
        if (searchIncomeIndex !== -1 && incomeArray[searchIncomeIndex].subStandards.findIndex(item => item === standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].subStandard) !== 1) {
          let duplicateIncomeStandard = false;
          // eslint-disable-next-line
          for (var k = 0; k < incomeArray[searchIncomeIndex].subStandards.length; k++) {
            if (incomeArray[searchIncomeIndex].subStandards[k].standard === standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].subStandard) {
              duplicateIncomeStandard = true;
            }
          }
          if (!duplicateIncomeStandard) {
            incomeArray[searchIncomeIndex].subStandards.push({
              standard: standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].subStandard,
              description: standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].description,
            });
          }
        }
        // Main Standard Is Not In The Spending Array So We Add It
        else {
          incomeArray.push(
            {
              title: standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].topic,
              mainStandard: standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].mainStandard,
              subject: standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].subject,
              subStandards: [{
                standard: standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].subStandard,
                description: standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].description,
              }], 
            }
          );
        }
        allStandardStrings.push('1.' + standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].subStandard + ', ');
      }
      // This Handles If The Standard Type Is Risk - Logic is similar to Lines 89-124.
      else if (standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].topic === 'Risk') {
        // eslint-disable-next-line
        let searchRiskIndex = riskArray.findIndex(item => item.mainStandard === standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].mainStandard);
        // Main Standard Is Already In Spending Array
        // eslint-disable-next-line
        if (searchRiskIndex !== -1 && riskArray[searchRiskIndex].subStandards.findIndex(item => item === standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].subStandard) !== 1) {
          let duplicateRiskStandard = false;
          // eslint-disable-next-line
          for (var k = 0; k < riskArray[searchRiskIndex].subStandards.length; k++) {
            if (riskArray[searchRiskIndex].subStandards[k].standard === standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].subStandard) {
              duplicateRiskStandard = true;
            }
          }
          if (!duplicateRiskStandard) {
            riskArray[searchRiskIndex].subStandards.push({
              standard: standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].subStandard,
              description: standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].description,
            });
          }
        }
        // Main Standard Is Not In The Spending Array So We Add It
        else {
          riskArray.push(
            {
              title: standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].topic,
              mainStandard: standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].mainStandard,
              subject: standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].subject,
              subStandards: [{
                standard: standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].subStandard,
                description: standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].description,
              }], 
            }
          );
        }
        allStandardStrings.push('6.' + standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].subStandard + ', ');
      }
      // This Handles If The Standard Type Is Credit - Logic is similar to Lines 89-124.
      else if (standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].topic === 'Credit') {
        // eslint-disable-next-line
        let searchCreditIndex = creditArray.findIndex(item => item.mainStandard === standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].mainStandard);
        // Main Standard Is Already In Spending Array
        // eslint-disable-next-line
        if (searchCreditIndex !== -1 && creditArray[searchCreditIndex].subStandards.findIndex(item => item === standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].subStandard) !== 1) {
          let duplicateCreditStandard = false;
          // eslint-disable-next-line
          for (var k = 0; k < creditArray[searchCreditIndex].subStandards.length; k++) {
            if (creditArray[searchCreditIndex].subStandards[k].standard === standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].subStandard) {
              duplicateCreditStandard = true;
            }
          }
          if (!duplicateCreditStandard) {
            creditArray[searchCreditIndex].subStandards.push({
              standard: standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].subStandard,
              description: standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].description,
            });
          }
        }
        // Main Standard Is Not In The Spending Array So We Add It
        else {
          creditArray.push(
            {
              title: standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].topic,
              mainStandard: standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].mainStandard,
              subject: standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].subject,
              subStandards: [{
                standard: standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].subStandard,
                description: standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].description,
              }], 
            }
          );
        }
        allStandardStrings.push('5.' + standardsTableArray[this.props.publicModules[moduleNumber - 1].presentationStandards[j] - 1].subStandard + ', ');
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

  // Gets Arrays To Render In Lists For Classrooms Currently Assigned To A Course & Those That Are Not
  _getClassArrays() {
    let assignedClassrooms = [];
    let unassignedArray = [];
    // If Teacher Has No Classroom Courses, All Classrooms Are In The Unassigned Array
    if (this.props.classroomCourses.length === 0) {
      unassignedArray = this.props.allClassrooms;
    }
    // Handles If Teacher Has Classroom Courses By Determining If A Class Is Assigned To A Course
    else {
      // Loop Through All Classrooms To Determine Which Return Array To Place Them In
      for (var i in this.props.allClassrooms) {
        // Initially Assume Classroom Is Not In A Course
        let assigned = false;
        // Check All Courses To Determine If Course ClassID Matches Classroom ID
        for (var j in this.props.classroomCourses) {
          // eslint-disable-next-line
          if (this.props.allClassrooms[i].id == this.props.classroomCourses[j].classId) {
            // If Classroom Matches, Then We Set Assigned to True
            assigned = true;
          }
        }
        // For Each Classroom We Either Add It To Assigned Classrooms or Unassigned Array
        if (assigned) {
          assignedClassrooms.push(this.props.allClassrooms[i]);
        } else {
          unassignedArray.push(this.props.allClassrooms[i]);
        }
      }
    }
    // Returns An Array Of Array To Be Used In Render Method For Lists
    return [unassignedArray, assignedClassrooms]
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
          classArrays={this._getClassArrays()}
        />
        <StandardsPopup
          visible={this.state.standardsVisible}
          dismiss={this.toggleStandardsDialog}
          data={this._getModuleStandards()}
          type='Section'
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
          {this._getClassArrays()[1].length === 0 ? (
            <div>
              <div className='assigned-text-empty'>
                This course is not assigned to any classrooms. Assign this course to a class so they can begin accessing course material.
              </div>
            </div>
          ) : (
            <div className='assigned-class-container'>
              {this._getClassArrays()[1].map((classItem) => {
                return (
                  <div className='assigned-class-item'>
                    <div className='assigned-class-left'>
                      <div className='assigned-class-name'>
                        {classItem.className}
                      </div>
                      <div className='assigned-class-students'>
                        {parseInt(classItem.noStudents) !== 1 ? classItem.noStudents + ' Students' : classItem.noStudents + ' Student'}
                      </div>
                    </div>
                    <ArrowForwardIosIcon className='assigned-class-arrow' />
                  </div>
                )
              })}
            </div>
          )}
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
    publicModules: getAllPublicModules(state),
    // Retrieves All Teacher Classrooms
    allClassrooms: getAllTeacherClassrooms(state),
    classroomCourses: getAllTeacherClassroomCourses(state),
    financialLiteracyStandards: state.coursesmodules.financialLiteracyStandards,
  };
};

export default connect(mapStateToProps)(ViewCourseTile);
