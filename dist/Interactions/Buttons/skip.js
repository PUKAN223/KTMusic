import { setEmbed } from "../../Utilities/HasSong";
export async function skip(interaction) {
    const player = interaction.client.managers.getPlayer(interaction.guildId);
    if (!player)
        return;
    player.skip();
    await new Promise(resolve => setTimeout(resolve, 1000));
    setEmbed(interaction.channel, interaction.guildId);
    interaction.deferUpdate();
}
