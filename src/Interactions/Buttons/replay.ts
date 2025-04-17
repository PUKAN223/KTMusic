import { ButtonInteraction } from "discord.js";
import { setEmbed } from "../../Utilities/Setup";

export async function replay(interaction: ButtonInteraction) {
    const player = interaction.client.managers.getPlayer(interaction.guildId as string);
    if (!player) return;
    await player.seek(0);
    interaction.deferUpdate();
}