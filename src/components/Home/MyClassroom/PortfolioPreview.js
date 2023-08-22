import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { FetchOtherUserDetails } from '../../../ActionTypes/socialActions';
import '../../../styles/Home/HomeScreen.css';
import ProfileIcon from '../../../assets/images/School/BlankProfile.png';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import { objectToArray } from '../../../helper_functions/utilities';
import EmptyPositions from '../../../assets/images/Search/SearchEmpty.png';
import CircularProgress from '@mui/material/CircularProgress';
import intHandler from '../../../helper_functions/intHelper';

class PortfolioPreview extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
    this.state = {
      portfolioSelected: 'stock',
      alertVisible: false,
      alertTitle: '',
      alertMessage: '',
      loading: true,
      error: false,
      userData: {
        stocks: [],
        crypto: []
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.visible !== this.props.visible && this.props.visible === true) {
      this._fetchUserDetails();
    }
  }

  // Handles Dispatch To Fetch Other User Details & Stores Result In State
  _fetchUserDetails() {
    this.setState({ loading: true, error: false });
    this.props.fetchOtherUserDetails(this.props.jwtToken, this.props.portfolioUsername).then((res) => {
      // Handles If There Is An Error With The Dispatch By Displaying Alert Modal & Setting Loading To False
      if (!(res && !('errors' in res))) {
        this.setState({
          alertVisible: true,
          alertTitle: 'Something Went Wrong...',
          alertMessage: 'We had an issue retrieving the portfolio information from our servers. ' + res.errors[0].message + ' Please try again in a few minutes or contact support.',
          loading: false,
          error: true,
        })
      }
      // Handles Successful Fetch By Updating State Values & Setting Loading To False
      else { 
        const stockPositions = objectToArray(res.stockPortfolios[Object.keys(res.stockPortfolios)].positions);
        const cryptoPositions = objectToArray(res.cryptoPortfolios[Object.keys(res.cryptoPortfolios)].positions);
        this.setState({
          loading: false,
          error: false,
          userData: {
            stocks: stockPositions,
            crypto: cryptoPositions,
          },
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

  // Get Portfolio Data Depending Upon Tab Selected
  _getPortfolioData() {
    if (this.state.portfolioSelected === 'stock') {
      return this.state.userData.stocks;
    } else {
      return this.state.userData.crypto;
    }
  }

  handleBackgroundColor(float) {
    if (float < 0) {
      return '#ed3232';
    } else {
      return '#007154';
    }
  }

  // Handles Finding The Time Difference From When The User Opened A Position Up Until Present
  // Start is Passed Through From item in map. End is a new moment instance created when function is called.
  getDiff(start, end) {
    try {
      const diffDuration = moment.duration(end.diff(start));
      const str = [];
      let plural = 's';
      if (diffDuration.months() > 0) {
        // eslint-disable-next-line
        if (diffDuration.months() == 1) {
          plural = '';
        }
        str.push(`${diffDuration.months()} month${plural}`);
      }

      if (diffDuration.days() > 0) {
        // eslint-disable-next-line
        if (diffDuration.days() == 1) {
          plural = '';
        }
        str.push(`${diffDuration.days()} day${plural}`);
      }
      if (diffDuration.hours() > 0) {
        // eslint-disable-next-line
        if (diffDuration.hours() == 1) {
          plural = '';
        }
        str.push(`${diffDuration.hours()} hour${plural}`);
      }
      if (diffDuration.minutes() > 0) {
        // eslint-disable-next-line
        if (diffDuration.minutes() == 1) {
          plural = '';
        }
        str.push(`${diffDuration.minutes()} minute${plural}`);
      }
      // eslint-disable-next-line
      if (str.length == 0) {
        return 'Less Than 1 Minute';
      }
      return str[0];
    } catch {
      return 'Less Than 1 Minute';
    }
  }

  render() {
    if (this.props.visible) {
      return (
        <div className='tile classroom-overview' style={{ minHeight: 700 }}>
          <div className='classroom-header-flex' style={{ paddingTop: 25, paddingLeft: 12, paddingBottom: 15 }}>
            <QueryStatsIcon />
            <div className='classroom-title' style={{ paddingLeft: 10 }}>
              View Portfolio
            </div>
          </div>
          <div onClick={() => this.props.dismissPortfolio()} className='manual-back' style={{ paddingLeft: 12, marginTop: -15, fontSize: 13, fontWeight: '500', width: 'fit-content' }}>
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
            <div title="View Student Stock Portfolio" onClick={() => this.selectPortfolioType('stock')} className={`view-portfolio-toggle-button toggle-button-left ${this.state.portfolioSelected === 'stock' ? 'toggle-button-selected' : ''}`}>
              Stock Portfolio
            </div>
            <div title="View Student Crypto Portfolio" onClick={() => this.selectPortfolioType('crypto')} className={`view-portfolio-toggle-button toggle-button-right ${this.state.portfolioSelected !== 'stock' ? 'toggle-button-selected' : ''}`}>
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
          {// Loading State
          this.state.loading && !this.state.error && (
            <div className='view-portfolio-positions-container'>
              <CircularProgress />
              <div className='portfolio-positions-loading-text'>
                Fetching Portfolio<br/>Positions...
              </div>
            </div>
          )}
          {// Error State
          !this.state.loading && this.state.error && (
            <div className='view-portfolio-positions-container' style={{ paddingTop: '45px', paddingBottom: '210px' }}>
              <img alt='' className='view-portfolio-positions-image' src={EmptyPositions} />
              <div className='portfolio-positions-h1'>
                We Experienced An Error...
              </div>
              <div className='portfolio-positions-text'>
                Something went wrong trying to retrieve your student's portfolio positions. Please try again and if the problem continues, please contact support.
              </div>
            </div>
          )}
          {// Empty Positions For Selected Portfolio
          ((this.state.userData.stocks.length === 0 && this.state.portfolioSelected === 'stock') || (this.state.userData.crypto.length === 0 && this.state.portfolioSelected === 'crypto')) && !this.state.loading && !this.state.error && (
            <div className='view-portfolio-positions-container' style={{ paddingTop: '45px', paddingBottom: '210px' }}>
              <img alt='' className='view-portfolio-positions-image' src={EmptyPositions} />
              <div className='portfolio-positions-h1'>
                No Positions To Display
              </div>
              <div className='portfolio-positions-text'>
                It does not seem like {this.props.portfolioName} has any current positions. They need to place a trade in order to add a position to their portfolio.
              </div>
            </div>
          )}
          {// When There Are Positions Present For Selected Portfolio
          ((this.state.userData.stocks.length !== 0 && this.state.portfolioSelected === 'stock') || (this.state.userData.crypto.length !== 0 && this.state.portfolioSelected === 'crypto')) && !this.state.loading && !this.state.error && (
            <div className='view-portfolio-position-flex'>
              {this._getPortfolioData().map((item) => {
                return (
                  <div key={item} className='view-portfolio-position' style={{ backgroundColor: this.handleBackgroundColor(item.profitLoss)}}>
                    <div className='portfolio-position-symbol'>
                      {item.symbol}
                    </div>
                    <div className='portfolio-position-name'>
                      {item.symbolName}
                    </div>
                    <div className='portfolio-position-performance'>
                      {intHandler(item.profitLoss / item.costBasis, 'percent', 2, true)}
                    </div>
                    <div className='portfolio-position-time'>
                      Purchased<br/>{this.getDiff(moment(item.openedAt), moment(new Date()))} Ago
                    </div>
                  </div>
                )
              })}
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
