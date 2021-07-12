var net = require('net');

let activeSockets=[];
let receivedPackets=0;

var server = net.Server((socket)=>{
    activeSockets.push(socket);

    socket.on('data',()=>{
        receivedPackets++;
        console.log('Active Sockets: ',activeSockets.length);
        console.log('Received Packets ['+ receivedPackets +']');
    })
});

server.on('error', (err) => {
  throw err;
});

server.listen(8080, '127.0.0.1',()=>{
    console.log('Server listening on 127.0.0.1:8080');
});
