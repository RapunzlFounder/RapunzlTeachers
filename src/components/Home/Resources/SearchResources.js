import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SearchPortalAssets } from '../../../ActionTypes/searchActions';
import { getAllPublicModules } from '../../../selectors/coursemoduleSelectors';
import { updateDashboard } from '../../../ActionTypes/dashboardActions';
import ResourceItem from './ResourceItem';
import '../../../styles/Home/Resources.css';
import SearchBeginIcon from '../../../assets/images/Search/SearchBegin.png';
import SearchEmptyIcon from '../../../assets/images/Search/SearchEmpty.png';
import { CircularProgress } from '@mui/material';

class SearchResources extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    if (this.props.visible) {
      return (
        <div>
          {this.props.searchData && this.props.searchData.length !== 0 && (
            <div className='search-results'>
              {this.state.searchData.map((item) => {
                return (
                  <ResourceItem item={item} />
                );
              })}
            </div>
          )}
          {this.props.searchData && this.props.searchData.length === 0 && !this.props.loading && this.props.searchText.length === 0 && (
            <div className='search-empty'>
              <img className='search-empty-icon' alt='' src={SearchBeginIcon} />
              <div className='search-empty-text'>
                Discover Activities, Articles & Teacher Tools For Any Finance Topic
              </div>
            </div>
          )}
          {this.props.searchData && this.props.searchData.length === 0 && this.props.loading && (
            <div className='search-loading-container'>
              <CircularProgress className='search-loading-icon'/>
              <div className='search-loading-text'>
                Searching<br/>Library...
              </div>
            </div>
          )}
          {this.props.searchData && this.props.searchData.length === 0 && !this.props.loading && this.props.searchText.length > 1 && (
            <div className='search-empty' style={{ paddingBottom: 35 }}>
              <img className='search-empty-icon' alt='' src={SearchEmptyIcon} />
              <div className='search-empty-text'>
                We could not find anything that matches your search...
              </div>
            </div>
          )}
          {(this.props.searchData === undefined || this.props.searchData.length === undefined) && !this.props.loading && (
            <div className='search-empty' style={{ paddingBottom: 35 }}>
              <img className='search-empty-icon' alt='' src={SearchEmptyIcon} />
              <div className='search-empty-text'>
                We encountered an error attempting to access our resource library. Please contact support.
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
    // Required For Dispatch Below To Search Resource Library
    jwtToken: state.userDetails.jwtToken,
    publicModules: getAllPublicModules(state),
    expandedLibrary: state.dashboard.expandedLibrary
  };
};

// Map Dispatch To Props (Dispatch Actions to Reducers. Reducers then modify the redux store state.
const mapDispatchToProps = (dispatch) => {
  // Action
    return {
      // function to dispatch redux actions to get response from graphql query searchPortalAssets
      // Input parameter 'searchKeyword' is set to True to search for portal assets based on a keyword search
      // Input parameter 'searchStandard' is set to True to search for portal assets based on a Financial literacy standard search
      // NOTE: both of these search types cannot be set to 'true' at the same time!!
      search: (token, searchKeyword, searchStandard, searchText) => dispatch(SearchPortalAssets(token, searchKeyword, searchStandard, searchText)),
      updateDashboard: (name, status) => dispatch(updateDashboard(name, status)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResources);
