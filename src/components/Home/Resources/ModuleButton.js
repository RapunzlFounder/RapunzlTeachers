import React, { Component } from 'react';
import { connect } from 'react-redux';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import CheckBoxOutlineBlank from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBox from '@mui/icons-material/CheckBox';

class ModuleButton extends Component {
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
          <div className={`search-option ${(this.state.open || this.props.moduleSearchArray.length > 0) ? 'selected-search-option' : ''}`}>
            {this.props.moduleSearchArray.length !== 0 ? 'Filtered' : 'Filter By Module'}
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
          <div onClick={() => this.props.selectModule(1)} className="resource-menu-item-flex">
            {this.props.moduleSearchArray.includes(1) ? <CheckBox style={{ fill: '#00ffbe' }} fontSize='small' /> : <CheckBoxOutlineBlank fontSize='small' />}
            <div className="resource-menu-item-text" style={{ color: this.props.moduleSearchArray.includes(1) ? '#00ffbe' : 'white' }}>
              1: Welcome To The Stock Market
            </div>
          </div>
          <div onClick={() => this.props.selectModule(2)} className="resource-menu-item-flex">
            {this.props.moduleSearchArray.includes(2) ? <CheckBox style={{ fill: '#00ffbe' }} fontSize='small' /> : <CheckBoxOutlineBlank fontSize='small' />}
            <div className="resource-menu-item-text" style={{ color: this.props.moduleSearchArray.includes(2) ? '#00ffbe' : 'white' }}>
              2: Saving Vs. Investing
            </div>
          </div>
          <div onClick={() => this.props.selectModule(3)} className="resource-menu-item-flex">
            {this.props.moduleSearchArray.includes(3) ? <CheckBox style={{ fill: '#00ffbe' }} fontSize='small' /> : <CheckBoxOutlineBlank fontSize='small' />}
            <div className="resource-menu-item-text" style={{ color: this.props.moduleSearchArray.includes(3) ? '#00ffbe' : 'white' }}>
              3. Financial Fitness
            </div>
          </div>
          <div onClick={() => this.props.selectModule(4)} className="resource-menu-item-flex">
            {this.props.moduleSearchArray.includes(4) ? <CheckBox style={{ fill: '#00ffbe' }} fontSize='small' /> : <CheckBoxOutlineBlank fontSize='small' />}
            <div className="resource-menu-item-text" style={{ color: this.props.moduleSearchArray.includes(4) ? '#00ffbe' : 'white' }}>
              4. The Power Of Debt
            </div>
          </div>
          <div onClick={() => this.props.selectModule(5)} className="resource-menu-item-flex">
            {this.props.moduleSearchArray.includes(5) ? <CheckBox style={{ fill: '#00ffbe' }} fontSize='small' /> : <CheckBoxOutlineBlank fontSize='small' />}
            <div className="resource-menu-item-text" style={{ color: this.props.moduleSearchArray.includes(5) ? '#00ffbe' : 'white' }}>
              5. What Makes A Good Stock?
            </div>
          </div>
          <div onClick={() => this.props.selectModule(6)} className="resource-menu-item-flex">
            {this.props.moduleSearchArray.includes(6) ? <CheckBox style={{ fill: '#00ffbe' }} fontSize='small' /> : <CheckBoxOutlineBlank fontSize='small' />}
            <div className="resource-menu-item-text" style={{ color: this.props.moduleSearchArray.includes(6) ? '#00ffbe' : 'white' }}>
              6. Top Investor Strategies
            </div>
          </div>
          <div onClick={() => this.props.selectModule(7)} className="resource-menu-item-flex">
            {this.props.moduleSearchArray.includes(7) ? <CheckBox style={{ fill: '#00ffbe' }} fontSize='small' /> : <CheckBoxOutlineBlank fontSize='small' />}
            <div className="resource-menu-item-text" style={{ color: this.props.moduleSearchArray.includes(7) ? '#00ffbe' : 'white' }}>
              7. Diversification & Risk
            </div>
          </div>
          <div onClick={() => this.props.selectModule(8)} className="resource-menu-item-flex">
            {this.props.moduleSearchArray.includes(8) ? <CheckBox style={{ fill: '#00ffbe' }} fontSize='small' /> : <CheckBoxOutlineBlank fontSize='small' />}
            <div className="resource-menu-item-text" style={{ color: this.props.moduleSearchArray.includes(8) ? '#00ffbe' : 'white' }}>
              8. Insurance & Retirement
            </div>
          </div>
          <div onClick={() => this.props.selectModule(9)} className="resource-menu-item-flex">
            {this.props.moduleSearchArray.includes(9) ? <CheckBox style={{ fill: '#00ffbe' }} fontSize='small' /> : <CheckBoxOutlineBlank fontSize='small' />}
            <div className="resource-menu-item-text" style={{ color: this.props.moduleSearchArray.includes(9) ? '#00ffbe' : 'white' }}>
              9. Investing In Your Income
            </div>
          </div>
          <div onClick={() => this.props.selectModule(10)} className="resource-menu-item-flex">
            {this.props.moduleSearchArray.includes(10) ? <CheckBox style={{ fill: '#00ffbe' }} fontSize='small' /> : <CheckBoxOutlineBlank fontSize='small' />}
            <div className="resource-menu-item-text" style={{ color: this.props.moduleSearchArray.includes(10) ? '#00ffbe' : 'white' }}>
              10. Banks, ETFs & Mutual Funds
            </div>
          </div>
          <div onClick={() => this.props.selectModule(11)} className="resource-menu-item-flex">
            {this.props.moduleSearchArray.includes(11) ? <CheckBox style={{ fill: '#00ffbe' }} fontSize='small' /> : <CheckBoxOutlineBlank fontSize='small' />}
            <div className="resource-menu-item-text" style={{ color: this.props.moduleSearchArray.includes(11) ? '#00ffbe' : 'white' }}>
              11. ESG & Social Impact Investing
            </div>
          </div>
          <div onClick={() => this.props.selectModule(12)} className="resource-menu-item-flex">
            {this.props.moduleSearchArray.includes(12) ? <CheckBox style={{ fill: '#00ffbe' }} fontSize='small' /> : <CheckBoxOutlineBlank fontSize='small' />}
            <div className="resource-menu-item-text" style={{ color: this.props.moduleSearchArray.includes(12) ? '#00ffbe' : 'white' }}>
              12. Financial Services Careers
            </div>
          </div>
          <div onClick={() => this.props.selectModule(13)} className="resource-menu-item-flex">
            {this.props.moduleSearchArray.includes(13) ? <CheckBox style={{ fill: '#00ffbe' }} fontSize='small' /> : <CheckBoxOutlineBlank fontSize='small' />}
            <div className="resource-menu-item-text" style={{ color: this.props.moduleSearchArray.includes(13) ? '#00ffbe' : 'white' }}>
              13. Financial Algebra
            </div>
          </div>
          <div onClick={() => this.props.selectModule(14)} className="resource-menu-item-flex">
            {this.props.moduleSearchArray.includes(14) ? <CheckBox style={{ fill: '#00ffbe' }} fontSize='small' /> : <CheckBoxOutlineBlank fontSize='small' />}
            <div className="resource-menu-item-text" style={{ color: this.props.moduleSearchArray.includes(14) ? '#00ffbe' : 'white' }}>
              14. Financial Equations
            </div>
          </div>
          <div onClick={() => this.props.selectModule(15)} className="resource-menu-item-flex">
            {this.props.moduleSearchArray.includes(15) ? <CheckBox style={{ fill: '#00ffbe' }} fontSize='small' /> : <CheckBoxOutlineBlank fontSize='small' />}
            <div className="resource-menu-item-text" style={{ color: this.props.moduleSearchArray.includes(15) ? '#00ffbe' : 'white' }}>
              15. Paying For College
            </div>
          </div>
          <div onClick={() => this.props.selectModule(16)} className="resource-menu-item-flex">
            {this.props.moduleSearchArray.includes(16) ? <CheckBox style={{ fill: '#00ffbe' }} fontSize='small' /> : <CheckBoxOutlineBlank fontSize='small' />}
            <div className="resource-menu-item-text" style={{ color: this.props.moduleSearchArray.includes(16) ? '#00ffbe' : 'white' }}>
              16. Opposite Of Buying: Shorting
            </div>
          </div>
          <div onClick={() => this.props.selectModule(17)} className="resource-menu-item-flex">
            {this.props.moduleSearchArray.includes(17) ? <CheckBox style={{ fill: '#00ffbe' }} fontSize='small' /> : <CheckBoxOutlineBlank fontSize='small' />}
            <div className="resource-menu-item-text" style={{ color: this.props.moduleSearchArray.includes(17) ? '#00ffbe' : 'white' }}>
              17. It Starts With The Financials
            </div>
          </div>
          <div onClick={() => this.props.selectModule(18)} className="resource-menu-item-flex">
            {this.props.moduleSearchArray.includes(18) ? <CheckBox style={{ fill: '#00ffbe' }} fontSize='small' /> : <CheckBoxOutlineBlank fontSize='small' />}
            <div className="resource-menu-item-text" style={{ color: this.props.moduleSearchArray.includes(18) ? '#00ffbe' : 'white' }}>
              18. Buying Your First Home
            </div>
          </div>
          <div onClick={() => this.props.selectModule(19)} className="resource-menu-item-flex">
            {this.props.moduleSearchArray.includes(19) ? <CheckBox style={{ fill: '#00ffbe' }} fontSize='small' /> : <CheckBoxOutlineBlank fontSize='small' />}
            <div className="resource-menu-item-text" style={{ color: this.props.moduleSearchArray.includes(19) ? '#00ffbe' : 'white' }}>
              19. Business Of Buildings & Ownership
            </div>
          </div>
          <div onClick={() => this.props.selectModule(20)} className="resource-menu-item-flex">
            {this.props.moduleSearchArray.includes(20) ? <CheckBox style={{ fill: '#00ffbe' }} fontSize='small' /> : <CheckBoxOutlineBlank fontSize='small' />}
            <div className="resource-menu-item-text" style={{ color: this.props.moduleSearchArray.includes(20) ? '#00ffbe' : 'white' }}>
              20. Financial Exponents
            </div>
          </div>
          <div onClick={() => this.props.selectModule(21)} className="resource-menu-item-flex">
            {this.props.moduleSearchArray.includes(21) ? <CheckBox style={{ fill: '#00ffbe' }} fontSize='small' /> : <CheckBoxOutlineBlank fontSize='small' />}
            <div className="resource-menu-item-text" style={{ color: this.props.moduleSearchArray.includes(21) ? '#00ffbe' : 'white' }}>
              21. Financial Statistics
            </div>
          </div>
          <div onClick={() => this.props.selectModule(22)} className="resource-menu-item-flex">
            {this.props.moduleSearchArray.includes(22) ? <CheckBox style={{ fill: '#00ffbe' }} fontSize='small' /> : <CheckBoxOutlineBlank fontSize='small' />}
            <div className="resource-menu-item-text" style={{ color: this.props.moduleSearchArray.includes(22) ? '#00ffbe' : 'white' }}>
              22. Financial Probabilities
            </div>
          </div>
          <div onClick={() => this.props.selectModule(23)} className="resource-menu-item-flex">
            {this.props.moduleSearchArray.includes(23) ? <CheckBox style={{ fill: '#00ffbe' }} fontSize='small' /> : <CheckBoxOutlineBlank fontSize='small' />}
            <div className="resource-menu-item-text" style={{ color: this.props.moduleSearchArray.includes(23) ? '#00ffbe' : 'white' }}>
              23. Basics Of Banking
            </div>
          </div>
          <div onClick={() => this.props.selectModule(null)} className="resource-menu-item-flex">
            <div className="resource-menu-item-text" style={{ color: '#ff5536', marginLeft: 2 }}>
              Reset Filter
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

export default connect(mapStateToProps)(ModuleButton);