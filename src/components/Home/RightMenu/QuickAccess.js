import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setMenuTab, quickAccessCourseBuilder, quickAccessAddStudents } from '../../../ActionTypes/dashboardActions';
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
        <div onClick={() => this.props.quickAccessAddStudents()} className='quick-access-item'>
          Upload A Classroom
        </div>
        <div onClick={() => this.props.quickAccessCourseBuilder()} className='quick-access-item'>
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

// Map Dispatch To Props (Dispatch Actions to Reducers. Reducers then modify the redux store state.
const mapDispatchToProps = (dispatch) => {
  // Action
    return {
      // Handles sending message to Database to email to support email address
      setMenuTab: (tab) => dispatch(setMenuTab(tab)),
      quickAccessCourseBuilder: () => dispatch(quickAccessCourseBuilder()),
      quickAccessAddStudents: () => dispatch(quickAccessAddStudents()),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuickAccess);
