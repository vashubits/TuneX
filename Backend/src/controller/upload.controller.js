const ImageKit = require("@imagekit/nodejs")
const musicModel = require('../model/music.model')
const albumModel = require('../model/album.model')



async function uploadMusic(req, res) {
  try {
    const imagekit = new ImageKit({
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY
    })

    const user = req.user
    const musicFile = req.musicFile
    const imageFile = req.imageFile

    if (req.user.role !== 'artist') {
      return res.status(403).json({ message: "Only artist can upload music" })
    }

    if (!musicFile) {
      return res.status(400).json({ message: "No musicFile uploaded" })
    }
    if (!imageFile) {
      return res.status(400).json({ message: "No imageFile uploaded" })
    }

    const musicResponse = await imagekit.files.upload({
      file: musicFile.buffer.toString('base64'),
      fileName: musicFile.originalname,
      folder: '/Music_Player/Music'
    })
    const imageResponse = await imagekit.files.upload({
      file: imageFile.buffer.toString('base64'),
      fileName: imageFile.originalname,
      folder: '/Music_Player/Music-Image'
    })

    await musicModel.create({
      musicUri: musicResponse.url,
      imageUri: imageResponse.url,
      musicName: req.body.musicName,
      userId: user.id
    })

    res.status(200).json({
      message: "Upload successful"
    })

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}



async function createAlbum(req, res) {
  const albumName  = req.body.albumName
  const imageFile = req.imageFile
 

  const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
  })

  if (req.user.role !== 'artist') {
    return res.status(403).json({ message: "Only artist can create album" })
  }

  

  if (!imageFile) {
    return res.status(400).json({ message: "No file uploaded" })
  }

  try {
    const response = await imagekit.files.upload({
      file: imageFile.buffer.toString('base64'),
      fileName: imageFile.originalname,
      folder: '/Music_Player/Album'
    })

    await albumModel.create({
      imageUri: response.url,
      albumName,
      userId: req.user.id
    })

    res.status(200).json({
      message: "album create successfull"
    })

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}



module.exports = { uploadMusic, createAlbum }