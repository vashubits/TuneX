import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Register = () => {

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const [popup, setPopup] = useState({
    show: false,
    message: '',
    type: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (loading) return

    setLoading(true) 

    const formdata = new FormData(e.target)

    const data = {
      username: formdata.get('username'),
      email: formdata.get('email'),
      password: formdata.get('password'),
      role: formdata.get('role')
    }

    try {
      const res = await axios.post(
        'https://music-player-ew1o.onrender.com/api/auth/register',
        data
      )

      setPopup({
        show: true,
        message: res.data.message,
        type: 'success'
      })

      e.target.reset()

      setTimeout(() => {
        navigate('/')
      }, 2000)

    } catch (err) {
      setPopup({
        show: true,
        message: err.response?.data?.message || "Something went wrong",
        type: 'error'
      })
    } finally {
      setLoading(false) 
    }

    setTimeout(() => {
      setPopup({ show: false, message: '', type: '' })
    }, 3000)
  }

  return (
    <div style={styles.container}>

      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.heading}>Register</h2>

        <input name="username" placeholder="Username" style={styles.input} required />
        <input name="email" type="email" placeholder="Email" style={styles.input} required />
        <input name="password" type="password" placeholder="Password" style={styles.input} required />

        <select name="role" style={styles.input}>
          <option value="user">User</option>
          <option value="artist">Artist</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          style={{
            ...styles.button,
            opacity: loading ? 0.6 : 1,
            cursor: loading ? "not-allowed" : "pointer"
          }}
        >
          {loading ? "Registering..." : "Submit"}
        </button>
      </form>

      {popup.show && (
        <div
          style={{
            ...styles.popup,
            background: popup.type === 'success' ? 'green' : 'red'
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
    background: 'linear-gradient(135deg, #0f0f0f, #1a1a1a)',
    color: '#fff'
  },

  form: {
    width: "300px",
    background: "#1e1e1e",
    padding: "20px",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    boxShadow: "0 0 20px rgba(0,0,0,0.5)"
  },

  heading: {
    textAlign: "center"
  },

  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    outline: "none"
  },

  button: {
    padding: "10px",
    border: "none",
    fontWeight: "bold",
    background: "#007bff",
    color: "#fff",
    borderRadius: "5px",
    transition: "0.3s"
  },

  popup: {
    position: "fixed",
    top: "100px",
    left: "20px",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "5px",
    fontWeight: "bold"
  }
}

export default Register