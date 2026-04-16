import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./page/navbar.jsx"
import Register from "./page/Register.jsx"
import Login from "./page/Login.jsx"
import Upload from "./page/uploadMusic.jsx"
import CreateAlbum from "./page/createAlbum.jsx"
import Home from "./page/home.jsx"
import ProtectedRoute from "./Routes/protection.route.jsx"
import ArtistSong from "./page/artistSong.jsx"

const App = () => {

  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<><Navbar /><Home/></>} />
        <Route path="/login" element={<><Login /></>} />
        <Route path="/register" element={<><Register /></>} />
        <Route path="/uploadmusic" element={<><ProtectedRoute><Navbar /><Upload /></ProtectedRoute></>} />
        <Route path="/createAlbum" element={<><ProtectedRoute><Navbar /><CreateAlbum /></ProtectedRoute></>} />
        <Route path="/artist/:id" element={<><Navbar /><ArtistSong /></>} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App