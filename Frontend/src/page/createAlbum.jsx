import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreateAlbum = () => {

  const navigate = useNavigate()

  const [albumName, setAlbumName] = useState('')
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

    if (!albumName || !imageFile) {
      setPopup({
        show: true,
        message: "Album name and image required",
        type: "error"
      })
      return
    }

    const formData = new FormData()
    formData.append("albumName", albumName)
    formData.append("imageFile", imageFile)

    setloading(true)

    try {
      const res = await axios.post(
        "https://music-player-ew1o.onrender.com/api/music/createalbum",
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
        message: err.response?.data?.message || "Album creation failed",
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

        <h2 className="mb-5 text-[#1DB954] text-xl font-bold">🎧 Create Album</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="Enter Album Name"
            value={albumName}
            onChange={(e) => setAlbumName(e.target.value)}
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

          <button
            disabled={loading}
            className={`p-3 rounded-lg font-bold transition 
              ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#1DB954] hover:bg-green-600 text-black'}`}
          >
            {loading ? "Creating..." : "Create Album 🚀"}
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

export default CreateAlbum