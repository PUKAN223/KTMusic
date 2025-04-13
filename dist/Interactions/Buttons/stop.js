export async function stop(interaction) {
    const player = interaction.client.managers.getPlayer(interaction.guildId);
    if (!player)
        return;
    player.destroy();
    interaction.deferUpdate();
}
