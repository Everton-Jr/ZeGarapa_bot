require('dotenv').config(); // token


const { Client, Events, GatewayIntentBits, EmbedBuilder, ActionRowBuilder } = require('discord.js'); // Require discord modules
const { CreateCharacter } = require('./Commands/commands.js');

require('./database_connection.js');
require('./Commands/commands.js');


// Require intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers
    ]
});

// Send a message when the bot starts
client.on('ready', (c) => {
    console.log(`${c.user.username} went online!`);
});


// MESSAGE COMMAND
client.on(Events.MessageCreate, (msg) =>{
	if (!msg.author.bot && msg.content.indexOf('d')) {
		// array do comando
		var nums = msg.content.split('d');

		// caso tenha valor depois do 'd'
		if (nums[nums.length-1] != '' && nums.length <= 2){
			msg.channel.send(`${i} value ${nums[i]}`);
		}
		//console.log(msg);
	}
});


// BAR COMMAND
client.on(Events.InteractionCreate, async (interaction) => {
    // return nothing if it's not on chat command
    if(!interaction.isChatInputCommand()) return;

    CreateCharacter(interaction);
});


client.login(process.env.TOKEN); // Start the bot