function CreateCharacter(interaction) {
    let interactionName = 'criar-personagem'
    if (interaction.commandName == interactionName) {
        var characterName = interaction.options.get('nome').value
        var characterRace = interaction.options.get('raca').value
        var characterClass = interaction.option.get('class').value

        console.log(characterName, characterRace, characterClass)
    }
}

module.exports = { CreateCharacter }