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
  const { user } = req.query;
  db.login(user, (err, doc) => {
    if (err) {
      res.status(404);
    } else {
      res.send(doc);
    }
    res.end();
  });
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
    res.end();
  });
});

app.delete('/deleteAccount', (req, res) => {
  const { deleteAccountName } = req.body;
  db.deleteAccount(deleteAccountName, (err, result) => {
    if (err) {
      res.status(404);
    } else {
      res.send(result);
    }
    res.end();
  });
});

app.delete('/deleteChore', (req, res) => {
  const { user, index } = req.body;
  db.deleteChore(user, index, (err) => {
    if (err) {
      res.status(404);
    } else {
      res.status(200);
    }
    res.end();
  });
});

app.put('/');

app.listen(PORT, () => {
});
