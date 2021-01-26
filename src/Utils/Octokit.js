import { Octokit } from "@octokit/rest";
import config from "../Config/config.json";

let octokit;
let owner, repo;

const octo = {
  initialize: function(callback = () => {}) {
    owner = config.GIT_OWNER;
    repo = config.GIT_REPO;
    octokit = new Octokit({
      auth: config.AUTH_KEY
    });
    callback();
  },
  getBranches: async function(callback = (branches = []) => {}) {
    const branches = await octokit.repos.listBranches({
      owner,
      repo
    });
    callback(branches.data);
  },
  getCommitsForBranch: async function(sha = "This is the branch SHA", callback = (commits = []) => {}) {
    const commits = await octokit.repos.listCommits({
      owner,
      repo,
      sha
    });
    callback(commits.data);
  },
  getPullRequests: async function(callback = (pullRequests = []) => {}) {
    const pullRequests = await octokit.request('GET /repos/{owner}/{repo}/pulls', {
      owner,
      repo,
      state: 'all'
    });
    console.log("prs", pullRequests.data);
    callback(pullRequests.data);
  },
  createPullRequest: async function(head = "", base = "", title = "", body = "", callback = (response) => {}) {
    try {
      const response = await octokit.pulls.create({
        owner,
        repo,
        head,
        base,
        title,
        body
      });
      console.log("response", response);
      callback(response);
    }
    catch(e) {
      alert(`Could not create PR :( \n ${e})`);
    }
  },
  closePullRequest: async function(pull_number = 0, callback = () => {}) {
    const result = await octokit.pulls.update({
      owner,
      repo,
      pull_number,
      state: 'closed'
    });
    callback(result);
  },
  mergePullRequest: async function(pull_number = 0, callback = () => {}) {
    try {
      await octokit.pulls.merge({
        owner,
        repo,
        pull_number
      });
      callback();
    }
    catch(e) {
      alert(`Could not merge PR :( \n ${e}`);
    }
  }
}

export default octo;