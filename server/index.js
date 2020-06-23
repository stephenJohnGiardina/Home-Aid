const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../database/controller.js');

const app = express();

const PORT = 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '/../public')));

app.get('/login', (req, res) => {
  let username = req.query.username;
  db.login(username, (err, user) => {
    if (err) {
      res.status(404);
    } else {
      res.end(JSON.stringify(user));
    }
  })
  // res.end();
});

app.post('/newUser', (req, res) => {
  let newUsername = req.body.newUsername;
  db.createUser(newUsername, (err, user) => {
    if (err) {
      console.log(err)
      res.status(404);
    } else {
      res.send(user);
    }
    res.end();
  });

});

app.post('/newChore', (req, res) => {
  let data = JSON.parse(req.body.data);
  let username = data.user;
  let choreData = {
    choreName: data.choreName,
    when: data.when,
    whoArray: data.whoArray,
    suppliesNeededArray: data.suppliesNeededArray,
    cost: data.cost,
    subtasksArray: data.subtasksArray,
  };
  let chores = data.chores.concat(choreData);
  console.log(chores, username);
  db.createChore(username, chores, (err, user) => {
    if (err) {
      res.status(404);
    } else {
      user.chores = chores;
      res.send(user);
    }
  });
});

app.put('/');

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}.`);
});
