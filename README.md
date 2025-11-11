# 💬 Mini WhatsApp – Chat App

A simple chat application built with **Node.js, Express, MongoDB, and EJS**.  
Users can create chats, view all chats, edit them, delete them, and see message details.  
Includes **server-side validation** and a **centralized error handler**.

---

## ✨ Features
- ✅ Create / send a new chat
- ✅ View all chats
- ✅ View single chat details
- ✅ Edit a chat
- ✅ Delete a chat
- ✅ Shows sender, receiver, timestamp & date
- ✅ **Validation on create & update** (rejects empty/invalid fields)
- ✅ Central **error handling** via middleware (`ExpressError.js`)
- ✅ Responsive UI using EJS + CSS
- ✅ MongoDB for persistent storage

---

## 🛠 Tech Stack
- **Node.js**, **Express.js**
- **MongoDB** with **Mongoose**
- **EJS** (server-side templating)
- **CSS** (in `/public`)

---

## 📦 Installation & Setup

1) **Clone the repo**
```bash
git clone https://github.com/shivansh-127/mini-whatsapp.git
cd mini-whatsapp
```

2) **Install dependencies**
```bash
npm install
```

3) **Environment variables** – create a `.env` file in the project root:
```
MONGO_URI=your_mongodb_connection_string
PORT=8080
```

4) **(Optional) Seed sample data**  
If you want a few chats to start with:
```bash
node init.js
```

5) **Run the app**
```bash
npm start
# or, if nodemon is set up:
npm run dev
```

6) **Open in browser**
```
http://localhost:8080/chats
```

---

## 🧰 Validation & Error Handling

- **Validation:** Requests are checked on the server (e.g., required fields like `from`, `to`, `message`, sane lengths).  
  If validation fails, the app responds with a **400 Bad Request** and renders a friendly message on the page.

- **Central error handler:** All thrown errors funnel through a custom class **`ExpressError`** and an Express error-handling middleware, returning consistent status codes & messages.

---

## 📂 Project Structure
```
mini-whatsapp
│
├─ models/            # Mongoose schemas (e.g., Chat)
├─ public/            # CSS/assets
├─ views/             # EJS templates
├─ ExpressError.js    # Custom error class
├─ index.js           # Main server (routes, middleware, handlers)
├─ init.js            # Optional seeding script
├─ package.json
└─ .env               # Local config (not committed)
```

---

## 🔀 RESTful Routes (typical)
```
GET    /chats           -> list all chats
GET    /chats/new       -> form to create chat
POST   /chats           -> create chat (validated)
GET    /chats/:id       -> show a chat
GET    /chats/:id/edit  -> form to edit chat
PATCH  /chats/:id       -> update chat (validated)
DELETE /chats/:id       -> delete chat
```

---

## 🧪 Scripts (examples)
Add these in `package.json` if not present:
```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "seed": "node init.js"
  }
}
```

---

## 🧾 .gitignore (recommended)
Create a `.gitignore` in the root:
```
node_modules
.env
.vscode
.DS_Store
npm-debug.log*
yarn-error.log*
coverage
```

---

## 📸 Screenshot
_All Chats page showing sender, receiver, message card, edit/delete/show buttons, and timestamps._

---

## 👤 Author
**Shivansh Saxena**  
🔗 GitHub: https://github.com/shivansh-127  
🔗 LinkedIn: https://www.linkedin.com/in/shivansh-saxena-5286ab311/

---

⭐ If this project helps you, consider giving it a **star**!
