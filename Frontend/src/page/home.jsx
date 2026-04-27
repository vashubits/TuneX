import React, { useEffect, useState } from 'react'
import '../css/Home.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const [music, setMusic] = useState([])
  const [albums, setAlbums] = useState([])
  const [currentSong , setCurrentSong] = useState(null)

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

  const handleMusic = (item)=>{
  setCurrentSong(item.musicUri)
  
  }


  

  return (
    <div className="home">

      <div className="hero">
        <h1>🎵 Welcome to TuneX</h1>
        <p>Listen, Upload and Create your favorite music albums easily.</p>
      </div>

      <h2 className="sectionTitle">Trending Music</h2>
<div className="musicGrid">

        {music.map((item) => (
          <div
            className=" albumCard"
            key={item._id}
            onClick={()=>handleMusic(item)}
          >

            <div className="albumImageWrapper">
              <img
                src={item.imageUri}
                alt="album"
                className="albumImage"
              />
            </div>

            <div className="musicInfo">
              <h3>{item.musicName}</h3>
              <p>Tap to play music</p>
            </div>

          </div>
        ))}

      </div>

      <h2 className="sectionTitle">Artist</h2>

      <div className="musicGrid">

        {albums.map((item) => (
          <div
            className=" albumCard"
            key={item._id}
            onClick={() => navigate(`/artist/${item.userId}`)}
          >

            <div className="albumImageWrapper">
              <img
                src={item.imageUri}
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
      {currentSong && (
  <div className="seekbar">
    <audio src={currentSong} controls autoPlay />
  </div>
)} 

    </div>
  )
}

export default Home