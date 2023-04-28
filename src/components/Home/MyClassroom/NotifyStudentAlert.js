import React from 'react';
import Dialog from '@mui/material/Dialog';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import '../../../styles/Admin/Admin.css';

class NotifyStudentAlert extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      copied: false
    }
  }

  handleName() {
    let fullName = '';
    return fullName;
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
              Send Message To {this.handleName()}
            </div>
            <HighlightOffIcon
              onClick={() => this.props.dismiss()}
              style={{ fill: '#01452f', paddingRight: 24, paddingTop: 20, cursor: 'pointer' }}
            />
          </div>
        </div>
      </Dialog>
    );
   }
}

export default NotifyStudentAlert;
