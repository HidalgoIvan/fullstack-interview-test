import React, { Component } from 'react'
import './PullRequestCard.css';
import classnames from "classnames";

export default class PullRequestCard extends Component {

  constructor(props) {
    super(props);
  }
  
  render() {
    const pr = this.props.pullRequest;
    const date = new Date(pr.created_at);
    return (
      <div className="prCard">
        <div className="prTitle">
          {pr.title}
        </div>
        <div className="prSubtitle">
          <div>
            {pr.head.ref} → {pr.base.ref}
          </div>
          <div>
            {pr.user.login}
          </div>
          <div>
            { 
              new Intl.DateTimeFormat("en-GB", {
                weekday: "short",
                year: "numeric",
                month: "long",
                day: "2-digit",
                hour: 'numeric', 
                minute: 'numeric', 
                second: 'numeric'
              }).format(date)
            }
          </div>
        </div>
        <div className="prBody">
          {pr.body}
        </div>
        <div className="prStatusContainer">
          <span className={classnames("prStatus",this.getStatusClass(pr))}>{pr.merged_at ? 'merged' : pr.state}</span>
          { pr.state === 'open' &&
            <span>
              <button className="prCloseBtn" onClick={this.closePR}>Close</button>
              <button className="prMergeBtn" onClick={this.mergePR}>Merge</button>
            </span>
          }
        </div>
      </div>
    )
  }

  getStatusClass(pr) {
    if(pr.merged_at) {
      return 'prMerged';
    }
    switch (pr.state) {
      case 'open':
        return 'prOpen';
      case 'closed':
        return 'prClosed';
      default:
        return 'prClosed';
    }
  }

  closePR = () => {
    this.props.closePullRequest(this.props.pullRequest.number, () => {
      this.props.queryPullRequests();
    });
  }

  mergePR = () => {
    this.props.mergePullRequest(this.props.pullRequest.number, () =>{
      this.props.queryPullRequests();
    });
  }
}
