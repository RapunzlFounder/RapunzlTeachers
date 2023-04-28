import React, { Component } from 'react';
import { connect } from 'react-redux';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import EmptyGradebook from '../../../assets/images/Education/EmptyGradebook.png';

class YourGrades extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
    this.state = {
      selectedClass: '',
    }
  }

  selectClass(text) {
    this.setState({ selectedClass: text });
  }

  render() {
    return (
      <div>
        <div className='card-flex-header' style={{ paddingBottom: 5 }}>
          <h2 className='card-header' style={{ marginLeft: 0 }}>
            Your Gradebook
          </h2>
        </div>
        <div className='gradebook-description-text'>
          Follow your students’ performance in quiz assessments. To sort your class, click on any of the headers. To view more about a student’s scores, click on the score and we will show a breakdown of their question answers.
        </div>
        <div className='gradebook-header-flex'>
          <select
            id="currentClass"
            name="Current Class"
            className='gradebook-class-dropdown'
            placeholder='Select Classroom'
            value={this.state.selectedClass}
            onChange={(e) => this.selectClass(e.target.value)}
          >
            <option className='gradebook-class-option' value="">Select Classroom</option>
            <option className='gradebook-class-option' value="class1">Classroom #1</option>
            <option className='gradebook-class-option' value="class2">Classroom #2</option>
            <option className='gradebook-class-option' value="class3">Classroom #3</option>
            <option className='gradebook-class-option' value="class4">Classroom #4</option>
          </select>
          {this.state.selectedClass !== '' && (
            <div className='gradebook-class-dropdown gradebook-export-button'>
              <FileDownloadIcon className='gradebook-export-icon' />
              <div className='export-button-text'>
                Export Grades
              </div>
            </div>
          )}
        </div>
        {false && (
          <div className='gradebook-container'>
            <div className='gradebook-class-flex'>
              <div className='gradebook-flex-header-item' style={{ width: '135px', paddingLeft: 10, borderColor: 'white' }}>
                <div className='gradebook-header-text'>
                  Name
                </div>
              </div>
              {[1,2,3,4,5,6,7,8,9,10,11,12].map((item) => {
                return (
                  <div key={item} className='gradebook-flex-header-item quiz-flex-item' style={{ borderColor: 'white' }}>
                    <div className='gradebook-header-text'>
                      Q{item}
                    </div>
                  </div>
                )
              })}
              <div className='gradebook-flex-header-item'>
                <div className='gradebook-header-text' style={{ textAlign: 'center', borderColor: 'white' }}>
                  Avg
                </div>
              </div>
            </div>
            {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map((item) => {
              return (
                <div key={item} className='gradebook-class-flex' style={{ marginTop: 0 }}>
                  <div className='gradebook-flex-header-item' style={{ width: '135px', paddingLeft: 10, backgroundColor: 'transparent' }} />
                  {[1,2,3,4,5,6,7,8,9,10,11,12].map((item) => {
                    return (
                      <div key={item} className='gradebook-flex-header-item quiz-flex-item' style={{ backgroundColor: 'transparent' }} />
                    )
                  })}
                  <div className='gradebook-flex-header-item' style={{ backgroundColor: 'transparent' }} />
                </div>
              )
            })}
          </div>
        )}
        {true && (
          <div className='gradebook-container'>
            <img alt='' className='gradebook-empty-image' src={EmptyGradebook} />
            <div className='gradebook-empty-header'>
              No Grades To Display
            </div>
            <div className='gradebook-empty-text'>
              {this.state.selectedClass === '' ?
                'Please select a classroom in order to see the grades of your students.'
                :
                'There are no grades collected from your students. Please assign a course and assessment to students to start collecting grades.'
              }
            </div>
          </div>
        )}
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

export default connect(mapStateToProps)(YourGrades);
