import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreateAlbum = () => {

  const navigate = useNavigate()

  const [albumName, setAlbumName] = useState('')
  const [file, setFile] = useState(null)
  const [loading, setloading] = useState(false)

  const [popup, setPopup] = useState({
    show: false,
    message: '',
    type: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
if(loading)return
    if (!albumName || !file) {
      setPopup({
        show: true,
        message: "Album name and image required",
        type: "error"
      })
      return
    }

    const formData = new FormData()
    formData.append("albumName", albumName)
    formData.append("file", file)
    setloading(true)

    try {
      const res = await axios.post(
        "https://music-player-ew1o.onrender.com/api/music/createalbum",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      )

      setPopup({
        show: true,
        message: res.data.message,
        type: "success"
      })

      setTimeout(() => {
        navigate('/')
      }, 2000)

    } catch (err) {
      setPopup({
        show: true,
        message: err.response?.data?.message || "Album creation failed",
        type: "error"
      })
    }

    setTimeout(() => {
      setPopup({ show: false, message: '', type: '' })
    }, 3000)
  }

  return (
    <div style={styles.wrapper}>

      <div style={styles.card}>
        <h2 style={styles.title}>🎧 Create Album</h2>

        <form onSubmit={handleSubmit} style={styles.form}>

          <input
            type="text"
            placeholder="Enter Album Name"
            value={albumName}
            onChange={(e) => setAlbumName(e.target.value)}
            style={styles.input}
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            placeholder='no choose file'
            style={styles.file}
            required
          />

          <button style={styles.button}>
            Create Album 🚀
          </button>

        </form>
      </div>

      {/* Popup */}
      {popup.show && (
        <div style={{
          ...styles.popup,
          background: popup.type === 'success' ? '#1DB954' : '#ff4d4d'
        }}>
          {popup.message}
        </div>
      )}

    </div>
  )
}

const styles = {
  wrapper: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #0f0f0f, #1a1a1a)',
    color: '#fff'
  },

  card: {
    background: '#1e1e1e',
    padding: '30px',
    borderRadius: '12px',
    width: '350px',
    boxShadow: '0 0 20px rgba(0,0,0,0.5)',
    textAlign: 'center'
  },

  title: {
    marginBottom: '20px',
    color: '#1DB954'
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },

  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc'
  },

  file: {
    padding: '10px',
    color : "#000",
    borderRadius: '8px',
    background: '#fff',
    border: '1px solid #444',
  cursor: 'pointer'
  },




  button: {
    padding: '12px',
    background: '#1DB954',
    border: 'none',
    borderRadius: '8px',
    color: '#000',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: '0.3s'
  },

  popup: {
    position: 'fixed',
    top: '100px',
    left: '20px',
    color: '#fff',
    padding: '12px 20px',
    borderRadius: '8px',
    fontWeight: 'bold'
  }
}

export default CreateAlbum