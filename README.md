
# 📄 README.md (ready-to-use)

````markdown
# 🛠️ SkillSwap – Peer-to-Peer Skill Barter Platform

A full-stack MERN app where users can **exchange skills instead of money**.  
Built for hackathons & placements to demonstrate **real-world problem solving** with a modern UI.

---

## 🚀 Features
- 🔐 **User Authentication** – Register/Login with JWT  
- 👤 **Profile Management** – Add skills offered & skills needed  
- 🤝 **Skill Matching** – Find users with complementary skills  
- 📩 **Requests & Connections** – Send/accept connection requests  
- 💬 **Real-Time Chat** – 1-to-1 chat using Socket.IO (WhatsApp-style)  
- 🎨 **Modern UI** – React + TailwindCSS + Framer Motion  

---

## ⚡ Tech Stack
**Frontend:** React, TailwindCSS, Framer Motion  
**Backend:** Node.js, Express.js, MongoDB  
**Auth:** JWT  
**Realtime:** Socket.IO  
**Database:** MongoDB Atlas  

---

## 🛠️ Setup Instructions

### 1️⃣ Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/skillswap.git
cd skillswap
````

### 2️⃣ Backend setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/` using `.env.example` as reference:

```env
MONGO_URI=your_mongodb_atlas_url_here
JWT_SECRET=your_secret_here
PORT=5000
```

Run backend:

```bash
npm start
```

### 3️⃣ Frontend setup

```bash
cd ../frontend
npm install
npm start
```

---

## 📌 Next Steps

* 🐞 Fix **chat senderId bug** (labels)
* 💾 Store chat history in MongoDB
* 🚀 Deploy backend on **Render**
* 🚀 Deploy frontend on **Vercel**
* ✨ Add polish: timestamps, avatars, read receipts

---

## 📷 Screenshots

(Add screenshots here once deployed or running locally)

---

## 👥 Contributors

* **You** – Initial Developer 🚀
* **Your Friend** – Next Developer 🎯

````

---



