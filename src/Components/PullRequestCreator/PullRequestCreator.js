import React, { Component } from 'react'
import './PullRequestCreator.css';

export default class PullRequestCreator extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      head: "",
      base: "",
      title: "",
      body: ""
    }
  }
  
  render() {
    return (
      <div className="prCreatorContainer">
        <div className="prCreatorTitle">
          Create a PR
        </div>
        <div className="prSelectContainer">
          Merge
          <select name="head" value={this.state.head} onChange={this.handleChange}>
            <option value="">Select a branch</option>
            {this.props.branches.map((branch, i) => {
              return (
                <option value={branch.name} key={i}>{branch.name}</option>
              );
            })}
          </select>
          Into
          {
            this.state.head && 
            <select name="base" value={this.state.base} onChange={this.handleChange}>
              <option value="">Select another branch</option>
              {this.props.branches.filter((branch) => {return branch.name !== this.state.head}).map((branch, i) => {
                return (
                  <option value={branch.name} key={i}>{branch.name}</option>
                );
              })}
            </select>
          }
        </div>
        {
          this.state.base &&
          <div className="prInputContainer">
            <input name="title" value={this.state.title} type="text" placeholder="Title" onChange={this.handleChange}></input>
            <textarea name="body" value={this.state.body} type="text" placeholder="Body" onChange={this.handleChange} style={{height: "3%"}}></textarea>
            <button onClick={() => {this.props.createPullRequest(
              this.state.head,
              this.state.base,
              this.state.title,
              this.state.body
            )}}>Create</button>
          </div>
        }
      </div>
    )
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  } 
}
