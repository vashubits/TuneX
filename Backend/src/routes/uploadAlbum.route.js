const express = require('express')  
const router = express.Router()
const upload = require("../controller/upload.controller") 





router.post('/uploadmusic',upload.uploadMusic)
router.post('/createalbum',upload.createAlbum)


module.exports = router