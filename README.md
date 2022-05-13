The project is split into 2 parts:
- Frontend: whose files are at the top level `project_directory`
- Backend: files are in `project_directory/backend`

### Additional Info
The `project_directory/proxyserver` is a reverse proxy server which just redirects requests as follows:
- /api/ -> backend (running on port 3000)
- * -> everything else, meaning frontend, (running on port 5500)
You can change these ports at your convenience.

### The backend
This uses expressjs and mongoose to connect to a mongodb server which manages the data for this small app.

### The frontend
This is vanilla JS, plain CSS and plain HTML.