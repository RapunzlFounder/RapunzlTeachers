import React from 'react';
import { connect } from 'react-redux';
import { getFinancialLiteracyStandards } from '../../ActionTypes/coursemoduleActions';
import Dialog from '@mui/material/Dialog';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import '../../styles/Admin/Admin.css';
import moment from 'moment';
import { objectToArray } from '../../helper_functions/utilities';
import Alert from './Alert';

class StandardsPopup extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      copied: false,
      alertVisible: false,
      alertTitle: '',
      alertMessage: ''
    }
  }

  componentDidMount() {
    this._handleCheckForStandards();
  }

  // Handles checking if we should retrieve standards so that we can map them to the correct resources
  _handleCheckForStandards() {
    if (objectToArray(this.props.standards).length === 0) {
      this._getStandards();
    }
    // Used To Check Time Difference Between Current Time And Time Standards Were Retrieved
    else {
      const localTime = new Date();
      const currentTime = moment(localTime);
      const standardsRetrievedTime = moment(this.props.standardsLastRetrieved);
      const secondsDiff = currentTime.diff(standardsRetrievedTime, 'seconds');
      // If It Has Been Over 14 Days, Refresh Standards
      if (secondsDiff > 1209600) {
        this._getStandards();
      }
    }    
  }

  // Handles actual dispatch to get standards and save to redux. Also handles alert if there's an error.
  _getStandards() {
    this.props.getStandards(this.props.jwtToken).then((res) => {
      if (!(res && !('errors' in res))) {
        this.setState({
          alertVisible: true,
          alertTitle: 'Something Went Wrong...',
          alertMessage: 'We had trouble retrieving financial literacy standards that align with these resources. Please contact support so that we can help resolve this issue.'
        });
      }
    })
  }

  // Filters Through Resources Associated With This Particular Course Module, Then Displays The Standards That 
  // Are Satisfied With This Module
  _getAlignmentArray() {
    // We Are Going To Return An Array To Map Showing All Of The Standards
    let alignmentArray = [];
    // Each Object In The Array Will Include: ID, Title, Description, Subtext, Value
    // Module Standards Include All Resource Standards, So We Loop Through And Match All Of These

    // Standards Included In The Table Have A Title For Major Category, But Resources Have A Number
    // Earning Income. Saving. Spending. Investing. Managing Credit. Managing Risk.

    return alignmentArray;
  }
  
  // Handles Copying Standards To Clipboard If Teachers Need To Keep That Information
  copyStandards() {
    this.setState({ copied: true });
    navigator.clipboard.writeText('8.1a, 8.2a, 8.2b, 8.2c, 8.3a');
  }

  // Toggles Visibility Of Alert Dialog
  toggleAlert = () => {
    this.setState({ alertVisible: !this.state.alertVisible });
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
          <div className='container'>
            <div className='standards-header-flex'>
              <div className='alert-title' style={{ fontWeight: '800' }}>
                Standards Covered In This {this.props.type}
              </div>
              <HighlightOffIcon
                onClick={() => this.props.dismiss()}
                style={{ fill: '#01452f', paddingRight: 24, paddingTop: 20, cursor: 'pointer' }}
              />
            </div>
            <div
              onClick={() => this.copyStandards()}
              className='upload-template-instructions'
              style={{ cursor: 'pointer', paddingBottom: 5 }}
            >
              8.1a, 8.2a, 8.2b, 8.2c, 8.3a
            </div>
            {this.state.copied && (
              <div className='standard-item-title' style={{ marginLeft: 23, marginTop: 5, color: '#00ab7f' }}>
                Copied
              </div>
            )}
            <div className='standards-popup-container'>
              {this.props.standardsArray.map((item) => {
                return (
                <div key={item} className='standards-item-flex'>
                  <div className='standard-item-left'>
                    <div className='standard-item-title'>
                      Earning Income 8.1
                    </div>
                    <div className='standard-item-text'>
                      This is example text for the expected outcomes for a specific learning standard and can be quite long.
                    </div>
                  </div>
                  <div className='standard-item-right'>
                    <div className='standard-item-title' style={{ color: '#00ab7f' }}>
                      8.1a:
                    </div>
                    <div className='standard-item-text'>
                      This is example text for the expected outcomes for a specific learning standard and can be quite long and usually is longer than the substandard that is to the left of this.
                    </div>
                  </div>
                </div>
              )})}
            </div>
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
    // Last Time Standards Were Retrieved To Avoid Hitting Server 
    standardsLastRetrieved: state.coursesmodules.standardsLastRetrieved,
    standards: state.coursesmodules.financialLiteracyStandards,
  };
};

// Map Dispatch To Props (Dispatch Actions to Reducers. Reducers then modify the redux store state.
const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    // Handles Retrieving Financial Literacy Standards Which Are Mapped To Various Resource
    getStandards: (token) => dispatch(getFinancialLiteracyStandards(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StandardsPopup);
