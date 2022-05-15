# Project Structure
The project is split into 3 parts:
- Backend: A simple express app. Files are located in `project_directory/backend`
- Frontend: A create-react-app based app. Files are located in `project_directory/frontend`
- Reverse Proxy Server: A reverse proxy server to remove cross-origin requests security errors. File are located in `project_directory/proxyserver`

### The backend
This uses expressjs and mongoose to connect to a mongodb server which manages the data for this simple app. This runs on port 3000 on the server.

### The frontend
This is a create-react-app based project with added scss support. The entry point for this is App.js. The .env file makes sure that it runs on port number 8000.

### The reverse proxy server
This was added because a client requesting from 8000 to 3000 will cause cross-origin header red flags in most browsers. One way handle them is add a cors-allow header from the backend, however it still exposes the port number for the backend. So, this simple 25 line code helps with that.

The `project_directory/proxyserver` is a reverse proxy server which just redirects requests as follows:
- /api/ -> backend (running on port 3000)
- * -> everything else, meaning frontend, (running on port 8000)
You can change these ports at your convenience.

