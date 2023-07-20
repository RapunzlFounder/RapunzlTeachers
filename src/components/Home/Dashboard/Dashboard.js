import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../../styles/Home/Dashboard.css';
import GettingStartedTips from './GettingStartedTips';
import RecommendedArticles from './RecommendedArticles';

class Dashboard extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.visible) {
      return(
        <div className='middle-container'>
          <GettingStartedTips />
          <RecommendedArticles />
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
    // Handles Which Asset Class User Currently Has Selected (Equities or Crypto)
    asset: state.gamesettings.asset,
  };
};

export default connect(mapStateToProps)(Dashboard);
