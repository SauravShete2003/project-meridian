# MERN Stack Application - Admin Panel for Agent Management and List Distribution

This is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application that implements an admin panel for user login, agent creation & management, and uploading/distributing CSV/XLSX lists to agents.

## Features
- **Admin Login**: Secure login with JWT authentication using email/password. Default admin: email `admin@admin.com`, password `password`.
- **Agent Management**: Add agents with name, email, mobile (with country code), and password. Agents' passwords are hashed. View list of agents.
- **Upload & Distribute Lists**: Upload CSV, XLSX, or XLS files with columns `FirstName`, `Phone`, `Notes`. Validates file format and columns. Distributes items equally among exactly 5 agents (round-robin, with remainders sequential). Displays distributed lists per agent.
- **Validation & Error Handling**: Input validation (e.g., phone with country code, password min 6 chars), file type/column checks, error messages on UI.
- **Protected Routes**: All admin features require login (JWT token stored in localStorage).

## Tech Stack
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT (jsonwebtoken), bcryptjs, Multer (file upload), csv-parser, xlsx (Excel parsing).
- **Frontend**: React.js (Vite), React Router, Axios, Tailwind CSS.
- **Database**: MongoDB (local or Atlas).

## Prerequisites
- Node.js (v18+)
- MongoDB (local server running on port 27017 or connection string in .env)
- npm/yarn

## Setup Instructions

### 1. Clone/Setup Project
The project is already set up in `c:/Users/Shree/Desktop/project-meridian`. Ensure structure:
- `server/` (backend)
- `client/` (frontend)

### 2. Environment Configuration
Copy the `.env` file in the root:
```
MONGO_URI=mongodb://localhost:27017/meridian
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
PORT=5000
```
- Update `MONGO_URI` if using MongoDB Atlas.
- Change `JWT_SECRET` for production.

### 3. Backend Setup
Navigate to `server/`:
```bash
cd server
npm install
```
This installs: express, mongoose, cors, dotenv, bcryptjs, jsonwebtoken, multer, csv-parser, xlsx.

Seed default admin (run once):
```bash
# Start server first, then use Postman or curl
curl -X POST http://localhost:5000/api/auth/seed -H "Content-Type: application/json" -d '{}'
```
Or use Postman: POST `http://localhost:5000/api/auth/seed`.

### 4. Frontend Setup
Navigate to `client/`:
```bash
cd client
npm install
```
This installs: react, react-router-dom, axios, tailwindcss, vite.

### 5. Run the Application
- **Backend**: In `server/`:
  ```bash
  npm start
  ```
  Server runs on `http://localhost:5000`.

- **Frontend**: In `client/` (new terminal):
  ```bash
  npm run dev
  ```
  App runs on `http://localhost:5173` (Vite default).

### 6. Testing the Application
1. **Login**: Go to `http://localhost:5173/login`. Use `admin@admin.com` / `password`. Redirects to dashboard.
2. **Add Agents**: Navigate to `/agents`. Add exactly 5 agents (e.g., Name: Agent1, Email: agent1@test.com, Mobile: +1 1234567890, Password: 123456). Validates phone format and password length.
3. **Upload & Distribute**: Go to `/upload`. Create a sample CSV:
   ```
   FirstName,Phone,Notes
   John,+1 1111111111,Note1
   Jane,+1 2222222222,Note2
   ...
   ```
   (25 rows for even distribution: 5 per agent). Upload file. View distributed lists below the form.
4. **View Assignments**: After upload, lists show per agent with their items.
5. **Error Handling**: Try invalid file (wrong columns), wrong phone format, or <5 agents – see error messages.

### 7. Database
- Collections: `users` (admins), `agents`, `assignments`.
- View in MongoDB Compass: Connect to `mongodb://localhost:27017`, database `meridian`.

### 8. Troubleshooting
- **CORS Issues**: Ensure backend CORS allows frontend origin.
- **MongoDB Connection**: Start MongoDB service. Check .env.
- **File Upload**: Ensure `server/uploads/` writable.
- **Dependencies**: If errors, run `npm install` again.
- **Development**: Backend debug mode via `console.log`. Frontend hot-reload.

### 9. Video Demonstration
Record a video showing: Setup, login, add 5 agents, upload sample CSV (25 items), verify distribution in UI and DB. Upload to Google Drive and share link.

## Code Structure
- **Backend**:
  - `server/models/`: Schemas (User, Agent, Assignment).
  - `server/controllers/`: Logic (auth, agent, upload, assignment).
  - `server/routes/`: API routes (protected by JWT).
  - `server/utils/distribute.js`: Round-robin distribution.
- **Frontend**:
  - `client/src/pages/`: Login, Agents, Upload, Dashboard.
  - `client/src/api/axios.jsx`: API client with token interceptor.
  - `client/src/components/ProtectedRoute.jsx`: Route guard.

## Notes
- App assumes exactly 5 agents for distribution (per task). Add more/less will error on upload.
- Security: Hashing for passwords, JWT expiry 1d. Use HTTPS in production.
- Extensions: Add agent login, edit/delete agents, reports, file size limits.

For issues, check console/logs or contact developer.
