const fs = require('fs');
const { Octokit } = require('@octokit/rest');
const fetch = require('node-fetch');

const github = new Octokit({ auth: process.env.GITHUB_TOKEN });

async function run() {
  const readmeContent = fs.readFileSync('README.md', 'utf8');
  const trelloCardId = process.env.TRELLO_CARD_ID;
  const trelloKey = process.env.TRELLO_API_KEY;
  const trelloToken = process.env.TRELLO_TOKEN;

  const response = await fetch(
    `https://api.trello.com/1/cards/${trelloCardId}/desc?key=${trelloKey}&token=${trelloToken}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ value: readmeContent }),
    }
  );

  if (response.ok) {
    console.log('Trello card updated successfully');
  } else {
    console.error('Failed to update Trello card');
  }
}

run().catch((error) => {
  console.error('Error updating Trello card:', error);
});
