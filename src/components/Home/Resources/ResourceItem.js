import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateDashboard } from '../../../ActionTypes/dashboardActions';
import '../../../styles/Home/Resources.css';
import PDFViewer from '../../Admin/PDFViewer';

class ResourceItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pdfVisible: false,
      pdfName: ''
    }
  }

  // Pass Through Arrow Function To Dismiss PDF Viewer
  dismissPDFViewer = () => {
    this.props.updateDashboard('pdfVisible', false);
    this.setState({ pdfVisible: false });
  }

  // Handles When User Clicks Resource Item By Displaying PDFViewer With URL Of This Item For User To View
  _handleSelectItem(name) {
    this.props.updateDashboard('pdfVisible', true);
    this.setState({ pdfVisible: true, pdfName: name });
  }

  render() {
    if (this.props.type === 'activity') {
      return (
        <div key={this.props.item.id}>
          <PDFViewer
            visible={this.state.pdfVisible}
            dismiss={this.dismissPDFViewer}
            pdfURL={this.props.item.pdfUrl}
            pdfName={this.state.pdfName}
            orientation={'portrait'}
          />
          <div title="View Activity PDF" onClick={() => this._handleSelectItem(this.props.item.activityName)} className='library-result-flex-item'>
            <div className='library-result-title'>
              {this.props.item.activityName}
            </div>
            <div className='library-result-module'>
              Module {this.props.item.moduleID}: {this.props.item.moduleName}
            </div>
            <div className='library-result-summary'>
              {this.props.item.description}
            </div>
          </div>
        </div>
      );
    } else if (this.props.type === 'article') {
        return (
          <div key={this.props.item.id}>
            <PDFViewer
              visible={this.state.pdfVisible}
              dismiss={this.dismissPDFViewer}
              pdfURL={this.props.item.pdfUrl}
              pdfName={this.state.pdfName}
              orientation={'portrait'}
            />
            <div title="View Article PDF" onClick={() => this._handleSelectItem(this.props.item.articleName)} className='library-result-flex-item'>
              <div className='library-result-title'>
                {this.props.item.articleName}
              </div>
              <div className='library-result-module'>
                Module {this.props.item.moduleID}: {this.props.item.moduleName}
              </div>
              <div className='library-result-summary'>
                {this.props.item.description}
              </div>
            </div>
          </div>
        );
    } else if (this.props.type === 'modules') {
      return (
        <div key={this.props.item.id}>
          <PDFViewer
            visible={this.state.pdfVisible}
            dismiss={this.dismissPDFViewer}
            pdfURL={this.props.item.presentationUrl}
            pdfName={this.state.pdfName}
            orientation={'landscape'}
          />
          <img
            alt=''
            className='module-resource-image'
            src={this.props.item.imageUrl}
            style={{ cursor: 'pointer' }}
            onClick={() => this._handleSelectItem(this.props.item.name)}
            title="View Module PDF"
          />
        </div>
      );
    } else if (this.props.type === 'assessments') {
      return (
        <div key={this.props.item.id} className='resource-assessment-container'>
          <img
            alt=''
            className='module-resource-image'
            src={this.props.item.moduleImage}
            title="View Module PDF"
          />
          <div className='resource-quiz-details'>
            <div className='resource-quiz-module'>
              Module {this.props.item.moduleID}
            </div>
            <div className='resource-quiz-title'>
              {this.props.item.moduleName} Quiz
            </div>
            <div className='resource-quiz-question-number'>
              {this.props.item.questions.length} {this.props.item.questions.length === 1 ? 'Question' : 'Questions'}
            </div>
            <div className='resource-quiz-text'>
              {this.props.item.description.split('.')[0]}.
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div key={this.props.item.assetId}>
          <PDFViewer
            visible={this.state.pdfVisible}
            dismiss={this.dismissPDFViewer}
            pdfURL={this.props.item.documentUrl}
            pdfName={this.state.pdfName}
            orientation={this.props.item.assetType === 'MODULE' ? 'landscape' : 'portrait'}
          />
          <div title="View Resource PDF" onClick={() => this._handleSelectItem(this.props.item.assetName)} className='library-result-flex-item'>
            <div className='library-result-title'>
              {this.props.item.assetName}
            </div>
            <div className='library-result-module'>
              Module {this.props.item.moduleId}
            </div>
            <div className='library-result-summary'>
              {this.props.item.assetDescription}
            </div>
            <div className='result-keywords'>
              <div className='keywords-item'>
                {this.props.item.assetType.toLowerCase()}
              </div>
            </div>
          </div>
        </div>
      );
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

// Map Dispatch To Props (Dispatch Actions to Reducers. Reducers then modify the redux store state.
const mapDispatchToProps = (dispatch) => {
  // Action
    return {
      updateDashboard: (name, status) => dispatch(updateDashboard(name, status)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResourceItem);
