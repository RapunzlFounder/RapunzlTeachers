import React, { Component } from 'react';
import { connect } from 'react-redux';
import { quickAccessAddStudents } from '../../../ActionTypes/dashboardActions';
import EmptyGradesImage from '../../../assets/images/Education/EmptyGrades.png'

class EmptyGrades extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div className='manual-student-empty-container' style={{ paddingTop: 80, paddingBottom: 130 }}>
        <img alt='' className='manual-student-empty-image' src={EmptyGradesImage} style={{ borderRadius: 0, background: 'none' }} />
        <div className='manual-student-empty-title' style={{ fontSize: 20, color: '#03ff84' }}>
          No Classroom Found
        </div>
        <div className='manual-student-empty-text' style={{ fontSize: 16 }}>
          It looks like you haven't created a classroom yet! Get started by creating a classroom and course to track student grades.
        </div>
        <div onClick={() => this.props.quickAccessAddStudents()} className='empty-grades-class-button'>
          Create Classroom
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
      quickAccessAddStudents: () => dispatch(quickAccessAddStudents()),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmptyGrades);
