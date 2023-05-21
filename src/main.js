// token
require('dotenv').config();
require('./connection.js');

// Require modules
const {
    Client, Events, GatewayIntentBits, EmbedBuilder,
    ActionRowBuilder,
} = require('discord.js');
const { classes } = require('./variables.js');
const { conn } = require('./connection.js');
require('./Commands/run_commands.js');

// Require intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers
    ]
});

// COMMANDS
const { CreateCharacter } = require('./Character/character_create.js')

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

    /* console.log('--START OF INTERACTION--\n\n');
    console.log(interaction);
    console.log('\n\n--END OF INTERACTION--\n\n'); */

    switch(interaction.commandName){


        case 'ping':
            interaction.reply(`${interaction.member.nickname} Pongus!`, { ephemeral:true });
            break;


        case 'c-perso':
            var nome = interaction.options.get('nome').value;
            var raca = interaction.options.get('raca').value;
            var playerId = interaction.user.username;
            var atts = [{
                FOR: 1,
                DES: 1,
                CON: 1,
                INT: 1,
                SAB: 1,
                CAR: 1
            }];
            interaction.reply(`Personagem ${nome}, o ${raca} criado`, { ephemeral: true });
            break;


        case 'perso':
            // mostrar o perfil do seu personagem
            var nome = interaction.options.get('nome').value;
            interaction.reply(`Personagem ${nome}`, { ephemeral: true });
            break;


        case 'c-raca':
            // obrigatórios
            var nome = interaction.options.get('nome').value;
            var desl = interaction.options.get('deslocamento').value;
            // opcionais
            var atts = interaction.options.get('atributos') && interaction.options.get('atributos').value || '';
            var pass = interaction.options.get('passivas') && interaction.options.get('passivas').value || '';

            conn.query(`INSERT INTO raca(nome_raca, desloc_raca, atributos_raca, passivas_raca) VALUES('${nome}', '${desl}', '${atts}', '${pass}')`, function (error, results, fields) {
                if (error) {
                    interaction.reply(`Erro ao criar raca, ${error}`, { ephemeral: true });
                    throw error;
                }
            }); 

            interaction.reply(`Raça ${nome} criada!`, { ephemeral: true });
            break;
        case 'd-raca':
            var nome = interaction.options.get('nome').value;

            conn.query(`DELETE FROM raca WHERE id_raca = ${id}`, function (error, results, fields) {
                if (error) {
                    interaction.reply(`Erro ao criar raca, ${error}`, { ephemeral: true });
                    throw error;
                }
            }); 

            interaction.reply(`Raça ${nome} criada!`, { ephemeral: true });
            break;


        case 'embed':
            var em = new EmbedBuilder()
                .setTitle("Embed title")
                .setDescription("This is an embed description.")
                .setColor('DarkGold')
                .addFields(
                    {
                        name: 'field-1',
                        value: 'Text test',
                        inline: true
                    },
                    {
                        name: 'field-2',
                        value: 'Text test',
                        inline: true
                    }
                )
            interaction.reply({ embeds: [em] });
            break;


        case 'personagens':
            await conn.query('SELECT * FROM keyv', (err, result, fields) => {
                if (err) throw err;
                else {
                    for(var key in result){
                        // transform keyv:'id' in 'id'
                        let nid = result[key]['id'];
                        nid = nid.replace('keyv:', '');

                        // transforms keyv JSON values to JavaScript objects
                        let values = JSON.parse(result[key]['value']);

                        /* console.log(values["value"]); */

                        interaction.channel.send(values['value'])
                    }
                }
            });
            /* interaction.reply(personagem); */
            break;


        default:
            interaction.reply('Coding be like: bruh...');
            break;
    }
});


// Start the bot
client.login(process.env.TOKEN);