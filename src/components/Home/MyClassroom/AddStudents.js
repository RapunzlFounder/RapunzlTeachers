import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { createTeacherClassroom, addStudentsToClassroom } from '../../../ActionTypes/classroomActions';
import { toggleAddStudents } from '../../../ActionTypes/dashboardActions';
import { nanoid } from "nanoid";
import ExcelIcon from '../../../assets/images/Admin/excel.png';
import UploadGraphic from '../../../assets/images/School/Upload.png';
import GroupAdd from '@mui/icons-material/GroupAdd';
import UploadTemplate from './UploadTemplate';
import Alert from '../../Admin/Alert';
import '../../../styles/Home/HomeScreen.css';
import ManualEntry from './ManualEntry';
import SearchStudents from './SearchStudents';
import SuccessImage from '../../../assets/images/AddStudents/SuccessAddStudents.png';
import ErrorImage from '../../../assets/images/AddStudents/ErrorAddStudents.png';
import { CircularProgress } from '@mui/material';
import UploadHelper from './UploadHelper';

class AddStudents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Text Fields For Create Account
      date: '',
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      birthdate: '',
      // Handles Errors Related To Inputs
      onErrorFirstName: false,
      onErrorLastName: false,
      onErrorUsername: false,
      onErrorEmail: false,
      onErrorBirthday: false,
      // Handles Visibility Of UploadTemplate Dialog
      templateVisible: false,
      // Handles Files Which Are Uploaded. Currently Limits To 1 File.
      files: [],
      // Handles Progress Of Upload & Whether Upload Has Started
      uploadArray: [],
      uploadProgress: 0,
      uploadStarted: false,
      uploadComplete: false,
      uploadPreview: false,
      // Handles Alert Dialog Visibility & Content
      alertVisible: false,
      alertTitle: '',
      alertMessage: '',
      studentsList: [],
      progress: 'name',
    }
    // Creates a Reference For The Upload Button
    this.dropzoneButton = React.createRef();
  }

  // Toggles Visibility Of UploadTemplate Dialog Popup to Show User Proper Format For File To Upload
  toggleTemplate = () => {
    this.setState({ templateVisible: !this.state.templateVisible });
  }

  // Handles Updating Files In State To Contain The Files Which The User Uploaded
  onChangeFiles = async (files) => {
    let filesArray = Array.from(files);
    // Checks If User Attempted To Upload Multiple Files And Displays Alert Dialog
    // We Still Save The First File That The User Uploaded, But We Do Not Save The Rest
    if (filesArray.length > 1) {
      this.setState({
        alertVisible: true,
        alertTitle: 'Slow Down There!',
        alertMessage: 'At this time, Rapunzl only supports single file uploads to import a classroom. We have saved the first file you imported , but if you have multiple files with students, please upload them one at a time.'
      });
    }
    filesArray = filesArray.map((file) => ({
      id: nanoid(),
      file,
    }));
    this.setState({ files: filesArray[0] });
    // Processes File For Upload
    var XLSX = require("xlsx");
    // Takes The File Which User Has Selected And Creates Array Buffer
    const data = await filesArray[0].file.arrayBuffer();
    // Reads Data From Array Buffer And Creates An Object From The Selected File
    const workbook = XLSX.read(data);
    // Parse First Sheet In Selected File,
    let firstSheet = workbook.Sheets[workbook.SheetNames[0]]
    // Using header: 1 instructs XLSX to create an 'array of arrays' From First Sheet Inputs
    // This can create empty arrays, so we filter the results to remove any empty arrays
    const firstSheetArray = XLSX.utils.sheet_to_json(firstSheet, { header: 1 }).filter(function(value) {
      return value.length !== 0;
    });
    // Check There Is An Upload Array To Save In Order To Display Preview, Otherwise Show An Error
    if (firstSheetArray && firstSheetArray.length && firstSheetArray.length !== 0  && firstSheetArray[0].length !== 0) {
      this.setState({
        uploadArray: firstSheetArray,
        uploadProgress: 0,
        uploadStarted: false,
      });
    }
    // Handles If There Was An Error Creating The Upload Array
    else {
      this.setState({
        alertVisible: true,
        alertTitle: 'Failed To Process File',
        alertMessage: 'Please ensure that the file you select to upload matches the format of the template that we have provided and resubmit. If you continue having problems, please email us your spreadsheet at hello@rapunzl.org'
      })
    }
  }

  // Pass Through Arrow Function To Focus & Click Dropzone Button In Order To Display Native File Dialog
  handleDropzoneClick = () =>  {
    // Input File Selector Component Is Hidden Once File Is Uploaded, So We Must Check It Is Visible Or Else It Will Produce An Error
    if (this.dropzoneButton.current !== null) {
      this.dropzoneButton.current.click();
    }
  }

  // Whenever The Dropzone Upload Input Component Changes, We Want To Save The Files To State By Calling onChangeFiles
  handleDropZoneChange = (ev) => {
    this.onChangeFiles(ev.target.files)
  }

  // Pass Through Arrow Function To Handle When User Hovers Over Dropzone With File Selected To Upload
  handleDropzoneDragOver = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    ev.dataTransfer.dropEffect = "copy";
  }

  // Pass Through Arrow Function To Handle When User Drops A File To Upload Into The Dropzone
  handleDropzoneDrop = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    this.onChangeFiles(ev.dataTransfer.files);
  }

  // Updates Upload Progress During GraphQL & Axios Upload Dispatch To Provide Upload Progress Bar For User
  setProgress = (int) => {
    this.setState({ uploadProgress: int });
  }

  // Toggles UploadStarted State Between True & False When User Uploads A File & Upload Is Complete
  toggleUpload(value) {
    this.setState({ uploadStarted: value });
  }

  // Function To Remove Files That Have Been Selected By User And Reset Component To Original State
  removeFile = () => {
    this.setState({
      files: [],
      uploadStarted: false,
      uploadProgress: 0,
      uploadComplete: false,
    })
  }

  // Toggles Visibility Of Alert Dialog When User Tries To Upload More Than One File
  toggleAlert = () => {
    this.setState({ alertVisible: !this.state.alertVisible });
  }

  // Toggles Visibility Of Upload Preview Dialog To Show User The Data Which They Have Selected To Submit
  toggleUploadPreview = () => {
    this.setState({ uploadPreview: !this.state.uploadPreview });
  }

  _handleStudentListData(studentArray) {
    let newArray = [];
    for (var i in studentArray) {
      let newObject = {
        id: i,
        email: studentArray[i].email.toString(),
        firstName: studentArray[i].firstName.toString(),
        lastName: studentArray[i].lastName.toString(),
        birthdate: moment(studentArray[i].birthdate).format("YYYY-MM-DD"),
      };
      newArray.push(newObject);
    }
    return newArray;
  }

  handleCreateClassroomClick = (studentList) => {
    const currentYear = new Date().getFullYear();
    const studentArray = this._handleStudentListData(studentList);
    this.setState({ loading: true });
    // Checks If This Is A New Class Or An Existing Class & Handles New Class To Create Classroom With Students
    // TODO: PRODUCTS - Check that the user is allowed to use this feature createClassroom
    if (!!this.props.newClassName) {
      this.props.createTeacherClassroom(this.props.jwtToken, this.props.newClassName, studentArray, currentYear).then((res) => {
        // Handles Error With Creating Teacher Classroom
        if (!(res && !('errors' in res))) {
          this.setState({
            alertVisible: true,
            alertTitle: 'We Had A Problem Creating Your Classroom',
            alertMessage: res.errors[0].message,
            loading: false,
            progress: "failure",
            uploadPreview: false,
          });
        }
        // Handles Successful Creation of Classroom With No Students
        else if (studentArray.length === 0) {
          this.setState({
            loading: false,
            progress: "success-no-students",
            uploadPreview: false,
          });
        }
        // Handles Successful Creation Of Classroom With Student List Provided
        else {
          this.setState({
            loading: false,
            progress: "success-with-students",
            uploadPreview: false,
          });
        }
      })
    }
    // If This Is Not A New Classroom, We Handle If This Is An Existing Class & Add Students To The Class
    else {
      // Adds Students To Existing Class Using ClassID Which Is The Selected Class Passed As Props
      // TODO: PRODUCTS - Check that the user is allowed to use this feature addClassroomStudents
      this.props.addStudentsToClassroom(this.props.jwtToken, this.props.selectedClassroom, studentArray).then((res) => {
        // Handles Error With Add Students To Classroom
        if (!(res && !('errors' in res))) {
          this.setState({
            alertVisible: true,
            alertTitle: 'We Had A Problem Adding Students',
            alertMessage: res.errors[0].message,
            loading: false,
            progress: "failure",
            uploadPreview: false,
          });
        }
        // Handles Successful Addition Of Students To Existing Classroom
        else {
          this.setState({
            loading: false,
            progress: "success-add",
            uploadPreview: false,
          });
        }
      });
    }
  }

