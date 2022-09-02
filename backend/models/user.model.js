const mongoose = require('mongoose');
const { SettingsList } = require('twilio/lib/rest/voice/v1/dialingPermissions/settings');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  lastName: { type: String},
  phone: {type: Number},
  address: { type: String}
});

const User = mongoose.model('User', userSchema);

module.exports = User;