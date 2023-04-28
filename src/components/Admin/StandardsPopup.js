import React from 'react';
import Dialog from '@mui/material/Dialog';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import '../../styles/Admin/Admin.css';

class StandardsPopup extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      copied: false
    }
  }

  // Handles Copying Standards To Clipboard If Teachers Need To Keep That Information
  copyStandards() {
    this.setState({ copied: true });
    navigator.clipboard.writeText('8.1a, 8.2a, 8.2b, 8.2c, 8.3a');
  }

  render() {
    return (
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
              style={{ fill: '#01452f', paddingRight: 24, paddingTop: 20, cursor: 'pointer' }}
            />
          </div>
          <div
            onClick={() => this.copyStandards()}
            className='upload-template-instructions'
            style={{ cursor: 'pointer', paddingBottom: 5 }}
          >
            8.1a, 8.2a, 8.2b, 8.2c, 8.3a
          </div>
          {this.state.copied && (
            <div className='standard-item-title' style={{ marginLeft: 23, marginTop: 5, color: '#00ab7f' }}>
              Copied
            </div>
          )}
          <div className='standards-popup-container'>
            {this.props.standardsArray.map((item) => {
              return (
              <div key={item} className='standards-item-flex'>
                <div className='standard-item-left'>
                  <div className='standard-item-title'>
                    Earning Income 8.1
                  </div>
                  <div className='standard-item-text'>
                    This is example text for the expected outcomes for a specific learning standard and can be quite long.
                  </div>
                </div>
                <div className='standard-item-right'>
                  <div className='standard-item-title' style={{ color: '#00ab7f' }}>
                    8.1a:
                  </div>
                  <div className='standard-item-text'>
                    This is example text for the expected outcomes for a specific learning standard and can be quite long and usually is longer than the substandard that is to the left of this.
                  </div>
                </div>
              </div>
            )})}
          </div>
        </div>
      </Dialog>
    );
   }
}

export default StandardsPopup;
