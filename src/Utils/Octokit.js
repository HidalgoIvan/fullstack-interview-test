import { Octokit } from "@octokit/rest";

let octokit;
let owner, repo;

const octo = {
  initialize: function(gitOwner = "FlatDigital", gitRepo = "fullstack-interview-test") {
    owner = gitOwner;
    repo = gitRepo;
    octokit = new Octokit({
      auth: "28607f193b491e736d04516513ed115c4cb59b24"
    })
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
      repo
    });
    callback(pullRequests);
  }
}

export default octo;