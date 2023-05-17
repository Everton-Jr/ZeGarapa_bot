require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType, ApplicationCommandOptionWithChoicesAndAutocompleteMixin } = require('discord.js');
const { conn } = require('./connection.js');


// discord commands
const commands = [
    {
        name: 'ping',
        description: 'Replies with pong!'
    },
    {
        name: 'c-raca',
        description: 'Cria uma raça para o seu RPG (apenas mestres)',
        options: [
            {
                name: 'nome',
                description: 'Nome da raça',
                type: ApplicationCommandOptionType.String,
                required: true
            },
            {
                name: 'deslocamento',
                description: 'Quantas unidades a raça pode andar',
                type: ApplicationCommandOptionType.String,
                required: true
            },
            {
                name: 'atributos',
                description: 'Atributos adicionais da raça (separadas por ", ")',
                type: ApplicationCommandOptionType.String,
                required: false
            },
            {
                name: 'passivas',
                description: 'Passivas da raça (separadas por ", ")',
                type: ApplicationCommandOptionType.String,
                required: false
            }
        ]
    },
    {
        name: 'd-raca',
        description: 'Deleta uma raça do seu RPG (apenas mestres)',
        options: [
            {
                name: 'nome',
                description: 'Nome da raça',
                type: ApplicationCommandOptionType.String,
                required: true,
                choices: [
                    {
                        name: 'askld',
                        value: 'askdf'
                    }
                ]
            }
        ]
    },
    {
        name: 'c-perso',
        description: 'Cria seu personagem de RPG.',
        options: [
            {
                name: 'nome',
                description: 'Nome do seu personagem.',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'raca',
                description: 'Raça do seu personagem.',
                type: ApplicationCommandOptionType.String,
                required: true
            },
            {
                name: 'classe',
                description: 'Classe do seu personagem.',
                type: ApplicationCommandOptionType.String,
                required: true,
                choices: [
                    {
                        name: 'Humano',
                        value: 'humano'
                    },
                    {
                        name: 'elfo',
                        value: 'raca_elfo'
                    }
                ]
            },
        ],
    },
    {
        name: 'perso',
        description: 'Mostra o perfil de um personagem',
        options: [
            {
                name: 'nome',
                description: 'Nome do personagem',
                type: ApplicationCommandOptionType.String,
                required: true
            }
        ]
    },
    {
        name: 'embed',
        description: 'Send a embed message.'
    },
    {
        name: 'personagens',
        description: 'Mostra todos os personagens'
    }
];

const rest = new REST({ version:'10' }).setToken(process.env.TOKEN);

async function addCommands() {
    console.log('Registering slash commands...');

    try {
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            {
                body: commands
            }
        );

        console.log('Slash commands were registered!\n---------------------------\n');
    } catch (error) {
        console.log(`There was an error: ${error}`);
    }
};

conn.query(`SELECT nome_raca FROM raca`, (error, results, fields) => {
    if (error) {
        throw error;
    }
    let racas = [];
    for (var i=0; i<results.length; i++) {
        let nome = results[i].nome_raca;
        racas[i] = {
            name: nome,
            value: nome
        }
    }
    commands[2].options.choices = racas;
    console.log(commands[2].options.choices);

    addCommands();
});