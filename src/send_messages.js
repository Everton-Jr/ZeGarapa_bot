require('dotenv').config();
const { Client, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { classes } = require('./variables.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers
    ]
});

// id do canal classes
var canal = {
    "classes": '1092970973294244001'
}

client.on('ready', async (c) => {
    try {
        var channel = await client.channels.cache.get(canal["classes"]) //id do canal que vai mandar a mensagem
        if (!channel) return;

        var row = new ActionRowBuilder();

        // create buttons
        classes.forEach((role) => {
            row.components.push(
                new ButtonBuilder()
                    .setCustomId(role.id)
                    .setLabel(role.label)
                    .setStyle(ButtonStyle.Primary)
            );
        });

        await channel.send({
            content: 'Escolha sua classe:',
            components: [row]
        });

        process.exit();
    } catch (error) {
        console.log(error);
    }
});

client.login(process.env.TOKEN);