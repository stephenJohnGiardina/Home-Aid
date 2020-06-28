const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../database/controller.js');

const app = express();

const PORT = 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/../public')));

app.get('/login', (req, res) => {
  const { username } = req.query;
  db.login(username, (err, user) => {
    if (err) {
      res.status(404);
    } else {
      res.end(JSON.stringify(user));
    }
  });
  // res.end();
});

app.post('/newUser', (req, res) => {
  const { newUsername } = req.body;
  db.createUser(newUsername, (err, doc) => {
    if (err) {
      res.status(404);
    } else {
      res.send(doc);
    }
    res.end();
  });
});

app.post('/newChore', (req, res) => {
  const { chores, choreData, user } = JSON.parse(req.body.post);
  chores.push(choreData);
  db.createChore(user, chores, (err, userData) => {
    if (err) {
      res.status(404);
    } else {
      res.send(userData);
    }
  });
});

app.put('/');

app.listen(PORT, () => {
});
