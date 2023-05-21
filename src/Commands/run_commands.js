require('dotenv').config()
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js')
const { COMMANDS } = require('./all_commands.js')

const rest = new REST({ version:'10' }).setToken(process.env.TOKEN);

async function AddCommands() {
    console.log('Registering slash commands...');
    try {
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: COMMANDS }
        );
        console.log('Slash commands were registered!\n---------------------------\n');
    } catch (error) {
        console.log(`There was an error: ${error}`);
    }
};