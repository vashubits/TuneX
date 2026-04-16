const express = require('express')
const authRouter = require('./routes/auth.route')
const cookieParser = require('cookie-parser')
const app = express()
const cors = require('cors')
const multer = require('multer')
const homeRouter = require('./routes/musics.route')
const authMiddleware = require('./middleware/auth.middleware')
const musicRouter = require('./routes/upload.route')


const upload = multer({storage:multer.memoryStorage()})
app.use(express.json())
app.use(cookieParser())

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});
app.use(cors({
  origin: "https://music-player-git-main-vashu-guptas-projects.vercel.app",
  credentials:true
}));

app.use('/api/auth', authRouter)
app.use('/api',homeRouter)
app.use('/api/music',authMiddleware,upload.single('file'), musicRouter)

module.exports = app