import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../../styles/Home/Gradebook.css';
import YourGrades from './YourGrades';
import EmptyGrades from './EmptyGrades';

class GradebookTile extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  // Handles Resetting Search State To Initial When Component Is Toggled And Not Visible To User
  componentDidUpdate(prevProps) {
    if (this.props.visible !== prevProps.visible) {

    }
  }

  render() {
    if (this.props.visible) {
      return (
        <div className='middle-container'>
          <div className='tile' style={{ padding: 20 }}>
            {true && (
              <YourGrades />
            )}
            {false && (
              <EmptyGrades />
            )}
          </div>
        </div>
      );
    } else {
      return <div />
    }
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

export default connect(mapStateToProps)(GradebookTile);
