import { setEmbed } from "../../Utilities/HasSong";
export async function volume(interaction) {
    const player = interaction.client.managers.getPlayer(interaction.guildId);
    if (!player)
        return;
    const volume = interaction.fields.getTextInputValue('volume_input');
    await player.setVolume(parseInt(volume));
    await new Promise(resolve => setTimeout(resolve, 1000));
    player.volume;
    setEmbed(interaction.channel, interaction.guildId);
    interaction.deferUpdate();
}
