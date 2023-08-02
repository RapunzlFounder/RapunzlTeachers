import React from 'react';
import Dialog from '@mui/material/Dialog';
import '../../../styles/Admin/Admin.css';

class UploadTemplate extends React.PureComponent {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
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
          <div className='alert-title' style={{ fontWeight: '800' }}>
            Example Of Spreadsheet To Upload
          </div>
          <div className='upload-template-instructions'>
            Please try to upload an Excel Document or a CSV file. Please label the columns in your spreadsheet as indicated below.
          </div>
          <div className='upload-template-flex'>
            <div className='upload-column-header'>First Name</div>
            <div className='upload-column-header'>Last Name</div>
            <div className='upload-column-header'>Email</div>
            <div className='upload-column-header'>Birthday</div>
          </div>
          <div className='upload-template-flex'>
            <div className='upload-column-cell' />
            <div className='upload-column-cell' />
            <div className='upload-column-cell' />
            <div className='upload-column-cell' />
          </div>
          <div className='upload-template-flex'>
            <div className='upload-column-cell' />
            <div className='upload-column-cell' />
            <div className='upload-column-cell' />
            <div className='upload-column-cell' />
          </div>
          <div className='upload-template-flex'>
            <div className='upload-column-cell' />
            <div className='upload-column-cell' />
            <div className='upload-column-cell' />
            <div className='upload-column-cell' />
          </div>
          <div className='upload-template-flex'>
            <div className='upload-column-cell' />
            <div className='upload-column-cell' />
            <div className='upload-column-cell' />
            <div className='upload-column-cell' />
          </div>
          <div className='upload-template-flex'>
            <div className='upload-column-cell' />
            <div className='upload-column-cell' />
            <div className='upload-column-cell' />
            <div className='upload-column-cell' />
          </div>
          <div onClick={() => this.props.dismiss()} className='template-dismiss-button'>
            Close Template
          </div>
        </div>
      </Dialog>
    );
   }
}

export default UploadTemplate;
