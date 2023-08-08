import React from 'react';
import '../../styles/Admin/LongHoverWrapper.css';

class LongHoverWrapper extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tooltipVisible: false,
    }
  }

  // Updates The Tooltip Visiblity
  setTooltipVisible(val) {
    this.setState({ tooltipVisible: val });
  }

  // Handles Beginning The Timer When The Mouse Hovers Over The Div
  mouseEnter() {
    setTimeout(() => {
      this.setTooltipVisible(true)
    }, 1500);
  }

  // Handles Removing The Timer When The Mouse Leaves The Div
  mouseLeave() {
    this.setTooltipVisible(false);
  }

  render() {
    return (
      <div onMouseEnter={() => this.mouseEnter()} onMouseLeave={() => this.mouseLeave()}>
        {this.props.children}
        <span className={`tooltip ${this.state.tooltipVisible ? 'visible-tooltip' : ''}`}>
          {this.props.instructions}
        </span>
      </div>
    );
   }
}

export default LongHoverWrapper;
