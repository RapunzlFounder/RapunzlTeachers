import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SearchPortalAssets } from '../../../ActionTypes/searchActions';
import { getAllPublicModules } from '../../../selectors/coursemoduleSelectors';
import { updateDashboard } from '../../../ActionTypes/dashboardActions';
import ResourceItem from './ResourceItem';
import '../../../styles/Home/Resources.css';
import SearchBeginIcon from '../../../assets/images/Search/SearchBegin.png';
import SearchEmptyIcon from '../../../assets/images/Search/SearchEmpty.png';
import TypeButton from './TypeButton';
import ModuleButton from './ModuleButton';
import OpenWithIcon from '@mui/icons-material/OpenWith';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import { CircularProgress } from '@mui/material';
import SearchResources from './SearchResources';

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

  _getActivities() {
    let activitiesArray = [];
    for (var i in this.props.publicModules) {
      for (var j in this.props.publicModules[i].activities) {
        activitiesArray.push(this.props.publicModules[i].activities[j]);
      }
    }
    return activitiesArray;
  }

  _getArticles() {
    let articleArray = [];
    for (var i in this.props.publicModules) {
      for (var j in this.props.publicModules[i].articles) {
        articleArray.push(this.props.publicModules[i].articles[j]);
      }
    }
    return articleArray;
  }

  _expandLibrary() {
    this.props.updateDashboard('expandedLibrary', true);
  }

  _shrinkLibrary() {
    this.props.updateDashboard('expandedLibrary', false);
  }

  render() {
    if (this.props.visible) {
      return (
        <div className='middle-container'>
          <div className='tile search-library-container'>
            {!this.props.expandedLibrary && (
              <div onClick={() => this._expandLibrary()} className='expand-resource-container'>
                <OpenWithIcon className='expand-resource-icon' />
                <div className='expand-resource-text'>
                  Expand View
                </div>
              </div>
            )}
            {this.props.expandedLibrary && (
              <div onClick={() => this._shrinkLibrary()} className='expand-resource-container'>
                <CloseFullscreenIcon className='expand-resource-icon' />
                <div className='expand-resource-text'>
                  Shrink View
                </div>
              </div>
            )}
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
            <SearchResources
              visible={false}
              loading={this.state.loading}
              searchData={this.state.searchData}
              searchText={this.state.searchText}
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(ResourceLibrary);
