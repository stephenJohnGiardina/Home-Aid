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
  const { newUsername } = req.body.newUsername;
  db.createUser(newUsername, (err, user) => {
    if (err) {
      res.status(404);
    } else {
      res.send(user);
    }
    res.end();
  });
});

app.post('/newChore', (req, res) => {
  const data = JSON.parse(req.body.data);
  const username = data.user;
  const choreData = {
    choreName: data.choreName,
    when: data.when,
    whoArray: data.whoArray,
    suppliesNeededArray: data.suppliesNeededArray,
    cost: data.cost,
    subtasksArray: data.subtasksArray,
  };
  const chores = data.chores.concat(choreData);
  db.createChore(username, chores, (err, user) => {
    if (err) {
      res.status(404);
    } else {
      res.send(user);
    }
  });
});

app.put('/');

app.listen(PORT, () => {
});
