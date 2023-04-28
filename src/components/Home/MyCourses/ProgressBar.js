import React, { Component } from 'react';
import { connect } from 'react-redux';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

class ProgressBar extends Component {
  render() {
    return (
      <div style={{ marginTop: -13 }}>
        <div className='course-progress-bar-flex' style={{ justifyContent: 'space-between', marginBottom: 10 }}>
          <div onClick={this.props.backSection} style={{ display: 'flex', alignItems: 'center', width: 100 }}>
            <KeyboardArrowLeftIcon
              style={{ paddingTop: 6 }}
            />
            <div className='course-progress-bar-button'>
              Previous<br/>Module
            </div>
          </div>
          <div className='current-course-progress-title'>
            Section {this.props.currentSection} Of {this.props.numberOfModules}
          </div>
          <div onClick={() => this.props.nextSection(this.props.numberOfModules)} style={{ display: 'flex', alignItems: 'center', width: 100, justifyContent: 'flex-end' }}>
            <div className='course-progress-bar-button' style={{ textAlign: 'right' }}>
              Next<br/>Module
            </div>
            <KeyboardArrowRightIcon
              style={{ paddingTop: 6 }}
            />
          </div>
        </div>
        {this.props.numberOfModules === 1 && (
          <div className='course-progress-bar' style={{ width: '95%' }} />
        )}
        {this.props.numberOfModules === 2 && (
          <div className='course-progress-bar-flex'>
            <div className='course-progress-bar' style={{ width: '48%', borderTopRightRadius: 0, borderBottomRightRadius: 0 }} />
            <div className='course-progress-bar' style={{ width: '48%', borderTopLeftRadius: 0, borderBottomLeftRadius: 0, backgroundColor: this.props.currentSection > 1 ? '#11bc91' : '#36534c' }} />
          </div>
        )}
        {this.props.numberOfModules === 3 && (
          <div className='course-progress-bar-flex'>
            <div className='course-progress-bar' style={{ width: '32%', borderTopRightRadius: 0, borderBottomRightRadius: 0 }} />
            <div className='course-progress-bar' style={{ width: '32%', borderRadius: 0, backgroundColor: this.props.currentSection > 1 ? '#11bc91' : '#36534c' }} />
            <div className='course-progress-bar' style={{ width: '32%', borderTopLeftRadius: 0, borderBottomLeftRadius: 0, backgroundColor: this.props.currentSection > 2 ? '#11bc91' : '#36534c' }} />
          </div>
        )}
        {this.props.numberOfModules === 4 && (
          <div className='course-progress-bar-flex'>
            <div className='course-progress-bar' style={{ width: '23%', borderTopRightRadius: 0, borderBottomRightRadius: 0 }} />
            <div className='course-progress-bar' style={{ width: '23%', borderRadius: 0, backgroundColor: this.props.currentSection > 1 ? '#11bc91' : '#36534c' }} />
            <div className='course-progress-bar' style={{ width: '23%', borderRadius: 0, backgroundColor: this.props.currentSection > 2 ? '#11bc91' : '#36534c' }} />
            <div className='course-progress-bar' style={{ width: '23%', borderTopLeftRadius: 0, borderBottomLeftRadius: 0, backgroundColor: this.props.currentSection > 3 ? '#11bc91' : '#36534c' }} />
          </div>
        )}
        {this.props.numberOfModules === 5 && (
          <div className='course-progress-bar-flex'>
            <div className='course-progress-bar' style={{ width: '18%', borderTopRightRadius: 0, borderBottomRightRadius: 0 }} />
            <div className='course-progress-bar' style={{ width: '18%', borderRadius: 0, backgroundColor: this.props.currentSection > 1 ? '#11bc91' : '#36534c' }} />
            <div className='course-progress-bar' style={{ width: '18%', borderRadius: 0, backgroundColor: this.props.currentSection > 2 ? '#11bc91' : '#36534c' }} />
            <div className='course-progress-bar' style={{ width: '18%', borderRadius: 0, backgroundColor: this.props.currentSection > 3 ? '#11bc91' : '#36534c' }} />
            <div className='course-progress-bar' style={{ width: '18%', borderTopLeftRadius: 0, borderBottomLeftRadius: 0, backgroundColor: this.props.currentSection > 4 ? '#11bc91' : '#36534c' }} />
          </div>
        )}
        {this.props.numberOfModules === 6 && (
          <div className='course-progress-bar-flex'>
            <div className='course-progress-bar' style={{ width: '14%', borderTopRightRadius: 0, borderBottomRightRadius: 0 }} />
            <div className='course-progress-bar' style={{ width: '14%', borderRadius: 0, backgroundColor: this.props.currentSection > 1 ? '#11bc91' : '#36534c' }} />
            <div className='course-progress-bar' style={{ width: '14%', borderRadius: 0, backgroundColor: this.props.currentSection > 2 ? '#11bc91' : '#36534c' }} />
            <div className='course-progress-bar' style={{ width: '14%', borderRadius: 0, backgroundColor: this.props.currentSection > 3 ? '#11bc91' : '#36534c' }} />
            <div className='course-progress-bar' style={{ width: '14%', borderRadius: 0, backgroundColor: this.props.currentSection > 4 ? '#11bc91' : '#36534c' }} />
            <div className='course-progress-bar' style={{ width: '14%', borderTopLeftRadius: 0, borderBottomLeftRadius: 0, backgroundColor: this.props.currentSection > 5 ? '#11bc91' : '#36534c' }} />
          </div>
        )}
        {this.props.numberOfModules === 7 && (
          <div className='course-progress-bar-flex'>
            <div className='course-progress-bar' style={{ width: '13.2%', borderTopRightRadius: 0, borderBottomRightRadius: 0 }} />
            <div className='course-progress-bar' style={{ width: '13.2%', borderRadius: 0, backgroundColor: this.props.currentSection > 1 ? '#11bc91' : '#36534c' }} />
            <div className='course-progress-bar' style={{ width: '13.2%', borderRadius: 0, backgroundColor: this.props.currentSection > 2 ? '#11bc91' : '#36534c' }} />
            <div className='course-progress-bar' style={{ width: '13.2%', borderRadius: 0, backgroundColor: this.props.currentSection > 3 ? '#11bc91' : '#36534c' }} />
            <div className='course-progress-bar' style={{ width: '13.2%', borderRadius: 0, backgroundColor: this.props.currentSection > 4 ? '#11bc91' : '#36534c' }} />
            <div className='course-progress-bar' style={{ width: '13.2%', borderRadius: 0, backgroundColor: this.props.currentSection > 5 ? '#11bc91' : '#36534c' }} />
            <div className='course-progress-bar' style={{ width: '13.2%', borderTopLeftRadius: 0, borderBottomLeftRadius: 0, backgroundColor: this.props.currentSection > 6 ? '#11bc91' : '#36534c' }} />
          </div>
        )}
        {this.props.numberOfModules === 8 && (
          <div className='course-progress-bar-flex'>
            <div className='course-progress-bar' style={{ width: '12.3%', borderTopRightRadius: 0, borderBottomRightRadius: 0 }} />
            <div className='course-progress-bar' style={{ width: '12.3%', borderRadius: 0, backgroundColor: this.props.currentSection > 1 ? '#11bc91' : '#36534c' }} />
            <div className='course-progress-bar' style={{ width: '12.3%', borderRadius: 0, backgroundColor: this.props.currentSection > 2 ? '#11bc91' : '#36534c' }} />
            <div className='course-progress-bar' style={{ width: '12.3%', borderRadius: 0, backgroundColor: this.props.currentSection > 3 ? '#11bc91' : '#36534c' }} />
            <div className='course-progress-bar' style={{ width: '12.3%', borderRadius: 0, backgroundColor: this.props.currentSection > 4 ? '#11bc91' : '#36534c' }} />
            <div className='course-progress-bar' style={{ width: '12.3%', borderRadius: 0, backgroundColor: this.props.currentSection > 5 ? '#11bc91' : '#36534c' }} />
            <div className='course-progress-bar' style={{ width: '12.3%', borderRadius: 0, backgroundColor: this.props.currentSection > 6 ? '#11bc91' : '#36534c' }} />
            <div className='course-progress-bar' style={{ width: '12.3%', borderTopLeftRadius: 0, borderBottomLeftRadius: 0, backgroundColor: this.props.currentSection > 7 ? '#11bc91' : '#36534c' }} />
          </div>
        )}
        {this.props.numberOfModules === 9 && (
          <div className='course-progress-bar-flex'>
            <div className='course-progress-bar' style={{ width: '11.3%', borderTopRightRadius: 0, borderBottomRightRadius: 0 }} />
            <div className='course-progress-bar' style={{ width: '11.3%', borderRadius: 0, backgroundColor: this.props.currentSection > 1 ? '#11bc91' : '#36534c' }} />
            <div className='course-progress-bar' style={{ width: '11.3%', borderRadius: 0, backgroundColor: this.props.currentSection > 2 ? '#11bc91' : '#36534c' }} />
            <div className='course-progress-bar' style={{ width: '11.3%', borderRadius: 0, backgroundColor: this.props.currentSection > 3 ? '#11bc91' : '#36534c' }} />
            <div className='course-progress-bar' style={{ width: '11.3%', borderRadius: 0, backgroundColor: this.props.currentSection > 4 ? '#11bc91' : '#36534c' }} />
            <div className='course-progress-bar' style={{ width: '11.3%', borderRadius: 0, backgroundColor: this.props.currentSection > 5 ? '#11bc91' : '#36534c' }} />
            <div className='course-progress-bar' style={{ width: '11.3%', borderRadius: 0, backgroundColor: this.props.currentSection > 6 ? '#11bc91' : '#36534c' }} />
            <div className='course-progress-bar' style={{ width: '11.3%', borderRadius: 0, backgroundColor: this.props.currentSection > 7 ? '#11bc91' : '#36534c' }} />
            <div className='course-progress-bar' style={{ width: '11.3%', borderTopLeftRadius: 0, borderBottomLeftRadius: 0, backgroundColor: this.props.currentSection > 8 ? '#11bc91' : '#36534c' }} />
          </div>
        )}
        {this.props.numberOfModules === 10 && (
          <div className='course-progress-bar-flex'>
            <div className='course-progress-bar' style={{ width: '9.8%', borderTopRightRadius: 0, borderBottomRightRadius: 0 }} />
            <div className='course-progress-bar' style={{ width: '9.8%', borderRadius: 0, backgroundColor: this.props.currentSection > 1 ? '#11bc91' : '#36534c' }} />
            <div className='course-progress-bar' style={{ width: '9.8%', borderRadius: 0, backgroundColor: this.props.currentSection > 2 ? '#11bc91' : '#36534c' }} />
            <div className='course-progress-bar' style={{ width: '9.8%', borderRadius: 0, backgroundColor: this.props.currentSection > 3 ? '#11bc91' : '#36534c' }} />
            <div className='course-progress-bar' style={{ width: '9.8%', borderRadius: 0, backgroundColor: this.props.currentSection > 4 ? '#11bc91' : '#36534c' }} />
            <div className='course-progress-bar' style={{ width: '9.8%', borderRadius: 0, backgroundColor: this.props.currentSection > 5 ? '#11bc91' : '#36534c' }} />
            <div className='course-progress-bar' style={{ width: '9.8%', borderRadius: 0, backgroundColor: this.props.currentSection > 6 ? '#11bc91' : '#36534c' }} />
            <div className='course-progress-bar' style={{ width: '9.8%', borderRadius: 0, backgroundColor: this.props.currentSection > 7 ? '#11bc91' : '#36534c' }} />
            <div className='course-progress-bar' style={{ width: '9.8%', borderRadius: 0, backgroundColor: this.props.currentSection > 8 ? '#11bc91' : '#36534c' }} />
            <div className='course-progress-bar' style={{ width: '9.8%', borderTopLeftRadius: 0, borderBottomLeftRadius: 0, backgroundColor: this.props.currentSection > 9 ? '#11bc91' : '#36534c' }} />
          </div>
        )}
        {this.props.numberOfModules === 11 && (
          <div className='course-progress-bar-flex'>
            <div className='course-progress-bar' style={{ width: '8.3%', borderTopRightRadius: 0, borderBottomRightRadius: 0 }} />
            <div className='course-progress-bar' style={{ width: '8.3%', borderRadius: 0, backgroundColor: this.props.currentSection > 1 ? '#11bc91' : '#36534c' }} />
            <div className='course-progress-bar' style={{ width: '8.3%', borderRadius: 0, backgroundColor: this.props.currentSection > 2 ? '#11bc91' : '#36534c' }} />
            <div className='course-progress-bar' style={{ width: '8.3%', borderRadius: 0, backgroundColor: this.props.currentSection > 3 ? '#11bc91' : '#36534c' }} />
            <div className='course-progress-bar' style={{ width: '8.3%', borderRadius: 0, backgroundColor: this.props.currentSection > 4 ? '#11bc91' : '#36534c' }} />
            <div className='course-progress-bar' style={{ width: '8.3%', borderRadius: 0, backgroundColor: this.props.currentSection > 5 ? '#11bc91' : '#36534c' }} />
            <div className='course-progress-bar' style={{ width: '8.3%', borderRadius: 0, backgroundColor: this.props.currentSection > 6 ? '#11bc91' : '#36534c' }} />
            <div className='course-progress-bar' style={{ width: '8.3%', borderRadius: 0, backgroundColor: this.props.currentSection > 7 ? '#11bc91' : '#36534c' }} />
            <div className='course-progress-bar' style={{ width: '8.3%', borderRadius: 0, backgroundColor: this.props.currentSection > 8 ? '#11bc91' : '#36534c' }} />
            <div className='course-progress-bar' style={{ width: '8.3%', borderRadius: 0, backgroundColor: this.props.currentSection > 9 ? '#11bc91' : '#36534c' }} />
            <div className='course-progress-bar' style={{ width: '8.3%', borderTopLeftRadius: 0, borderBottomLeftRadius: 0, backgroundColor: this.props.currentSection > 10 ? '#11bc91' : '#36534c' }} />
          </div>
        )}
        {this.props.numberOfModules === 12 && (
          <div className='course-progress-bar-flex'>
            <div className='course-progress-bar' style={{ width: '7.25%', borderTopRightRadius: 0, borderBottomRightRadius: 0 }} />
            <div className='course-progress-bar' style={{ width: '7.25%', borderRadius: 0, backgroundColor: this.props.currentSection > 1 ? '#11bc91' : '#36534c' }} />
            <div className='course-progress-bar' style={{ width: '7.25%', borderRadius: 0, backgroundColor: this.props.currentSection > 2 ? '#11bc91' : '#36534c' }} />
            <div className='course-progress-bar' style={{ width: '7.25%', borderRadius: 0, backgroundColor: this.props.currentSection > 3 ? '#11bc91' : '#36534c' }} />
            <div className='course-progress-bar' style={{ width: '7.25%', borderRadius: 0, backgroundColor: this.props.currentSection > 4 ? '#11bc91' : '#36534c' }} />
            <div className='course-progress-bar' style={{ width: '7.25%', borderRadius: 0, backgroundColor: this.props.currentSection > 5 ? '#11bc91' : '#36534c' }} />
            <div className='course-progress-bar' style={{ width: '7.25%', borderRadius: 0, backgroundColor: this.props.currentSection > 6 ? '#11bc91' : '#36534c' }} />
            <div className='course-progress-bar' style={{ width: '7.25%', borderRadius: 0, backgroundColor: this.props.currentSection > 7 ? '#11bc91' : '#36534c' }} />
            <div className='course-progress-bar' style={{ width: '7.25%', borderRadius: 0, backgroundColor: this.props.currentSection > 8 ? '#11bc91' : '#36534c' }} />
            <div className='course-progress-bar' style={{ width: '7.25%', borderRadius: 0, backgroundColor: this.props.currentSection > 9 ? '#11bc91' : '#36534c' }} />
            <div className='course-progress-bar' style={{ width: '7.25%', borderRadius: 0, backgroundColor: this.props.currentSection > 10 ? '#11bc91' : '#36534c' }} />
            <div className='course-progress-bar' style={{ width: '7.25%', borderTopLeftRadius: 0, borderBottomLeftRadius: 0, backgroundColor: this.props.currentSection > 11 ? '#11bc91' : '#36534c' }} />
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
    // Handles Which Asset Class User Currently Has Selected (Equities or Crypto)
    asset: state.gamesettings.asset,
  };
};

export default connect(mapStateToProps)(ProgressBar);
