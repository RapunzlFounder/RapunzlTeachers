import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FetchOtherUserDetails } from '../../../ActionTypes/socialActions';
import '../../../styles/Home/HomeScreen.css';
import ProfileIcon from '../../../assets/images/School/BlankProfile.png';
import QueryStatsIcon from '@mui/icons-material/QueryStats';

class PortfolioPreview extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
    this.state = {
      portfolioSelected: 'stock',
      alertVisible: false,
      alertTitle: '',
      alertMessage: ''
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.visible !== this.props.visible && this.props.visible === true) {
      // this._fetchUserDetails();
    }
  }

  // Handles Dispatch To Fetch Other User Details & Stores Result In State
  _fetchUserDetails() {
    this.setState({ loading: true });
    this.props.fetchOtherUserDetails(this.props.jwtToken, this.props.portfolioUsername).then((res) => {
      // Handles If There Is An Error With The Dispatch By Displaying Alert Modal & Setting Loading To False
      if (!(res && !('errors' in res))) {
        this.setState({
          alertVisible: true,
          alertTitle: 'Something Went Wrong...',
          alertMessage: 'We had an issue retrieving the portfolio information from our servers. ' + res.errors[0].message + ' Please try again in a few minutes or contact support.',
          loading: false,
        })
      }
      // Handles Successful Fetch By Updating State Values & Setting Loading To False
      else { 
        this.setState({
          loading: false,
          userData: res,
        })
      }
    })
  }

  // Allows User To Toggle Between Stock & Crypto When Viewing Another Users Portfolios
  selectPortfolioType(type) {
    this.setState({ portfolioSelected: type });
  }

  // Pass Through Arrow Function That Handles Dismissing The Alert Modal After An Error
  toggleAlert = () => {
    this.setState({ alertVisible: !this.state.alertVisible });
  }

  render() {
    if (this.props.visible) {
      return (
        <div className='tile classroom-overview'>
          <div className='classroom-header-flex' style={{ paddingTop: 25, paddingLeft: 12, paddingBottom: 15 }}>
            <QueryStatsIcon />
            <div className='classroom-title' style={{ paddingLeft: 10 }}>
              View Portfolio
            </div>
          </div>
          <div onClick={() => this.props.dismissPortfolio()} className='manual-back' style={{ paddingLeft: 12, marginTop: -15, fontSize: 13, fontWeight: '500' }}>
            Go Back
          </div>
          <div className='view-portfolio-header-flex'>
            <img alt='' className='view-portfolio-profile-image' src={ProfileIcon} />
            <div className='view-portfolio-text-container'>
              <div className='view-portfolio-name'>
                {this.props.portfolioName}
              </div>
              <div className='view-portfolio-username'>
                @{this.props.portfolioUsername}
              </div>
            </div>
          </div>
          <div className='view-portfolio-toggle-container'>
            <div onClick={() => this.selectPortfolioType('stock')} className={`view-portfolio-toggle-button toggle-button-left ${this.state.portfolioSelected === 'stock' ? 'toggle-button-selected' : ''}`}>
              Stock Portfolio
            </div>
            <div onClick={() => this.selectPortfolioType('crypto')} className={`view-portfolio-toggle-button toggle-button-right ${this.state.portfolioSelected !== 'stock' ? 'toggle-button-selected' : ''}`}>
              Crypto Portfolio
            </div>
          </div>
          <div className='view-portfolio-header'>
            <div className='view-portfolio-line' />
            <div className='view-portfolio-title'>
              Current Positions
            </div>
            <div className='view-portfolio-line' />
          </div>
          <div className='view-portfolio-position-flex'>
            {[0,1,2,3,4,5,6,7].map((item) => {
              return (
                <div key={item} className='view-portfolio-position'>
                  <div className='portfolio-position-symbol'>
                    AAPL
                  </div>
                  <div className='portfolio-position-name'>
                    Apple Inc.
                  </div>
                  <div className='portfolio-position-performance'>
                    +6.7%
                  </div>
                  <div className='portfolio-position-time'>
                    Purchased<br/>7 Weeks Ago
                  </div>
                </div>
              )
            })}
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
    // Token Required To Submit FetchOtherUserDetails Dispatch
    jwtToken: state.userDetails.jwtToken,
  };
};

// Map Dispatch To Props (Dispatch Actions to Reducers. Reducers then modify the redux store state.
const mapDispatchToProps = (dispatch) => {
  // Action
    return {
      // Dispatch To Fetch Portfolio Information For The Selected User. Result Is Not Stored In Redux.
      fetchOtherUserDetails: (token, userName) => dispatch(FetchOtherUserDetails(token, userName)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioPreview);
