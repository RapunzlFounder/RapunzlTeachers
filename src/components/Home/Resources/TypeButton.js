import React, { Component } from 'react';
import { connect } from 'react-redux';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import CheckBoxOutlineBlank from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBox from '@mui/icons-material/CheckBox';

class TypeButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      anchor: null,
    }
  }

  handleMenuButtonClick = (e) => {
    if (this.state.open) {
      this.setState({ anchor: null, open: false });
    } else {
      this.setState({ anchor: e.currentTarget, open: true });
    }
  }

  handleClose = () => {
    this.setState({ anchor: null, open: false });
  }

  countTypesSelected() {
    let filtered = 0;
    if (this.props.activitiesSelected) {
      filtered += 1;
    }
    if (this.props.articlesSelected) {
      filtered += 1;
    }
    if (this.props.assessmentsSelected) {
      filtered += 1;
    }
    if (this.props.presentationsSelected) {
      filtered += 1;
    }
    if (this.props.guidesSelected) {
      filtered += 1;
    }
    return filtered;
  }

  render() {
    return (
      <div>
        <Button
          id="basic-button"
          aria-controls={this.state.open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={this.state.open ? 'true' : undefined}
          onClick={this.handleMenuButtonClick}
          style={{ borderRadius: 100 }}
        >
        <div className={`search-option ${this.state.open ? 'selected-search-option' : ''} ${this.countTypesSelected() !== 0 ? 'selected-search-option' : ''}`}>
          Type {this.countTypesSelected() === 0 ? '- All' : '- ' + this.countTypesSelected()}
        </div>
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={this.state.anchor}
          open={this.state.open}
          onClose={this.handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <div onClick={() => this.props.selectActivities()} className="resource-menu-item-flex">
            {!this.props.activitiesSelected ? (
              <CheckBoxOutlineBlank fontSize='small' />
            ) : (
              <CheckBox style={{ fill: '#00ffbe' }} fontSize='small' />
            )}
            <div className="resource-menu-item-text" style={{ color: this.props.activitiesSelected ? '#00ffbe' : 'white' }}>
              Activities
            </div>
          </div>
          <div onClick={() => this.props.selectArticles()} className="resource-menu-item-flex">
            {!this.props.articlesSelected ? (
              <CheckBoxOutlineBlank fontSize='small' />
            ) : (
              <CheckBox style={{ fill: '#00ffbe' }} fontSize='small' />
            )}
            <div className="resource-menu-item-text" style={{ color: this.props.articlesSelected ? '#00ffbe' : 'white' }}>
              Articles
            </div>
          </div>
          <div onClick={() => this.props.selectAssessments()} className="resource-menu-item-flex">
            {!this.props.assessmentsSelected ? (
              <CheckBoxOutlineBlank fontSize='small' />
            ) : (
              <CheckBox style={{ fill: '#00ffbe' }} fontSize='small' />
            )}
            <div className="resource-menu-item-text" style={{ color: this.props.assessmentsSelected ? '#00ffbe' : 'white' }}>
              Assessments
            </div>
          </div>
          <div onClick={() => this.props.selectPresentations()} className="resource-menu-item-flex">
            {!this.props.presentationsSelected ? (
              <CheckBoxOutlineBlank fontSize='small' />
            ) : (
              <CheckBox style={{ fill: '#00ffbe' }} fontSize='small' />
            )}
            <div className="resource-menu-item-text" style={{ color: this.props.presentationsSelected ? '#00ffbe' : 'white' }}>
              Presentations
            </div>
          </div>
          <div onClick={() => this.props.selectGuides()} className="resource-menu-item-flex">
            {!this.props.guidesSelected ? (
              <CheckBoxOutlineBlank fontSize='small' />
            ) : (
              <CheckBox style={{ fill: '#00ffbe' }} fontSize='small' />
            )}
            <div className="resource-menu-item-text" style={{ color: this.props.guidesSelected ? '#00ffbe' : 'white' }}>
              Guides
            </div>
          </div>
        </Menu>
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
  };
};

export default connect(mapStateToProps)(TypeButton);
