const COMMANDS = [
    {
        name: 'ping',
        description: 'Replies with pong!'
    },
    {
        name: 'test',
        description: 'Just for tests'
    }
];

const COMMANDS_METHODS = {
    'ping': (interaction) => {
        if (interaction.commandName != 'ping') return;
        interaction.reply({
            content: 'pong!'
        })
    }
};

export { COMMANDS, COMMANDS_METHODS };