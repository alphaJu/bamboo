var mongoose = require('mongoose');

var bambooSchema = mongoose.Schema({
  Title: {type: String, required: true},
  Dates: {type: String, required: true},
  Contents: {type: String, required: true},
  Password: {type: String, required: true}
});

module.exports = mongoose.model('bamboo', bambooSchema);
