import { ButtonInteraction } from "discord.js";
import { setEmbed } from "../../Utilities/HasSong";

export async function pause(interaction: ButtonInteraction) {
    const player = interaction.client.managers.getPlayer(interaction.guildId as string);
    if (!player) return;
    player.pause(!player.paused);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setEmbed(interaction.channel as any, interaction.guildId as string);
    interaction.deferUpdate();
}