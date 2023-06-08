import { Client } from 'discord.js'
import { config } from 'dotenv'
config() // get the enviroment(dotenv) variables

// CLIENT is the bot; Intents is what the bot can do
const CLIENT = new Client({
    intents: [ 'Guilds', 'GuildMessages' ]
})
const TOKEN = process.env.BOT_TOKEN

CLIENT.on('ready', () => {
    console.log('O rato está pronto!')
})


CLIENT.login(TOKEN)