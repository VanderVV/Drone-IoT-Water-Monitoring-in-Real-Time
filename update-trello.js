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
    //'https://api.trello.com/1/cards/EWt2gcsO/desc?key=ffabf7f0c8ab05ff1b99246fa6ca8488&token=ATTA0119d888486247c7fe9da8b661d60ebdf4d74e605cf63e53636e78d5577bef6c2065DFAA',
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
