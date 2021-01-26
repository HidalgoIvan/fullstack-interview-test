import React, { Component } from 'react'
import octo from '../../Utils/Octokit';

export default class PullRequestPanel extends Component {
  
  constructor(props) {
    super(props)
    octo.initialize('FlatDigital', 'fullstack-interview-test');
    this.state = {
       
    }
  }

  componentDidMount() {
    octo.getPullRequests((pullRequests) => {
      console.log(pullRequests);
    });
  }
  

  render() {
    return (
      <div>
        
      </div>
    )
  }
}
