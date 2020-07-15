const { UartBluetoothServer, UartBluetoothClient } = require('./lib/uart/index')
const argv = require('yargs').argv

const DEFAULT_SERVER_NAME = 'SORRIR-Gatt-Server'

let stop = async () => { }

async function main() {
    if (argv.server) {
        console.log(`role: server`)
        const server = new UartBluetoothServer(argv.target || DEFAULT_SERVER_NAME)
        server.handleMessage = (message, sender) => {
            console.log('----------------')
            console.log(`received: ${JSON.stringify({ msg: message, sender: sender })}`)
            console.log(`message: ${message}, sender: ${sender}`)
            server.sendMessage(message)
        }
        await server.start()
        stop = async () => {
            await server.stop()
        }
    } else {
        console.log(`role: client`)
        const client = new UartBluetoothClient(argv.target || DEFAULT_SERVER_NAME)
        client.handleMessage = (message, sender) => {
            console.log('----------------')
            console.log(`received: ${JSON.stringify({ msg: message, sender: sender })}`)
            console.log(`message: ${message}, sender: ${sender}`)
        }
        await client.connect()
        await client.sendMessage('test')
        setInterval(async () => { await client.sendMessage('test') }, 5000)
        stop = async () => {
            await client.disconnect()
        }
    }
}

console.log('starting...')

main().catch((error) => {
    console.error(error)
})

process.on('SIGINT', async function () {
    console.log('\nexiting...');
    // exit automatically if an error is thrown in this function
    setTimeout(() => {
        process.exit()
    }, 5000)
    await stop()
    process.exit()
});