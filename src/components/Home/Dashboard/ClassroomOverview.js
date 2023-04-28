import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import '../../../styles/Home/Dashboard.css';
import Pie from '../../Admin/Pie';

class ClassroomOverview extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }

  // Calculates The Percentage Of Students In The Given Classroom That Used Rapunzl In The Past Month By Looping Through StudentList
  _handleActiveThisMonthPercent() {
    let totalActive = 0;
    let localTime = new Date().toLocaleString("en-US", {timeZone: "America/Chicago"});
    let todayMoment = moment(localTime);
    for (var i in this.props.classroom.studentList) {
      let studentActiveMoment = moment(this.props.classroom.studentList[i].lastUpdated);
      let difference = todayMoment.diff(studentActiveMoment, 'days');
      if (difference < 31) {
        totalActive = totalActive + 1;
      }
    }
    return (totalActive / this.props.classroom.studentList.length) * 100;
  }

  // Calculates The Percentage Of Students In The Given Classroom That Have Placed Their First Trade On Rapunzl
  _handleFirstTradePercent() {
    let totalPlacedFirstTrade = 0;
    for (var i in this.props.classroom.studentList) {
      if (this.props.classroom.studentList[i].numberOfStockTrades + this.props.classroom.studentList[i].numberOfCryptoTrades > 0) {
        totalPlacedFirstTrade = totalPlacedFirstTrade + 1;
      }
    }
    return (totalPlacedFirstTrade / this.props.classroom.studentList.length) * 100;
  }

  // Calculates The Percentage Of Students In The Given Classroom That Have More Than 4 Positions In Their Stock Or Crypto Portfolios
  _handleFourPositionsPercent() {
    let totalFourPositions = 0;
    for (var i in this.props.classroom.studentList) {
      if (this.props.classroom.studentList[i].numberOfStockPositions + this.props.classroom.studentList[i].numberOfCryptoPositions > 3) {
        totalFourPositions = totalFourPositions + 1;
      }
    }
    return (totalFourPositions / this.props.classroom.studentList.length) * 100;
  }

  // Calculates The Percentage Of Students In The Given Classroom That Have Entered A Crypto Or Stock Competition
  _handleCompetitionPercent() {
    let totalEnteredCompetition = 0;
    for (var i in this.props.classroom.studentList) {
      if (this.props.classroom.studentList[i].cryptoCompetitionsEntered.length + this.props.classroom.studentList[i].stockCompetitionsEntered.length > 0) {
        totalEnteredCompetition = totalEnteredCompetition + 1;
      }
    }
    return (totalEnteredCompetition / this.props.classroom.studentList.length) * 100;
  }

  render() {
    return (
      <div className='tile classroom-overview' style={{ paddingBottom: 45 }}>
        <div className='classroom-header-flex' style={{ paddingTop: 25, paddingLeft: 12, paddingBottom: 15 }}>
          <QueryStatsIcon />
          <div className='classroom-title' style={{ paddingLeft: 10 }}>
            Class Analytics
          </div>
        </div>
        <div className='overview-flex' style={{ paddingBottom: 0, marginTop: -10 }}>
          <div className='overview-flex-item'>
            <Pie
              color={'#007154'}
              pct={this._handleActiveThisMonthPercent()}
            />
            <div className='overview-flex-title'>
              Students Used<br/>Rapunzl This Month
            </div>
          </div>
          <div className='overview-flex-item'>
            <Pie
              color={'#007154'}
              pct={this._handleFirstTradePercent()}
            />
            <div className='overview-flex-title'>
              Students Placed<br/>Their First Trade
            </div>
          </div>
          <div className='overview-flex-item'>
            <Pie
              color={'#007154'}
              pct={this._handleFourPositionsPercent()}
            />
            <div className='overview-flex-title'>
              Students Have<br/>4+ Positions
            </div>
          </div>
          <div className='overview-flex-item'>
            <Pie
              color={'#007154'}
              pct={this._handleCompetitionPercent()}
            />
            <div className='overview-flex-title'>
              Students Entered<br/>1st Competition
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
    // Handles Which Asset Class User Currently Has Selected (Equities or Crypto)
    asset: state.gamesettings.asset,
  };
};

export default connect(mapStateToProps)(ClassroomOverview);
