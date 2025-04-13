export async function previous(interaction) {
    const player = interaction.client.managers.getPlayer(interaction.guildId);
    if (!player)
        return;
    player.play(player.getPrevious(true));
    interaction.deferUpdate();
}
