# proxyserver



## Getting started (Deployment)

- Install dependencies:
> `npm install`

- Install forever (so incase the server crashes, it starts again by itself)
> `npm install forever -g`

- Adjust the ReverseProxy rules:
> `vi main.js`

- Run the server:
> `npm start`
This server will run at port 4000. Unless `NODE_ENV`, environment variable is set to `production`. In which case, it will run at 80 (default port for http).

### Defaults
Currently, the rules are setup so that all requests are directed to `localhost:9000` EXCEPT the ones with `/api/` in their URL.

The ones which have `/api/` in the URL are directed to `localhost:3000`.

#### So, by default, it assumes that:
- Backend is running on port 3000
- Frontend is running on port 9000