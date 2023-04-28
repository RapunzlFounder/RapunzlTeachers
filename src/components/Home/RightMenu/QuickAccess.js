import React, { Component } from 'react';
import { connect } from 'react-redux';
import MoreTime from '@mui/icons-material/MoreTime';
import '../../../styles/Home/HomeScreen.css';

class QuickAccess extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='quick-access-container'>
        <div className='classroom-header-flex'>
          <MoreTime fontSize="small" />
          <div className='classroom-header' style={{ marginLeft: 6 }}>
            Quick Access
          </div>
        </div>
        <div onClick={() => this.props.toggleAddStudents()} className='quick-access-item'>
          Upload A Classroom
        </div>
        <div onClick={() => this.props.toggleCourseBuilder()} className='quick-access-item'>
          Build A Course
        </div>
        <div onClick={() => this.props.setMenuTab(4)} className='quick-access-item'>
          Find Course Resources
        </div>
        <div onClick={() => this.props.setMenuTab(7)} className='quick-access-item'>
          Contact Support
        </div>
        <div onClick={() => this.props.setMenuTab(8)} className='quick-access-item'>
          Upgrade Plan
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


export default connect(mapStateToProps)(QuickAccess);
