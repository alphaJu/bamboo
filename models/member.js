var mongoose = require('mongoose');
var memberSchema = mongoose.Schema({
  id: {type: String, required: true},
  name: {type: String, required: true},
  email: {type: String, required: true}
});

module.exports = mongoose.model('member', memberSchema);
