const { Client, GatewayIntentBits } = require('discord.js')
require('dotenv').config()

// CLIENT is the bot; Intents is what the bot can do
const CLIENT = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages
    ]
})

CLIENT.on('ready', () => {
    console.log('O rato está pronto!')
})

CLIENT.on('messageCreate', (message) => {
    if (message.content === 'ping') {
        console.log('teste')
    }
})

CLIENT.login(process.env.TOKEN)