# 🚀 Training Management Dashboard with Role-Based Access

A full-stack web application that provides a **Training Management System** for two roles: **Instructor** and **Trainee**. This system supports secure login/signup, role-based dashboards, module assignment, trainee progress tracking, and profile management.

---

## 📌 Features

### 👩‍🎓 Trainee
- View assigned modules
- Mark modules as completed
- Track overall progress (completed vs. pending modules)

### 🧑‍🏫 Instructor
- View list of all trainees
- Assign training modules
- Track trainee progress
- Add and remove modules

### 👥 Common (Both Roles)
- JWT-based login and signup
- Update username and password
- Secure logout

---

## 🛠️ Tech Stack

| Technology | Description |
|-----------|-------------|
| **Backend** | Node.js, Express.js |
| **Frontend** | React.js with Tailwind CSS |
| **Database** | MongoDB |
| **Authentication** | JWT (JSON Web Tokens) |
| **Testing** | Postman (for API testing) |
| **Icons & UI** | React Icons, TailwindCSS |
| **State Management** | React Hooks (`useState`, `useEffect`) |
| **Optional Features** | Responsive design, progress UI, conditional rendering |

---

## 📁 Folder Structure

```bash
training-dashboard-with-RBA/
│
├── Backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── node_modules/
│   ├── routes/
│   ├── .env                 # Environment variables (ignored in Git)
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── server.js            # Entry point for Express server
│
├── Frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   ├── .env                 # Environment variables (ignored in Git)
│   ├── .gitignore
│   ├── index.html
│   ├── vite.config.js
│   ├── postcss.config.mjs
│   ├── eslint.config.js
│   ├── package.json
│   ├── package-lock.json
│   └── README.md            # Frontend README (if separated)
│
├── .gitignore               # Root-level ignore file (optional if mono-repo)

---

## 🔐 Environment Variables
-- Create `.env` file with the following:
```env
MONGO_URI=your_mongodb_connection_URL
JWT_SECRET=jwt_secret_key
PORT=5000
--- 
## Setup Instructions

-- Backend Setup & Installation
📁 Navigate to Backend Folder
cd Backend
📦 Install Backend Dependencies
Run the following command to install all required npm packages:
npm install
✅ Installed Dependencies
The following dependencies are used in this project:
Required Packages:
express – Web framework for Node.js
mongoose – MongoDB ODM for connecting and managing the database
dotenv – Load environment variables from .env
cors – Enable Cross-Origin Resource Sharing
jsonwebtoken – For JWT-based authentication
bcryptjs – To hash passwords securely

-- Frontend (React + TailwindCSS)
cd Frontend
create react app :- 
npm create vite@latest training-dashboard-with-RBA
npm install
npm install tailwindcss @tailwindcss/vite
Add @tailwindcss/postcss to your postcss.config.mjs file, or wherever PostCSS is configured in your project.
postcss.config.mjs
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  }
}
@import "tailwindcss"; in index.css file
npm run dev

---

🌐 Live Demo
Deployed on Vercel / Render
Frontend: https://your-app.vercel.app
Backend: https://your-api.onrender.com

--- 
📬 Contact
Dhara Bhatiya
LinkedIn: https://www.linkedin.com/in/dhara-bhatiya-b2700a262/
Email: dharabhatiya2525@gmail.com

