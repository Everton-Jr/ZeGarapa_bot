import { Client, GatewayIntentBits, Routes } from 'discord.js';
import { REST } from '@discordjs/rest';
import { config } from 'dotenv';
import { COMMANDS, COMMANDS_METHODS } from './commands/main.js';
config(); // get the enviroment(dotenv) variables

// Intents is what the bot can do
const BOT = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});
const BOT_TOKEN = process.env.TOKEN;
const BOT_ID = process.env.CLIENT_ID;
const SERVER_ID = process.env.GUILD_ID;
const REST_ = new REST({ version: '10' }).setToken(BOT_TOKEN);

BOT.on('ready', () => console.log(`O rato está pronto!`));

BOT.on('messageCreate', (message) => {
    console.log(`${message.content} -> ${message.author.tag}`)
});

BOT.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return; // check if it's a "/" command
    for (let i = 0; i < COMMANDS.length; i++) {
        let func = COMMANDS_METHODS[COMMANDS[i].name]; // get the commandName function
        if (func) func(interaction); // check if the function for the command exist and execute it
    }
});

async function main() {
    try {
        console.log('O rato está preparando os comandos...');
        await REST_.put(Routes.applicationGuildCommands(BOT_ID, SERVER_ID), {
            body: COMMANDS
        });
        BOT.login(BOT_TOKEN);
    } catch (error) {
        console.log(error);
    }
};

main();