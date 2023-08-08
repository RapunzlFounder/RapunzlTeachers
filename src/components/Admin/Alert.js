import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import '../../styles/Admin/Admin.css';

class Alert extends React.PureComponent {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }

  // Props Passed Into Alert Determine Whether To Show 2 Buttons. This Allows Option1 to Default to Dismiss If No Option Is Present
  handleOption1() {
    if (this.props.option === null || this.props.option === undefined || !this.props.option) {
      this.props.dismiss();
    } else {
      this.props.option();
      this.props.dismiss();
    }
  }

  // Props Passed Into Alert Dictate If There Is An Option2. Otherwise, Option1 Must Have a Function And Option 2 Is Dismiss
  handleOption2() {
    if (this.props.option2 === null || this.props.option2 === undefined || !this.props.option2) {
      this.props.dismiss();
    } else {
      this.props.option2();
      this.props.dismiss();
    }
  }

  // Handles If We Receive An Object Back As An Error Message From A GraphQL Error
  getMessage() {
    if (typeof this.props.message == 'object') {
      return 'An unknown error occurred. Please try again in a few minutes, perhaps logging out, and contacting support if the problem continues. Thanks for your patience!';
    } else {
      return this.props.message;
    }
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
          <div className='alert-title'>
            {this.props.title}
          </div>
          <div className='alert-message'>
            {this.getMessage()}
          </div>
          <DialogActions>
            <Button onClick={() => this.handleOption1()} style={{ color: '#007154' }}>
              {this.props.optionText ? this.props.optionText : 'Close'}
            </Button>
            {this.props.option2Text && (
              <Button onClick={() => this.handleOption2()} autoFocus style={{ color: '#7b7b7b' }}>
                {this.props.option2Text}
              </Button>
            )}
          </DialogActions>
        </div>
      </Dialog>
    );
   }
}

export default Alert;
