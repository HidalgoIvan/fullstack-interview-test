import React, { Component } from 'react'
import './CommitView.css';

export default class CommitView extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <div className="commitView">
        {this.props.commits.map((commit, index) => {
          const date = new Date(commit.commit.author.date);
          return (
            <div className="commitContainer" key={index}>
              <div className="commitLine">
                <div className="commitDot">
                </div>
              </div>
              <div className="commitInfo">
                <div className="commitDataHeader">
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
                  <div>
                    {commit.commit.author.name}
                  </div>
                  <div>
                    {commit.commit.author.email}
                  </div>
                </div>
                <div>
                  ID: {commit.commit.tree.sha}
                </div>
                <div className="commitMessage">
                  {commit.commit.message}
                </div>
                
                
              </div>
            </div>
          );
        })}
      </div>
    )
  }
}
