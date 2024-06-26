const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
app.use(bodyParser.json());

app.post('/trello-webhook', async (req, res) => {
  const action = req.body.action;

  if (action && action.type === 'commentCard' && action.data.card.name === 'README') {
    // Trigger GitHub Action
    const response = await fetch('https://api.github.com/repos/username/repo/dispatches', {
      method: 'POST',
      headers: {
        'Accept': 'application/vnd.github.everest-preview+json',
        'Authorization': `token ${process.env.GITHUB_TOKEN}`
      },
      body: JSON.stringify({
        event_type: 'trello_comment',
        client_payload: {
          card_id: action.data.card.id
        }
      })
    });

    if (response.ok) {
      res.status(200).send('GitHub Action triggered');
    } else {
      res.status(500).send('Failed to trigger GitHub Action');
    }
  } else {
    res.status(200).send('No action taken');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
