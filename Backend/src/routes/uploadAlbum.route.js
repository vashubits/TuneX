const express = require('express')  
const router = express.Router()
const multer = require('multer')
const uploadmusic = require("../controller/upload.controller") 

const upload = multer({ storage: multer.memoryStorage() })



router.post('/uploadmusic',upload.fields([{name:'musicFile'},{name:'imageFile'}]),uploadmusic.uploadMusic)
router.post('/createalbum',upload.single('imageFile'),uploadmusic.createAlbum)


module.exports = router