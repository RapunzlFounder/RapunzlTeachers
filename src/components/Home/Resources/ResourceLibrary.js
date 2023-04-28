import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SearchPortalAssets } from '../../../ActionTypes/searchActions';
import ResourceItem from './ResourceItem';
import '../../../styles/Home/Resources.css';
import SearchBeginIcon from '../../../assets/images/Search/SearchBegin.png';
import SearchEmptyIcon from '../../../assets/images/Search/SearchEmpty.png';
import TypeButton from './TypeButton';
import ModuleButton from './ModuleButton';
import { CircularProgress } from '@mui/material';

class ResourceLibrary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      // State Variables For TypeButton To Select Which Types Of Assets We Would Like To Search
      // Defaults All To False, Which Will Search All Asset Types, But This Lets The User Filter Pre-Search
      activitiesSelected: false,
      articlesSelected: false,
      assessmentsSelected: false,
      presentationsSelected: false,
      guidesSelected: false,
      // State Variable For Module Button Which Provides An Array Of Selected Modules
      // Defaults To Empty Array So That We Search All Modules
      moduleSearchArray: [],
      searchData: [],
      // Search Parameters Required For GraphQL Dispatch To Search Either Keyword Or Standard. Both Cannot Be True.
      // Searching Resources On This Screen Will Only Allow Keyword Search. Standard Search Is 1-1 Lookup In Gradebook & Classroom
      // To Provide Suggested Activities & Articles That Are Related To A Specific Learning Objective
      searchKeyword: true,
      searchStandard: false,
      loading: false,
    }
  }

  // Handles Resetting Search State To Initial When ResourceLibrary Is Toggled And Not Visible To User
  componentDidUpdate(prevProps) {
    if (this.props.visible !== prevProps.visible) {
      this.setState({
        searchText: '',
        searching: false,
        activitiesSelected: false,
        articlesSelected: false,
        assessmentsSelected: false,
        presentationsSelected: false,
        guidesSelected: false,
        moduleSearchArray: [],
        searchData: []
      });
    }
  }

  // Updates Search Text State When User Is Typing Search Bar & Searches To Display Results Responsivley
  changeSearchText(text) {
    this.setState({ searchText: text });
    // Only Searches If Text Length Is Greater Than 1 To Avoid Unnecessary Hits To The Server
    if (text.length > 1) {
      this.setState({ loading: true, searchData: [] });
      // Handles Dispatch To GraphQL To Search Resources
      this.props.search(this.props.jwtToken, this.state.searchKeyword, this.state.searchStandard, text).then((res) => {
        // Handles If There Is An Error With The Dispatch By Displaying Alert
        if (!(res && !('errors' in res))) {
          this.setState({
            alertVisible: true,
            alertTitle: 'Unable To Process Search',
            alertMessage: 'Something went wrong trying to process your search. ' + res.errors[0].message + 'Please contact support if the problem continues.',
            loading: false,
          });
        }
        // Otherwise Updates Result State To Display To The User
        else {
          this.setState({
            loading: false,
            searchData: res,
          });
        }
      })
    }
    // If Text Length Is 1 We Act As If Search Has Started And Set Loading To True
    else if (text.length === 1) {
      this.setState({ loading: true, searchData: [] });
    }
    // Otherwise, Text Length Is 0 So We Reset State
    else {
      this.setState({ searchText: text, searchData: [], loading: false });
    }
  }

  // Pass Through Arrow Functions For TypeButton To Update Which Types Of Assets We Are Searching
  selectActivities = () => { this.setState({ activitiesSelected: !this.state.activitiesSelected }) }
  selectArticles = () => { this.setState({ articlesSelected: !this.state.articlesSelected }) }
  selectAssessments = () => { this.setState({ assessmentsSelected: !this.state.assessmentsSelected }) }
  selectPresentations = () => { this.setState({ presentationsSelected: !this.state.presentationsSelected }) }
  selectGuides = () => { this.setState({ guidesSelected: !this.state.guidesSelected }) }

  // Pass Through Arrow Function For ModuleButton To Update moduleSearchArray To Include Module Number
  selectModule = (int) => {
    let selectedIndex = this.state.moduleSearchArray.indexOf(int);
    let newArray = this.state.moduleSearchArray;
    // Checks If Module Has Been Selected, In Which Case, We Remove It From Selected Module Array
    if (selectedIndex > -1) {
      newArray = this.state.moduleSearchArray.filter(function(item) {
        return item !== int;
      });
    } else {
      const updatedValue = [int];
      newArray = newArray.concat(updatedValue);
    }
    // If Module Has Not Been Selected, We Add The Module To The Search Array
    this.setState({ moduleSearchArray: newArray });
  }

  render() {
    if (this.props.visible) {
      return (
        <div className='middle-container'>
          <div className='tile search-library-container'>
            <input
              className='search-bar'
              value={this.state.searchText}
              onChange={(event) => this.changeSearchText(event.target.value)}
              placeholder='Discover By Module, Topic, Or Resource Type'
            />
            <div className='search-bar-options'>
              <TypeButton
                selectActivities={this.selectActivities}
                selectArticles={this.selectArticles}
                selectAssessments={this.selectAssessments}
                selectPresentations={this.selectPresentations}
                selectGuides={this.selectGuides}
                activitiesSelected={this.state.activitiesSelected}
                articlesSelected={this.state.articlesSelected}
                assessmentsSelected={this.state.assessmentsSelected}
                presentationsSelected={this.state.presentationsSelected}
                guidesSelected={this.state.guidesSelected}
              />
              <ModuleButton
                moduleSearchArray={this.state.moduleSearchArray}
                selectModule={this.selectModule}
              />
            </div>
            {this.state.searchData && this.state.searchData.length !== 0 && (
              <div className='search-results'>
                {this.state.searchData.map((item) => {
                  return (
                    <ResourceItem item={item} />
                  );
                })}
              </div>
            )}
            {this.state.searchData && this.state.searchData.length === 0 && !this.state.loading && this.state.searchText.length === 0 && (
              <div className='search-empty'>
                <img className='search-empty-icon' alt='' src={SearchBeginIcon} />
                <div className='search-empty-text'>
                  Discover Activities, Articles & Teacher Tools For Any Finance Topic
                </div>
              </div>
            )}
            {this.state.searchData && this.state.searchData.length === 0 && this.state.loading && (
              <div className='search-loading-container'>
                <CircularProgress className='search-loading-icon'/>
                <div className='search-loading-text'>
                  Searching<br/>Library...
                </div>
              </div>
            )}
            {this.state.searchData && this.state.searchData.length === 0 && !this.state.loading && this.state.searchText.length > 1 && (
              <div className='search-empty' style={{ paddingBottom: 35 }}>
                <img className='search-empty-icon' alt='' src={SearchEmptyIcon} />
                <div className='search-empty-text'>
                  We could not find anything that matches your search...
                </div>
              </div>
            )}
            {(this.state.searchData === undefined || this.state.searchData.length === undefined) && !this.state.loading && (
              <div className='search-empty' style={{ paddingBottom: 35 }}>
                <img className='search-empty-icon' alt='' src={SearchEmptyIcon} />
                <div className='search-empty-text'>
                  We encountered an error attempting to access our resource library. Please contact support.
                </div>
              </div>
            )}
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
    // Required For Dispatch Below To Search Resource Library
    jwtToken: state.userDetails.jwtToken
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
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResourceLibrary);
