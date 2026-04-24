const mongoose = require('mongoose')

const albumSchema = new mongoose.Schema({
  imageUri: {
    type: String,
    required: true
  },
  albumName: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

const albumModel = mongoose.model('Album', albumSchema)

module.exports = albumModel