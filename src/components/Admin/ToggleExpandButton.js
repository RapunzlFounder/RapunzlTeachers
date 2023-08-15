import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateDashboard } from '../../ActionTypes/dashboardActions';
import '../../styles/Home/Resources.css';
import OpenWithIcon from '@mui/icons-material/OpenWith';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';

class ToggleExpandButton extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  _expandLibrary() {
    this.props.updateDashboard('expandedLibrary', true);
  }

  _shrinkLibrary() {
    this.props.updateDashboard('expandedLibrary', false);
  }

  render() {
    if (this.props.expandedLibrary) {
      return (
        <div title="Return To Normal View" onClick={() => this._shrinkLibrary()} className={'expand-resource-container expand-resource-container-shrink'}>
          <CloseFullscreenIcon className='expand-resource-icon expand-resource-icon-shrink' />
          <div className='expand-resource-text expand-resource-text-shrink'>
            Shrink View
          </div>
        </div>
      )
    } else {
      return (
        <div title="Expand & Hide Side Menus" onClick={() => this._expandLibrary()} className='expand-resource-container'>
          <OpenWithIcon className='expand-resource-icon' />
          <div className='expand-resource-text'>
            Expand View
          </div>
        </div>
      );
    }
  }
}

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    expandedLibrary: state.dashboard.expandedLibrary
  };
};

// Map Dispatch To Props (Dispatch Actions to Reducers. Reducers then modify the redux store state.
const mapDispatchToProps = (dispatch) => {
  // Action
    return {
      updateDashboard: (name, status) => dispatch(updateDashboard(name, status)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(ToggleExpandButton);
