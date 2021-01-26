import React, { Component } from 'react'
import classnames from "classnames";
import { COLORS } from '../../Utils/Colors';
import "./Header.css";
import {
  Link
} from "react-router-dom";

export default class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeBranchIndex: 0
    }
  }
  
  render() {
    return (
      <div className="header">
        <div className="tabContainer">
          <Link className="routeBtn" to="/pullRequests">Go to pull requests</Link>
          {this.props.branches.map((branch, index) => {
            const colorIndex = index % (COLORS.length);
            return (
              <div className={classnames("tab", index === this.state.activeBranchIndex && "tabSelected")} style={{backgroundColor: COLORS[colorIndex]}} onClick={() => this.pickActiveBranch(index)} key={index}>
                {branch.name}
              </div>
            );
          })}
        </div>
        <div className="selectedBranchBar" style={{backgroundColor: COLORS[this.state.activeBranchIndex % COLORS.length]}}>
        </div>
      </div>
    )
  }

  pickActiveBranch = (branchIndex) => {
    this.setState({
      activeBranchIndex: branchIndex
    });
    this.props.setActiveBranch(this.props.branches[branchIndex]);
  }
}
