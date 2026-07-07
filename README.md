# 🎵 TuneX – Full-Stack Music Player

**Live Demo:** [[music-player-beige-xi.vercel.app](https://music-player-beige-xi.vercel.app)](https://music-player-git-main-vashu-guptas-projects.vercel.app/)

---

## 📌 Overview

TuneX is a premium full-stack music player web app built with **React, Express, and MongoDB**. It features a modern **pink/black gradient UI with glass-effect cards**, seamless **frontend/backend sync**, and clean, recruiter-friendly presentation.

## 🚀 Features

- 🎨 Modern UI with gradient theme and glass-morphism cards
- 🔐 Secure user registration & role selection (dropdown/radio buttons)
- ⚡ Clear error handling with frontend popups
- 🎶 Music playback with playlist management
- 🌐 Frontend hosted on **Vercel**, backend on **Render**
- 🗄️ MongoDB integration for persistent storage

## 🛠️ Tech Stack

| Layer     | Technology                          |
|-----------|--------------------------------------|
| Frontend  | React, CSS, Axios                    |
| Backend   | Express.js, Node.js, MongoDB         |
| Hosting   | Vercel (frontend), Render (backend)  |
| Tools     | Docker, Postman (API testing)        |

## 📂 Project Structure

```
TuneX/
│── Frontend/         # React app
│   ├── src/
│   ├── public/
│   └── .gitignore
│── Backend/          # Express + MongoDB
│   ├── routes/
│   ├── models/
│   └── .gitignore
│── README.md
```

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas URI (or local MongoDB instance)
- npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/vashubits/TuneX.git
cd TuneX
```

### 2. Backend Setup
```bash
cd Backend
npm install
```
Create a `.env` file inside `Backend/`:
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```
> ⚠️ **Never commit your `.env` file or actual MongoDB URI to GitHub.** Make sure `.env` is listed in `Backend/.gitignore`.

Run the server:
```bash
npm start
```

### 3. Frontend Setup
```bash
cd ../Frontend
npm install
npm start
```

The app should now be running locally, with the frontend calling the backend API.

## 📸 Screenshots

> _Add screenshots or a GIF demo of the app here to make the repo stand out._

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project currently has no license specified. Consider adding one (e.g., MIT) so others know how they can use your code.

## 👤 Author

**Vashu** — [@vashubits](https://github.com/vashubits)
