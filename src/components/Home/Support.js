import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ContactSupport } from '../../ActionTypes/settingsAction';
import { setMenuTab } from '../../ActionTypes/dashboardActions';
import CheckBoxOutlineBlank from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBox from '@mui/icons-material/CheckBox';
import MessageSuccessIcon from '../../assets/images/Support/MessageSuccess.png';
import MessageFailedIcon from '../../assets/images/Support/MessageFailure.png';
import '../../styles/Home/Support.css';
import Alert from '../Admin/Alert';
import CircularProgress from '@mui/material/CircularProgress';

class Support extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailInput: '',
      subjectInput: '',
      messageInput: '',
      uploadModalVisible: false,
      messageStatus: 'sending',
      issueSelected: null,
      alertVisible: false,
      alertTitle: '',
      alertMessage: '',
      emailError: false,
      loading: false,
    }
  }

  // Allows User To Toggle Which Issue The Support Message Is Related To & Includes It In The Message
  selectSupportIssue(int) {
    if (this.state.issueSelected === int) {
      this.setState({ issueSelected: null });
    } else {
      this.setState({ issueSelected: int });
    }
  }

  // Handles Creating Support Message From Various Inputs, Validates Inputs, Then Returns Message To Dispatch With GraphQL
  createSupportMessage() {
    // Checks Email To Make Sure It Is Valid To Ensure That Support Can Respond To The Teacher
    // Handles When Email Is Not Valid.      
    // eslint-disable-next-line
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let email = this.state.emailInput.length > 0 ? this.state.emailInput : this.props.email;
    if (!re.test(email)) {
      this.setState({
        alertVisible: true,
        alertTitle: 'Problem With Email...',
        alertMessage: 'Sorry, but we do not recognize the format of your email address. You probably made a typo while inputting your email address. Please try again.',
        emailError: true,
      });
      return false;
    }
    // Handles When Email Is Valid
    else {
      // Matches The Correct Issue With State To Construct Support Message
      let issueText = 'No Topic - ';
      if (this.state.issuedSelected === 1) {
        issueText = 'Class Upload - ';
      } else if (this.state.issueSelected === 2) {
        issueText = 'Technical Issue - ';
      } else if (this.state.issueSelected === 3) {
        issueText = 'Course Issue - ';
      } else if (this.state.issueSelected === 4) {
        issueText = 'Curriculum Questions - ';
      } else if (this.state.issueSelected === 5) {
        issueText = 'Missing Resources - ';
      } else if (this.state.issueSelected === 6) {
        issueText = 'Other - ';
      }
      return issueText + 'Subject: ' + this.state.subjectInput + ':  ' + this.state.messageInput + '........... Respond To: ' + email + ' // ' + this.props.firstName.toString() + ' ' + this.props.lastName.toString();
    }
  }

  contactSupport() {
    this.setState({ loading: true });
    let handledText = this.createSupportMessage();
    if (handledText) {
      this.props.contactSupport(this.props.jwtToken, handledText).then((res) => {
        // Handles Error With Dispatch & Displays Alert To User
        if (!(res && !('errors' in res))) {
          this.setState({
            alertVisible: true,
            alertMessage: 'We had trouble sending your message to our support team. Please try again or reach out directly to support@rapunzl.org.',
            alertTitle: 'Something Went Wrong',
            messageStatus: 'failed'
          });
        }
        // Handles Success And Displays Alert To User
        else {
          this.setState({
            alertVisible: true,
            alertMessage: 'Your support request has been sent. Someone will get back to you within 24 hours to help resolve your issue. Thanks for your patience.',
            alertTitle: 'Success!',
            messageStatus: 'success'
          });
        }
      })
    } else {
      this.setState({
        alertVisible: true,
        alertMessage: 'We had trouble sending your support email because we do not have a valid email address to contact you. Please update your email and try again or email us directly at support@rapunzl.org',
        alertTitle: 'We Had A Problem...',
        messageStatus: 'failed'
      });
    }
  }

  // Toggles Visibility Of Alert Dialog To Display Success Of Failure Message For ContactSupport GraphQL Dispatch
  toggleAlert = () => {
    this.setState({ alertVisible: !this.state.alertVisible });
  }

  // These Functions Handle Updating The Text In Each Of The 3 Text Input Boxes
  changeMessage(text) { this.setState({ messageInput: text }); }
  changeSubject(text) { this.setState({ subjectInput: text }); }
  changeEmail(text) { this.setState({ emailInput: text, emailError: false }); }

  render() {
    if (this.props.visible) {
      return (
          <div className='tile support-tile'>
            <Alert
              visible={this.state.alertVisible}
              dismiss={this.toggleAlert}
              title={this.state.alertTitle}
              message={this.state.alertMessage}
            />
            <div onClick={() => this.props.setMenuTab(this.props.previousTab)} className='support-go-back'>
              Go Back
            </div>
            {this.state.messageStatus === 'sending' && (
              <div className='classroom-title' style={{ paddingTop: 20, paddingBottom: 15, paddingLeft: 10 }}>
                Contact Support
              </div>
            )}
            {this.state.messageStatus === 'sending' && (
              <div className='support-container'>
                <div className='support-subtitle'>
                  Type Of Issue
                </div>
                <div className='support-issues-container'>
                  <div className='support-issue-column'>
                    <div title="Having Issues Uploading Your Classroom" onClick={() => this.selectSupportIssue(1)} className='support-issue-flex'>
                      {this.state.issueSelected !== 1 ? (
                        <CheckBoxOutlineBlank fontSize="small" />
                      ) : (
                        <CheckBox fontSize="small" />
                      )}
                      <div className='support-issue-text' style={{ fontWeight: this.state.issueSelected !== 1 ? '200' : '600'}}>
                        Class Upload
                      </div>
                    </div>
                    <div title="Having Problems With The Portal" onClick={() => this.selectSupportIssue(2)} className='support-issue-flex'>
                      {this.state.issueSelected !== 2 ? (
                        <CheckBoxOutlineBlank fontSize="small" />
                      ) : (
                        <CheckBox fontSize="small" />
                      )}
                      <div className='support-issue-text' style={{ fontWeight: this.state.issueSelected !== 2 ? '200' : '600'}}>
                        Technical Issue
                      </div>
                    </div>
                    <div title="Having Issue Creating Or Assigning Courses" onClick={() => this.selectSupportIssue(3)} className='support-issue-flex'>
                      {this.state.issueSelected !== 3 ? (
                        <CheckBoxOutlineBlank fontSize="small" />
                      ) : (
                        <CheckBox fontSize="small" />
                      )}
                      <div className='support-issue-text' style={{ fontWeight: this.state.issueSelected !== 3 ? '200' : '600'}}>
                        Course Issue
                      </div>
                    </div>
                  </div>
                  <div title="Questions Or Issues With Rapunzl Curriculum" className='support-issue-column'>
                    <div onClick={() => this.selectSupportIssue(4)} className='support-issue-flex'>
                      {this.state.issueSelected !== 4 ? (
                        <CheckBoxOutlineBlank fontSize="small" />
                      ) : (
                        <CheckBox fontSize="small" />
                      )}
                      <div className='support-issue-text' style={{ fontWeight: this.state.issueSelected !== 4 ? '200' : '600'}}>
                        Curriculum Question
                      </div>
                    </div>
                    <div title="Having Issues Finding Resources" onClick={() => this.selectSupportIssue(5)} className='support-issue-flex'>
                      {this.state.issueSelected !== 5 ? (
                        <CheckBoxOutlineBlank fontSize="small" />
                      ) : (
                        <CheckBox fontSize="small" />
                      )}
                      <div className='support-issue-text' style={{ fontWeight: this.state.issueSelected !== 5 ? '200' : '600'}}>
                        Missing Resources
                      </div>
                    </div>
                    <div title="Other Issues Not Listed" onClick={() => this.selectSupportIssue(6)} className='support-issue-flex'>
                      {this.state.issueSelected !== 5 ? (
                        <CheckBoxOutlineBlank fontSize="small" />
                      ) : (
                        <CheckBox fontSize="small" />
                      )}
                      <div className='support-issue-text' style={{ fontWeight: this.state.issueSelected !== 5 ? '200' : '600'}}>
                        Other
                      </div>
                    </div>
                  </div>
                </div>
                <div className='support-subtitle' style={{ paddingTop: 18 }}>
                  Contact Email
                </div>
                <input
                  placeholder={this.props.email}
                  value={this.state.emailInput}
                  onChange={(event) => this.changeEmail(event.target.value)}
                  className='support-line-input'
                />
                <div className='support-subtitle' style={{ paddingTop: 10 }}>
                  Subject
                </div>
                <input
                  placeholder={'Rapunzl Teacher Portal Support'}
                  value={this.state.subjectInput}
                  onChange={(event) => this.changeSubject(event.target.value)}
                  className='support-line-input'
                />
                <div className='support-subtitle' style={{ paddingTop: 10 }}>
                  Message
                </div>
                <textarea
                  placeholder={'Describe your support request with as much detail as possible...'}
                  value={this.state.messageInput}
                  onChange={(event) => this.changeMessage(event.target.value)}
                  className='support-message-input'
                />
                {/* TODO: PRODUCTS - Add Button Linking To Schedule A Call */}
                {!this.state.loading && (
                  <div title="Send Message To Rapunzl Support Team" onClick={() => this.contactSupport()} className='support-submit-button'>
                    Submit Message
                  </div>
                )}
                {this.state.loading && (
                  <CircularProgress />
                )}
              </div>
            )}
            {this.state.messageStatus === 'success' && (
              <div className='support-container'>
                <img alt='' className='support-message-image' src={MessageSuccessIcon} />
                <div className='support-message-result-title'>
                  Your Message Was Sent!
                </div>
                <div className='support-message-result-message'>
                  We have shared your message with our developers and support staff so that we can help track down any issue you were describing. Please allow 2-3 business days for our support team to contact you at the email address you provided.
                </div>
              </div>
            )}
            {this.state.messageStatus === 'failed' && (
              <div className='support-container'>
                <img alt='' className='support-message-image' src={MessageFailedIcon} />
                <div className='support-message-result-title'>
                  We Experienced A Problem...
                </div>
                <div className='support-message-result-message'>
                  For some reason, we were unable to submit your support message and share it with our team. Please try again and if the problem continues, you can email us at support@rapunzl.org and someone will get back to you in the next 2-3 business days.
                </div>
              </div>
            )}
          </div>
      );
    } else {
      return (
        <div />
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
    // Handles email address linked to current user to prefill response email for support message
    email: state.userDetails.email,
    // Used to authenticate contactSupport dispatch to graphQL
    jwtToken: state.userDetails.jwtToken,
    loading: state.support.loading,
    firstName: state.userDetails.firstName,
    lastName: state.userDetails.lastName,
    previousTab: state.dashboard.previousTab,
  };
};

// Map Dispatch To Props (Dispatch Actions to Reducers. Reducers then modify the redux store state.
const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    // Handles sending message to Database to email to support email address
    contactSupport: (token, text) => dispatch(ContactSupport(token, text)),
    // Handles sending message to Database to email to support email address
    setMenuTab: (tab) => dispatch(setMenuTab(tab)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Support);
