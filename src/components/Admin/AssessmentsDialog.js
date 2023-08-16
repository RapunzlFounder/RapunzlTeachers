import React from 'react';
import Dialog from '@mui/material/Dialog';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LockClockOutlinedIcon from '@mui/icons-material/LockClockOutlined';
import '../../styles/Admin/Admin.css';
import '../../styles/Admin/AssessmentsDialog.css';

class AssessmentsDialog extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      viewMore: false,
    }
  }

  viewMoreQuestion(int) {
    if (this.state.viewMore === int) {
      this.setState({ viewMore: false });
    } else {
      this.setState({ viewMore: int });
    }
  }

  render() {
    return (
      <Dialog
        open={this.props.visible}
        onClose={this.props.dismiss}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={'md'}
        fullWidth={true}
      >
        <div className='container assessments-dialog-container' style={{ maxHeight: 800 }}>
          <div className='standards-header-flex'>
            <div className='alert-title' style={{ fontWeight: '800' }}>
              {!!this.props.data.assessments.assessmentName ? this.props.data.assessments.assessmentName : ''}
            </div>
            <HighlightOffIcon
              onClick={() => this.props.dismiss()}
              className='standard-close-x'
              style={{ paddingRight: 24, paddingTop: 20, cursor: 'pointer' }}
            />
          </div>
          <div className='quiz-preview-text'>
            {this.props.data.assessments.description.split('.')[0]}. When you add this Module to your Course, this Assessment will be included and you can collect respones from students through the Rapunzl App.
          </div>
          <div title="Feature Disabled On Demo Accounts" className='google-slides-button-flex'>
            <LockClockOutlinedIcon className='google-slides-icon' />
            <div className='google-slides-button-text'>
              View In Google Slides
            </div>
          </div>
          {this.props.data.assessments.questions && this.props.data.assessments.questions.length && this.props.data.assessments.questions.length > 0 && this.props.data.assessments.questions.map((item) => {
            return (
              <div key={item.questionNumber} className='quiz-preview-question-container' style={{ backgroundColor: this.state.viewMore === item.questionNumber ? '#a6f0df' : ''}}>
                <div onClick={() => this.viewMoreQuestion(item.questionNumber)} className='quiz-preview-initial'>
                  <div className='quiz-preview-question-flex'>
                    <div className='quiz-preview-question-number'>
                      {item.questionNumber}
                    </div>
                    <div className='quiz-preview-question-text'>
                      {item.question}
                    </div>
                  </div>
                  {this.state.viewMore === item.questionNumber && (<KeyboardArrowDownIcon style={{ fill: '#007154' }} />)}
                  {this.state.viewMore !== item.questionNumber && (<KeyboardArrowRightIcon style={{ fill: '#007154' }} />)}
                </div>
                {this.state.viewMore === item.questionNumber && (
                  <div className='quiz-preview-expanded'>
                    <div className='quiz-preview-explanation-title'>
                      Answer
                    </div>
                    <div className='quiz-preview-explanation-text'>
                      {item.answer}
                    </div>
                    <div className='quiz-preview-explanation-title'>
                      Explanation
                    </div>
                    <div className='quiz-preview-explanation-text'>
                      {item.explanation}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </Dialog>
    );
   }
}

export default AssessmentsDialog;
