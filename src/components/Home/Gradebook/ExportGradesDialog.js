import React from 'react';
import { connect } from 'react-redux';
import { getTeacherClassroom, getAllTeacherClassroomCourses } from '../../../selectors/classroomSelectors';
import { getAllTeacherCourses } from '../../../selectors/coursemoduleSelectors';
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
  selectXLSX() { this.setState({ fileType: 'xlsx' }); }
  selectCSV() { this.setState({ fileType: 'csv' }); }

  // This Function Handles Navigating Forwards Through The Expoprt Flow
  // Steps: FileType, ConfirmDetails, Loading, Success, Failure, ComingSoon
  _handleNext() {
    if (this.state.status === 'FileType' && this.state.fileType !== false) {
      this.setState({ status: 'ConfirmDetails' });
    } else if (this.state.status === 'ConfirmDetails') {
      // Handles Updating State To Loading & Creates Export. If Successful, It Will Download Or Else Show Failure
      this._generateExportFile(this.state.fileType);
    } else if (this.state.status === 'Success' || this.state.status === 'Failure') {
      this.props.dismiss();
    }
  }

  // Matches The Classroom With The Appropriate Classroom Course Record To Find The Course Number, Then Finds The Course To Determine Number Of Modules
  _getNumberOfModules() {
    let courseID = null;
    let numberOfCourses = 0;
    for (var i in this.props.classCourse) {
      if (this.props.classCourse[i].classId === this.props.classroomId) {
        courseID = this.props.classCourse[i].courseId
      }
    }
    if (courseID === null) {
      return 0;
    } else {
      for (var j in this.props.allCourses) {
        if (this.props.allCourses[j].id === courseID) {
          numberOfCourses = this.props.allCourses[j].numberModules;
        }
      }
      return numberOfCourses;
    }
  }

  // Handles If User Selects XLSX By Generating File & Offering User The Option To Download & Save
  _generateExportFile(fileType) {
    this.setState({ status: 'Loading' });
    try {
      // xlsx, xls, xlsb, xlml, csv
      var XLSX = require("xlsx");
      const exportArray = this._createExportArray();
      var gradeSheet = XLSX.utils.aoa_to_sheet(exportArray);
      var exportFile = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(exportFile, gradeSheet, "ClassroomGrades.xlsx");
      XLSX.writeFile(exportFile, `ClassGrades.${fileType}`, { bookType: fileType, type: 'base64' });
      this.setState({ status: 'Success' });
    } catch (error) {
      this.setState({ status: 'Failure' });
    }
  }

  // Creates An Array Of Arrays Used In Generating The Export File
  _createExportArray() {
    // Columns Are First Name, Last Name, Username, Quiz Headers For Number Of Modules
    // TODO: Allow for more export options including individual question scores, crypto/stock portfolio performance
    let headerArray = [
      'First Name',
      'Last Name',
      'Username',
    ];
    let exportArray = [headerArray];
    for (var i = 1; i <= this._getNumberOfModules(); i++) {
      headerArray.push('Quiz ' + i.toString())
    }
    for (var j in this.props.classroom.studentList) {
      let newRow = [
        this.props.classroom.studentList[j].firstName,
        this.props.classroom.studentList[j].lastName,
        this.props.classroom.studentList[j].username,
      ];
      for (var k in this.props.classroom.studentList[j].moduleAssessmentScores) {
        if (this.props.classroom.studentList[j].moduleAssessmentScores[k].percentComplete === 100) {
          newRow.push(this.props.classroom.studentList[j].moduleAssessmentScores[k].percentCorrect);
        } else {
          newRow.push('Not Complete');
        }
      }
      let missingModules = this._getNumberOfModules() - this.props.classroom.studentList[j].moduleAssessmentScores.length;
      for (var m = 0; m < missingModules; m++) {
        newRow.push('Not Complete');
      }
      exportArray.push(newRow);
    }
    return exportArray;
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
                  <div onClick={() => this.selectXLSX()} className='export-grades-option'>
                    <img alt='' className='export-grades-icon' src={XLSXImage} />
                    {this.state.fileType !== 'xlsx' && (
                      <RadioButtonUncheckedOutlinedIcon className='export-grades-option-button-outline' />
                    )}
                    {this.state.fileType === 'xlsx' && (
                      <RadioButtonCheckedOutlinedIcon className='export-grades-option-button-filled' />
                    )}
                  </div>
                  <div onClick={() => this.selectCSV()} className='export-grades-option'>
                    <img alt='' className='export-grades-icon' src={CSVImage} style={{ width: '115px' }} />
                    {this.state.fileType !== 'csv' && (
                      <RadioButtonUncheckedOutlinedIcon className='export-grades-option-button-outline' />
                    )}
                    {this.state.fileType === 'csv' && (
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
                  Click below to download your {this.state.fileType} file with your class grades.
                </div>
                <img
                  alt=''
                  className='confirm-export-icon-image'
                  src={this.state.fileType === 'PDF' ? PDFImage : this.state.fileType === 'csv' ? CSVImage : XLSXImage}
                />
                <div className='confirm-export-icon-title'>
                  Class_Grades.{this.state.fileType === 'PDF' ? 'pdf' : this.state.fileType === 'csv' ? 'csv' : 'xlsx'}
                </div>
                <div className='confirm-export-number-students'>
                  {this.props.classroom.length} {this.props.classroom.length === 1 ? 'Student' : 'Students'}
                </div>
                <div onClick={() => this._handleNext()} className='next-export-section-button'>
                  <div className='next-export-text'>
                    Download Grades
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
                <div className='export-grades-instructions' style={{ width: 320 }}>
                  You're all set! Your download should have started automatically. If not, please click the button below to download your grades.
                </div>
                <div onClick={() => this._generateExportFile(this.state.fileType)} className='next-export-section-button next-export-text-2'>
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
const mapStateToProps = (state, ownProps) => {
  // Redux Store --> Component
  return {
    // Used to authenticate contactSupport dispatch to graphQL
    jwtToken: state.userDetails.jwtToken,
    // Selector For Selected Classroom Grades
    classroom: getTeacherClassroom(state, ownProps),
    // Selector For Teacher Courses
    allCourses: getAllTeacherCourses(state),
    // Selector For Classroom Courses
    classCourse: getAllTeacherClassroomCourses(state),
  };
};

export default connect(mapStateToProps)(ExportGradesDialog);
