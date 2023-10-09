const { context, github } = require('@actions/github');

async function run() {
  const labels = context.payload.pull_request.labels.map(label => label.name);
  const defaultLabel = labels.find(label => label === 'patch'); // Use 'patch' as the default label

  const body = `Please review the code carefully before merging and check the following box if the correct type of version is going to be merged\n\n- [ ] This PR means a new version of the package ("${defaultLabel}")`;

  await github.issues.createComment({
    issue_number: context.payload.pull_request.number,
    owner: context.repo.owner,
    repo: context.repo.repo,
    body,
  });
}

run();
