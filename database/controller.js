const User = require('./database');

module.exports = {
  createUser: (username, callback) => {
    const newUser = new User({
      username,
      chores: [],
    });
    newUser.save((err, user) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, user);
      }
    });
  },

  createChore: (username, newChoreArray, callback) => {
    User.findOneAndUpdate({ username }, { chores: newChoreArray }, (err, user) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, user);
      }
    });
  },

  login: (username, callback) => {
    User.find({ username }, (err, user) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, user);
      }
    });
  },

  updateChore: () => {

  },

  delete: () => {

  },

  deleteUser: () => {

  },

};
