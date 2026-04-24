const express = require('express')
const authRouter = require('./routes/auth.route')
const cookieParser = require('cookie-parser')
const app = express()
const cors = require('cors')
const multer = require('multer')
const homeRouter = require('./routes/musics.route')
const authMiddleware = require('./middleware/auth.middleware')
const musicRouter = require('./routes/uploadAlbum.route')


const upload = multer({storage:multer.memoryStorage()})
app.use(express.static("public"))

app.use(cors({
  origin: "https://music-player-git-main-vashu-guptas-projects.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json())
app.use(cookieParser())

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});


app.use('/api/auth', authRouter)
app.use('/api',homeRouter)
app.use('/api/music',authMiddleware,upload.fields([{name:'musicFile'},{name:'imageFile'}]), musicRouter)

module.exports = app