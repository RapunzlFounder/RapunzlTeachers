import React from 'react';
import { connect } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import '../../../styles/Admin/Admin.css';
import CircularProgress from '@mui/material/CircularProgress';

class UploadPreview extends React.PureComponent {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }

  // This Loops Through this.props.data to determine the number of students that we cannot match information correctly
  _getErrorStudentsNumber() {
    let errorCounter = 0;
    for (var i in this.props.data) {
      if (this.props.data[i].isError) {
        errorCounter = errorCounter + 1;
      }
    }
    return errorCounter;
  }

  render() {
    return (
      <Dialog
        open={this.props.visible}
        onClose={this.props.dismiss}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
      >
        {!this.props.loading && (
          <div className='container'>
            <div className='alert-title' style={{ fontWeight: '800' }}>
              Upload Preview
            </div>
            <div className='upload-template-instructions'>
              These are the students we were succesfully able to identify. There were {this._getErrorStudentsNumber()} rows that we are unable to match and they will be highlighted in red.
            </div>
            <div className='upload-template-flex' style={{ width: '90%', margin: 'auto' }}>
              <div className='upload-column-header' style={{ width: '25%' }}>First Name</div>
              <div className='upload-column-header' style={{ width: '25%' }}>Last Name</div>
              <div className='upload-column-header' style={{ width: '25%' }}>Email</div>
              <div className='upload-column-header' style={{ width: '25%' }}>Birthday</div>
            </div>
            <div className='upload-preview-restrict-height'>
              {this.props.data.map((item) => {
                return (
                  <div key={item.username} className='upload-template-flex' style={{ width: '90%', margin: 'auto', backgroundColor: item.isError ? '#ffb3b3' : '' }}>
                    <div className='upload-column-cell'>
                      {item.firstName.length > 15 ? item.firstName.slice(0,14) + '...' : item.firstName}
                    </div>
                    <div className='upload-column-cell'>
                      {item.lastName.length > 15 ? item.lastName.slice(0,14) + '...' : item.lastName}
                    </div>
                    <div className='upload-column-cell'>
                      {item.email.length > 15 ? item.email.slice(0,14) + '...' : item.email}
                    </div>
                    <div className='upload-column-cell'>
                      {item.birthday}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className='dropzone-uploaded-file-flex'>
              <div className='dropzone-file-remove-button' onClick={this.props.dismiss}>
                Cancel
              </div>
              <div className='dropzone-file-upload-button' onClick={() => this.props.handleCreateClassroomClick(this.props.data)}>
                Upload Students
              </div>
            </div>
          </div>
        )}
        {this.props.loading && (
          <div className='container upload-preview-loading-container'>
            <CircularProgress />
            <div className='upload-preview-loading-text'>
              Adding Students...
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
    // Handles Colors Which Are Updated Throughout When MarketOpen Changes
    colors: state.userDetails.appColors,
  };
};

export default connect(mapStateToProps)(UploadPreview);
