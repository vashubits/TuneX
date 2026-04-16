import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate()

  const [popup, setPopup] = useState({
    show: false,
    message: '',
    type: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formdata = new FormData(e.target)

    const data = {
      email: formdata.get('email'),
      password: formdata.get('password')
    }

    try {
      const res = await axios.post(
        'https://music-player-ew1o.onrender.com/api/auth/login',
        data,
        { withCredentials: true }
      )

      setPopup({
        show: true,
        message: res.data.message,
        type: 'success'
      })

      setTimeout(() => {
        navigate('/')
      }, 2000)

    } catch (err) {
      setPopup({
        show: true,
        message: err.response?.data?.message || "Login failed",
        type: 'error'
      })
    }

    setTimeout(() => {
      setPopup({ show: false, message: '', type: '' })
    }, 3000)
  }

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          style={styles.input}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>

      {popup.show && (
        <div
          style={{
            ...styles.popup,
            background: popup.type === 'success' ? '#28a745' : '#dc3545'
          }}
        >
          {popup.message}
        </div>
      )}
    </div>
  )
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #0f0f0f, #1a1a1a)",
    color: "#fff"
  },
  form: {
    width: "300px",
    background: "#1e1e1e",
    padding: "20px",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    boxShadow: "0 0 20px rgba(0,0,0,0.6)"
  },
  heading: {
    textAlign: "center",
    marginBottom: "10px"
  },
  input: {
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #444",
  background: "#ffffff",
  color: "#2a2a2a",          
 
},
  button: {
    padding: "10px",
    border: "none",
    fontWeight: "bold",
    background: "#007bff",
    color: "#fff",
    cursor: "pointer",
    borderRadius: "5px"
  },
  popup: {
    position: "fixed",
    top: "100px",
    left: "20px",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "5px"
  }
}

export default Login