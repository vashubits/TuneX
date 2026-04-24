import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../css/Navbar.css'

const Navbar = () => {
  const [open, setOpen] = useState(false)

  return (
    <nav className="nav">
      
      <div className="logo">TuneX</div>

      <div className="hamburger" onClick={() => setOpen(!open)}>
        ☰
      </div>

      <div className={`menu ${open ? 'active' : ''}`}>
        <Link onClick={() => setOpen(false)} to="/">Home</Link>
        <Link onClick={() => setOpen(false)} to="/login">Login</Link>
        <Link onClick={() => setOpen(false)} to="/register">Register</Link>
        <Link onClick={() => setOpen(false)} to="/uploadmusic">Upload</Link>
        <Link onClick={() => setOpen(false)} to="/createAlbum">Create Album</Link>
      </div>

    </nav>
  )
}

export default Navbar