const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client()

const checkHermesStatus = () => {
    client.login(process.env.HERMES)

    client.once('ready', async () => {
        console.log('Hermes is ready')
    })
}

const ErrorNotification = async error => {
    checkHermesStatus()
    let message = 'A problem has been encountered trying to connect to the database.\n'
    message = message + 'The error can be found below.\n'
    message = message + error

    const ngin = await client.users.fetch(process.env.NGIN)
    // ngin.send(message)
    console.log(ngin)

}

module.exports = ErrorNotification