const { context, github } = require('@actions/github');

async function run() {
  const body = `Please review the code carefully before merging and check the following box if the correct type of version is going to be merged\n\n- [ ] This PR means a new version of the package (patch)`;
  await github.issues.createComment({
    issue_number: context.payload.pull_request.number,
    owner: context.repo.owner,
    repo: context.repo.repo,
    body,
  });
}

run();
