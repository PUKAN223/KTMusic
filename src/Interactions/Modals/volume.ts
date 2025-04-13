import type { CommandInteraction, ModalSubmitInteraction } from "discord.js";
import { setEmbed } from "../../Utilities/HasSong";

export async function volume(interaction: ModalSubmitInteraction) {
    const player = interaction.client.managers.getPlayer(interaction.guildId as string);
    if (!player) return;
    const volume = interaction.fields.getTextInputValue('volume_input');
    await player.setVolume(parseInt(volume));
    await new Promise(resolve => setTimeout(resolve, 1000));
    player.volume;
    setEmbed(interaction.channel as any, interaction.guildId as string);
    interaction.deferUpdate();
}