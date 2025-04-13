import { setEmbed } from "../../Utilities/HasSong";
export async function pause(interaction) {
    const player = interaction.client.managers.getPlayer(interaction.guildId);
    if (!player)
        return;
    player.pause(!player.paused);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setEmbed(interaction.channel, interaction.guildId);
    interaction.deferUpdate();
}