// Generate documentation for the functions below to explain what they do and how they work

  validateClassName() {
    if (this.props.newClassName.length > 20) {
      return false;
    } else { 
      return true;
    }
  }

  handleNextClassClick() {
    // Handles If The Class Name Is Valid
    if (this.validateClassName()) {
      this.setState({ progress: 'upload' });
    }
  }

  handleBackButton() {
    // If We Are Creating A New Classroom, We Go Back To The Classroom List
    if (this.props.creatingClassroom) {
      this.setState({ progress: 'name' });
    }
    // Else we toggle Add Students To Go Back To The Classroom List
    else {
      this.props.toggleAddStudents();
    }
  }

  // Handles Visibility For SearchStudents Component Which Allows User To Find Existing Students To Add To Classroom
  toggleSearch = () => {
    if (this.state.progress === "search") {
      this.setState({ progress: "upload" });
    } else {
      this.setState({ progress: "search" });
    }
  }

  render() {
    // Handles If User Selects Manual Entry
    if (this.props.manualAdd) {
      return (
        <ManualEntry
          toggleManualEntry={this.props.toggleManualEntry}
          handleCreateClassroomClick={this.handleCreateClassroomClick}
          newClassName={this.props.className}
          loading={this.state.loading}
        />
      )
    }
    // Handles If User Selects To Search For Existing Users
    else if (this.state.progress === "search") {
      return (
        <SearchStudents
          toggleSearch={this.toggleSearch}
          handleCreateClassroomClick={this.handleCreateClassroomClick}
        />
      );
    }
    // Handles If There Is No Classroom
    else if (this.props.creatingClassroom && this.state.progress === 'name') {
      return (
        <div className='tile create-class-name-container'>
          <div className='create-class-name-subtext'>
            Let's Get Started...
          </div>
          <div className='create-class-name-header'>
            What Should We<br/>Call Your Classroom?
          </div>
          <input
            placeholder='Class Name'
            value={this.props.newClassName}
            onChange={(event) => this.props.changeClassName(event.target.value)}
            className='class-name-input'
            style={{ borderColor: this.props.newClassName.length > 20 ? this.props.colors.perfDown : this.props.colors.white}}
          />
          <div title="Go To Add Students" onClick={() => this.handleNextClassClick()} className={`class-name-next-button ${this.validateClassName() ? 'next-class-true' : 'next-class-false'}`}>
            Next
          </div>
          <div title="Stop Creating New Classroom" onClick={() => this.props.toggleAddStudents()} className='back-to-class-list-button'>
            Go Back
          </div>
        </div>
      );
    }
    // Handles If We Have Successfully Added Students To The Classroom
    else if (this.state.progress === "success-add" || this.state.progress === "success-no-students" || this.state.progress === "success-with-students") {
      return (
        <div className='tile create-class-name-container'>
          <img className='add-students-result-image' alt='' src={SuccessImage} />
          <div className='add-students-result-title'>
            {this.state.progress === 'success-no-students' ? `We've Created Your Class` : `We've Added Your Students!`}
          </div>
          <div className='add-students-result-text'>
            {this.state.progress === 'success-no-students' ? `We've successfully saved your new classroom with our system. The next step is to upload a roster of your classroom or manually enter their information.` : `Rapunzl was able to add the students into your classroom. If students did not have an existing Rapunzl account, they should receive an email with instructions on how to login.`}
          </div>
          <div title="View New Classroom You Created" onClick={() => this.props.toggleAddStudents()} className='add-students-result-button'>
            Back To Class List
          </div>
          <div title="Add More Students To Your Classroom" onClick={() => this.props.toggleManualEntry()} className='add-students-result-button manual-add-result-button'>
            {this.state.progress === 'success-no-students' ? 'Add Students' : 'Add More Students'}
          </div>
        </div>
      );
    }
    // Handles If Progress Is Set To Failure
    else if (this.state.progress === "failure") {
      return (
        <div className='tile create-class-name-container'>
          <Alert
            visible={this.state.alertVisible}
            dismiss={this.toggleAlert}
            title={this.state.alertTitle}
            message={this.state.alertMessage}
          />
          <img className='add-students-result-image' alt='' src={ErrorImage} />
          <div className='add-students-result-title'>
            We Experienced An Error...
          </div>
          <div className='add-students-result-text'>
            Rapunzl was unable to add the students you provided into your classroom. This could be an issue with formatting or server traffic. Please try again and if the problem continues, contact support.
          </div>
          <div onClick={() => this.props.toggleAddStudents()} className='add-students-result-button'>
            Back To Classroom
          </div>
        </div>
      );
    }
    else {
      return (
        <div className='tile' style={{ paddingBottom: 105, paddingTop: 25, paddingLeft: 10, paddingRight: 10 }}>
          <Alert
            visible={this.state.alertVisible}
            dismiss={this.toggleAlert}
            title={this.state.alertTitle}
            message={this.state.alertMessage}
          />
          <UploadTemplate
            dismiss={this.toggleTemplate}
            visible={this.state.templateVisible}
          />
          <UploadHelper
            handleCreateClassroomClick={this.handleCreateClassroomClick}
            dismiss={this.toggleUploadPreview}
            visible={this.state.uploadPreview}
            loading={this.state.loading}
            data={this.state.uploadArray}
          />
          <div className='classroom-header-flex' style={{ paddingLeft: 22 }}>
            <GroupAdd />
            <div className='classroom-title' style={{ paddingLeft: 10 }}>
              Add Students To Class{!!this.props.newClassName ? ': ' + this.props.newClassName : ''}
            </div>
          </div>
          <div className='classroom-upload-instructions'>
            Upload your classroom to Rapunzl and each student will receive an email with a username and password to access their account. You will still have access to view all of their accounts. Please use the template below for the best upload experience and we'll get your class started!
          </div>
          <div className='classroom-upload-flex'>
            <div title="View Example XLSX For Upload" onClick={() => this.toggleTemplate()} className='classroom-upload-button template-button'>
              View Template
            </div>
            {/* 
            
            TODO
            This will allow teachers to find previous students and add them to their class.
            They can also use this to search students who may have already created an account and would like to use that account.

            <div onClick={() => this.toggleSearch()} className='classroom-upload-button manual-upload' style={{ backgroundColor: '#1c9c6c' }}>
              Look Up Students
            </div> 
            
            */}
            {!this.props.creatingClassroom && (
              <div title="Allows You To Enter Student Information Manually" onClick={() => this.props.toggleManualEntry()} className='classroom-upload-button manual-upload'>
                Enter Students Manually  
              </div>
            )}
            <div onClick={() => this.handleBackButton()} className='classroom-upload-button classroom-upload-back'>
              {this.props.creatingClassroom ? 'Back To Name' : 'Back To Classroom'}
            </div>
          </div>
          {!this.state.loading && (
            <div
              className={`class-upload-container ${this.state.files.length === 0 ? 'class-upload-container-no-file' : ''}`}
              title="Drag & Drop A File To Start Your Upload"
              onClick={this.handleDropzoneClick}
              onDragOver={this.handleDropzoneDragOver}
              onDrop={this.handleDropzoneDrop}
            >
              <img alt='' className='class-upload-image' src={UploadGraphic} />
              <div className='class-upload-title'>
                Drag, Drop Or Click<br/>To Upload Your Class
              </div>
              <div className='class-upload-text'>
                Upload your classroom with an excel or CSV file and get them started on Rapunzl!
              </div>
              {this.state.files.length === 0 && (
                <input
                  type="file"
                  aria-label="Add File"
                  className="dropzone-file-picker-button"
                  ref={this.dropzoneButton}
                  onChange={this.handleDropZoneChange}
                  accept={[".xls",".xlsx",".csv"]}
                />
              )}
              {this.state.files.length !== 0 && (
                <div className='dropzone-uploaded-file-container'>
                  <div className='dropzone-uploaded-file-flex'>
                    <img alt='' src={ExcelIcon} className='upload-excel-icon' />
                    <div className='upload-file-title'>
                      {this.state.files.file.name}
                    </div>
                  </div>
                  <div className='dropzone-uploaded-file-flex'>
                    <div className='dropzone-file-remove-button' title="Removes File From Our System" onClick={this.removeFile}>
                      Remove File
                    </div>
                    <div className='dropzone-file-upload-button' title="Processes File To Upload" onClick={() => this.toggleUploadPreview()}>
                      Preview Upload
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          {!!this.props.newClassName && !this.state.loading && (
            <div title="Creates Your New Classroom" onClick={() => this.handleCreateClassroomClick(this.state.uploadArray)} className='submit-class-details-button'>
              Create Classroom
            </div>
          )}
          {this.state.loading && (
            <div className='add-students-dropzone-loading'>
              <CircularProgress />
              <div className='add-students-loading-text'>
                Adding Students<br/>To Classroom...
              </div>
              <div className='add-students-disclosure'>
                This may take up to 2 minutes
              </div>
            </div>
          )}    
        </div>
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
    // Token used For Creating Classroom & Adding Students to Classroom
    jwtToken: state.userDetails.jwtToken,
    creatingClassroom: state.dashboard.creatingClassroom,
    selectedClassroom: state.dashboard.selectedClassroom,
  };
};

// Map Dispatch To Props (Dispatch Actions to Reducers. Reducers then modify the redux store state.
const mapDispatchToProps = (dispatch) => {
  // Action
    return {
      // Creates Classroom For The Teacher
      createTeacherClassroom: (token, classroomName, studentsList, classYear) => dispatch(createTeacherClassroom(token, classroomName, studentsList, classYear)),
      // Adds Students To An Existing Classroom
      // NOTE:  make sure that the input parameter 'studentsList' is an array of one or more of the following object
      // Make sure that double quotes are used for the string and date format input fileds in each object
      // { email: "welshman@me.edu", firstname: "Chris", lastName: "Thomas", birthDate: "2008-06-06" }
      addStudentsToClassroom: (token, classroomId, studentsList) => dispatch(addStudentsToClassroom(token, classroomId, studentsList)),
      toggleAddStudents: () => dispatch(toggleAddStudents()),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddStudents);
