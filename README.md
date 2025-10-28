# 🎨 Creator Profile Portal

**Live Demo:** 👉 [https://creatorportal.onrender.com/](https://creatorportal.onrender.com/)

A full-stack MERN application for managing and showcasing creator profiles.
Built with **React**, **TailwindCSS (DaisyUI)**, **Node.js**, **Express**, and **MongoDB** —
featuring **role-based authentication**, **dark/light theme**, and **toast notifications** for a seamless user experience.

---

## 🌟 Features

✅ **Admin Authentication** — Login required for editing or deleting creators
✅ **CRUD Operations** — Add, edit, delete creator profiles
✅ **Public View** — Non-logged users can browse creator profiles
✅ **Theme Toggle** — Switch between light and dark mode (powered by Zustand/Context)
✅ **Responsive UI** — Works perfectly across desktop, tablet, and mobile
✅ **React Hot Toast** — Beautiful feedback for all major actions
✅ **Deployed Full-Stack on Render** — Both frontend & backend run on the same origin

---

## 🧱 Tech Stack

| Layer                   | Technologies                                                    |
| ----------------------- | --------------------------------------------------------------- |
| **Frontend**      | React, Vite, TailwindCSS, DaisyUI, Zustand / Context API, Axios |
| **Backend**       | Node.js, Express.js, JWT Authentication, bcrypt                 |
| **Database**      | MongoDB Atlas                                                   |
| **Deployment**    | Render (single service for client + server)                     |
| **Notifications** | React Hot Toast                                                 |

---

## ⚙️ Project Structure

```
creator-profile-portal/
 ├── backend/
 │   ├── config/
 │   ├── controllers/
 │   ├── models/
 │   ├── routes/
 │   └── server.js
 ├── frontend/
 │   ├── src/
 │   ├── public/
 │   └── vite.config.js
 ├── package.json
 └── README.md
```

---

## 🚀 Getting Started (Local Setup)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/abhishek-yourusername/creator-profile-portal.git
cd creator-profile-portal
```

### 2️⃣ Install Dependencies

```bash
npm install --prefix backend
npm install --prefix frontend
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the **root directory**:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
```

### 4️⃣ Build & Start the App

```bash
npm run build
npm start
```

The app will be live at 👉 [http://localhost:5000](http://localhost:5000)

---

## 🔒 Admin Access

Only authenticated users with the **admin** role can:

- Add new creators
- Edit or delete existing creators

Viewers can only browse profiles.

---

## 🧑‍💻 Future Improvements

- ✅ Pagination & Search for creator list
- ✅ Profile images hosted via Cloudinary
- ✅ Social media integration
- ✅ Improved analytics dashboard for admins

---
