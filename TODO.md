# TODO: Fix Upload Error by Adding Dynamic Agent Creation UI

## Overview
Implement an "Add Agents" section in the Upload page to allow users to create up to 5 agents dynamically before uploading files. This resolves the "Exactly 5 agents are required for distribution" error by ensuring the server validation passes. Also, add defensive checks to prevent TypeError on undefined arrays.

## Steps

### Step 1: Update API Functions
- [x] Read and edit `client/src/api/axios.jsx`:
  - Add `getAgents()`: GET request to `/agents` to fetch all agents.
  - Add `createAgent(agentData)`: POST request to `/agents` with agent details (name, email, phone, password).
  - Ensure auth token is included if required (e.g., from localStorage).
- [x] Confirm changes and test API calls manually if needed.

### Step 2: Update Upload Component
- [x] Read and edit `client/src/pages/Upload.jsx`:
  - Add state for `agents` and `newAgent` (form inputs).
  - On load, fetch agents with `getAgents()`.
  - If `agents?.length < 5`, show "Add Agents" form: Inputs for name, email, phone, password; button to add one agent via `createAgent()`, refresh agents list.
  - Show progress (e.g., `${agents.length}/5 agents added`).
  - Once `agents.length === 5`, hide add section and enable upload form.
  - Add client-side validation (e.g., required fields, phone format).
  - Use optional chaining (`?.length`) to avoid TypeError.
- [x] Integrate with existing `loadAssignments()`; call both on load.
- [x] Confirm changes.

### Step 3: Testing and Verification
- [x] Start server: `cd server && npm start`
- [x] Start client: `cd client && npm run dev`
- [x] Navigate to Upload page (ensure logged in as admin).
- [x] Add 5 agents using the new UI (use dummy data: Agent 1-5, agent1-5@example.com, +1 123-456-7890/1/2/3/4, password123).
- [x] Verify agents count reaches 5; upload form enables.
- [x] Create sample CSV (columns: FirstName, Phone, Notes) and upload; check no errors, assignments display.
- [x] Check console for TypeError; if persists, investigate Agents.jsx.
- [x] Mark complete and update TODO.md.

## Notes
- Assumes server has POST/GET `/agents` endpoints in agentRoutes.js/agentController.js.
- If auth required for adding agents, ensure token in API calls.
- Dummy phone variations to avoid duplicates if needed.
- After completion, remove or archive TODO.md if desired.
