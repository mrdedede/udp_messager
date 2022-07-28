const dgram = require('dgram')
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

var clientInfo = null
const server = dgram.createSocket('udp4')

server.on('error', () => {
    console.log('User has disconnected')
    server.close()
})

server.on('message', (msg, info) => {
    console.log("Client: ", msg.toString())
    clientInfo = info
})

rl.addListener('line', line => {
    server.send(line, clientInfo.port, clientInfo.address)
})

server.bind(8081)
