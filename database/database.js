const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/DomesticManager', { useNewUrlParser: true });

const db = mongoose.connection;
db.on('open', () => {

});

const userSchema = new mongoose.Schema({
  username: String,
  chores: [],
});

const User = mongoose.model('Users', userSchema);

module.exports = User;
