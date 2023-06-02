import React from 'react';
import Dialog from '@mui/material/Dialog';
import '../../../styles/Admin/Admin.css';
import { connect } from 'react-redux';
import { getAllPublicModules } from '../../../selectors/coursemoduleSelectors';
import StandardsPopup from '../../Admin/StandardsPopup';
import { objectToArray } from '../../../helper_functions/utilities';
import PDFViewer from '../../Admin/PDFViewer';

class SectionBuilderDialog extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      status: 'module',
      selectedModule: 0,
      selectedArticles: [],
      selectedActivities: [],
      includeAssessment: false,
      PDFVisible: false,
      pdfURL: false,
      pdfOrientation: 'portrait'
    }
  }

  // When Visibility Changes For Dialog, We Reset The State To Avoid Strange User Sequences
  componentDidUpdate(prevProps) {
    if (this.props.visible !== prevProps.visible) {
      this.setState({
        status: 'module',
        selectedModule: 0,
        selectedArticles: [],
        selectedActivites: [],
        includeAssessment: false,
        selectedArticle: 0,
        selectedActivity: 0
      });
    }
  }

  // Handles Back Button Functionality, Which Dismisses On Initial State Of Selecting Module
  back() {
    if (this.state.status === 'module') {
      this.props.dismiss();
    } else {
      this.setState({ status: 'module', includeAssessment: false });
    }
  }

  // Handles Next Button To Allow User To Select Module, Articles & Activity, And Confirm With Assessments True or Fale
  next() {
    // Once A User Selects A Module, We Allow Them To Press Next To Select Articles & Activities
    if (this.state.status === 'module' && this.state.selectedModule !== 0) {
      this.setState({ status: 'confirm' });
    } else {
      this.props.saveSection(this.state.selectedModule, this.props.publicModules[this.state.selectedModule - 1].name);
    }
  }

  // Handles Updating State When User Selects A Module
  selectModule(int) {
    if (int === this.state.selectedModule) {
      this.setState({ selectedModule: 0 });
    } else {
      this.setState({ selectedModule: int });
    }
  }

  // Handles Toggling Assessment From True To False Using Switch
  changeAssessment() {
    this.setState({ includeAssessment: !this.state.includeAssessment });
  }

  // Calculates Module Time Estimate Based On Number Of Articles & Activities
  _handleTimeEstimate() {
    const activityTime = 25 * this.props.publicModules[this.state.selectedModule - 1].activities.length;
    const articleTime = 10 * this.props.publicModules[this.state.selectedModule - 1].articles.length;
    const totalTime = 55 + activityTime + articleTime;
    return `${Math.floor(totalTime / 60)} Hours, ${totalTime - (Math.floor(totalTime / 60) * 60)} Minutes`;
  }

  // Pass Through Arrow Function To Toggle Visibility Of StandardsPopup
  toggleStandards = () => {
    this.setState({ standardsVisible: !this.state.standardsVisible });
  }

  // Takes Array of Module IDs & Returns An Object With 6 Arrays For Standards That Map To Each Standard Type, Removing Initial Int Because
  // Standards Are Of The Format x.y.z. If you search for this function, it is used in several places, but it is not a helper function because we want access to redux
  _getModuleStandards(moduleID) {
    // Initialize Arrays That We Push Values Into Before Returning To Create A List Of All Standards For Course/Section
    let allStandardStrings = []; let spendingArray = []; let savingArray = []; let investingArray = []; let incomeArray = []; let riskArray = []; let creditArray = [];
    if (moduleID > 0) {
      let standardsTableArray = objectToArray(this.props.financialLiteracyStandards);
      for (var j = 0; j < this.props.publicModules[moduleID - 1].presentationStandards.length; j++) {
        // Handles Spending Related Standards
        if (standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].topic === 'Spending') {
          let searchSpendingIndex = spendingArray.findIndex(item => item.mainStandard === standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].mainStandard);
          // Main Standard Is Already In Spending Array
          if (searchSpendingIndex !== -1 && spendingArray[searchSpendingIndex].subStandards.findIndex(item => item === standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].subStandard) !== 1) {
            spendingArray[searchSpendingIndex].subStandards.push({
              standard: standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].subStandard,
              description: standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].description,
            });
          }
          // Main Standard Is Not In The Spending Array So We Add It
          else {
            spendingArray.push(
              {
                title: standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].topic,
                mainStandard: standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].mainStandard,
                subject: standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].subject,
                subStandards: [{
                  standard: standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].subStandard,
                  description: standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].description,
                }], 
              }
            );
          }
          allStandardStrings.push('2.' + standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].subStandard + ', ');
        }
        // Handles Saving Related Standards
        else if (standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].topic === 'Saving') {
          let searchSavingIndex = savingArray.findIndex(item => item.mainStandard === standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].mainStandard);
          // Main Standard Is Already In Saving Array
          if (searchSavingIndex !== -1 && savingArray[searchSavingIndex].subStandards.findIndex(item => item === standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].subStandard) !== 1) {
            savingArray[searchSavingIndex].subStandards.push({
              standard: standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].subStandard,
              description: standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].description,
            });
          }
          // Main Standard Is Not In The Saving Array So We Add It
          else {
            savingArray.push(
              {
                title: standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].topic,
                mainStandard: standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].mainStandard,
                subject: standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].subject,
                subStandards: [{
                  standard: standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].subStandard,
                  description: standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].description,
                }], 
              }
            );
          }
          allStandardStrings.push('3.' + standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].subStandard + ', ');
        } else if (standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].topic === 'Investing') {
          let searchInvestingArray = investingArray.findIndex(item => item.mainStandard === standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].mainStandard);
          // Main Standard Is Already In Investing Array
          if (searchInvestingArray !== -1 && investingArray[searchInvestingArray].subStandards.findIndex(item => item === standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].subStandard) !== 1) {
            investingArray[searchInvestingArray].subStandards.push({
              standard: standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].subStandard,
              description: standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].description,
            });
          }
          // Main Standard Is Not In The Investing Array So We Add It
          else {
            investingArray.push(
              {
                title: standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].topic,
                mainStandard: standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].mainStandard,
                subject: standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].subject,
                subStandards: [{
                  standard: standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].subStandard,
                  description: standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].description,
                }], 
              }
            );
          }
          allStandardStrings.push('4.' + standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].subStandard + ', ');
        } else if (standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].topic === 'Earning Income') {
          let searchIncomeArray = incomeArray.findIndex(item => item.mainStandard === standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].mainStandard);
          // Main Standard Is Already In Spending Array
          if (searchIncomeArray !== -1 && incomeArray[searchIncomeArray].subStandards.findIndex(item => item === standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].subStandard) !== 1) {
            incomeArray[searchIncomeArray].subStandards.push({
              standard: standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].subStandard,
              description: standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].description,
            });
          }
          // Main Standard Is Not In The Spending Array So We Add It
          else {
            incomeArray.push(
              {
                title: standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].topic,
                mainStandard: standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].mainStandard,
                subject: standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].subject,
                subStandards: [{
                  standard: standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].subStandard,
                  description: standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].description,
                }], 
              }
            );
          }
          allStandardStrings.push('1.' + standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].subStandard + ', ');
        } else if (standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].topic === 'Risk') {
          let searchRiskArray = riskArray.findIndex(item => item.mainStandard === standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].mainStandard);
          // Main Standard Is Already In Spending Array
          if (searchRiskArray !== -1 && riskArray[searchRiskArray].subStandards.findIndex(item => item === standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].subStandard) !== 1) {
            riskArray[searchRiskArray].subStandards.push({
              standard: standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].subStandard,
              description: standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].description,
            });
          }
          // Main Standard Is Not In The Spending Array So We Add It
          else {
            riskArray.push(
              {
                title: standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].topic,
                mainStandard: standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].mainStandard,
                subject: standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].subject,
                subStandards: [{
                  standard: standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].subStandard,
                  description: standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].description,
                }], 
              }
            );
          }
          allStandardStrings.push('6.' + standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].subStandard + ', ');
        } else if (standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].topic === 'Credit') {
          let searchCreditArray = creditArray.findIndex(item => item.mainStandard === standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].mainStandard);
          // Main Standard Is Already In Spending Array
          if (searchCreditArray !== -1 && creditArray[searchCreditArray].subStandards.findIndex(item => item === standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].subStandard) !== 1) {
            creditArray[searchCreditArray].subStandards.push({
              standard: standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].subStandard,
              description: standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].description,
            });
          }
          // Main Standard Is Not In The Spending Array So We Add It
          else {
            creditArray.push(
              {
                title: standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].topic,
                mainStandard: standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].mainStandard,
                subject: standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].subject,
                subStandards: [{
                  standard: standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].subStandard,
                  description: standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].description,
                }], 
              }
            );
          }
          allStandardStrings.push('5.' + standardsTableArray[this.props.publicModules[moduleID - 1].presentationStandards[j] - 1].subStandard + ', ');
        }
      }
    }
    return { spendingArray, savingArray, investingArray, incomeArray, riskArray, creditArray, allStandardStrings };
  }

  // Updates State To Display PDF Of Selected Educational Resource
  viewResource(item) {
    this.setState({ PDFVisible: true, pdfURL: item.pdfUrl, pdfOrientation: 'portrait' });
  }

  // Pass Through Arrow Function To Dismiss PDF Viewer
  dismissPDFViewer = () => {
    this.setState({ PDFVisible: false });
  }

  render() {
    return (
      <Dialog
        open={this.props.visible}
        onClose={this.props.dismiss}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth={this.state.status === 'confirm' ? 'sm' : 'md'}
      >
        <StandardsPopup
          visible={this.state.standardsVisible}
          dismiss={this.toggleStandards}
          type='Module'
          data={this._getModuleStandards(this.state.selectedModule)}
        />
        <PDFViewer
          visible={this.state.PDFVisible}
          dismiss={this.dismissPDFViewer}
          pdfURL={this.state.pdfURL}
          orientation={this.state.pdfOrientation}
        />
        <div className='container'>
          <div className='alert-title' style={{ fontWeight: '800' }}>
            Section {parseInt(this.props.selectedSection) + 1}
          </div>
          <div className='upload-template-instructions'>
            {this.state.status === 'module' ? 'Please select a module to assign to this section.' : 'Save this section to continue building your course.'}
          </div>
          <div className='section-builder-container'>
            {this.state.status === 'module' && (
              <div className='module-flex-container'>
                {this.props.publicModules.map((item) => {
                  return (
                    <div onClick={() => this.selectModule(item.id)} key={item.id} className='module-flex-item'>
                      <img
                        src={item.imageUrl}
                        alt=''
                        className='module-flex-image'
                        style={{
                          width: '200px',
                          border: this.state.selectedModule === item.id ? '10px solid #00b084' : '',
                          borderRadius: 10
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            )}
            {this.state.status === 'confirm' && (
              <div className='confirm-section-container'>
                <div className='confirm-section-left'>
                  <div className='selected-education-title'>
                    Module {this.state.selectedModule}
                  </div>
                  <div className='selected-education-confirm-title'>
                    {this.props.publicModules[this.state.selectedModule - 1].name} 
                  </div>
                  <div className='selected-education-confirm-text course-builder-text' onClick={this.toggleStandards} style={{ marginTop: -10, paddingBottom: 25, cursor: 'pointer' }}>
                    View Standards Covered
                  </div>
                  <div className='selected-education-title'>
                    Esimated Class Time
                  </div>
                  <div className='selected-education-confirm-text'>
                    {this._handleTimeEstimate()}
                  </div>
                  <div className='selected-education-title' style={{ paddingTop: 16 }}>
                  {this.props.publicModules[this.state.selectedModule - 1].activities.length} Activities
                  </div>
                  {this.props.publicModules[this.state.selectedModule - 1].activities.length === 0 && (
                    <div className='selected-education-text'>
                      No Activies To Display
                    </div>
                  )}
                  {this.props.publicModules[this.state.selectedModule - 1].activities.length !== 0 && (
                    <div>
                      {this.props.publicModules[this.state.selectedModule - 1].activities.map((item) => {
                        return (
                          <div key={item} onClick={() => this.viewResource(item)} className='selected-education-confirm-text course-builder-text'>
                            • {item.activityName}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                <div className='confirm-section-right'>
                  <div className='selected-education-title' style={{ paddingTop: 16 }}>
                    {this.props.publicModules[this.state.selectedModule - 1].articles.length} Articles
                  </div>
                  {this.props.publicModules[this.state.selectedModule - 1].articles.length === 0 && (
                    <div className='selected-education-text'>
                      No Articles To Display
                    </div>
                  )}
                  {this.props.publicModules[this.state.selectedModule - 1].articles.length !== 0 && (
                    <div>
                      {this.props.publicModules[this.state.selectedModule - 1].articles.map((item) => {
                        return (
                          <div key={item} onClick={() => this.viewResource(item)} className='selected-education-confirm-text course-builder-text'>
                            • {item.articleName}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className='module-builder-flex'>
            <div onClick={() => this.back()} className='builder-dismiss-button'>
              {this.state.status === 'module' ? 'Close' : 'Back'}
            </div>
            <div onClick={() => this.next()} className={`builder-next-button ${this.state.selectedModule !== 0 ? '' : 'builder-next-disabled'}`}>
              {this.state.status === 'confirm' ? 'Save Section' : 'Next'}
            </div>
          </div>
        </div>
      </Dialog>
    );
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

export default connect(mapStateToProps)(SectionBuilderDialog);
