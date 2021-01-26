import React, { Component } from 'react'
import {
  Link
} from "react-router-dom";
import './PullRequestHeader.css';

export default class PullRequestHeader extends Component {
  render() {
    return (
      <div className="prHeader">
        <Link className="routeBtn" to="/branches">Go to branches</Link>
      </div>
    )
  }
}
