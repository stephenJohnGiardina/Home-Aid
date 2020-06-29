const User = require('./database');

module.exports = {
  createUser: (username, callback) => {
    User.exists({ username }, (error, result) => {
      if (error) {
        callback(error, null);
      } else if (result) {
        callback(null, result);
      } else {
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
      }
    });
  },

  createChore: (username, newChoreArray, callback) => {
    User.findOneAndUpdate({ username }, { chores: newChoreArray }, { new: true }, (err, doc) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, doc);
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

  deleteAccount: (username, callback) => {
    User.findOneAndDelete({ username }, (err, doc) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, doc);
      }
    });
  },

};
