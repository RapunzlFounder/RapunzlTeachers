import React from 'react';
import moment from 'moment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import '../../../styles/Admin/UploadHelper.css';

class HelperItem extends React.PureComponent {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  // Handles the skip button
  handleSkip() {
    this.props.toggleSkip(this.props.index);
  }

  // Handles the dropdown selection
  handleDropdown(int) {
    this.props.selectDropdown(int, this.props.index);
  }

  // Checks the index of the column to see if it matches with any of the fields
  getSelectValue() {
    if (this.props.firstName === this.props.index) {
      return 0;
    } else if (this.props.lastName === this.props.index) {
      return 1;
    } else if (this.props.email === this.props.index) {
      return 2;
    } else if (this.props.birthday === this.props.index) {
      return 3;
    } else {
      return false;
    }
  }

  // Updates The Value For Birthday Read From Excel, Which Is A Serial Number Representing The Number Of Days Since January 1, 1900
  handleExcelTimestamp(serialTime) {
    // eslint-disable-next-line
    if (serialTime !== undefined && serialTime !== null && typeof serialTime == 'number') {
      // Creates Initial Moment Instance For Starting Point, Defined By Excel Serialization Of Date
      let initialTime = moment("Jan 1, 1900");
      // Adds The Serial Time Value To The Initial Date, Specifying That We Are Adding Days
      let birthday = initialTime.add(parseInt(serialTime), "days");
      // Returns Birthday Formatted In Readable Form: mm/dd/yyyy. This is manipulated before sending to the server.
      return birthday.format("l");
    } else {
      return serialTime;
    }
  }

  render() {
    return (
      <div key={this.props.index} className='upload-column-match-item' style={{ borderColor: this.props.color }}>
        <div className='upload-column-match-header' style={{ backgroundColor: this.props.color }}>
          <div className='upload-column-match-h1'>
            {this.props.item}
          </div>
          {this.getSelectValue() === false && !this.props.skipped && (
            <div className='upload-column-match-alert'>
              <ErrorOutlineIcon className='upload-column-match-alert-icon' />
              <div className='upload-column-match-alert-text'>
                Not Matched
              </div>
            </div>
          )}
          {this.getSelectValue() !== false && !this.props.skipped && (
            <div className='upload-column-match-alert'>
              <CheckCircleIcon className='upload-column-match-alert-icon' />
              <div className='upload-column-match-alert-text'>
                Matched
              </div>
            </div>
          )}
          {this.props.skipped && (
            <div className='upload-column-match-alert'>
              <SkipNextIcon className='upload-column-match-alert-icon' />
              <div className='upload-column-match-alert-text'>
                Column Skipped
              </div>
            </div>
          )}
        </div>
        <div className='upload-column-subheader'>
          {!this.props.skipped && (
            <div className='upload-column-select-dropdown'>
              <div className='upload-column-select-dropdown-text'>
                <span style={{ color: 'red' }}>*</span> Column Matches With Which Field
              </div>
              <div className='upload-column-dropdown'>
                <select
                  id="upload-dropdown"
                  name="Select A Field"
                  placeholder='Select A Field'
                  value={this.getSelectValue()}
                  onChange={(e) => this.handleDropdown(e.target.value)} 
                  className='upload-column-select'
                >
                  <option className='upload-column-option' value={false}>
                    Select A Field
                  </option>
                  {(this.props.firstName === false || this.props.firstName === this.props.index) && (
                    <option className='upload-column-option' value={0}>
                      First Name
                    </option>
                  )}
                  {(this.props.lastName === false || this.props.lastName === this.props.index) && (
                    <option className='upload-column-option' value={1}>
                      Last Name
                    </option>
                  )}
                  {(this.props.email === false || this.props.email === this.props.index) && (
                    <option className='upload-column-option' value={2}>
                      Email
                    </option>
                  )}
                  {(this.props.birthday === false || this.props.birthday === this.props.index) && (
                  <option className='upload-column-option' value={3}>
                    Birthday
                  </option>
                  )}
                </select>
              </div>
            </div>
          )}
          {this.props.skipped && (
            <div className='upload-column-select-dropdown' />
          )}
          <div onClick={() => this.handleSkip()} className='upload-column-skip-container'>
            {this.props.skipped === false ? (
              <CheckBoxOutlineBlankIcon className='upload-column-skip-icon' />
            ) : (
              <CheckBoxOutlinedIcon className='upload-column-skip-icon' />
            )}
            <div className='upload-column-skip-text'>
              Skip This Column
            </div>
          </div>
        </div>
        <div className='upload-column-data-preview'>
            {this.props.previewData.map((item, index) => {
              return (
                <div key={index + '1'} className='data-preview-item'>
                  <div className='data-preview-text'>
                    {this.handleExcelTimestamp(item)}
                  </div>
                </div>
              )
            })}
            {this.props.previewData && this.props.previewData.length && this.props.previewData.length > 1 && (
              <div className='data-preview-item' style={{ borderBottomWidth: 0 }}>
                <div className='data-preview-text'>
                  ...
                </div>
              </div>
            )}
        </div>
      </div>
    )
   }
}

export default HelperItem;
