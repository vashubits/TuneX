const express = require('express')
const authRouter = require('./routes/auth.route')
const cookieParser = require('cookie-parser')
const app = express()
const cors = require('cors')
const homeRouter = require('./routes/musics.route')
const authMiddleware = require('./middleware/auth.middleware')
const musicRouter = require('./routes/uploadAlbum.route')


app.use(express.static("public"))

app.use(cors({
  origin:  [
  "http://localhost:5173",
  "https://music-player-git-main-vashu-guptas-projects.vercel.app"
],
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
app.use('/api/music',authMiddleware, musicRouter)

module.exports = app