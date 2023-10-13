import React from 'react';
import { connect } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import '../../styles/Admin/Admin.css';
import Alert from './Alert';

class StandardsPopup extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      copied: false,
      alertVisible: false,
      alertTitle: '',
      alertMessage: ''
    }
  }

  // Handles Rendering Standard Section For List, If The List Is Not Empty
  _renderStandardSection(list) {
    if (list.length !== 0) {
      return (
        <div>
          {list.map((item, index) => {
            return (
            <div key={index} className='standards-item-flex'>
              <div className='standard-item-left'>
                <div className='standard-item-title'>
                  {item.title} {item.mainStandard}
                </div>
                <div className='standard-item-text'>
                  {item.subject}
                </div>
              </div>
              <div className='standard-item-right'>
                {item.subStandards.map((item, index) => {
                  return (
                    <div key={index}>
                      <div className='standard-item-title' style={{ color: '#00ab7f' }}>
                        {item.standard}:
                      </div>
                      <div className='standard-item-text' style={{ width: '320px', paddingBottom: 10 }}>
                        {item.description}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )})}
        </div>
      )
    } else {
      return <div />
    }
  }

  // Handles Copying Standards To Clipboard If Teachers Need To Keep That Information
  copyStandards() {
    this.setState({ copied: true });
    navigator.clipboard.writeText(this.props.data.allStandardStrings.sort());
  }

  // Toggles Visibility Of Alert Dialog
  toggleAlert = () => {
    this.setState({ alertVisible: !this.state.alertVisible });
  }

  render() {
    return (
      <div>
        <Alert
          title={this.state.alertTitle}
          message={this.state.alertMessage}
          visible={this.state.alertVisible}
          dismiss={this.toggleAlert}
        />
        <Dialog
          open={this.props.visible}
          onClose={this.props.dismiss}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div className='container'>
            <div className='standards-header-flex'>
              <div className='alert-title' style={{ fontWeight: '800' }}>
                Standards Covered In This {this.props.type}
              </div>
              <HighlightOffIcon
                onClick={() => this.props.dismiss()}
                className='standard-close-x'
                style={{ paddingRight: 24, paddingTop: 20, cursor: 'pointer' }}
              />
            </div>
            <div className='standards-popup-container'>
              <div
                onClick={() => this.copyStandards()}
                title="Copy List Of Standards To Clipboard"
                className='upload-template-instructions'
                style={{ cursor: 'pointer', paddingBottom: 5, width: 'auto' }}
              >
                Copy List Of Standards
              </div>
              {this.state.copied && (
                <div className='standard-item-title' style={{ marginLeft: 23, marginTop: 5, color: '#00ab7f' }}>
                  Copied
                </div>
              )}
              {this._renderStandardSection(this.props.data.incomeArray)}
              {this._renderStandardSection(this.props.data.spendingArray)}
              {this._renderStandardSection(this.props.data.savingArray)}
              {this._renderStandardSection(this.props.data.investingArray)}
              {this._renderStandardSection(this.props.data.creditArray)}
              {this._renderStandardSection(this.props.data.riskArray)}
            </div>
          </div>
        </Dialog>
      </div>
    );
   }
}

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    // Used to authenticate contactSupport dispatch to graphQL
    jwtToken: state.userDetails.jwtToken,
    // Last Time Standards Were Retrieved To Avoid Hitting Server 
    standardsLastRetrieved: state.coursesmodules.standardsLastRetrieved,
    standards: state.coursesmodules.financialLiteracyStandards,
  };
};

export default connect(mapStateToProps)(StandardsPopup);
