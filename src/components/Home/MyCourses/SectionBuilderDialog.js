import React from 'react';
import Dialog from '@mui/material/Dialog';
import '../../../styles/Admin/Admin.css';
import { connect } from 'react-redux';
import { updateDashboard } from '../../../ActionTypes/dashboardActions';
import { getAllPublicModules } from '../../../selectors/coursemoduleSelectors';
// import StandardsPopup from '../../Admin/StandardsPopup';
// import { objectToArray } from '../../../helper_functions/utilities';
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
      googleURL: false,
      pdfName: '',
      pdfOrientation: 'portrait',
      standardsVisible: false,
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
        selectedActivity: 0,
        googleURL: false,
        pdfURL: false,
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

  // Updates State To Display PDF Of Selected Educational Resource
  viewResource(item, type) {
    this.props.updateDashboard('pdfVisible', true);
    if (type === 'article') {
      this.setState({
        PDFVisible: true,
        pdfURL: item.pdfUrl,
        googleURL: item.googleURL,
        pdfName: item.articleName,
        pdfOrientation: 'portrait'
      });
    } else {
      this.setState({
        PDFVisible: true,
        pdfURL: item.pdfUrl,
        googleURL: item.googleURL,
        pdfName: item.activityName,
        pdfOrientation: 'portrait'
      });
    }
  }

  // Pass Through Arrow Function To Dismiss PDF Viewer
  dismissPDFViewer = () => {
    this.props.updateDashboard('pdfVisible', false);
    this.setState({ PDFVisible: false });
  }

  // Filters Out Modules That Have Already Been Selected
  _getModuleOptions() {
    // Gets An Array Of Module IDs That Have Been Selected
    let currentArray = [];
    for (var i in this.props.courseSections) {
      if (this.props.courseSections[i].module !== null) {
        currentArray.push(parseInt(this.props.courseSections[i].module));
      }
    }
    // Creates A New Array Of Eligible Options
    let moduleArray = [];
    for (var j in this.props.publicModules) {
      if (currentArray.indexOf(parseInt(this.props.publicModules[j].id)) === -1) {
        moduleArray.push(this.props.publicModules[j]);
      }
    }
    return moduleArray;
  }

  render() {
    let moduleOptions = this._getModuleOptions();
    return (
      <Dialog
        open={this.props.visible}
        onClose={this.props.dismiss}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth={this.state.status === 'confirm' ? 'sm' : 'lg'}
        style={{ marginTop: this.state.status === 'confirm' ? 0 : 40 }}
      >
        {/* 
        TODO: Removed Because We Cannot Consistently Display Standards With Current Function
        
        <StandardsPopup
          visible={this.state.standardsVisible}
          dismiss={this.toggleStandards}
          type='Module'
          data={this._getModuleStandards(this.state.selectedModule)}
        /> */}
        <PDFViewer
          visible={this.state.PDFVisible}
          dismiss={this.dismissPDFViewer}
          googleURL={this.state.googleURL}
          pdfURL={this.state.pdfURL}
          pdfName={this.state.pdfName}
          orientation={this.state.pdfOrientation}
        />
        <div className='container'>
          <div className='alert-title' style={{ fontWeight: '800' }}>
            Module {parseInt(this.props.selectedSection) + 1}
          </div>
          <div className='upload-template-instructions'>
            {this.state.status === 'module' ? 'Please select a module to assign.' : 'Save this module to continue building your course.'}
          </div>
          <div className='section-builder-container'>
            {this.state.status === 'module' && moduleOptions && moduleOptions.length > 0 && (
              <div className='module-flex-container'>
                {moduleOptions.map((item) => {
                  return (
                    <div title="Select Module To Add To Course" onClick={() => this.selectModule(item.id)} key={item.id} className='module-flex-item'>
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
                          <div title="View Activity PDF" key={item} onClick={() => this.viewResource(item, 'activity')} className='selected-education-confirm-text course-builder-text'>
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
                          <div title="View Article PDF" key={item} onClick={() => this.viewResource(item, 'article')} className='selected-education-confirm-text course-builder-text'>
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
              {this.state.status === 'confirm' ? 'Save Module' : 'Next'}
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

// Map Dispatch To Props (Dispatch Actions to Reducers. Reducers then modify the redux store state.
const mapDispatchToProps = (dispatch) => {
  // Action
    return {
      updateDashboard: (name, status) => dispatch(updateDashboard(name, status)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(SectionBuilderDialog);
