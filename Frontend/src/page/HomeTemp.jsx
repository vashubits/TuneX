import React, { useEffect, useState } from 'react'
import '../css/Home.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../css/Home.css'

const Home = () => {

  const [music, setMusic] = useState([])
  const [albums, setAlbums] = useState([])
  const navigate = useNavigate()

  useEffect(() => {

    const fetchData = async () => {
      try {
        const musicRes = await axios.get('https://music-player-ew1o.onrender.com/api/music')
        const albumRes = await axios.get('https://music-player-ew1o.onrender.com/api/artist')

        setMusic(musicRes.data)
        setAlbums(albumRes.data)

        

      } catch (error) {
        console.log(error)
      }
    }

    fetchData()

  }, [])

  return (
    <div className="home">

      {/* HERO */}
      <div className="hero">
        <h1>🎵 Welcome to MusicApp</h1>
        <p>Listen, Upload and Create your favorite music albums easily.</p>
      </div>

      <h2 className="sectionTitle">🔥 Trending Music</h2>

      <div className="musicGrid">

        {music.map((item) => (
          <div className="musicCard" key={item._id}>

            <div className="musicIcon">🎶</div>

            <div className="musicInfo">
              <h3>{item.musicName}</h3>
              <p>Enjoy your music</p>
            </div>

            <audio controls className="audio">
              <source src={item.uri} type="audio/mp3" />
            </audio>

          </div>
        ))}

      </div>

<h2 className="sectionTitle">📀 Artist</h2>

<div className="musicGrid">

  {albums.map((item) => (
    <div
      className="musicCard albumCard"
      key={item._id}
      onClick={() =>  navigate(`/artist/${item.userId}`)}
    >

      <div className="albumImageWrapper">
        <img
          src={item.uri}
          alt="album"
          className="albumImage"
        />
      </div>

      <div className="musicInfo">
        <h3>{item.albumName}</h3>
        <p>Tap to view artist music</p>
      </div>

    </div>
  ))}
</div>

    </div>
  )
}

export default Home