import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import '../css/artistSong.css'

const ArtistSong = () => {
  const param = useParams()
  const [currentSong, setCurrentSong] = useState(null)
  const [music, setmusic] = useState([])
  const handleMusic = (item) => {
    setCurrentSong(item.musicUri)

  }
  useEffect(() => {


    const fetchData = async () => {
      try {
        const musicRes = await axios.post(`https://music-player-ew1o.onrender.com/api/${param.id}/musics`)

        setmusic(musicRes.data)



      } catch (error) {
        console.log(error)
      }
    }

    fetchData()

  }, [])

  return (
    <div className='artistSong'>
      <h2 className="sectionTitle"> Artist Music</h2>

      <div className="musicGrid">

        {music.map((item) => (
          <div
            className=" albumCard"
            key={item._id}
            onClick={() => handleMusic(item)}
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
      {currentSong && (
        <div className="seekbar">
          <audio src={currentSong} controls autoPlay />
        </div>
      )}

    </div>
  )
}

export default ArtistSong
