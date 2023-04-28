import React, { Component } from "react";

class Pie extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }

  render() {
    const r = 34;
    const circ = 2 * Math.PI * r;
    const strokePct = ((100 - this.props.pct) * circ) / 100;
    return (
      <svg width={125} height={125}>
        <g transform={`rotate(-90 ${"67 100"})`}>
          <circle
            r={r}
            cx={100}
            cy={100}
            fill="transparent"
            stroke={"lightgrey"} // remove colour as 0% sets full circumference
            strokeWidth={"1.2rem"}
            strokeDasharray={circ}
            strokeDashoffset={0}
            strokeLinecap="round"
          ></circle>
          <circle
            r={r}
            cx={100}
            cy={100}
            fill="transparent"
            stroke={"#007154"} // remove colour as 0% sets full circumference
            strokeWidth={"1.2rem"}
            strokeDasharray={circ}
            strokeDashoffset={strokePct}
            strokeLinecap="round"
          ></circle>
        </g>
        <text
          x="53%"
          y="54%"
          dominantBaseline="central"
          textAnchor="middle"
          fontSize={"1em"}
          style={{ fontSize: 14, fontWeight: '500', fill: this.props.inverted ? '#000000' : '#ffffff' }}
        >
          {this.props.pct.toFixed(0)}%
        </text>
      </svg>
    );
  }
}

export default Pie;
