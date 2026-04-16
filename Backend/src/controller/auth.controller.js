const userModel = require('../model/db.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



async function userRegister(req, res) {
  try {
    const { username, email, password , role ='user' } = req.body
     if (!email || !password || !username) {
      return res.status(400).json({  errors: errors.array() })
    }

    const hash = await bcrypt.hash(password, 10)
    const existingUser = await userModel.findOne({
      $or: [
        { username: username },
        { email: email }
      ]
    })

    if (existingUser) {
      return res.status(400).json({ errors: errors.array() })
    }

    await userModel.create({
      username,
      email,
      password: hash ,
      role
    })

    res.status(201).json({ message: 'User registered' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

async function userLogin(req, res) {
  try {
    const { email, password } = req.body
   
     if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" })
    }

    const user = await userModel.findOne({ email })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' })
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_CODE   
    )

    res.cookie("token", token, {
  httpOnly: true,
  secure: false,      
  sameSite: "lax",
  path: "/"
})

    res.status(200).json({
      message: "Login successful"
    })

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}


async function tokenVerify(req, res) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Not logged in" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_CODE);
    res.status(200).json({ user: decoded });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = { userRegister ,userLogin ,tokenVerify}