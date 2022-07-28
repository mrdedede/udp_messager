const dgram = require('dgram')
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const client = dgram.createSocket('udp4')

rl.addListener('line', line => {
    client.send(line, 8081, '0.0.0.0')
})

client.on('message', (msg, rinfo) => {
    console.log("Server:", msg.toString());
 });
 
client.on('error', () => {
    console.log("Connection with the server has been killed")
    client.close()
})
