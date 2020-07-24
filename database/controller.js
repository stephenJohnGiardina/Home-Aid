const User = require('./database');

module.exports = {

  login: (username, callback) => {
    /**
     * This method is assosiated with the '/login' route in the server file.
     * This method takes in a username and if an account exsts under that username,
     * this method will return all of that accounts data. Otherwise, this method will
     * return an error.
     */
    User.find({ username }, (err, doc) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, doc);
      }
    });
  },

  createUser: (username, callback) => {
    /**
     * This method is assosiated with the '/newUser' route in the server file.
     * This method takes in a username and checks whether an account already exists
     * under that username. If an account exits, it will send back an error. If an
     * account does not exist it will create an account in the database with that username.
     */
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

  deleteAccount: (username, callback) => {
    /**
     * This method is assosiated with the '/deleteAccount' route in the server file.
     * This method takes in a username, then simply looks up the account associated
     * with that username and deletes that account.
     */
    User.findOneAndDelete({ username }, (err, doc) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, doc);
      }
    });
  },

  createChore: (username, newChoreArray, callback) => {
    /**
     * This method is assosiated with the '/newChore' route in the server file.
     * This method takes in a username and new chore array. All this method does
     * is replace the current chore array associated with the account with the new
     * chore array that is inputted. All the hard logic is performed in the server file.
     */
    User.findOneAndUpdate({ username }, { chores: newChoreArray }, { new: true }, (err, doc) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, doc);
      }
    });
  },

  editChore: (editData, callback) => {
    /**
     * This method is assosiated with the '/editChore' route in the server file.
     * This method takes in an object called editData. On this object is a username and
     * the data for an edited chore. This method first finds the chore array of the
     * account associated with the input username. It then will find the chore in the chore
     * array that matches the index of the edited chore and replace that chore with
     * the edited chore. After the chore array has been updated, the account associated
     * with the username is looked up again and the its chore array is replaced with the
     * the new chore array.
     */
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
    /**
     * This method is assosiated with the '/deleteChore' route in the server file.
     * This method takes in a username and a chore index. First, the account associated
     * with the username is looked up and its chore array is stored on a local variable.
     * The chore array is then filtered only allowing chores without the input index to
     * remain. This process removes the chore with the input index from the array.
     * Finally, the account associated with the username is looked up and its chore array
     * is replaced with the new chore array.
     */
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

};
