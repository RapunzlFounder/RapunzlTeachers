import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../../styles/Home/Resources.css';
import { getAllPublicModules } from '../../../selectors/coursemoduleSelectors';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
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
    if (this.props.moduleSearchArray.length === 0) {
      for (var i in this.props.publicModules) {
        for (var j in this.props.publicModules[i].activities) {
          let activity = this.props.publicModules[i].activities[j];
          activity.moduleID = this.props.publicModules[i].id;
          activity.moduleName = this.props.publicModules[i].name;
          activitiesArray.push(activity);
        }
      }
    } else if (this.props.moduleSearchArray.length > 0) {
      for (var i in this.props.publicModules) {
        if (this.props.moduleSearchArray.includes(parseInt(this.props.publicModules[i].id))) {
          for (var j in this.props.publicModules[i].activities) {
            let activity = this.props.publicModules[i].activities[j];
            activity.moduleID = this.props.publicModules[i].id;
            activity.moduleName = this.props.publicModules[i].name;
            activitiesArray.push(activity);
          }
        }
      }
    }
    return activitiesArray;
  }

  _getArticles() {
    let articleArray = [];
    if (this.props.moduleSearchArray.length === 0) {
      for (var i in this.props.publicModules) {
        for (var j in this.props.publicModules[i].articles) {
          let article = this.props.publicModules[i].articles[j];
          article.moduleID = this.props.publicModules[i].id;
          article.moduleName = this.props.publicModules[i].name;
          articleArray.push(article);
        }
      }
    } else if (this.props.moduleSearchArray.length > 0) {
      for (var i in this.props.publicModules) {
        if (this.props.moduleSearchArray.includes(parseInt(this.props.publicModules[i].id))) {
          for (var j in this.props.publicModules[i].articles) {
            let article = this.props.publicModules[i].articles[j];
            article.moduleID = this.props.publicModules[i].id;
            article.moduleName = this.props.publicModules[i].name;
            articleArray.push(article);
          }
        }
      }
    }    
    return articleArray;
  }

  _getAssessments() {
    let assessmentArray = [];
    if (this.props.moduleSearchArray.length === 0) {
      for (var i in this.props.publicModules) {
        let assessment = this.props.publicModules[i].assessments;
        assessment.moduleID = this.props.publicModules[i].id;
        assessment.moduleName = this.props.publicModules[i].name;
        assessment.moduleImage = this.props.publicModules[i].imageUrl;
        assessmentArray.push(assessment);
      }
    } else if (this.props.moduleSearchArray.length > 0) {
      for (var i in this.props.publicModules) {
        if (this.props.moduleSearchArray.includes(parseInt(this.props.publicModules[i].id))) {
          let assessment = this.props.publicModules[i].assessments;
          assessment.moduleID = this.props.publicModules[i].id;
          assessment.moduleName = this.props.publicModules[i].name;
          assessment.moduleImage = this.props.publicModules[i].imageUrl;
          assessmentArray.push(assessment);
        }
      }
    }    
    return assessmentArray;
  }

  _getModules() {
    if (this.props.moduleSearchArray.length === 0) {
      return this.props.publicModules;
    } else {
      let moduleArray = [];
      for (var i in this.props.publicModules) {
        if (this.props.moduleSearchArray.includes(parseInt(this.props.publicModules[i].id))) {
          moduleArray.push(this.props.publicModules[i]);
        }
      }
      return moduleArray;
    }
  }

  _renderEmptySection() {
    return (
      <div className='resources-container' style={{ paddingTop: 75 }}>
        <QuizOutlinedIcon className='resource-container-empty-icon'/>
        <div className='resources-container-empty-h1'>
          No Results To Display
        </div>
        <div className='resources-container-empty-p'>
          Try expanding your search to include additional key words and modules.
        </div>
      </div>
    )
  }

  render() {
    // Handles Activities
    if (this.props.visible && this.props.isActivities) {
      let activitiesArray = this._getActivities();
      if (activitiesArray.length === 0) {
        return this._renderEmptySection();
      } else {
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
    }
    // Handles Articles
    else if (this.props.visible && this.props.isArticles) {
      let articlesArray = this._getArticles();
      if (articlesArray.length === 0) {
        return this._renderEmptySection();
      } else {
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
    }
    // Handles Modules
    else if (this.props.visible && this.props.isModules) {
      let modulesArray = this._getModules();
      if (modulesArray.length === 0) {
        return this._renderEmptySection();
      } else {
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
    }
    // Handles Assessments/Quizzes
    else if (this.props.visible && this.props.isAssessments) {
      let modulesArray = this._getAssessments();
      if (modulesArray.length === 0) {
        return this._renderEmptySection();
      } else {
        return (
          <div className='resources-container'>
            <div className='modules-resources-container'>
              {modulesArray.map((item) => {
                return (
                  <ResourceItem
                    item={item}
                    type={'assessments'}
                  />
                );
              })}
            </div>
          </div>
        );
      }
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
