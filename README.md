# still\_alive: Slowloris attack in NodeJS
Simple implementation of Slowloris DoS attack written in vanilla NodeJS.
Intended to be used purely for testing purposes.

## Usage
Script connects multiple (set by maxSockets parameter ) concurrent sockets to target server.
It writes data to socket periodically (set by rate parameter) to keep it open.

- `npm run start`: Starts slowloris attack
- `npm run server`: Starts test server, displaying active sockets
