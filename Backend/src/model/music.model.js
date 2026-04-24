const mongoose = require('mongoose') 
const musicSchema = new mongoose.Schema({
  musicUri: {
    type: String,
    required: true
  },
  imageUri: {
    type: String,
    required: true
  },
  musicName: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  
    required: true
  }
})

const musicModel = mongoose.model('Music', musicSchema)


module.exports = musicModel