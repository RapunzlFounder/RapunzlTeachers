import React, { Component } from 'react';
import { connect } from 'react-redux';
import HelpOutline from '@mui/icons-material/HelpOutline';

class ClassroomSupport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      removeStudents: false,
      manualAdd: false,
    }
  }

  // When User Selects A Different Menu Tab, We Reset The State To Avoid Strange User Sequences
  componentDidUpdate(prevProps) {
    if (this.props.visible !== prevProps.visible) {
      this.setState({
        removeStudents: false,
        manualAdd: false,
      });
    }
  }

  // Toggles Visibility Of ManualEntry Component Which Allows Teachers To Enter Information Manually
  toggleManualEntry = () => {
    this.setState({ manualAdd: !this.state.manualAdd });
  }

  render() {
    return (
      <div className='tile classroom-wrong' style={{ paddingLeft: 10, paddingRight: 10, paddingBottom: 40 }}>
        <div className='classroom-header-flex' style={{ paddingTop: 25, paddingLeft: 12 }}>
          <HelpOutline />
          <div className='classroom-title' style={{ paddingLeft: 10 }}>
            Is There Something Wrong?
          </div>
        </div>
        <div className='classroom-upload-instructions'>
          If you're having trouble uploading your class, don't stress! Check out our support or contact us directly and share the file with us so we can upload your class manually.
          <br/><br/>
          It typically takes us 2-3 days to upload a classroom and is much easier for us to deal with if you're having issues with the template.
        </div>
        <div onClick={() => this.props.setMenuTab(7)} className='button contact-button'>
          Contact Us
        </div>
      </div>
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

export default connect(mapStateToProps)(ClassroomSupport);
