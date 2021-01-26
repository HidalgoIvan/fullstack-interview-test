### Pre-requisites

Make sure to have the latest version of [node](https://nodejs.org/en/) installed.

### Configuration

Add a [Personal Access Token](https://github.com/settings/tokens/new) to the file in `/components/Config/config.json` as well as the project name and owner.

Ex: For the project [github.com/HidalgoIvan/fullstack-interview-test](https://github.com/HidalgoIvan/fullstack-interview-test) `GIT_OWNER` will be HidalgoIvan and `GIT_REPO` will be fullstack-interview-test.

### Running the project

`cd` into the project folder and run
`npm start`

Open [http://localhost:3000/](http://localhost:3000/) to see the project.

### Known bugs

After creating/deleting/merging a pull request the view will not reliably reflect the changes, this may be a problem with [Octokit's api](https://octokit.github.io/rest.js/v18) since automatic reloads, timed reloads and restarting the octokit object will return the same pull request list untill a manual reload of the page is applied.