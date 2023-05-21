const { ApplicationCommandOptionType } = require('discord.js')
const { RACE_CHOICES } = require('../Character/races.js')
const { CLASS_CHOICES } = require('../Character/classes.js')

const COMMANDS = [
    {
        name: 'criar-personagem',
        description: 'Cria um novo personagem para o jogador',
        options: [
            {
                name: 'nome',
                description: 'Nome do seu personagem.',
                type: ApplicationCommandOptionType.String,
                required: true,
            }, {
                name: 'raca',
                description: 'Raça do seu personagem.',
                type: ApplicationCommandOptionType.String,
                required: true,
                choices: RACE_CHOICES
            }, {
                name: 'class',
                description: 'Classe do seu personagem.',
                type: ApplicationCommandOptionType.String,
                required: true,
                choices: CLASS_CHOICES
            }
        ]
    },
    {
        name: 'ping',
        description: 'Replies with pong!'
    }
];

module.exports = { COMMANDS }