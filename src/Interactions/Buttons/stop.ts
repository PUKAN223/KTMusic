import { ButtonInteraction } from "discord.js";

export async function stop(interaction: ButtonInteraction) {
    const player = interaction.client.managers.getPlayer(interaction.guildId as string);
    if (!player) return;
    player.destroy();
    interaction.deferUpdate();
}