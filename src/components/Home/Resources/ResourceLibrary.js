import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SearchPortalAssets } from '../../../ActionTypes/searchActions';
import { getAllPublicModules } from '../../../selectors/coursemoduleSelectors';
import { updateDashboard } from '../../../ActionTypes/dashboardActions';
import '../../../styles/Home/Resources.css';
import SearchResources from './SearchResources';
import ResourcesContainer from './ResourcesContainer';
import ModuleButton from './ModuleButton';
import Alert from '../../Admin/Alert';

class ResourceLibrary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertVisible: false,
      alertTitle: '',
      alertMessage: '',
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
      // Handles Toggle At Top Of Screen
      selectedView: 'modules',
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
        searchData: [],
        selectedView: 'modules'
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

  _expandLibrary() {
    this.props.updateDashboard('expandedLibrary', true);
  }

  _shrinkLibrary() {
    this.props.updateDashboard('expandedLibrary', false);
  }

  // Pass Through Arrow Function Which Toggles Visibility Of Alert Dialog
  toggleAlert = () => {
    this.setState({ alertVisible: !this.state.alertVisible });
  }

  searchComingSoon() {
    this.setState({
      alertVisible: true,
      alertTitle: 'Searching Coming Soon!',
      alertMessage: 'Our developers are hard at work to finalize our Educator Portal and ensure you have easy access to our full financial literacy curriculum.',
    });
  }


  render() {
    if (this.props.visible) {
      return (
        <div className='middle-container'>
          <Alert
            dismiss={this.toggleAlert}
            visible={this.state.alertVisible}
            title={this.state.alertTitle}
            message={this.state.alertMessage}
          />
          <div className='tile search-library-container'>
            <div className='resource-library-header'>
              <div onClick={() => this.setState({ selectedView: 'activities' })} className={`resource-menu-item ${this.state.selectedView === 'activities' ? ' resource-menu-item-selected' : ''}`}>
                Activities
              </div>
              <div onClick={() => this.setState({ selectedView: 'articles' })} className={`resource-menu-item ${this.state.selectedView === 'articles' ? ' resource-menu-item-selected' : ''}`}>
                Articles
              </div>
              <div onClick={() => this.setState({ selectedView: 'modules' })} className={`resource-menu-item ${this.state.selectedView === 'modules' ? ' resource-menu-item-selected' : ''}`}>
                Modules
              </div>
            </div>
            <div className='search-resources-flex-container'>
              <input
                className='search-bar'
                value={this.state.searchText}
                onClick={() => this.searchComingSoon()}
                // onChange={(event) => this.changeSearchText(event.target.value)}
                placeholder='Discover By Module, Topic, Or Resource Type'
              />
              <ModuleButton
                moduleSearchArray={this.state.moduleSearchArray}
                selectModule={this.selectModule}
              />
            </div>
            <ResourcesContainer
              visible={true}
              loading={this.state.loading}
              isActivities={this.state.selectedView === 'activities'}
              isArticles={this.state.selectedView === 'articles'}
              isModules={this.state.selectedView === 'modules'}
            />
            {/* <SearchResources
              visible={false}
              loading={this.state.loading}
              searchData={this.state.searchData}
              searchText={this.state.searchText}
            /> */}
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
