# TODO: Complete MERN Stack Application

## Backend Updates
- [x] Update server/models/Agent.js: Add bcrypt pre-save hook for password hashing, add mobile validation regex for country code.
- [x] Update server/controllers/agentController.js: Add input validation (email unique, phone format, password min 6 chars), handle errors.
- [x] Update server/controllers/uploadController.js: Add file type validation (.csv, .xlsx, .xls), validate CSV columns (FirstName, Phone, Notes), ensure exactly 5 agents for distribution.
- [x] Create server/controllers/assignmentController.js: Add getAssignments function to fetch all assignments.
- [x] Create server/routes/assignmentRoutes.js: Define GET / route with protect middleware.
- [x] Update server/index.js: Import and use assignmentRoutes.
- [x] Update server/controllers/authController.js: Improve login error messages.

## Frontend Updates
- [x] Update client/src/pages/Upload.jsx: Add file validation, after upload fetch and display assignments per agent.
- [x] Update client/src/pages/Agents.jsx: Update mobile input for country code (placeholder, validation), add password hint.
- [x] Update client/src/pages/Login.jsx: Replace alert with error state display.
- [x] Update client/src/api/axios.jsx: Add getAssignments function.

## General
- [x] Create .env file with MONGO_URI, JWT_SECRET, PORT.
- [x] Create README.md with setup and run instructions.
- [ ] Test: Install deps, run server/client, seed admin, login, add 5 agents, upload CSV, verify distribution display.
