import React, { Component } from 'react'
import octo from '../../Utils/Octokit';
import CommitView from '../CommitView/CommitView';

import Header from '../Header/Header';

import './MainPanel.css';
export default class MainPanel extends Component {
  constructor(props) {
    super(props);

    octo.initialize();

    this.state = {
     branches: [],
     activeBranch: {},
     commits: []
    }
  }

  componentDidMount() {
    octo.getBranches((branches) => {
      octo.getCommitsForBranch(branches[0].commit.sha, (commits) => {
        this.setState({
          branches: branches,
          commits: commits
        });
      });
    });
  }
  
  render() {
    return (
      <div className="mainPanel">
        <Header branches={this.state.branches} setActiveBranch={this.setActiveBranch}/>
        <CommitView commits={this.state.commits} activeBranch={this.state.activeBranch}/>
      </div>
    )
  }

  setActiveBranch = (activeBranch) => {
    this.setState({
      commits: []
    });
    octo.getCommitsForBranch(activeBranch.commit.sha, (commits) => {
      this.setState({
        commits: commits
      });
    });
  }
}
