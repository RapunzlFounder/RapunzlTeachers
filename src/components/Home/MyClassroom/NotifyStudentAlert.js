import React from 'react';
import Dialog from '@mui/material/Dialog';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import '../../../styles/Admin/Admin.css';
import SendIcon from '@mui/icons-material/Send';
import { connect } from 'react-redux';
import { CircularProgress } from '@mui/material';

class NotifyStudentAlert extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      messageError: false,
      loading: false,
      progress: 'sending'
    }
  }

  // Resets The State If Visibility Is Toggled So That Teacher Can Send Multiple Messages & Interact With This Component
  // For The First Time Each Time They Toggle To Notify A Student
  componentDidUpdate(prevProps) {
    if (this.props.visible !== prevProps.visible && this.props.visible === true) {
      this.setState({
        message: '',
        messageError: false,
        loading: false,
        progress: 'sending'
      });
    }
  }

  // Handles Updating Message In State When User Types In TextArea to Write Message To Specific Student
  _handleOnChange(text) {
    this.setState({ message: text, messageError: false });
  }

  // Handles Ensuring That There Is A Message to Send, Then Handles Dispatch With GraphQL
  _handleOnSubmit() {
    this.setState({ loading: true });
    // If Message Length Is Less Than 5 Characters, We Prompt The Teacher To Write More Info To The Student
    if (this.state.message.length < 5) {
      this.setState({ messageError: true });
    }
    // Handles If Message Is Long Enough To Dispatch
  }

  render() {
    return (
      <Dialog
        open={this.props.visible}
        onClose={this.props.dismiss}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {this.state.progress === 'sending' && (
          <div className='container'>
            <div className='standards-header-flex'>
              <div className='alert-title' style={{ fontWeight: '800' }}>
                Send Message To {this.props.firstName} {this.props.lastName}
              </div>
              <HighlightOffIcon
                onClick={() => this.props.dismiss()}
                style={{ paddingRight: 24, paddingTop: 20, cursor: 'pointer' }}
                className='standard-close-x'
              />
            </div>
            <textarea
              className='notify-student-input-container'
              multiline={true}
              value={this.state.message}
              onChange={(event) => this._handleOnChange(event.target.value)}
              error={this.state.messageError}
              placeholder='Write your message here...'
            />
            {!this.state.loading && (
              <div title="Student Will Receive An Email With Your Message" onClick={() => this._handleOnSubmit()} className='notify-student-button-flex'>
                <SendIcon className='notify-student-button-icon'/>
                <div className='notify-student-button-text'>
                  Send Message
                </div>
              </div>
            )}
            {this.state.loading && (
              <div className='notify-student-alert-loading'>
                <CircularProgress />
                <div className='notify-student-alert-loading-text'>
                  Sending Message...
                </div>
              </div>
            )}
          </div>
        )}
        {this.state.progress === 'success' && (
          <div className='container'>
            <div className='standards-header-flex'>
              <div className='alert-title'/>
              <HighlightOffIcon
                onClick={() => this.props.dismiss()}
                style={{ paddingRight: 24, paddingTop: 20, cursor: 'pointer' }}
                className='standard-close-x'
              />
            </div>
            <img alt='' className='notify-student-alert-image' />
            <div className='notify-student-alert-h1'>
              Your Message Has Been Sent!
            </div>
            <div className='notify-student-alert-p'>
              We have sent your message to {this.props.firstName}'s email address. If the message does not appear, please have your student check their junk or spam folder.
            </div>
          </div>
        )}
        {this.state.progress === 'failure' && (
          <div className='container'>
            <div className='standards-header-flex'>
              <div className='alert-title'/>
              <HighlightOffIcon
                onClick={() => this.props.dismiss()}
                style={{ paddingRight: 24, paddingTop: 20, cursor: 'pointer' }}
                className='standard-close-x'
              />
            </div>
            <img alt='' className='notify-student-alert-image' />
            <div className='notify-student-alert-h1'>
              Something Went Wrong...
            </div>
            <div className='notify-student-alert-p'>
              We were unable to send your message to {this.props.firstName}. This could be a result of having a corrupted email address on file or a poor connection.<br/><br/>Please try again and contact support if the problem continues.
            </div>
          </div>
        )}
      </Dialog>
    );
   }
}

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {

  };
};

// Map Dispatch To Props (Dispatch Actions to Reducers. Reducers then modify the redux store state.
const mapDispatchToProps = (dispatch) => {
  // Action
    return {

   };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotifyStudentAlert);
