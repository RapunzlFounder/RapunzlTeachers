import React from 'react';
import { connect } from 'react-redux';
import { getAllTeacherClassrooms } from '../../../selectors/classroomSelectors';
import Dialog from '@mui/material/Dialog';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CircularProgress from '@mui/material/CircularProgress';
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import DownloadingIcon from '@mui/icons-material/Downloading';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import CSVImage from '../../../assets/images/FileTypes/CSV.png';
import XLSXImage from '../../../assets/images/FileTypes/XLSX.png';
import PDFImage from '../../../assets/images/FileTypes/PDF.png';
import Alert from '../../Admin/Alert';
import ComingSoonGraphic from '../../../assets/images/Home/Competitions.png';
import '../../../styles/Admin/ExportGrades.css';

class ExportGradesDialog extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      alertVisible: false,
      alertTitle: '',
      alertMessage: '',
      fileType: false,
      status: 'FileType', // Steps: FileType, ConfirmDetails, Loading, Success, Failure, ComingSoon
    }
  }

  // Resets To Initial State If Visibility Is Toggled
  componentDidUpdate(prevProps) {
    if (this.props.visible !== prevProps.visible && this.props.visible === false) {
      this.setState({
        alertVisible: false,
        alertTitle: '',
        alertMessage: '',
        fileType: false,
        status: 'FileType'
      });
    }
  }

  // Toggles Visibility Of Alert Dialog
  toggleAlert = () => {
    this.setState({ alertVisible: !this.state.alertVisible });
  }

  // 3 Functions Below Update The File Type Which Is Selected By The User
  selectPDF() { this.setState({ fileType: 'PDF' }); }
  selectXLSX() { this.setState({ fileType: 'XLSX' }); }
  selectCSV() { this.setState({ fileType: 'CSV' }); }

  // This Function Handles Navigating Forwards Through The Expoprt Flow
  // Steps: FileType, ConfirmDetails, Loading, Success, Failure, ComingSoon
  _handleNext() {
    if (this.state.status === 'FileType' && this.state.fileType !== false) {
      this.setState({ status: 'ConfirmDetails' });
    } else if (this.state.status === 'ConfirmDetails') {
      // Handles Updating State To Loading & Creates Export - TO DO
      this._createDownloadLink();
    } else if (this.state.status === 'Success' || this.state.status === 'Failure') {
      this.props.dismiss();
    }
  }

  _createDownloadLink() {
    this.setState({ status: 'Loading' });
    if (this.state.fileType === 'PDF') {
      this._generatePDF().then((res) =>{
        if (res) {
          this.setState({ status: 'Success' });
        } else {
          this.setState({ status: 'Failure' });
        }
      });
    } else if (this.state.fileType === 'CSV') {
      this._generateCSV().then((res) =>{
        if (res) {
          this.setState({ status: 'Success' });
        } else {
          this.setState({ status: 'Failure' });
        }
      });
    } else {
      this._generateXLSX().then((res) =>{
        if (res) {
          this.setState({ status: 'Success' });
        } else {
          this.setState({ status: 'Failure' });
        }
      });
    }
  }

  // Handles If User Selects PDF By Generating A PDF & Offering User The Option To Download & Save The File
  // Uses react-pdf, the same package we use for rendering PDFs of Education Resources, But We Do Not Display The
  // PDF To The User Until They Select Download
  async _generatePDF() {
    return true;
  }

  // Handles If User Selects XLSX By Generating File & Offering User The Option To Download & Save
  async _generateXLSX() {
    return true;
  }

  // Handles If User Selects CSV By Generating File & Offering User The Option To Download & Save
  async _generateCSV() {
    return true;
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
          <div className='export-grades-container'>
            {this.state.status !== 'Loading' && (
              <div className='export-grades-header-flex'>
                <HighlightOffIcon
                  onClick={() => this.props.dismiss()}
                  className='export-grades-close-x'
                  style={{ paddingRight: 24, paddingTop: 20, cursor: 'pointer' }}
                />
              </div>
            )}
            {this.state.status === 'FileType' && (
              <div className='export-grades-content'>
                <div className='export-grades-instructions'>
                  Select the file format for your exported grades
                </div>
                <div className='export-grades-option-flex'>
                  {/*

                  TODO: IMPLEMENT PDF EXPORT CAPABILITIES

                  <div onClick={() => this.selectPDF()} className='export-grades-option'>
                    <img alt='' className='export-grades-icon' src={PDFImage} />
                    {this.state.fileType !== 'PDF' && (
                      <RadioButtonUncheckedOutlinedIcon className='export-grades-option-button-outline' />
                    )}
                    {this.state.fileType === 'PDF' && (
                      <RadioButtonCheckedOutlinedIcon className='export-grades-option-button-filled' />
                    )}
                  </div>
                  
                  */}
                  <div onClick={() => this.selectXLSX()} className='export-grades-option'>
                    <img alt='' className='export-grades-icon' src={XLSXImage} />
                    {this.state.fileType !== 'XLSX' && (
                      <RadioButtonUncheckedOutlinedIcon className='export-grades-option-button-outline' />
                    )}
                    {this.state.fileType === 'XLSX' && (
                      <RadioButtonCheckedOutlinedIcon className='export-grades-option-button-filled' />
                    )}
                  </div>
                  <div onClick={() => this.selectCSV()} className='export-grades-option'>
                    <img alt='' className='export-grades-icon' src={CSVImage} style={{ width: '115px' }} />
                    {this.state.fileType !== 'CSV' && (
                      <RadioButtonUncheckedOutlinedIcon className='export-grades-option-button-outline' />
                    )}
                    {this.state.fileType === 'CSV' && (
                      <RadioButtonCheckedOutlinedIcon className='export-grades-option-button-filled' />
                    )}
                  </div>
                </div>
                <div onClick={() => this._handleNext()} className={this.state.fileType !== false ? 'next-export-section-button' : 'next-export-disabled'}>
                  <div className={this.state.fileType !== false ? 'next-export-text' : 'next-export-text-disabled'}>
                    Review Export Details
                  </div>
                  {this.state.fileType !== false && (<KeyboardDoubleArrowRightIcon className='next-export-button-icon' />)}
                </div>
              </div>
            )}
            {this.state.status === 'ConfirmDetails' && (
              <div className='export-grades-content'>
                <div className='export-grades-instructions' style={{ width: 230 }}>
                  Click below to generate your {this.state.fileType} download link.
                </div>
                <img
                  alt=''
                  className='confirm-export-icon-image'
                  src={this.state.fileType === 'PDF' ? PDFImage : this.state.fileType === 'CSV' ? CSVImage : XLSXImage}
                />
                <div className='confirm-export-icon-title'>
                  Class_Grades.{this.state.fileType === 'PDF' ? 'pdf' : this.state.fileType === 'CSV' ? 'csv' : 'xlsx'}
                </div>
                <div onClick={() => this._handleNext()} className='next-export-section-button'>
                  <div className='next-export-text'>
                    Generate Download Link
                  </div>
                  <KeyboardDoubleArrowRightIcon className='next-export-button-icon' />
                </div>
              </div>
            )}
            {this.state.status === 'Loading' && (
              <div className='export-grades-loading-content'>
                <CircularProgress className='loading-export-icon' />
                <div className='export-grades-instructions' style={{ width: 230 }}>
                  Generating Download Link...
                </div>
              </div>
            )}
            {this.state.status === 'Success' && (
              <div className='export-grades-content'>
                <DownloadingIcon className='export-grades-success-icon' />
                <div className='export-grades-instructions'>
                  You're all set! Click the link below to download a file with your classroom grades.
                </div>
                <div onClick={() => this.setState({ status: 'ComingSoon' })} className='next-export-section-button next-export-text-2'>
                  Download
                </div>
              </div>
            )}
            {this.state.status === 'ComingSoon' && (
              <div className='export-grades-content'>
                <img
                  alt=''
                  className='export-grades-success-icon'
                  src={ComingSoonGraphic}
                  style={{ width: 200, marginTop: 15 }}
                />
                <div className='export-grades-instructions' style={{ width: 350 }}>
                  We're hard at working ensuring that you can easily export your classroom grades in multiple file formats.
                  <br/><br/>
                  Please check back in the next couple of weeks and we will have this ready before the school year begins.
                </div>
              </div>
            )}
            {this.state.status === 'Failure' && (
              <div className='export-grades-content'>
                <div className='export-grades-instructions'>
                </div>
                <div className='next-export-section-button next-export-text'>
                  Dismiss
                </div>
              </div>
            )}
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
    allClassrooms: getAllTeacherClassrooms(state),
  };
};

export default connect(mapStateToProps)(ExportGradesDialog);
