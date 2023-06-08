import { Client, GatewayIntentBits, Routes } from 'discord.js'
import { REST } from '@discordjs/rest'
import { config } from 'dotenv'
import { COMMANDS } from './commands/main'
config() // get the enviroment(dotenv) variables

// Intents is what the bot can do
const BOT = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
})
const BOT_TOKEN = process.env.TOKEN
const BOT_ID = process.env.CLIENT_ID
const SERVER_ID = process.env.GUILD_ID
const REST_ = new REST({ version: '10' }).setToken(BOT_TOKEN)

BOT.on('ready', () => console.log(`O rato está pronto!`))

BOT.on('messageCreate', (message) => {
    console.log(message.content),
    console.log(message.author.tag)
})

BOT.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;
})

async function main() {
    try {
        console.log('O rato está preparando os comandos...')
        await REST_.put(Routes.applicationGuildCommands(BOT_ID, SERVER_ID), {
            body: COMMANDS
        })
        BOT.login(BOT_TOKEN)
    } catch (error) {
        console.log(error)
    }
}

main()