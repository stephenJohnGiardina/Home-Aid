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
    User.find({ username }, (err, doc) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, doc);
      }
    });
  },

  updateChore: () => {

  },

  deleteChore: (username, index, callback) => {
    User.find({ username }, (err, doc) => {
      if (err) {
        callback(err);
      } else {
        let newChoreArray = doc[0].chores;
        newChoreArray = newChoreArray.filter((chore) => {
          return chore.index !== Number.parseInt(index, 10);
        });
        User.findOneAndUpdate({ username }, { chores: newChoreArray }, { new: true }, (error) => {
          if (error) {
            callback(error);
          } else {
            callback(null);
          }
        });
      }
    });
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
