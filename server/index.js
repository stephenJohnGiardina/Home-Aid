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
  /**
   * This is a route for logging in. It takes in a username. If the username exists the data
   * associated with that user will be sent back to the client. If the username does not
   * exist a 404 error will be sent back to the client.
   */
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
  /**
   * This is a route for creating a new account. It takes in a new username. If
   * the username does not exist, a new account is made with the username given and
   * the client will be notified. If the username exists the client will also be notified.
   */
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
  /**
   * This is a route for creating a new chore. It takes in the data for a chore. The
   * user the client is currently logged in as is looked up and the chore data gets
   * added to the user's account.
   */
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
  /**
   * This is a route for deleting an account. If the account entered exists the account
   * will be removed from the database. If not nothing happens.
   */
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
  /**
   * This is a route for deleting a chore. It takes in a username and and chore index. It will
   * look up the account associated with the username and find the array of chores assosiated with
   * that account. When it finds that array it will search for the chore object with the inputted
   * index. Once it finds that chore it removes that chore from the accounts chores array.
   * If the chore is successfully deleted a status of 200 will be sent back to the client.
   * Otherwise a status of 404 will be sent back to the client.
   */
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

app.put('/editChore', (req, res) => {
  /**
   * This is a route for editing a chore. It takes in an object called editData which
   * holds the username and the new data for the chore to be edited (choreData). The
   * username is used to query the account. When the account is found the chore that
   * is going to be edited is looked up using an index that is found on the choreData
   * object. Once that chore is found its data is replaced with the new data.
   */
  const editData = JSON.parse(req.body.editData);
  db.editChore(editData, (err, doc, index) => {
    if (err) {
      res.status(404);
    } else {
      res.status(202);
      res.send(doc.chores[index]);
    }
    res.end();
  });
});

app.listen(PORT, () => {
});
