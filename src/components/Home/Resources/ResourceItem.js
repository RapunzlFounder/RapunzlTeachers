import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../../styles/Home/Resources.css';

class ResourceItem extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div key={this.props.item.assetId}>
        <div className='library-result-flex-item'>
          <div className='library-result-title'>
            {this.props.item.assetName}
          </div>
          <div className='library-result-module'>
            Module {this.props.item.moduleId}
          </div>
          <div className='library-result-summary'>
            {this.props.item.assetDescription}
          </div>
          <div className='result-keywords'>
            <div className='keywords-item'>
              {this.props.item.assetType.toLowerCase()}
            </div>
          </div>
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

export default connect(mapStateToProps)(ResourceItem);
