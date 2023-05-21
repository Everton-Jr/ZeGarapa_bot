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


// BUTTON INTERACTION
client.on(Events.InteractionCreate, async (interaction) => {
    try {
        // check if it's a button interaction
        if (!interaction.isButton()) return;

        await interaction.deferReply(
            {
                ephemeral: true //only who send the message can see this
            }
        );

        const classe = interaction.guild.roles.cache.get(interaction.customId);
        if (!classe) {
            interaction.editReply({
                    content: 'Essa classe não existe no servidor'
            });
            return;
        }

        // When clicking you choose a 'classe'
        for(var key in classes){
            var c = interaction.guild.roles.cache.get(classes[key]["id"]);
            if (c) await interaction.member.roles.remove(c);
        }
        await interaction.member.roles.add(classe);
        // Find the key that correponds with the value
        var classeNome = Object.keys(classes).find(key => classes[key]["id"] === interaction.customId);
        await interaction.editReply(`Suas classes foram removidas e você recebeu ${classeNome}`);
    }
    catch (error) {
        console.log(error);
    }
});


// BAR COMMAND
client.on(Events.InteractionCreate, async (interaction)=>{
    // return nothing if it's not on chat command
    if(!interaction.isChatInputCommand()) return;

    CreateCharacter(interaction);
});


// Start the bot
client.login(process.env.TOKEN);