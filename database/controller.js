const User = require('./database');

module.exports = {
  createUser: (username, callback) => {
        let newUser = new User({
          username: username,
          chores: []
        })
        newUser.save((err, newUser) => {
          if (err) {
            console.log(err)
            callback(err, null);
          } else {
            callback(null, newUser);
          }
        })
  },

  createChore: (username, newChoreArray, callback) => {
    User.findOneAndUpdate({username: username}, {chores: newChoreArray}, (err, user) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, user);
      }
    })
  },

  login: (username, callback) => {
    User.find({username: username}, (err, user) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, user);
      }
    })
  },

  updateChore: () => {

  },

  delete: () => {

  },

  deleteUser: () => {

  }

}