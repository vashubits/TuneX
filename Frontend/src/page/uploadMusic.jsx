import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Upload = () => {

  const navigate = useNavigate()

  const [musicName, setMusicName] = useState('')
  const [musicFile, setmusicFile] = useState(null)
  const [imageFile, setimageFile] = useState(null)
  const [loading, setloading] = useState(false)

  const [popup, setPopup] = useState({
    show: false,
    message: '',
    type: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (loading) return

    if (!musicFile || !musicName || !imageFile) {
      setPopup({
        show: true,
        message: "Music name, audio file and image required",
        type: "error"
      })
      return
    }

    if (musicFile.size > 7 * 1024 * 1024) {
      setPopup({
        show: true,
        message: "Music file too large (max 7 MB)",
        type: "error"
      })
      return
    }

    const formData = new FormData()
    formData.append("musicName", musicName)
    formData.append("musicFile", musicFile)
    formData.append("imageFile", imageFile)

    setloading(true)

    try {
      const res = await axios.post(
        "https://music-player-ew1o.onrender.com/api/music/uploadmusic",
        formData,
        {
          withCredentials: true
        }
      )

      setPopup({
        show: true,
        message: res.data.message,
        type: "success"
      })

      setTimeout(() => navigate('/'), 2000)

    } catch (err) {
      setPopup({
        show: true,
        message: err.response?.data?.message || "Upload failed",
        type: "error"
      })
    } finally {
      setloading(false)
    }

    setTimeout(() => {
      setPopup({ show: false, message: '', type: '' })
    }, 3000)
  }

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] text-white">

      <div className="bg-[#1e1e1e] p-8 rounded-xl w-[350px] shadow-xl text-center">

        <h2 className="mb-5 text-[#1DB954] text-xl font-bold">🎵 Upload Music</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="Enter Music Name"
            value={musicName}
            onChange={(e) => setMusicName(e.target.value)}
            className="p-3 rounded-lg border border-gray-300 text-black"
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setimageFile(e.target.files[0])}
            className="p-2 rounded-lg bg-white text-gray-800 border border-gray-600 cursor-pointer"
            required
          />

          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setmusicFile(e.target.files[0])}
            className="p-2 rounded-lg bg-white text-gray-800 border border-gray-600 cursor-pointer"
            required
          />

          <button
            disabled={loading}
            className={`p-3 rounded-lg font-bold transition 
              ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#1DB954] hover:bg-green-600 text-black'}`}
          >
            {loading ? "Uploading..." : "Upload 🚀"}
          </button>

        </form>
      </div>

      {/* Popup */}
      {popup.show && (
        <div
          className={`fixed top-24 left-5 px-5 py-3 rounded-lg font-bold text-white
          ${popup.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
        >
          {popup.message}
        </div>
      )}

    </div>
  )
}

export default Upload