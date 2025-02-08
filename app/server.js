const express = require('express');
const { exec } = require('child_process');

const app = express();
const port = 3000;

// Middleware untuk parsing JSON
app.use(express.json());
app.use(express.static('app'));

// Endpoint untuk merestart bot
app.post('/restart', (req, res) => {
  exec('sudo systemctl restart telegram-bot.service', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${stderr}`);
      return res.status(500).send('Failed to restart bot.');
    }
    console.log(`stdout: ${stdout}`);
    res.status(200).send('Bot restarted successfully.');
  });
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});