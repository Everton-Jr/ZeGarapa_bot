const COMMANDS = [
    {
        name: 'ping',
        description: 'Replies with pong!'
    },
    {
        name: 'criar-personagem',
        description: 'Cria um novo personagem para o RPG',
        options: [
            {
                name: 'nome',
                description: 'O nome do seu personagem',
                type: 3, // string
                required: true
            },
            {
                name: 'raca',
                description: 'A raça do seu personagem',
                type: 3, // string
                required: true
            },
            {
                name: 'classe',
                description: 'A classe do seu personagem',
                type: 3, // string
                required: true
            }
        ]
    }
];

const COMMANDS_METHODS = {
    'ping': (interaction) => {
        if (interaction.commandName != 'ping') return;
        interaction.reply({
            content: 'pong!'
        })
    },
    'criar-personagem': (interaction) => {
        if (interaction.commandName != 'criar-personagem') return;
        let nome = interaction.options.get('nome').value;
        interaction.reply({
            content: `Personagem ${nome} criado!`,
            ephemeral: true
        })
    }
};

export { COMMANDS, COMMANDS_METHODS };