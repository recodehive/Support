import fetch from 'node-fetch';

let GITHUB_TOKEN = '';
const OWNER = 'recodehive';
const REPO = 'Job-Seeker';

async function sendInvite(username) {
  const url = `https://api.github.com/repos/${OWNER}/${REPO}/collaborators/${username}`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `token ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
    },
    body: JSON.stringify({
      permission: 'pull',
    }),
  });

  if (response.ok) {
    console.log(`Success: Invitation sent to ${username} for the repository ${OWNER}/${REPO}`);
  } else {
    const error = await response.json();
    console.error(`Error: ${response.status} - ${error.message}`);
  }
}

const username = process.argv[2];
const token = process.argv[3];
if (!username) {
  console.error('Error: Please provide a username as an argument.');
  process.exit(1);
}
else if (!token) {
  console.error('Error: Please provide a token as an argument.');
  process.exit(1);
}
else {
  GITHUB_TOKEN = token;
}

sendInvite(username,token ).catch((err) => console.error(`Unexpected Error: ${err.message}`));
