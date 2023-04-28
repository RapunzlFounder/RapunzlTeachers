import React from 'react';
import Dialog from '@mui/material/Dialog';
import '../../../styles/Admin/Admin.css';
import { connect } from 'react-redux';
import { getAllPublicModules } from '../../../selectors/coursemoduleSelectors';

class SectionBuilderDialog extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      status: 'module',
      selectedModule: 0,
      selectedArticles: [],
      selectedActivities: [],
      includeAssessment: false,
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
                          <div key={item} className='selected-education-confirm-text'>
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
                          <div key={item} className='selected-education-confirm-text'>
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
  };
};

export default connect(mapStateToProps)(SectionBuilderDialog);
