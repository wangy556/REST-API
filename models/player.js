const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  signedToTeam: {
    type: String,
    required: true
  },
  signedDate: {
    type: Date,
    required: true,
    default: Date.now
  }
})

module.exports = mongoose.model('Player', playerSchema)