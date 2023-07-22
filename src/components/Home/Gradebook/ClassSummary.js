import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTeacherClassroom } from '../../../selectors/classroomSelectors';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ClassSummarySoonGraphic from '../../../assets/images/Home/Competitions.png';
import handleGradeColor from '../../../helper_functions/handleGradeColor';

class ClassSummary extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div className='gradebook-container' style={{ paddingTop: 18 }}>
        <img alt='' className='gradebook-empty-image' src={ClassSummarySoonGraphic} />
        <div className='gradebook-empty-header'>
          Coming Soon!
        </div>
        <div className='gradebook-empty-text' style={{ width: 400, fontSize: 16 }}>
          We're still building a Class Summary dashboard which will give you insights into the classroom's understanding of learning material and performance both in the app and on module assessments.
          <br/><br/>
          If there's any information you'd like to see, reach out to us through support. We'd love to hear from you.
        </div>
      </div>
    );
  }
}

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state, ownProps) => {
  // Redux Store --> Component
  return {
    // Handles Colors Which Are Updated Throughout When MarketOpen Changes
    colors: state.userDetails.appColors,
    // Selector For Selected Classroom Grades
    classroom: getTeacherClassroom(state, ownProps)
  };
};

export default connect(mapStateToProps)(ClassSummary);
