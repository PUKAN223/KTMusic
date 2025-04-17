import { ButtonInteraction } from "discord.js";

export async function previous(interaction: ButtonInteraction) {
    const player = interaction.client.managers.getPlayer(interaction.guildId as string);
    if (!player) return;
    interaction.deferUpdate();
}