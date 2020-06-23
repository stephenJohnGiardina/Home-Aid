const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/DomesticManager',  {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.on('open', () => {
  console.log('CONNECTED!');
})

const userSchema = new mongoose.Schema({
  username: String,
  chores: []
})

const User = mongoose.model('Users', userSchema);

module.exports = User;