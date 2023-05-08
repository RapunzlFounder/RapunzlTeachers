import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../../styles/Home/Resources.css';
import PDFViewer from '../../Admin/PDFViewer';

class ResourceItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pdfVisible: false,
    }
  }

  // Pass Through Arrow Function To Dismiss PDF Viewer
  dismissPDFViewer = () => {
    this.setState({ pdfVisible: false });
  }

  // Handles When User Clicks Resource Item By Displaying PDFViewer With URL Of This Item For User To View
  _handleSelectItem() {
    this.setState({ pdfVisible: true });
  }

  render() {
    return (
      <div key={this.props.item.assetId}>
        <PDFViewer
          visible={this.state.pdfVisible}
          dismiss={this.dismissPDFViewer}
          pdfURL={this.props.item.documentUrl}
          orientation={this.props.item.assetType === 'MODULE' ? 'landscape' : 'portrait'}
        />
        <div onClick={() => this._handleSelectItem()} className='library-result-flex-item'>
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

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    // Handles Colors Which Are Updated Throughout When MarketOpen Changes
    colors: state.userDetails.appColors,
  };
};

export default connect(mapStateToProps)(ResourceItem);
