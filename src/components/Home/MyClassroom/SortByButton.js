import React, { Component } from 'react';
import { connect } from 'react-redux';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import CheckBoxOutlineBlank from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBox from '@mui/icons-material/CheckBox';

class SortByButton extends Component {
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
          <div className={`search-option ${this.state.open ? 'selected-search-option' : ''}`}>
            Sort By
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
          <div onClick={() => this.props.selectSearchOption(1)} className="resource-menu-item-flex">
            {this.props.sortType === 1 ? <CheckBox style={{ fill: '#00ffbe' }} fontSize='small' /> : <CheckBoxOutlineBlank fontSize='small' />}
            <div className="resource-menu-item-text" style={{ color: this.props.sortType === 1 ? '#00ffbe' : 'white' }}>
              Last Name (A - Z)
            </div>
          </div>
          <div onClick={() => this.props.selectSearchOption(2)} className="resource-menu-item-flex">
            {this.props.sortType === 2 ? <CheckBox style={{ fill: '#00ffbe' }} fontSize='small' /> : <CheckBoxOutlineBlank fontSize='small' />}
            <div className="resource-menu-item-text" style={{ color: this.props.sortType === 2 ? '#00ffbe' : 'white' }}>
              First Name (A - Z)
            </div>
          </div>
          <div onClick={() => this.props.selectSearchOption(3)} className="resource-menu-item-flex">
            {this.props.sortType === 3 ? <CheckBox style={{ fill: '#00ffbe' }} fontSize='small' /> : <CheckBoxOutlineBlank fontSize='small' />}
            <div className="resource-menu-item-text" style={{ color: this.props.sortType === 3 ? '#00ffbe' : 'white' }}>
              Stock Portfolio %
            </div>
          </div>
          <div onClick={() => this.props.selectSearchOption(4)} className="resource-menu-item-flex">
            {this.props.sortType === 4 ? <CheckBox style={{ fill: '#00ffbe' }} fontSize='small' /> : <CheckBoxOutlineBlank fontSize='small' />}
            <div className="resource-menu-item-text" style={{ color: this.props.sortType === 4 ? '#00ffbe' : 'white' }}>
              Crypto Portfolio %
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

export default connect(mapStateToProps)(SortByButton);