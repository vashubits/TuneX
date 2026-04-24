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
        { withCredentials: true }
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#0f0f0f] to-[#1a1a1a] text-white px-4">

      <div className="w-full max-w-md bg-[#181818] border border-gray-800 rounded-2xl shadow-2xl p-8">

        <h2 className="text-2xl font-bold text-green-500 mb-6 text-center">
          🎵 Upload Music
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          
          <input
            type="text"
            placeholder="Enter Music Name"
            value={musicName}
            onChange={(e) => setMusicName(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#2a2a2a] border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          
          <label className="block w-full p-3 rounded-lg bg-[#2a2a2a] border border-gray-700 cursor-pointer hover:bg-[#333] transition">
            <span className="text-gray-400">
              {imageFile ? imageFile.name : "Choose Cover Image"}
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setimageFile(e.target.files[0])}
              className="hidden"
            />
          </label>

         
          <label className="block w-full p-3 rounded-lg bg-[#2a2a2a] border border-gray-700 cursor-pointer hover:bg-[#333] transition">
            <span className="text-gray-400">
              {musicFile ? musicFile.name : "Choose Music File"}
            </span>
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => setmusicFile(e.target.files[0])}
              className="hidden"
            />
          </label>

         
          <button
            disabled={loading}
            className={`w-full p-3 rounded-lg font-bold transition ${
              loading
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600 text-black'
            }`}
          >
            {loading ? "Uploading..." : "Upload 🚀"}
          </button>

        </form>
      </div>

      {/* Popup */}
      {popup.show && (
        <div
          className={`fixed top-20 right-5 px-5 py-3 rounded-lg font-semibold shadow-lg
          ${popup.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
        >
          {popup.message}
        </div>
      )}

    </div>
  )
}

export default Upload