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

  editChore: (editData, callback) => {
    const { username, choreData } = editData;
    User.find({ username }, (err, doc) => {
      if (err) {
        callback(err, null, null);
      } else {
        const { chores } = doc[0];
        let editIndex;
        for (let i = 0; i < chores.length; i += 1) {
          if (chores[i].index === choreData.index) {
            editIndex = i;
          }
        }
        chores.splice(editIndex, 1, choreData);
        User.findOneAndUpdate({ username }, { chores }, { new: true }, (error, document) => {
          if (error) {
            callback(error, null, null);
          } else {
            callback(null, document, editIndex);
          }
        });
      }
    });
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
