import React, { Component } from 'react'
import octo from '../../Utils/Octokit';
import PullRequestHeader from '../PullRequestHeader/PullRequestHeader';
import PullRequestCreator from '../PullRequestCreator/PullRequestCreator';
import PullRequestCard from '../PullRequestCard/PullRequestCard';
import './PullRequestPanel.css';
export default class PullRequestPanel extends Component {
  
  constructor(props) {
    super(props)
    octo.initialize();
    this.state = {
       pullRequests: [],
       branches: []
    }
  }

  componentDidMount() {
    this.queryPullRequests();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="panel">
        <PullRequestHeader/>
        <PullRequestCreator branches={this.state.branches} createPullRequest={(head, base, title, body) => {this.createPullRequest(head, base, title, body)}}/>
        {this.state.pullRequests.map((pullRequest, i) => {
          return (
            <PullRequestCard 
              pullRequest={pullRequest} 
              queryPullRequests={() => {this.queryPullRequests()}} 
              closePullRequest={this.closePullRequest}
              mergePullRequest={this.mergePullRequest}
              key={i} 
              />
          );
        })}
      </div>
    )
  }

  createPullRequest = (head, base, title, body) => {
    octo.createPullRequest(head, base, title, body, (response) => {
      this.queryPullRequests();
    }) 
  }

  closePullRequest = (number, callback) => {
    octo.closePullRequest(number, callback);
  }

  mergePullRequest = (number, callback) => {
    octo.mergePullRequest(number, callback)
  }

  queryPullRequests = () => {
    octo.getPullRequests((pullRequests) => {
      octo.getBranches((branches) => {
        this.setState({
          pullRequests: pullRequests,
          branches: branches
        });
      });
    });
  }
}
