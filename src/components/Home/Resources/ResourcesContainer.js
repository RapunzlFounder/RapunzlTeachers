import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../../styles/Home/Resources.css';
import { getAllPublicModules } from '../../../selectors/coursemoduleSelectors';
import ResourceItem from './ResourceItem';

class ResourcesContainer extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  // Handles Resetting Search State To Initial When ResourceLibrary Is Toggled And Not Visible To User
  componentDidUpdate(prevProps) {
    if ((this.props.visible !== prevProps.visible || 
        this.props.isActivities !== prevProps.isActivities || 
        this.props.isArticles !== prevProps.isArticles || 
        this.props.isModules !== prevProps.isModules)) {
      this.setState({

      });
    }
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

  _getModules() {
    return this.props.publicModules;
  }

  render() {
    // Handles Activities
    if (this.props.visible && this.props.isActivities) {
      let activitiesArray = this._getActivities();
      return (
        <div className='resources-container'>
          {activitiesArray.map((item) => {
            return (
              <ResourceItem
                item={item}
                type={'activity'}
              />
            );
          })}
        </div>
      );
    }
    // Handles Articles
    else if (this.props.visible && this.props.isArticles) {
      let articlesArray = this._getArticles();
      return (
        <div className='resources-container'>
          {articlesArray.map((item) => {
            return (
              <ResourceItem
                item={item}
                type={'article'}
              />
            );
          })}
        </div>
      );
    }
    // Handles Modules
    else if (this.props.visible && this.props.isModules) {
      let modulesArray = this._getModules();
      return (
        <div className='resources-container'>
          <div className='modules-resources-container'>
            {modulesArray.map((item) => {
              return (
                <ResourceItem
                  item={item}
                  type={'modules'}
                />
              );
            })}
          </div>
        </div>
      );
    }
    // Handles If Component Is Not Visible
    else {
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
    expandedLibrary: state.dashboard.expandedLibrary,
    publicModules: getAllPublicModules(state),
  };
};

export default connect(mapStateToProps)(ResourcesContainer);
