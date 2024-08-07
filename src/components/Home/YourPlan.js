import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setMenuTab } from '../../ActionTypes/dashboardActions';
import DiamondIcon from '@mui/icons-material/Diamond';
import NoUpgradeGraphic from '../../assets/images/Admin/NoUpgradeAvailable.png';
import '../../styles/Home/HomeScreen.css';

class YourPlan extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
    this.state = {
      upgradeVisible: false
    }
  }

  // TODO: PRODUCTS 
  // Update Pricing placeholder to show current product tier 
  // and features aligned with demo tiers
  
  render() {
    if (this.props.visible) {
      return (
        <div className='tile support-tile'>
          <div onClick={() => this.props.setMenuTab(this.props.previousTab)} className='support-go-back'>
            Go Back
          </div>
          {this.state.upgradeVisible && (
            <div className='classroom-header-flex' style={{ paddingTop: 25, paddingLeft: 12, paddingBottom: 5 }}>
              <DiamondIcon />
              <div className='classroom-title' style={{ paddingTop: 20, paddingBottom: 15 }}>
                Upgrade Your Rapunzl Plan
              </div>
            </div>
          )}
          {!this.state.upgradeVisible && (
            <div className='upgrade-plan-container'>
              <img className='upgrade-plan-image' alt='' src={NoUpgradeGraphic} />
              <div className='upgrade-plan-title'>
                There's Nothing To Update<br/>At This Time.
              </div>
              <div className='upgrade-plan-text'>
                Thank you for being an early user of Rapunzl's Teacher Portal. Please continue to provide us with feedback and we'll continue to improve our financial literacy portal for your classroom.
              </div>
            </div>
          )}
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
    previousTab: state.dashboard.previousTab,
  };
};

// Map Dispatch To Props (Dispatch Actions to Reducers. Reducers then modify the redux store state.
const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    // Handles sending message to Database to email to support email address
    setMenuTab: (tab) => dispatch(setMenuTab(tab)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(YourPlan);
