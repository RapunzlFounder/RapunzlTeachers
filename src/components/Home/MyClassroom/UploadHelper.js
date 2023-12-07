import React from 'react';
import { connect } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import '../../../styles/Admin/UploadHelper.css';
import HelperItem from './HelperItem';
import moment from 'moment';

class UploadHelper extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      skipArray: [],
      uploadArray: [],
      firstName: false,
      lastName: false,
      email: false,
      birthday: false,
      status: 'matching',
    }
  }

  // When the component's visibility is toggled, reset the state
  componentDidUpdate(prevProps) {
    if (this.props.visible !== prevProps.visible) {
      this.setState({
        skipArray: [],
        uploadArray: [],
        firstName: false,
        lastName: false,
        email: false,
        birthday: false,
        status: 'matching',
      });
    }
  }

  // Retrieves First 4 Elements (Does Not Include First Row Which Are The Headings)
  _getDataPreview(int) {
    let previewArray = [];
    // If this.props.data.length is undefined, we return an empty preview array to avoid a crash
    if (this.props.data.length > 1 && this.props.data.length < 6) {
      for(let i = 1; i < this.props.data.length; i++)  {
        previewArray.push(this.props.data[i][int]);
      }
    } else if (this.props.data.length > 1 && this.props.data.length >= 6) {
      for(let i = 1; i < 5; i++)  {
        previewArray.push(this.props.data[i][int]);
      }
    }
    return previewArray;
  }

  // Toggles The Skip Array And Adds Or Removes Elements
  toggleSkip = (x) => {
    // Clone the current skipArray from the state
    let newSkipArray = this.state.skipArray.slice();
    // Check if the value x exists in the array
    const index = newSkipArray.indexOf(x);
    if (index !== -1) {
      // If the value exists, remove it from the array
      newSkipArray.splice(index, 1);
    } else {
      // If the value does not exist, add it to the array
      newSkipArray.push(x);
    }
    // Checks If User Selected Skip For A Column That Was Assigned & Update the skipArray state with the new array
    if (x === this.state.firstName) {
      this.setState({ skipArray: newSkipArray, firstName: false });
    } else if (x === this.state.lastName) {
      this.setState({ skipArray: newSkipArray, lastName: false });
    } else if (x === this.state.email) {
      this.setState({ skipArray: newSkipArray, email: false });
    } else if (x === this.state.birthday) {
      this.setState({ skipArray: newSkipArray, birthday: false });
    } else {
      this.setState({ skipArray: newSkipArray });
    }
  }

  // Reused In Four Functions Below
  removeValueInArray(x) {
    // Clone the current skipArray from the state
    let newSkipArray = this.state.skipArray;
    // Check if the value x exists in the array
    const index = newSkipArray.indexOf(x);
    if (index !== -1) {
      // If the value exists, remove it from the array
      newSkipArray.splice(index, 1);
    }
    this.setState({ skipArray: newSkipArray });
  }

  // Used With Handling Color and Verifying That User Has Matched All Columns
  checkIfSkipped(x) {
    // Check if the value x exists in the array
    const index = this.state.skipArray.indexOf(x);
    if (index === -1) {
      // If the value does not exist, then it is not skipped
      return false;
    } else {
      // Otherwise, the value is  present and it is skipped
      return true;
    }
  }

  // Determines the color of the column cell
  handleColor = (x) => {
    // Handles If User Has Selected To Skip This Column
    if (this.checkIfSkipped(x)) {
      return '#8f9b98';
    }
    // Handles if matched to firstName
    else if (x === this.state.firstName) {
      return '#85e3cc';
    }
    // Handles if matched to lastName
    else if (x === this.state.lastName) {
      return '#85e3cc';
    }
    // Handles if matched to email
    else if (x === this.state.email) {
      return '#85e3cc';
    }
    // Handles if matched to birthday
    else if (x === this.state.birthday) {
      return '#85e3cc';
    }
    // Otherwise, Column Is Not Matched
    else {
      return '#ff4747';
    }
  }

  // Function that is called in selectDropdown to remove the value from the other selections
  removeFromOtherSelections(value) {
    if (this.state.firstName === value) {
      this.setState({ firstName: false });
    } else if (this.state.lastName === value) {
      this.setState({ lastName: false });
    } else if (this.state.email === value) {
      this.setState({ email: false });
    } else if (this.state.birthday === value) {
      this.setState({ birthday: false });
    }
  }

  // Handles the dropdown selection
  selectDropdown = (int, value) => {
    // Handles First Name
    if (parseInt(int) === 0) {
      this.removeValueInArray(value);
      this.removeFromOtherSelections(value);
      this.setState({ firstName: value });
    }
    // Handles Last Name
    else if (parseInt(int) === 1) {
      this.removeValueInArray(value);
      this.removeFromOtherSelections(value);
      this.setState({ lastName: value });
    }
    // Handles Email
    else if (parseInt(int) === 2) {
      this.removeValueInArray(value);
      this.removeFromOtherSelections(value);
      this.setState({ email: value });
    } // Handles Birthday
    else if (parseInt(int) === 3) {
      this.removeValueInArray(value);
      this.removeFromOtherSelections(value);
      this.setState({ birthday: value });
    }
    // Handles false (placeholder) or error 
    else {

    }
  }

  // This function verifies that the user has selected a value for each of the four columns
  verifyNext() {
    if (this.state.status === 'matching') {
      // Checks First That First Name, Last Name, Email & Birthday Have All Been Selected
      if (this.state.firstName !== false && this.state.lastName !== false && this.state.email !== false && this.state.birthday !== false) {
        // Checks That The Skip Array Length Is The Same As 4 Plus The Length Of The Headers Array
        if (this.props.data[0].length === this.state.skipArray.length + 4) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else if (this.state.status === 'confirm') {
      let error = false;
      for (var i in this.state.uploadArray) {
        if (this.state.uploadArray[i].isError) {
          error = true;
        }
      }
      return !error;
    }
  }

  // This function handles the next button and creates an array of students to be uploaded
  next() {
    if (this.state.status === 'matching' && this.verifyNext()) {
      let newStudentArray = [];
      for (var i = 1; i < this.props.data.length; i++) {
        let firstName = this.props.data[i][this.state.firstName].charAt(0).toUpperCase() + this.props.data[i][this.state.firstName].slice(1);
        let lastName = this.props.data[i][this.state.lastName].charAt(0).toUpperCase() + this.props.data[i][this.state.lastName].slice(1);
        let newStudent = {
          id: i,
          firstName,
          lastName,
          email: this.props.data[i][this.state.email],
          birthday: this.handleExcelTimestamp(this.props.data[i][this.state.birthday]),
          isError: !(this.props.data[i][this.state.firstName] !== null && 
                   this.props.data[i][this.state.firstName] !== undefined &&
                   this.props.data[i][this.state.lastName] !== null &&
                   this.props.data[i][this.state.lastName] !== undefined &&
                   this.props.data[i][this.state.email] !== null &&
                   this.props.data[i][this.state.email] !== undefined &&
                   this.props.data[i][this.state.birthday] !== null &&
                   this.props.data[i][this.state.birthday] !== undefined)
        }
        newStudentArray.push(newStudent);
      }
      this.setState({ uploadArray: newStudentArray, status: 'confirm' });
    } else if (this.state.status === 'confirm' && this.verifyNext()) {
      this.setState({ status: 'loading' });
      this.props.handleCreateClassroomClick(this.state.uploadArray);
    }
  }

  // Updates The Value For Birthday Read From Excel, Which Is A Serial Number Representing The Number Of Days Since January 1, 1900
  handleExcelTimestamp(serialTime) {
    if (serialTime !== undefined) {
      // Creates Initial Moment Instance For Starting Point, Defined By Excel Serialization Of Date
      let initialTime = moment("Jan 1, 1900");
      // Adds The Serial Time Value To The Initial Date, Specifying That We Are Adding Days
      let birthday = initialTime.add(parseInt(serialTime), "days");
      // Returns Birthday Formatted In Readable Form: mm/dd/yyyy. This is manipulated before sending to the server.
      return birthday.format("l");
    } else {
      return null;
    }
  }

  // Enables the teacher to remove a student with bad data to proceed with creating the classroom
  _handleRemoveStudent = (studentArray) => {
    let newArray = [];
    for (var i in this.state.uploadArray) {
      for (var j in studentArray) {
        if (this.state.uploadArray[i].id !== studentArray[j].id) {
          newArray.push(this.state.uploadArray[i]);
        }
      }
    }
    this.setState({ uploadArray: newArray });
  }

  render() {
    let isError = !this.verifyNext();
    return (
      <Dialog
        open={this.props.visible}
        onClose={this.props.dismiss}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xl"
        fullWidth
        style={{ backgroundColor: '#00120a00' }}
      >
          <div className='upload-container'>
            <div className='upload-helper-flex'>
              <div className='upload-helper-flex-right'>
                <div className='upload-helper-p'>
                  Your Classroom /
                </div>
                <div className='upload-helper-h1'>
                  Upload Students
                </div>
                <div className='upload-helper-cancel' onClick={this.props.dismiss}>
                  Cancel
                </div>
              </div>
              <div
                title="Send List Of Students To Rapunzl To Add"
                className={isError ? 'upload-helper-confirm-button-disabled' : 'upload-helper-confirm-button'} 
                onClick={() => this.next()}
              >
                {this.state.status === 'matching' ? 'Add Students To Class' : 'Confirm Students'}
              </div>
            </div>
            <div className='upload-helper-flex' style={{ paddingTop: 15 }}>
              <div className='upload-steps-container'>
                <div className='upload-step-item'>
                  <CheckCircleIcon className='upload-step-icon' />
                  <div className='upload-step-text'>
                    Upload File
                  </div>
                </div>
                <div className='upload-step-spacer' />
                <div className='upload-step-item' style={{ paddingTop: 2, paddingBottom: 2}}>
                  {this.state.status === 'matching' ? <ErrorOutlineOutlinedIcon className='upload-step-icon' /> : <CheckCircleIcon className='upload-step-icon' />}
                  <div className='upload-step-text'>
                    Match Columns
                  </div>
                </div>
                <div className='upload-step-spacer' />
                <div className='upload-step-item'>
                  {this.state.status === 'matching' ? <CircleOutlinedIcon className='upload-step-icon' /> : <ErrorOutlineOutlinedIcon className='upload-step-icon' />}
                  <div className='upload-step-text'>
                    Add Students
                  </div>
                </div>
              </div>
              {this.state.status === 'matching' && (
                <div className='upload-columns-list-container'>
                  {isError && (
                    <div className='upload-columns-list-instructions'>
                      Match or skip each column in the spreadsheet you uploaded so that Rapunzl has the correct information to create your students' accounts. Please note that the file you uploaded must have headers or the column cannot be matched.
                    </div>
                  )}
                  {this.props.data !== undefined && this.props.data[0] !== undefined && this.props.data[0].map((item, index) => {
                    let previewData = this._getDataPreview(index);
                    return (
                      <HelperItem
                        item={item}
                        index={index}
                        previewData={previewData}
                        color={this.handleColor(index)}
                        firstName={this.state.firstName}
                        lastName={this.state.lastName}
                        email={this.state.email}
                        birthday={this.state.birthday}
                        toggleSkip={this.toggleSkip}
                        skipped={this.checkIfSkipped(index)}
                        selectDropdown={this.selectDropdown}
                        skipArray={this.state.skipArray.length}
                      />
                    )
                  })}
                  {!isError && (
                    <div
                      title="Send List Of Students To Rapunzl To Add"
                      className={isError ? 'upload-helper-confirm-button-disabled' : 'upload-helper-confirm-button'} 
                      onClick={() => this.next()}
                      style={{ width: 'fit-content', float: 'right', marginBottom: 45 }}
                    >
                      Add Students To Class
                    </div>
                  )}
                </div>
              )}
              {this.state.status === 'confirm' && (
                <div className='upload-columns-list-container'>
                  {isError && (
                    <div className='upload-columns-list-instructions' style={{ marginLeft: 20, marginRight: 20 }}>
                      We could not find the information for all of your students. Remove students with missing info in order to continue. You can always add these students at a later time.
                    </div>
                  )}
                  <div className='upload-template-flex'>
                    <div className='upload-template-header-item' style={{ backgroundColor: '#007154' }}>
                      First Name
                    </div>
                    <div className='upload-template-header-item' style={{ backgroundColor: '#007154' }}>
                      Last Name
                    </div>
                    <div className='upload-template-header-item' style={{ backgroundColor: '#007154' }}>
                      Email
                    </div>
                    <div className='upload-template-header-item' style={{ backgroundColor: '#007154' }}>
                      Birthday
                    </div>
                    <div style={{ width: 75 }} />
                  </div>
                  {this.state.uploadArray.length !== 0 && this.state.uploadArray.map((item, index) => {
                    return (
                      <div index={index} className='upload-template-flex'>
                        <div className='upload-template-cell' style={{ color: item.firstName !== undefined && item.firstName !== null && item.firstName.length !== undefined ? '#032e23' : '#ff0000' }}>
                          {item.firstName !== undefined && item.firstName !== null && item.firstName.length !== undefined ? item.firstName.length > 15 ? item.firstName.slice(0,14) + '...' : item.firstName : 'Missing'}
                        </div>
                        <div className='upload-template-cell' style={{ color: item.lastName !== undefined && item.lastName !== null && item.lastName.length !== undefined ? '#032e23' : '#ff0000' }}>
                          {item.lastName !== undefined && item.lastName !== null && item.lastName.length !== undefined ? item.lastName.length > 15 ? item.lastName.slice(0,14) + '...' : item.lastName : 'Missing'}
                        </div>
                        <div className='upload-template-cell' style={{ color: item.email !== undefined && item.email !== null && item.email.length !== undefined ? '#032e23' : '#ff0000' }}>
                          {item.email !== undefined && item.email !== null && item.email.length !== undefined ? item.email.length > 15 ? item.email.slice(0,14) + '...' : item.email : 'Missing'}
                        </div>
                        <div className='upload-template-cell' style={{ color: item.birthday !== undefined && item.birthday !== null && item.birthday.length !== undefined ? '#032e23' : '#ff0000' }}>
                          {item.birthday !== undefined && item.birthday !== null && item.birthday.length !== undefined && item.birthday.length > 1 ? item.birthday : 'Missing'}
                        </div>
                        {item.isError && (
                          <div
                            title="Remove Student From Upload"
                            onClick={() => this._handleRemoveStudent([item])}
                            className='upload-cell-cancel-button'
                          >
                            <CancelOutlinedIcon className='upload-cancel-icon' />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
              {this.state.status === 'loading' && (
                <div className='upload-columns-loading-container'>
                  <CircularProgress className='upload-columns-loading-icon'/>
                  <div className='upload-preview-loading-text'>
                    Adding Students...
                  </div>
                </div>
              )}
            </div>

          </div>
      </Dialog>
    );
   }
}

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    // Handles Colors Which Are Updated Throughout When MarketOpen Changes
    colors: state.userDetails.appColors,
  };
};

export default connect(mapStateToProps)(UploadHelper);
